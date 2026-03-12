const stats = [
  { value: "46", label: "Security Rules" },
  { value: "647", label: "Tests Passing" },
  { value: "3,500+", label: "Servers Rated" },
  { value: "MIT", label: "License" },
];

const testimonials = [
  {
    quote:
      "SpiderShield catches issues that generic guardrails completely miss.",
    author: "@security_dev",
  },
  {
    quote:
      "Finally a tool that scans MCP source code, not just metadata.",
    author: "@mcp_builder",
  },
  {
    quote:
      "We blocked 3 prompt injection attempts in the first week.",
    author: "@ai_team_lead",
  },
];

export function StatsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Stats grid */}
        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-[var(--color-spider-red)] md:text-5xl">
                {stat.value}
              </div>
              <div className="text-base text-[var(--color-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* What People Say */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">What People Say</h3>
          <span className="text-sm text-[var(--color-spider-red)]">
            View all &rarr;
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="group relative rounded-xl border border-[var(--color-surface)] bg-[var(--color-card)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--color-spider-red-subtle)]"
            >
              {/* Left red accent */}
              <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[var(--color-spider-red)] opacity-60 transition-opacity group-hover:opacity-100" />

              <p className="mb-4 pl-4 text-base italic text-[var(--color-body)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="pl-4 text-base font-medium text-[var(--color-spider-red)]">
                {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
