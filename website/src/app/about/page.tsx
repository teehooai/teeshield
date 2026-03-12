import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — SpiderShield",
  description: "The team building the security layer for AI agents.",
};

const values = [
  {
    title: "Security First",
    desc: "No false sense of security. We score conservatively, document limitations, and never claim to find all vulnerabilities.",
  },
  {
    title: "Open Source",
    desc: "The core SDK is MIT-licensed and always will be. Security tools should be transparent and auditable.",
  },
  {
    title: "Evidence-Driven",
    desc: "Every scanner change is motivated by real false positives or missed issues. We measure before and after.",
  },
  {
    title: "Developer Experience",
    desc: "Security that gets in the way gets turned off. SpiderShield adds protection in 3 lines of code.",
  },
];

const milestones = [
  { date: "2026 Q1", event: "SpiderShield v0.3 released — runtime guard, DLP, proxy mode" },
  { date: "2026 Q1", event: "SpiderRating launched — 3,500+ MCP servers scanned and graded" },
  { date: "2026 Q1", event: "Agent security module — config audit, skill scanning, toxic flow detection" },
  { date: "2026 Q2", event: "SpiderShield Cloud — dashboard, telemetry, team policies (planned)" },
  { date: "2026 Q2", event: "Trust Registry API — MCP server reputation data (planned)" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/spider-logo.svg" alt="" width={48} height={48} className="h-12 w-12" />
            <h1 className="text-4xl font-bold text-white md:text-5xl">About SpiderShield</h1>
          </div>
          <p className="text-xl text-body">
            Building the security layer for the AI agent ecosystem.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16 rounded-xl border border-spider-red/20 bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Mission</h2>
          <p className="text-lg text-body leading-relaxed">
            AI agents are gaining access to real-world tools — databases, file systems, APIs, and shell commands.
            Without guardrails, a single prompt injection can lead to data theft, destructive operations, or credential exposure.
          </p>
          <p className="mt-4 text-lg text-body leading-relaxed">
            SpiderShield provides the runtime security layer that every AI agent needs: policy enforcement before tool execution,
            DLP scanning after execution, and a complete audit trail. Open source, developer-friendly, and built for the MCP ecosystem.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-surface/50 bg-card p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-spider-red">{value.title}</h3>
                <p className="text-base text-body">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Roadmap</h2>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-surface/50 bg-card px-6 py-4"
              >
                <span className="shrink-0 rounded-md border border-surface bg-background px-3 py-1 text-sm font-medium text-muted">
                  {m.date}
                </span>
                <p className="text-base text-body">{m.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16 rounded-xl border border-surface/50 bg-card p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Built by TeehooAI</h2>
          <p className="mb-6 text-base text-body">
            A small team focused on making AI agents safe and trustworthy.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/teehooai/spidershield"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-surface px-6 py-3 text-base text-body transition-all hover:border-spider-red/40 hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="mailto:hello@spidershield.dev"
              className="inline-flex items-center gap-2 rounded-lg bg-spider-red px-6 py-3 text-base font-semibold text-white transition-all hover:bg-spider-red-hover"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-base text-spider-red hover:text-spider-red-hover transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
