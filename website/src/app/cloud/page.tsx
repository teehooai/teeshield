import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SpiderShield Cloud — SpiderShield",
  description: "Agent Security Intelligence — telemetry, dashboard, trust registry, and enterprise governance.",
};

const layers = [
  {
    number: "1",
    name: "Runtime Guard SDK",
    subtitle: "Open source, free forever",
    desc: "The sensor network. Every SpiderGuard instance generates security telemetry locally — policy decisions, DLP findings, tool call patterns.",
    badgeClass: "bg-safe-green/10 text-safe-green border-safe-green/30",
    subtitleClass: "text-safe-green",
    checkClass: "text-safe-green",
    items: [
      "Policy engine + 3 presets",
      "DLP scanning (PII, secrets, injection)",
      "JSONL audit logs (local)",
      "CLI: scan, guard, proxy, rewrite, harden",
    ],
  },
  {
    number: "2",
    name: "SpiderShield Cloud",
    subtitle: "SaaS — telemetry + storage + management",
    desc: "Centralized visibility into all your agents. The real product isn't the runtime — it's the telemetry, storage, and management layer.",
    badgeClass: "bg-spider-red/10 text-spider-red border-spider-red/30",
    subtitleClass: "text-spider-red",
    checkClass: "text-spider-red",
    items: [
      "Centralized cloud audit logs with long-term retention",
      "Security dashboard (activity timeline, blocked calls heatmap, PII distributions, risk trends)",
      "Visual policy editor — no YAML needed",
      "Org-wide policy distribution with versioning + rollback",
      "Canary rollout to agent groups",
      "Alert rules + webhooks",
      "Compliance-ready exportable reports (PDF/CSV)",
    ],
  },
  {
    number: "3",
    name: "Trust Registry",
    subtitle: "Network effect moat",
    desc: "Agents query trust status before calling tools. More agents = better threat intelligence = more accurate scores. A flywheel that can't be replicated.",
    badgeClass: "bg-web-blue/10 text-web-blue border-web-blue/30",
    subtitleClass: "text-web-blue",
    checkClass: "text-web-blue",
    items: [
      "MCP server reputation database (3,500+ servers scored)",
      "Trust API: security score, grade, known vulnerabilities, last scanned",
      "Real-time threat alerts for Enterprise (new exploits, 0-day patterns)",
      "Custom trust policies (\"block all servers below grade B\")",
      "Threat intelligence feed (prompt injection evolution, tool abuse patterns)",
    ],
  },
  {
    number: "4",
    name: "Enterprise Security",
    subtitle: "Central control + compliance + governance",
    desc: "What enterprise customers actually pay for: org-wide policy control, role-based access, compliance reports, and SIEM integration.",
    badgeClass: "bg-warn-orange/10 text-warn-orange border-warn-orange/30",
    subtitleClass: "text-warn-orange",
    checkClass: "text-warn-orange",
    items: [
      "Org-wide policy management (pushed to all agents)",
      "RBAC: per-team, per-agent, per-environment (dev/staging/prod)",
      "SSO (SAML, OIDC)",
      "SIEM forwarding (Splunk, Datadog, QRadar, Elastic)",
      "Slack / PagerDuty / Jira integration",
      "SOC 2 audit trail + incident history",
      "Data residency (EU / US / APAC)",
      "Dedicated account manager + SLA (99.9%)",
    ],
  },
];

const analogies = [
  { company: "Sentry", oss: "SDK", paid: "Event storage + dashboard", valuation: "$3B" },
  { company: "Datadog", oss: "Agent", paid: "Observability platform", valuation: "$35B" },
  { company: "Elastic", oss: "Elasticsearch", paid: "Cloud + security", valuation: "$6B" },
  { company: "Snyk", oss: "CLI scanner", paid: "Vulnerability DB + dashboard", valuation: "$8B" },
  { company: "HashiCorp", oss: "Terraform", paid: "Enterprise management", valuation: "$5.5B" },
];

const flywheelSteps = [
  "More agents use SpiderShield",
  "More security telemetry (blocked calls, new attacks, injection patterns)",
  "Better threat intelligence",
  "Better Trust Registry (more accurate scores)",
  "More developers install SpiderShield",
];

