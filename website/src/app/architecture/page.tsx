import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture — SpiderShield",
  description: "How SpiderShield intercepts tool calls and enforces security policies.",
};

const layers = [
  {
    name: "Policy Engine",
    desc: "YAML-based rules evaluated before every tool call. Three presets (permissive, balanced, strict) or custom rules.",
    details: [
      "Pattern matching on tool names and arguments",
      "ALLOW / DENY / ESCALATE decisions",
      "Configurable per-tool overrides",
      "Custom rule authoring with regex patterns",
    ],
    titleClass: "text-spider-red",
    dotClass: "bg-spider-red",
  },
  {
    name: "DLP Scanner",
    desc: "Post-execution scanning of tool outputs for sensitive data leakage.",
    details: [
      "PII detection (emails, phones, SSNs, credit cards)",
      "Secret scanning (API keys, tokens, passwords)",
      "Prompt injection detection in tool outputs",
      "Configurable: log, redact, or block modes",
    ],
    titleClass: "text-web-blue",
    dotClass: "bg-web-blue",
  },
  {
    name: "Audit Logger",
    desc: "Complete audit trail for every tool call, policy decision, and DLP event.",
    details: [
      "JSONL format for easy parsing and SIEM integration",
      "Queryable via CLI (audit show, audit stats)",
      "Session-based grouping",
      "Timestamps, tool names, arguments, decisions",
    ],
    titleClass: "text-safe-green",
    dotClass: "bg-safe-green",
  },
];

const modes = [
  {
    name: "SDK Mode",
    desc: "Import SpiderGuard directly into your Python application. Full programmatic control.",
    cmd: "from spidershield import SpiderGuard",
    useCases: ["Custom agent frameworks", "Fine-grained control", "Programmatic policy"],
  },
  {
    name: "Guard Mode",
    desc: "Wrap any stdio-based MCP server. Zero code changes to the server.",
    cmd: "spidershield guard --preset balanced -- npx server",
    useCases: ["MCP stdio servers", "Quick setup", "Claude Desktop"],
  },
  {
    name: "Proxy Mode",
    desc: "Transparent HTTP proxy for MCP servers. Intercepts all tool calls.",
    cmd: "spidershield proxy --policy strict -- python server.py",
    useCases: ["HTTP MCP servers", "Multi-server setups", "Network-level interception"],
  },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Architecture</h1>
          <p className="text-xl text-body">
            How SpiderShield intercepts tool calls and enforces security policies.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Request Flow</h2>
          <div className="mx-auto max-w-lg">
            {/* AI Agent */}
            <div className="rounded-xl border border-surface/50 bg-card px-6 py-4 text-center">
              <span className="text-lg font-semibold text-white">AI Agent</span>
              <p className="mt-1 text-sm text-muted">LangChain / OpenAI / CrewAI / AutoGen</p>
            </div>

            {/* Arrow */}
            <div className="mx-auto flex h-10 w-px flex-col items-center justify-center">
              <div className="h-full w-px bg-gradient-to-b from-surface to-spider-red/60" />
              <svg className="h-2 w-2 text-spider-red" viewBox="0 0 8 8">
                <polygon points="4,8 0,0 8,0" fill="currentColor" />
              </svg>
            </div>

            {/* Pre-check */}
            <div className="rounded-xl border-2 border-spider-red/40 bg-card p-6 shadow-[0_0_40px_var(--color-spider-red-subtle)]">
              <div className="mb-4 flex items-center justify-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/spider-logo.svg" alt="" width={28} height={28} className="h-7 w-7" />
                <span className="text-xl font-bold text-white">SpiderShield Guard</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-spider-red/30 bg-background px-4 py-2.5 text-center">
                  <span className="text-base font-medium text-spider-red">1. Policy Check</span>
                  <span className="ml-2 text-sm text-muted">ALLOW / DENY / ESCALATE</span>
                </div>
                <div className="rounded-lg border border-web-blue/30 bg-background px-4 py-2.5 text-center">
                  <span className="text-base font-medium text-web-blue">2. DLP Scan (post)</span>
                  <span className="ml-2 text-sm text-muted">PII / Secrets / Injection</span>
                </div>
                <div className="rounded-lg border border-safe-green/30 bg-background px-4 py-2.5 text-center">
                  <span className="text-base font-medium text-safe-green">3. Audit Log</span>
                  <span className="ml-2 text-sm text-muted">JSONL event stream</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="mx-auto flex h-10 w-px flex-col items-center justify-center">
              <div className="h-full w-px bg-gradient-to-b from-spider-red/60 to-surface" />
              <svg className="h-2 w-2 text-surface" viewBox="0 0 8 8">
                <polygon points="4,8 0,0 8,0" fill="currentColor" />
              </svg>
            </div>

            {/* Tool */}
            <div className="rounded-xl border border-surface/50 bg-card px-6 py-4 text-center">
              <span className="text-lg font-semibold text-white">Tool Execution</span>
              <p className="mt-1 text-sm text-muted">MCP Servers / APIs / Shell / Filesystem</p>
            </div>
          </div>
        </div>

        {/* Three layers */}
        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Core Components</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="rounded-xl border border-surface/50 bg-card p-6"
              >
                <h3 className={`mb-2 text-lg font-bold ${layer.titleClass}`}>{layer.name}</h3>
                <p className="mb-4 text-base text-body">{layer.desc}</p>
                <ul className="space-y-2">
                  {layer.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-muted">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${layer.dotClass}`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment modes */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Deployment Modes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {modes.map((mode) => (
              <div
                key={mode.name}
                className="rounded-xl border border-surface/50 bg-card p-6"
              >
                <h3 className="mb-2 text-lg font-bold text-white">{mode.name}</h3>
                <p className="mb-3 text-base text-body">{mode.desc}</p>
                <code className="mb-4 block rounded-lg bg-background px-3 py-2 font-mono text-xs text-muted">
                  {mode.cmd}
                </code>
                <ul className="space-y-1.5">
                  {mode.useCases.map((uc) => (
                    <li key={uc} className="flex items-center gap-2 text-sm text-body">
                      <span className="text-spider-red">&#10003;</span>
                      {uc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/docs"
            className="inline-flex rounded-lg bg-spider-red px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_var(--color-spider-red-glow)] transition-all hover:bg-spider-red-hover hover:shadow-[0_0_30px_var(--color-spider-red-glow)]"
          >
            Read the Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
