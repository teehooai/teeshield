import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security — SpiderShield",
  description: "Threat model, security guarantees, and responsible disclosure for SpiderShield.",
};

const threats = [
  {
    name: "Prompt Injection",
    severity: "Critical",
    desc: "Malicious instructions embedded in tool outputs that attempt to hijack agent behavior.",
    mitigation: "DLP scanner detects injection patterns in tool outputs before they reach the agent.",
  },
  {
    name: "Tool Abuse",
    severity: "Critical",
    desc: "Agents executing dangerous tools (shell commands, file deletion, database drops).",
    mitigation: "Policy engine blocks dangerous tool calls before execution. Configurable per-tool rules.",
  },
  {
    name: "Data Exfiltration",
    severity: "High",
    desc: "Sensitive data (PII, API keys, credentials) leaking through tool outputs.",
    mitigation: "DLP scanner detects and redacts secrets, PII, and credentials in real time.",
  },
  {
    name: "Rug-Pull Attacks",
    severity: "High",
    desc: "MCP server updates that introduce malicious behavior after initial trust is established.",
    mitigation: "SHA-256 content pinning detects changes to previously approved tool definitions.",
  },
  {
    name: "Toxic Capability Chains",
    severity: "Medium",
    desc: "Combinations of individually safe tools that become dangerous together (read + exfil).",
    mitigation: "Toxic flow detection using keyword + AST analysis identifies dangerous combinations.",
  },
  {
    name: "Privilege Escalation",
    severity: "Medium",
    desc: "Agents gaining access to tools or data outside their intended scope.",
    mitigation: "Allowlist enforcement restricts agents to pre-approved tool sets only.",
  },
];

function severityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return "text-spider-red border-spider-red/30 bg-spider-red/10";
    case "High":
      return "text-warn-orange border-warn-orange/30 bg-warn-orange/10";
    case "Medium":
      return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
    default:
      return "text-muted border-surface bg-surface/10";
  }
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Security</h1>
          <p className="text-xl text-body">
            Threat model, security guarantees, and responsible disclosure.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-16 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Security Principles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-spider-red">Defense in Depth</h3>
              <p className="text-base text-body">
                Multiple layers of protection: policy engine, DLP scanning, audit logging, and content pinning work together.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-spider-red">Zero Trust</h3>
              <p className="text-base text-body">
                Every tool call is checked against policy. No implicit trust, even for previously approved tools.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-spider-red">Open Source</h3>
              <p className="text-base text-body">
                Full source code available for audit. Security through transparency, not obscurity.
              </p>
            </div>
          </div>
        </div>

        {/* Threat model */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white">Threat Model</h2>
          <div className="space-y-4">
            {threats.map((threat) => (
              <div
                key={threat.name}
                className="rounded-xl border border-surface/50 bg-card p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{threat.name}</h3>
                  <span className={`rounded-md border px-2.5 py-0.5 text-xs font-bold ${severityColor(threat.severity)}`}>
                    {threat.severity}
                  </span>
                </div>
                <p className="mb-2 text-base text-body">{threat.desc}</p>
                <p className="text-base text-safe-green">
                  <span className="font-semibold">Mitigation:</span> {threat.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What we don't claim */}
        <div className="mb-16 rounded-xl border border-warn-orange/20 bg-warn-orange/5 p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">What We Don&apos;t Claim</h2>
          <ul className="space-y-3 text-base text-body">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-warn-orange">&#9888;</span>
              <span>A security score of 10.0 means &quot;zero issues found&quot;, not &quot;provably secure&quot;. No tool can guarantee the absence of vulnerabilities.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-warn-orange">&#9888;</span>
              <span>Static analysis has inherent limitations. SpiderShield catches known patterns but cannot detect novel attack vectors.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-warn-orange">&#9888;</span>
              <span>Runtime guards add a defense layer but do not replace secure coding practices in MCP servers.</span>
            </li>
          </ul>
        </div>

        {/* Responsible disclosure */}
        <div className="mb-16 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Responsible Disclosure</h2>
          <p className="mb-4 text-base text-body">
            If you discover a security vulnerability in SpiderShield, please report it responsibly.
          </p>
          <div className="rounded-lg bg-background px-6 py-4">
            <p className="text-base text-body">
              <span className="font-semibold text-white">Email:</span>{" "}
              <a href="mailto:security@spidershield.dev" className="text-spider-red hover:text-spider-red-hover transition-colors">
                security@spidershield.dev
              </a>
            </p>
            <p className="mt-2 text-sm text-muted">
              We aim to respond within 48 hours and will coordinate disclosure timelines with you.
            </p>
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
