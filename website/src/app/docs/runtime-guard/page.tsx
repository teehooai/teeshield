import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Runtime Guard — SpiderShield",
  description: "Policy enforcement before every AI agent tool call.",
};

const basicUsage = `from spidershield import SpiderGuard, Decision

guard = SpiderGuard(policy="balanced", dlp="redact", audit=True)

# Before tool execution — policy check
result = guard.check("execute_sql", {"query": "DROP TABLE users"})

if result.decision == Decision.DENY:
    print(f"Blocked: {result.reason}")
elif result.decision == Decision.ESCALATE:
    print(f"Needs approval: {result.reason}")
else:
    output = run_tool("execute_sql", {"query": "DROP TABLE users"})
    # After tool execution — DLP scan
    clean = guard.after_check("execute_sql", output)`;

const policyExample = `# balanced.yaml — ships with SpiderShield
rules:
  - name: block-destructive-sql
    tool: "execute_sql"
    pattern: "DROP|DELETE|TRUNCATE|ALTER"
    match_on: "arguments.query"
    decision: DENY
    reason: "Destructive SQL operations are blocked"

  - name: block-shell-danger
    tool: "run_command"
    pattern: "rm -rf|mkfs|dd if=|:(){ :|:& };:"
    match_on: "arguments.command"
    decision: DENY

  - name: escalate-file-write
    tool: "write_file"
    pattern: ".*"
    match_on: "arguments.path"
    decision: ESCALATE
    reason: "File writes require human approval"`;

const guardMode = `# Wrap any MCP stdio server — zero code changes
$ spidershield guard \\
    --preset balanced \\
    -- npx @modelcontextprotocol/server-filesystem /tmp

# With custom policy file
$ spidershield guard \\
    --policy ./my-policy.yaml \\
    -- python my_mcp_server.py

# With DLP and audit enabled
$ spidershield guard \\
    --preset strict \\
    --dlp redact \\
    --audit \\
    -- npx @modelcontextprotocol/server-everything`;

const proxyMode = `# HTTP proxy mode for network-based MCP servers
$ spidershield proxy \\
    --policy strict \\
    --port 8080 \\
    -- python my_http_mcp_server.py

# All tool calls intercepted transparently:
#   read_file("/etc/passwd")  → DENIED
#   exec("rm -rf /")          → DENIED
#   fetch("https://c2.evil")  → DENIED
#   read_file("./data.csv")   → ALLOWED`;

const decisions = [
  {
    name: "ALLOW",
    desc: "Tool call passes policy checks. Execution proceeds normally.",
    cardClass: "border-safe-green/30 bg-safe-green/5",
    titleClass: "text-safe-green",
  },
  {
    name: "DENY",
    desc: "Tool call violates a policy rule. Execution is blocked and the reason is returned to the agent.",
    cardClass: "border-spider-red/30 bg-spider-red/5",
    titleClass: "text-spider-red",
  },
  {
    name: "ESCALATE",
    desc: "Tool call needs human approval. Execution pauses until a human approves or rejects.",
    cardClass: "border-warn-orange/30 bg-warn-orange/5",
    titleClass: "text-warn-orange",
  },
];

export default function RuntimeGuardPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-4">
          <Link href="/docs" className="text-sm text-muted hover:text-spider-red transition-colors">
            &larr; Back to Docs
          </Link>
        </div>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Runtime Guard</h1>
          <p className="text-xl text-body">
            Policy enforcement before every tool call. ALLOW, DENY, or ESCALATE in real time.
          </p>
        </div>

        {/* Decisions */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Three Decisions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {decisions.map((d) => (
              <div key={d.name} className={`rounded-xl border p-5 ${d.cardClass}`}>
                <h3 className={`mb-2 text-lg font-bold ${d.titleClass}`}>{d.name}</h3>
                <p className="text-base text-body">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SDK usage */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Python SDK</h2>
          <p className="mb-4 text-base text-body">
            Import SpiderGuard and wrap your tool execution flow.
          </p>
          <CodeBlock code={basicUsage} language="python" />
        </div>

        {/* Policy file */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Policy Rules</h2>
          <p className="mb-4 text-base text-body">
            Policies are YAML files with pattern-matching rules. SpiderShield ships with three presets:
            <span className="text-safe-green font-medium"> permissive</span>,
            <span className="text-warn-orange font-medium"> balanced</span>, and
            <span className="text-spider-red font-medium"> strict</span>.
          </p>
          <CodeBlock code={policyExample} language="yaml" />
        </div>

        {/* Guard mode */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Guard Mode (CLI)</h2>
          <p className="mb-4 text-base text-body">
            Wrap any stdio-based MCP server with zero code changes.
          </p>
          <CodeBlock code={guardMode} language="bash" />
        </div>

        {/* Proxy mode */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Proxy Mode (CLI)</h2>
          <p className="mb-4 text-base text-body">
            Transparent HTTP proxy for network-based MCP servers.
          </p>
          <CodeBlock code={proxyMode} language="bash" />
        </div>

        {/* Presets table */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Policy Presets</h2>
          <div className="overflow-x-auto rounded-xl border border-surface/50">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface/30 bg-card">
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Preset</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Shell Commands</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">File Writes</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Network</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">SQL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface/30">
                <tr className="bg-card/50">
                  <td className="px-6 py-4 text-base font-medium text-safe-green">Permissive</td>
                  <td className="px-6 py-4 text-base text-body">Allow (log only)</td>
                  <td className="px-6 py-4 text-base text-body">Allow</td>
                  <td className="px-6 py-4 text-base text-body">Allow</td>
                  <td className="px-6 py-4 text-base text-body">Allow</td>
                </tr>
                <tr className="bg-card/50">
                  <td className="px-6 py-4 text-base font-medium text-warn-orange">Balanced</td>
                  <td className="px-6 py-4 text-base text-body">Escalate</td>
                  <td className="px-6 py-4 text-base text-body">Escalate</td>
                  <td className="px-6 py-4 text-base text-body">Allow</td>
                  <td className="px-6 py-4 text-base text-body">Block destructive</td>
                </tr>
                <tr className="bg-card/50">
                  <td className="px-6 py-4 text-base font-medium text-spider-red">Strict</td>
                  <td className="px-6 py-4 text-base text-body">Deny</td>
                  <td className="px-6 py-4 text-base text-body">Deny</td>
                  <td className="px-6 py-4 text-base text-body">Escalate</td>
                  <td className="px-6 py-4 text-base text-body">Block all mutations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between border-t border-surface/30 pt-8">
          <Link href="/docs" className="text-base text-muted hover:text-spider-red transition-colors">
            &larr; Documentation
          </Link>
          <Link href="/docs/dlp" className="text-base text-spider-red hover:text-spider-red-hover transition-colors">
            DLP Scanner &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
