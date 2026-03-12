import Link from "next/link";

const features = [
  {
    title: "Runtime Guard",
    description:
      "Enforce security policies on every agent tool call in real time.",
    items: [
      "Filesystem protection",
      "Shell command restrictions",
      "Network access control",
      "Database operation limits",
    ],
    cta: { label: "Learn more", href: "/docs/runtime-guard" },
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Data Protection",
    description:
      "Detect and redact secrets, PII, and prompt injection in tool outputs.",
    items: [
      "API keys & tokens",
      "Credit card numbers",
      "SSN & personal data",
      "Prompt injection patterns",
    ],
    cta: { label: "Learn more", href: "/docs/dlp" },
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Trust Intelligence",
    description:
      "Know which MCP servers are safe before you deploy them.",
    items: [
      "Security scores (A-F)",
      "46 issue code checks",
      "Trust graph analysis",
      "Dependency scanning",
    ],
    cta: { label: "SpiderRating", href: "https://spiderrating.com" },
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-surface bg-card p-8 transition-all duration-300 hover:border-spider-red/30 hover:shadow-[0_0_30px_var(--color-spider-red-subtle)]"
            >
              {/* Left red accent bar */}
              <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-[var(--color-spider-red)] opacity-60 transition-opacity group-hover:opacity-100" />

              <div className="mb-4 flex items-center gap-3 pl-4">
                <span className="text-[var(--color-spider-red)]">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>

              <p className="mb-6 pl-4 text-base leading-relaxed text-body">
                {feature.description}
              </p>

              <ul className="mb-6 space-y-2.5 pl-4">
                {feature.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-base text-body"
                  >
                    <span className="h-1 w-1 rounded-full bg-spider-red/60" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={feature.cta.href}
                className="pl-4 text-base font-medium text-[var(--color-spider-red)] transition-colors hover:text-[var(--color-spider-red-hover)]"
              >
                {feature.cta.label} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
