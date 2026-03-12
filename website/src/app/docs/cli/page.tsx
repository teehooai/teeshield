import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "CLI Reference — SpiderShield",
  description: "Full command reference for the SpiderShield CLI.",
};

const commands = [
  {
    name: "scan",
    desc: "Static security analysis of an MCP server directory.",
    usage: "spidershield scan ./my-mcp-server",
    flags: [
      { flag: "--format", desc: "Output format: text, json, sarif" },
      { flag: "--output", desc: "Write report to file" },
      { flag: "--verbose", desc: "Show detailed findings" },
    ],
  },
  {
    name: "guard",
    desc: "Wrap a stdio MCP server with runtime policy enforcement.",
    usage: "spidershield guard --preset balanced -- npx server",
    flags: [
      { flag: "--preset", desc: "Policy preset: permissive, balanced, strict" },
      { flag: "--policy", desc: "Path to custom policy YAML" },
      { flag: "--dlp", desc: "DLP mode: log, redact, block" },
      { flag: "--audit", desc: "Enable JSONL audit logging" },
    ],
  },
  {
    name: "proxy",
    desc: "HTTP proxy mode for network-based MCP servers.",
    usage: "spidershield proxy --policy strict -- python server.py",
    flags: [
      { flag: "--policy", desc: "Policy preset or YAML file path" },
      { flag: "--port", desc: "Proxy listen port (default: 8080)" },
      { flag: "--dlp", desc: "DLP mode: log, redact, block" },
      { flag: "--audit", desc: "Enable JSONL audit logging" },
    ],
  },
  {
    name: "rewrite",
    desc: "LLM-powered tool description rewriter for better quality.",
    usage: "spidershield rewrite ./my-mcp-server",
    flags: [
      { flag: "--provider", desc: "LLM provider: anthropic, openai, gemini" },
      { flag: "--dry-run", desc: "Preview changes without writing" },
      { flag: "--cache", desc: "Use SHA-256 keyed rewrite cache" },
    ],
  },
  {
    name: "harden",
    desc: "Generate security fix suggestions for an MCP server.",
    usage: "spidershield harden ./my-mcp-server",
    flags: [
      { flag: "--format", desc: "Output format: text, json" },
      { flag: "--auto-fix", desc: "Apply fixes automatically" },
    ],
  },
  {
    name: "agent-check",
    desc: "Security audit for agent configs, skills, and toxic flows.",
    usage: "spidershield agent-check ./agent-config.yaml",
    flags: [
      { flag: "--format", desc: "Output format: text, json, sarif" },
      { flag: "--allowlist", desc: "Path to approved skills allowlist" },
    ],
  },
  {
    name: "policy",
    desc: "Manage and validate security policies.",
    usage: "spidershield policy list | show | validate",
    flags: [
      { flag: "list", desc: "Show available policy presets" },
      { flag: "show <name>", desc: "Print a policy's rules" },
      { flag: "validate <file>", desc: "Validate a custom policy YAML" },
    ],
  },
  {
    name: "audit",
    desc: "Query and analyze audit logs.",
    usage: "spidershield audit show | stats",
    flags: [
      { flag: "show", desc: "Display recent audit events" },
      { flag: "stats", desc: "Aggregate statistics from audit logs" },
      { flag: "--session", desc: "Filter by session ID" },
      { flag: "--tool", desc: "Filter by tool name" },
    ],
  },
];

export default function CliPage() {
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
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">CLI Reference</h1>
          <p className="text-xl text-body">
            Full command reference for the SpiderShield CLI.
          </p>
        </div>

        {/* Install */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Installation</h2>
          <CodeBlock code="pip install spidershield" language="bash" />
        </div>

        {/* Commands */}
        <div className="space-y-8">
          {commands.map((cmd) => (
            <div key={cmd.name} className="rounded-xl border border-surface/50 bg-card overflow-hidden">
              <div className="border-b border-surface/30 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  <code className="font-mono text-spider-red">spidershield {cmd.name}</code>
                </h2>
                <p className="mt-1 text-base text-body">{cmd.desc}</p>
              </div>
              <div className="px-6 py-4">
                <div className="mb-4">
                  <CodeBlock code={cmd.usage} language="bash" />
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-surface/30">
                      <th className="pb-2 text-sm font-semibold uppercase tracking-wide text-muted">Flag</th>
                      <th className="pb-2 text-sm font-semibold uppercase tracking-wide text-muted">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface/20">
                    {cmd.flags.map((f) => (
                      <tr key={f.flag}>
                        <td className="py-2.5 pr-4">
                          <code className="font-mono text-sm text-spider-red">{f.flag}</code>
                        </td>
                        <td className="py-2.5 text-base text-body">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-12 flex items-center justify-between border-t border-surface/30 pt-8">
          <Link href="/docs/dlp" className="text-base text-muted hover:text-spider-red transition-colors">
            &larr; DLP Scanner
          </Link>
          <Link href="/docs/policy" className="text-base text-spider-red hover:text-spider-red-hover transition-colors">
            Policy Engine &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
