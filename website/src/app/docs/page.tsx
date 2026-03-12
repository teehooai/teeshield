import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Documentation — SpiderShield",
  description: "Get started with SpiderShield runtime security for AI agents.",
};

const quickstart = `pip install spidershield

from spidershield import SpiderGuard, Decision

guard = SpiderGuard(policy="balanced", dlp="redact")

# Check before tool execution
result = guard.check("execute_sql", {"query": "SELECT * FROM users"})
if result.decision == Decision.ALLOW:
    output = run_tool("execute_sql", {"query": "SELECT * FROM users"})
    # Scan output for secrets / PII
    clean = guard.after_check("execute_sql", output)`;

const cliExample = `# Guard mode — wrap any MCP server
$ spidershield guard --preset balanced -- npx @modelcontextprotocol/server-filesystem /tmp

# Scan mode — static security analysis
$ spidershield scan ./my-mcp-server

# Proxy mode — transparent interception
$ spidershield proxy --policy strict -- python my_mcp_server.py`;

const sections = [
  {
    title: "Runtime Guard",
    href: "/docs/runtime-guard",
    desc: "Policy enforcement before every tool call. ALLOW, DENY, or ESCALATE decisions in real time.",
    icon: (
      <svg className="h-6 w-6 text-spider-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "DLP Scanner",
    href: "/docs/dlp",
    desc: "Detect and redact PII, API keys, secrets, and prompt injection in tool outputs.",
    icon: (
      <svg className="h-6 w-6 text-spider-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
  },
  {
    title: "CLI Reference",
    href: "/docs/cli",
    desc: "Full command reference for scan, guard, proxy, audit, policy, and dataset commands.",
    icon: (
      <svg className="h-6 w-6 text-spider-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Policy Engine",
    href: "/docs/policy",
    desc: "YAML-based policy presets (permissive, balanced, strict) and custom rule authoring.",
    icon: (
      <svg className="h-6 w-6 text-spider-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Audit Logging",
    href: "/docs/audit",
    desc: "JSONL audit trail for every tool call, decision, and DLP event. Queryable via CLI.",
    icon: (
      <svg className="h-6 w-6 text-spider-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Agent Security",
    href: "/docs/agent",
    desc: "Config audit, skill scanning, toxic flow detection, and content pinning for agent frameworks.",
    icon: (
      <svg className="h-6 w-6 text-spider-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285zm0 13.036h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/spider-logo.svg" alt="" width={40} height={40} className="h-10 w-10" />
            <h1 className="text-4xl font-bold text-white md:text-5xl">Documentation</h1>
          </div>
          <p className="text-xl text-body">
            Everything you need to secure your AI agents with SpiderShield.
          </p>
        </div>

        {/* Quickstart */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Quickstart</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">Python SDK</h3>
              <CodeBlock code={quickstart} language="python" />
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">CLI</h3>
              <CodeBlock code={cliExample} language="bash" />
            </div>
          </div>
        </div>

        {/* Doc sections grid */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white">Guides</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="group rounded-xl border border-surface/50 bg-card p-6 transition-all hover:border-spider-red/40 hover:shadow-[0_0_30px_var(--color-spider-red-subtle)]"
              >
                <div className="mb-3">{section.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-spider-red transition-colors">
                  {section.title}
                </h3>
                <p className="text-base text-body">{section.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Install methods */}
        <div className="mb-16 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Installation</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">PyPI</h3>
              <code className="block rounded-lg bg-background px-4 py-3 font-mono text-sm text-body">
                pip install spidershield
              </code>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">pipx (CLI only)</h3>
              <code className="block rounded-lg bg-background px-4 py-3 font-mono text-sm text-body">
                pipx install spidershield
              </code>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">From source</h3>
              <code className="block rounded-lg bg-background px-4 py-3 font-mono text-sm text-body">
                git clone &amp;&amp; pip install -e .
              </code>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href="https://github.com/teehooai/spidershield"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-spider-red/40 px-8 py-3.5 text-base font-semibold text-spider-red transition-all hover:border-spider-red hover:bg-spider-red-subtle"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
