import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Audit Logging — SpiderShield",
  description: "Complete audit trail for every tool call, decision, and DLP event.",
};

const auditEntry = `{
  "timestamp": "2026-03-09T14:23:01.234Z",
  "session_id": "sess_abc123",
  "event": "tool_check",
  "tool": "execute_sql",
  "arguments": {"query": "DROP TABLE users"},
  "decision": "DENY",
  "reason": "Destructive SQL operations are blocked",
  "policy_rule": "block-destructive-sql",
  "latency_ms": 0.8
}`;

const dlpEntry = `{
  "timestamp": "2026-03-09T14:23:05.567Z",
  "session_id": "sess_abc123",
  "event": "dlp_finding",
  "tool": "read_database",
  "finding_type": "API_KEY",
  "action": "redacted",
  "pattern": "sk-proj-***",
  "position": {"start": 142, "end": 178}
}`;

const cliUsage = `# Show recent audit events
$ spidershield audit show
[14:23:01] DENY  execute_sql  "Destructive SQL blocked"
[14:23:05] DLP   read_database  API_KEY redacted
[14:23:12] ALLOW read_file    ./data.csv

# Filter by tool
$ spidershield audit show --tool execute_sql

# Filter by session
$ spidershield audit show --session sess_abc123

# Aggregate stats
$ spidershield audit stats
  Total events:     1,247
  ALLOW:            1,089 (87.3%)
  DENY:               142 (11.4%)
  ESCALATE:            16 (1.3%)
  DLP findings:       312
  Sessions:            23`;

export default function AuditPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4">
          <Link href="/docs" className="text-sm text-muted hover:text-spider-red transition-colors">
            &larr; Back to Docs
          </Link>
        </div>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Audit Logging</h1>
          <p className="text-xl text-body">
            Complete JSONL audit trail for every tool call, decision, and DLP event.
          </p>
        </div>

        {/* What gets logged */}
        <div className="mb-12 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">What Gets Logged</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-surface/30 bg-background p-4">
              <h3 className="mb-2 text-base font-semibold text-spider-red">Policy Decisions</h3>
              <p className="text-sm text-body">Every ALLOW, DENY, and ESCALATE with tool name, arguments, and matched rule.</p>
            </div>
            <div className="rounded-lg border border-surface/30 bg-background p-4">
              <h3 className="mb-2 text-base font-semibold text-web-blue">DLP Findings</h3>
              <p className="text-sm text-body">Every PII, secret, or injection detection with type, action, and position.</p>
            </div>
            <div className="rounded-lg border border-surface/30 bg-background p-4">
              <h3 className="mb-2 text-base font-semibold text-safe-green">Session Metadata</h3>
              <p className="text-sm text-body">Session start/end, agent identity, total tool calls, and timing.</p>
            </div>
          </div>
        </div>

        {/* Event formats */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Event Format</h2>
          <p className="mb-4 text-base text-body">
            Each line in the audit log is a JSON object. Example policy decision:
          </p>
          <CodeBlock code={auditEntry} language="json" />
          <p className="mt-6 mb-4 text-base text-body">DLP finding event:</p>
          <CodeBlock code={dlpEntry} language="json" />
        </div>

        {/* CLI */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">CLI Usage</h2>
          <CodeBlock code={cliUsage} language="bash" />
        </div>

        {/* SIEM */}
        <div className="mb-12 rounded-xl border border-web-blue/20 bg-web-blue/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">SIEM Integration</h2>
          <p className="text-base text-body">
            Audit logs are standard JSONL — pipe them to any log aggregator. Splunk, Datadog, Elastic, or your own pipeline.
            SpiderShield Cloud (coming soon) adds centralized log collection and dashboards.
          </p>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between border-t border-surface/30 pt-8">
          <Link href="/docs/policy" className="text-base text-muted hover:text-spider-red transition-colors">
            &larr; Policy Engine
          </Link>
          <Link href="/docs/agent" className="text-base text-spider-red hover:text-spider-red-hover transition-colors">
            Agent Security &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