export default function CloudPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-web-blue/30 bg-web-blue/10 px-4 py-1.5 text-sm font-medium text-web-blue">
            Coming Soon
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">SpiderShield Cloud</h1>
          <p className="mx-auto max-w-2xl text-xl text-body">
            SpiderShield doesn&apos;t sell an SDK — it sells <span className="font-semibold text-white">Agent Security Intelligence</span>. The SDK is the sensor network.
          </p>
        </div>

        {/* 4 Layers */}
        <div className="mb-20 space-y-6">
          {layers.map((layer) => (
            <div
              key={layer.number}
              className={`rounded-xl border bg-card p-8 ${
                layer.number === "2"
                  ? "border-spider-red/40 shadow-[0_0_40px_var(--color-spider-red-subtle)]"
                  : "border-surface/50"
              }`}
            >
              <div className="mb-4 flex items-start gap-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold border ${layer.badgeClass}`}>
                  {layer.number}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white">{layer.name}</h2>
                  <p className={`text-sm font-medium ${layer.subtitleClass}`}>{layer.subtitle}</p>
                </div>
              </div>
              <p className="mb-5 text-base text-body">{layer.desc}</p>
              <ul className="grid gap-2 md:grid-cols-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base text-body">
                    <span className={`mt-0.5 shrink-0 ${layer.checkClass}`}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Flywheel */}
        <div className="mb-20 rounded-xl border border-web-blue/20 bg-web-blue/5 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Security Intelligence Flywheel</h2>
          <div className="mx-auto max-w-lg">
            {flywheelSteps.map((step, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 rounded-lg bg-card/80 px-5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-web-blue/10 text-sm font-bold text-web-blue">
                    {i + 1}
                  </span>
                  <span className="text-base text-body">{step}</span>
                </div>
                {i < flywheelSteps.length - 1 && (
                  <div className="ml-8 flex h-6 items-center">
                    <div className="h-full w-px bg-web-blue/30" />
                    <svg className="ml-[-3px] h-2 w-2 text-web-blue/50" viewBox="0 0 8 8">
                      <polygon points="4,8 0,0 8,0" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 rounded-lg border border-web-blue/30 bg-web-blue/10 px-5 py-3 text-center">
              <span className="text-base font-semibold text-web-blue">Repeat — network effect moat</span>
            </div>
          </div>
        </div>

        {/* Analogies */}
        <div className="mb-20">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Proven Model</h2>
          <p className="mb-8 text-center text-base text-body">
            Open-source distribution layer + paid intelligence/management is the most successful model in developer tools.
          </p>
          <div className="overflow-x-auto rounded-xl border border-surface/50">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface/30 bg-card">
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Company</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Open Source</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Paid Product</th>
                  <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-muted">Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface/20">
                {analogies.map((row) => (
                  <tr key={row.company} className="bg-card/50">
                    <td className="px-6 py-3 text-base font-medium text-white">{row.company}</td>
                    <td className="px-6 py-3 text-base text-body">{row.oss}</td>
                    <td className="px-6 py-3 text-base text-body">{row.paid}</td>
                    <td className="px-6 py-3 text-base font-medium text-safe-green">{row.valuation}</td>
                  </tr>
                ))}
                <tr className="bg-spider-red/5 border-t-2 border-spider-red/20">
                  <td className="px-6 py-3 text-base font-bold text-spider-red">SpiderShield</td>
                  <td className="px-6 py-3 text-base text-body">Runtime Guard SDK</td>
                  <td className="px-6 py-3 text-base text-body">Security Intelligence</td>
                  <td className="px-6 py-3 text-base font-medium text-spider-red">Building...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Execution phases */}
        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Roadmap</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                phase: "Phase 1",
                title: "Distribution",
                timeline: "Now",
                status: "active" as const,
                items: ["Open source SDK on PyPI", "Framework integration PRs", "GitHub Action", "Community growth"],
              },
              {
                phase: "Phase 2",
                title: "Cloud MVP",
                timeline: "Q2 2026",
                status: "next" as const,
                items: ["Telemetry API", "Cloud audit log storage", "Security dashboard", "Trust Registry v1"],
              },
              {
                phase: "Phase 3",
                title: "Enterprise",
                timeline: "Q3–Q4 2026",
                status: "planned" as const,
                items: ["Org policy management", "RBAC + SSO", "Compliance reports", "SIEM integrations"],
              },
              {
                phase: "Phase 4",
                title: "Intelligence Network",
                timeline: "2027+",
                status: "planned" as const,
                items: ["Real-time threat feed", "Pattern evolution tracking", "Industry security reports", "Custom trust policies"],
              },
            ].map((phase) => (
              <div
                key={phase.phase}
                className={`rounded-xl border p-6 ${
                  phase.status === "active"
                    ? "border-safe-green/40 bg-safe-green/5"
                    : "border-surface/50 bg-card"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-sm font-bold text-muted">{phase.phase}</span>
                  {phase.status === "active" && (
                    <span className="rounded-full bg-safe-green/10 px-2.5 py-0.5 text-xs font-medium text-safe-green border border-safe-green/30">
                      Active
                    </span>
                  )}
                </div>
                <h3 className="mb-1 text-lg font-bold text-white">{phase.title}</h3>
                <p className="mb-3 text-sm text-muted">{phase.timeline}</p>
                <ul className="space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-base text-body">
                      <span className="text-spider-red text-xs">&#9679;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Core insight */}
        <div className="mb-16 rounded-xl border border-spider-red/20 bg-spider-red/5 p-8 text-center">
          <p className="text-xl font-semibold text-white leading-relaxed">
            SpiderShield sells <span className="text-spider-red">Agent Security Intelligence</span>.<br />
            The SDK is just the sensor network.
          </p>
          <p className="mt-3 text-base text-body">
            Like Datadog&apos;s agent is a data collector and the real product is the observability platform — SpiderShield&apos;s Runtime Guard is a sensor, and the real product is the Security Intelligence Network.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/pricing"
            className="rounded-lg bg-spider-red px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_var(--color-spider-red-glow)] transition-all hover:bg-spider-red-hover hover:shadow-[0_0_30px_var(--color-spider-red-glow)]"
          >
            View Pricing
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border border-surface px-8 py-3.5 text-base font-semibold text-body transition-all hover:border-spider-red/40 hover:text-white"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
