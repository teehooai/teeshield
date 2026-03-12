const topServers = [
  { name: "github-mcp-server", grade: "B", score: "7.67", verified: true },
  { name: "filesystem-mcp-server", grade: "B", score: "7.50", verified: true },
  { name: "brave-search-mcp", grade: "B", score: "7.32", verified: true },
  { name: "postgres-mcp-server", grade: "B", score: "7.15", verified: true },
  { name: "sqlite-mcp-server", grade: "C", score: "6.84", verified: false },
];

function gradeColor(grade: string) {
  switch (grade) {
    case "A":
      return "text-safe-green border-safe-green/30 bg-safe-green/10";
    case "B":
      return "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
    case "C":
      return "text-warn-orange border-warn-orange/30 bg-warn-orange/10";
    case "D":
      return "text-orange-500 border-orange-500/30 bg-orange-500/10";
    default:
      return "text-spider-red border-spider-red/30 bg-spider-red/10";
  }
}

export function SpiderRatingSection() {
  return (
    <section className="border-t border-surface/30 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-web-blue/20 bg-card p-8 shadow-[0_0_60px_var(--color-web-blue-glow)] md:p-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 flex items-center justify-center gap-3 text-3xl font-bold text-white md:text-4xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/spider-logo.svg" alt="" width={40} height={40} className="h-10 w-10" />
              SpiderRating
            </h2>
            <p className="mb-2 text-base font-semibold tracking-wide text-web-blue">
              Security Index for the MCP Ecosystem
            </p>
            <p className="text-xl text-body">
              3,500+ MCP servers scanned with SpiderShield. Security scores, issue codes, and trust data.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="flex items-center rounded-xl border border-[var(--color-surface)] bg-[var(--color-background)] px-4 py-3 transition-all focus-within:border-[var(--color-spider-red)] focus-within:shadow-[0_0_0_3px_var(--color-spider-red-subtle)]">
              <svg
                className="mr-3 h-4 w-4 text-[var(--color-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search MCP servers..."
                className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-[var(--color-muted)]"
              />
            </div>
          </div>

          {/* Top rated preview */}
          <div className="mb-8">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              Top Rated
            </h4>
            <div className="space-y-2">
              {topServers.map((server, i) => (
                <div
                  key={server.name}
                  className="flex items-center gap-4 rounded-lg border border-surface/50 bg-background px-4 py-3 transition-all hover:border-surface"
                >
                  <span className="w-6 text-center text-xs font-medium text-[var(--color-muted)]">
                    #{i + 1}
                  </span>
                  <span className="flex-1 font-mono text-base text-white">
                    {server.name}
                  </span>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-xs font-bold ${gradeColor(server.grade)}`}
                  >
                    {server.grade}
                  </span>
                  <span className="w-10 text-right text-base font-medium text-white">
                    {server.score}
                  </span>
                  {server.verified && (
                    <span className="rounded-full bg-safe-green/10 px-2 py-0.5 text-[10px] font-medium text-safe-green">
                      Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://spiderrating.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-spider-red)] px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_25px_var(--color-spider-red-glow)] transition-all hover:bg-[var(--color-spider-red-hover)] hover:shadow-[0_0_40px_var(--color-spider-red-glow)]"
            >
              Explore SpiderRating &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
