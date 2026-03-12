import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — SpiderShield",
  description: "SpiderShield pricing: free SDK, Pro, Business, and Enterprise plans.",
};

const tiers = [
  {
    name: "Open Source",
    price: "Free",
    period: "forever",
    desc: "Full runtime guard SDK. No feature limits. No usage limits.",
    features: [
      "Runtime Guard SDK (ALLOW / DENY / ESCALATE)",
      "Policy engine + 3 presets",
      "DLP scanning (PII, secrets, injection)",
      "Local JSONL audit logs",
      "Full CLI (scan, guard, proxy, rewrite, harden)",
      "Agent security audit",
      "Static analysis (46 issue codes)",
      "MCP proxy mode",
      "Community support via GitHub",
    ],
    cta: "Get Started",
    ctaHref: "/docs",
    highlight: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/agent/month",
    desc: "Cloud dashboard and telemetry for individual developers and small teams.",
    features: [
      "Everything in Open Source",
      "Cloud audit log storage (90-day retention)",
      "Security dashboard (activity, blocks, risk trends)",
      "Visual policy editor",
      "Alert rules & webhooks",
      "Basic Trust Registry API (24h delay)",
      "Up to 10 agents",
      "Self-serve signup, no sales call",
      "Email support",
    ],
    cta: "Join Waitlist",
    ctaHref: "#",
    highlight: false,
    badge: null,
  },
  {
    name: "Business",
    price: "$399",
    period: "/month",
    desc: "Team management, advanced policies, real-time trust data. Includes 20 agents.",
    features: [
      "Everything in Pro",
      "20 agents included ($29/additional agent)",
      "Team management (up to 25 seats)",
      "Org-wide policy distribution",
      "Policy versioning + rollback + canary rollout",
      "Real-time Trust Registry API",
      "Threat intelligence feed",
      "Custom trust policies (\"block all < grade B\")",
      "1-year audit retention",
      "Priority support (< 4h response)",
    ],
    cta: "Join Waitlist",
    ctaHref: "#",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$1,499+",
    period: "/month (annual)",
    desc: "Org-wide governance, compliance, SIEM, and security intelligence.",
    features: [
      "Everything in Business",
      "Unlimited seats & agents",
      "RBAC + per-team / per-agent / per-env policies",
      "SSO (SAML, OIDC)",
      "SIEM integration (Splunk, Datadog, QRadar, Elastic)",
      "Slack / PagerDuty / Jira alerting",
      "SOC 2 compliance reports (PDF/CSV)",
      "Data residency (EU / US / APAC)",
      "Dedicated account manager",
      "SLA guarantees (99.9%)",
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:hello@spidershield.dev",
    highlight: false,
    badge: null,
  },
];

const comparisons: {
  feature: string;
  free: boolean | string;
  pro: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}[] = [
  { feature: "Runtime Guard SDK", free: true, pro: true, business: true, enterprise: true },
  { feature: "Policy engine (3 presets)", free: true, pro: true, business: true, enterprise: true },
  { feature: "DLP scanning", free: true, pro: true, business: true, enterprise: true },
  { feature: "Agents", free: "Unlimited (local)", pro: "Up to 10", business: "20 included", enterprise: "Unlimited" },
  { feature: "Seats", free: "1", pro: "3", business: "Up to 25", enterprise: "Unlimited" },
  { feature: "Audit retention", free: "Local JSONL", pro: "Cloud (90 days)", business: "Cloud (1 year)", enterprise: "Cloud + SIEM (unlimited)" },
  { feature: "Policy authoring", free: "YAML files", pro: "Visual editor", business: "Visual + org-wide push", enterprise: "Visual + org-wide + RBAC" },
  { feature: "Policy versioning", free: false, pro: false, business: true, enterprise: true },
  { feature: "Canary rollout", free: false, pro: false, business: true, enterprise: true },
  { feature: "Security dashboard", free: false, pro: true, business: true, enterprise: true },
  { feature: "Trust Registry API", free: false, pro: "Basic (24h delay)", business: "Real-time", enterprise: "Real-time + threat feed" },
  { feature: "Custom trust policies", free: false, pro: false, business: true, enterprise: true },
  { feature: "Threat intelligence feed", free: false, pro: false, business: true, enterprise: true },
  { feature: "RBAC", free: false, pro: false, business: false, enterprise: true },
  { feature: "SSO (SAML/OIDC)", free: false, pro: false, business: false, enterprise: true },
  { feature: "SIEM integration", free: false, pro: false, business: false, enterprise: true },
  { feature: "Compliance reports", free: false, pro: false, business: false, enterprise: true },
  { feature: "Data residency", free: false, pro: false, business: false, enterprise: "EU/US/APAC" },
  { feature: "Support", free: "Community", pro: "Email", business: "Priority", enterprise: "Dedicated AM + SLA" },
];

function renderCell(value: boolean | string) {
  if (value === true) return <span className="text-safe-green">&#10003;</span>;
  if (value === false) return <span className="text-muted">&mdash;</span>;
  return <span className="text-body text-sm">{value}</span>;
}

const faqs = [
  {
    q: "Is the open-source SDK really free forever?",
    a: "Yes. The SDK has no feature limits, no usage limits, and no time limits. It's MIT-licensed. We make money from Cloud telemetry and management, not the runtime itself.",
  },
  {
    q: "What counts as an 'agent'?",
    a: "Each unique agent identity sending telemetry to SpiderShield Cloud. Local SDK usage is completely unlimited — you can run thousands of agents locally for free.",
  },
  {
    q: "What's the difference between Pro and Business?",
    a: "Pro is for individual developers with a few agents. Business adds team management, org-wide policies, real-time Trust Registry, and threat intelligence — designed for teams running agents in production.",
  },
  {
    q: "Why not charge per API call?",
    a: "Per-agent pricing is more predictable. We don't want security tools to be turned off because of unexpected bills.",
  },
  {
    q: "Can I self-host everything?",
    a: "The SDK runs entirely locally — zero network calls. Cloud features (dashboard, centralized logs, trust API) require SpiderShield Cloud.",
  },
  {
    q: "What's the Trust Registry?",
    a: "A reputation database for 3,500+ MCP servers powered by SpiderRating. Pro gets basic lookups with 24h delay. Business gets real-time data + threat intelligence. Enterprise adds custom trust policies.",
  },
  {
    q: "Do you offer startup or academic discounts?",
    a: "Yes. Contact us at hello@spidershield.dev for special pricing.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Pricing</h1>
          <p className="mx-auto max-w-2xl text-xl text-body">
            SDK is free forever. Cloud adds visibility. Business adds team intelligence. Enterprise adds governance.
          </p>
        </div>

        {/* Tiers */}
        <div className="mb-20 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl border p-7 ${
                tier.highlight
                  ? "border-spider-red/40 bg-card shadow-[0_0_40px_var(--color-spider-red-subtle)]"
                  : "border-surface/50 bg-card"
              }`}
            >
              {tier.badge && (
                <div className="mb-4 -mt-2 text-center">
                  <span className="rounded-full bg-spider-red/10 px-3 py-1 text-xs font-medium text-spider-red border border-spider-red/30">
                    {tier.badge}
                  </span>
                </div>
              )}
              <h2 className="mb-1 text-lg font-bold text-white">{tier.name}</h2>
              <div className="mb-3">
                <span className="text-3xl font-bold text-white">{tier.price}</span>
                {tier.period && <span className="text-sm text-muted"> {tier.period}</span>}
              </div>
              <p className="mb-5 text-sm text-body">{tier.desc}</p>
              <ul className="mb-7 flex-1 space-y-2.5">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-body">
                    <span className="mt-0.5 shrink-0 text-safe-green">&#10003;</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.ctaHref}
                className={`block rounded-lg px-5 py-3 text-center text-base font-semibold transition-all ${
                  tier.highlight
                    ? "bg-spider-red text-white shadow-[0_0_20px_var(--color-spider-red-glow)] hover:bg-spider-red-hover hover:shadow-[0_0_30px_var(--color-spider-red-glow)]"
                    : "border border-surface text-body hover:border-spider-red/40 hover:text-white"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-surface/50">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-surface/30 bg-card">
                  <th className="px-5 py-4 text-sm font-semibold text-white">Feature</th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-white">Free</th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-white">Pro</th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-spider-red">Business</th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface/20">
                {comparisons.map((row) => (
                  <tr key={row.feature} className="bg-card/50 hover:bg-card transition-colors">
                    <td className="px-5 py-3 text-sm text-body">{row.feature}</td>
                    <td className="px-5 py-3 text-center">{renderCell(row.free)}</td>
                    <td className="px-5 py-3 text-center">{renderCell(row.pro)}</td>
                    <td className="px-5 py-3 text-center">{renderCell(row.business)}</td>
                    <td className="px-5 py-3 text-center">{renderCell(row.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing principles */}
        <div className="mb-20 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Pricing Principles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">SDK free forever</h3>
              <p className="text-sm text-body">No feature limits, no usage limits. Security tools must be open and auditable.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">Per-agent billing</h3>
              <p className="text-sm text-body">Predictable costs. No surprise bills from API call volume spikes.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">Self-serve Pro & Business</h3>
              <p className="text-sm text-body">Sign up with a credit card. No sales calls required.</p>
            </div>
            <div>
              <h3 className="mb-2 text-base font-semibold text-spider-red">Enterprise by contract</h3>
              <p className="text-sm text-body">Annual contracts with dedicated support, custom SLA, and data residency.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold text-white text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-surface/50 bg-card px-6 py-5">
                <h3 className="mb-2 text-base font-semibold text-white">{faq.q}</h3>
                <p className="text-base text-body">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
