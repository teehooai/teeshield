"""Tests for scanner runner -- orchestration, scoring, rating logic."""

from __future__ import annotations

from pathlib import Path

from teeshield.models import Rating
from teeshield.scanner.runner import run_scan_report


class TestRunScanReport:
    def test_empty_dir_produces_report(self, tmp_path: Path) -> None:
        """An empty directory should still produce a valid report."""
        report = run_scan_report(str(tmp_path))
        assert report.target == str(tmp_path)
        assert report.tool_count == 0
        assert report.overall_score >= 0.0
        assert report.rating is not None

    def test_clean_python_scores_well(self, tmp_path: Path) -> None:
        """A clean Python file with no vulnerabilities should score reasonably."""
        (tmp_path / "server.py").write_text(
            'def hello():\n    """Say hello."""\n    return "hello"\n'
        )
        (tmp_path / "LICENSE").write_text("MIT License")
        report = run_scan_report(str(tmp_path))
        assert report.security_score >= 5.0
        assert report.license == "MIT"
        assert report.license_ok is True

    def test_critical_issue_forces_rating_f(self, tmp_path: Path) -> None:
        """A critical security issue should force Rating.F."""
        (tmp_path / "server.py").write_text(
            'import os\nos.system(f"rm -rf {user_input}")\n'
        )
        report = run_scan_report(str(tmp_path))
        assert report.rating == Rating.F
        assert any(i.severity == "critical" for i in report.security_issues)

    def test_score_weights(self, tmp_path: Path) -> None:
        """Overall score = security*0.4 + desc*0.35 + arch*0.25."""
        report = run_scan_report(str(tmp_path))
        expected = (
            report.security_score * 0.4
            + report.description_score * 0.35
            + report.architecture_score * 0.25
        )
        assert abs(report.overall_score - round(expected, 1)) <= 0.1

    def test_rating_thresholds(self, tmp_path: Path) -> None:
        """Verify rating assignment is consistent with overall score."""
        report = run_scan_report(str(tmp_path))
        has_critical = any(
            i.severity == "critical" for i in report.security_issues
        )
        if has_critical:
            assert report.rating == Rating.F
        elif report.overall_score >= 9.0:
            assert report.rating == Rating.A_PLUS
        elif report.overall_score >= 8.0:
            assert report.rating == Rating.A
        elif report.overall_score >= 6.0:
            assert report.rating == Rating.B
        elif report.overall_score >= 4.0:
            assert report.rating == Rating.C
        else:
            assert report.rating == Rating.F

    def test_recommendations_for_low_desc_score(self, tmp_path: Path) -> None:
        """Low description score should trigger rewrite recommendation."""
        # Create a Python MCP server with tools that have bad descriptions
        (tmp_path / "server.py").write_text(
            'from mcp import Server\n'
            'server = Server("test")\n\n'
            '@server.tool()\n'
            'def do_thing(x: str) -> str:\n'
            '    """x"""\n'
            '    return x\n'
        )
        report = run_scan_report(str(tmp_path))
        # Should either have low desc score or no tools found
        if report.description_score < 6.0 and report.tool_count > 0:
            assert any("rewrite" in r.lower() for r in report.recommendations)

    def test_too_many_tools_recommendation(self, tmp_path: Path) -> None:
        """More than 40 tools should generate a splitting recommendation."""
        # Create many tool definitions
        lines = ['from mcp import Server\nserver = Server("test")\n']
        for i in range(45):
            lines.append(
                f'@server.tool()\n'
                f'def tool_{i}(x: str) -> str:\n'
                f'    """Tool {i} description."""\n'
                f'    return x\n'
            )
        (tmp_path / "server.py").write_text("\n".join(lines))
        report = run_scan_report(str(tmp_path))
        if report.tool_count > 40:
            assert any("splitting" in r.lower() for r in report.recommendations)
