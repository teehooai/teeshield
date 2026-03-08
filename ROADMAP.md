# TeeShield Roadmap

## Done

- [x] Core scanner (license, security, descriptions, architecture)
- [x] Template-based rewriter (zero cost, avg +5.7 pts)
- [x] Claude API rewriter (higher quality, avg +5.9 pts)
- [x] Rewrite apply (auto-modify source files)
- [x] Batch scan 7 MCP servers (79 tools)
- [x] GitHub Actions CI (Python 3.11/3.12/3.13)
- [x] GitHub Action (composite, reusable)
- [x] PyPI Trusted Publisher
- [x] Published v0.1.0 to PyPI (`pip install teeshield`)
- [x] Rebrand agentshield -> teeshield
- [x] GitHub repo renamed to teehooai/teeshield

## Short-term (This Week)

### 1. Submit PRs to MCP official servers
- [ ] Fork modelcontextprotocol/servers
- [ ] Apply LLM rewrites to filesystem (14 tools, 3.7 -> 9.6)
- [ ] Apply LLM rewrites to git (12 tools, 2.9 -> 8.6)
- [ ] Apply LLM rewrites to memory (9 tools, 3.4 -> 9.4)
- [ ] Submit PR with before/after TeeShield scores

### 2. Expand tool extraction patterns
- [ ] time server (tool registration via different pattern)
- [ ] everything server (python-sdk pattern)
- [ ] sequentialthinking server
- [ ] Support compiled JS (dist/*.js) for Playwright MCP
- [ ] Support Go servers for GitHub MCP

### 3. Reduce security scan false positives
- [ ] Narrow SSRF patterns (currently 1204 FP on non-MCP projects)
- [ ] Add MCP-specific context awareness
- [ ] Severity calibration based on tool type

## Mid-term (Weeks 2-3)

### 4. Community launch
- [ ] Blog post: "We scanned 79 MCP tools, avg description quality is 3.1/10"
- [ ] Submit to awesome-mcp list
- [ ] Post on HN / Reddit r/LocalLLaMA
- [ ] Twitter/X thread with scan results

### 5. Badge service
- [ ] Shield.io compatible badge endpoint
- [ ] `![TeeShield](https://teeshield.dev/badge/server-name)` for READMEs
- [ ] A+ / A / B / C / F visual badges

### 6. More server scans
- [ ] Scan top 20 community MCP servers
- [ ] Playwright, Desktop Commander, AWS MCP
- [ ] Auto-generate curation leaderboard

## Long-term (Month 2+)

### 7. SaaS version
- [ ] Web UI: upload server, get instant report
- [ ] API endpoint: POST /scan with GitHub URL
- [ ] Dashboard with historical scores

### 8. GitHub Marketplace
- [ ] Publish TeeShield Action to Marketplace
- [ ] Auto-comment on PRs with scan diff

### 9. Monetization
- [ ] Free tier: template rewrite, basic scan
- [ ] Pro tier: LLM rewrite, auto-PR, badge service
- [ ] Enterprise: custom rules, private server scanning
