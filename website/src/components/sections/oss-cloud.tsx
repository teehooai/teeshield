import Link from "next/link";

export function OpenSourceCloudSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Open Source card */}
          <div className="group relative rounded-2xl border border-surface bg-card p-8 transition-all duration-300 hover:border-spider-red/30">
            {/* Left red accent */}
            <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-[var(--color-spider-red)]" />

            <div className="pl-4">
              <h3 className="mb-2 text-2xl font-bold text-white">
                Open Source
              </h3>
              <p className="mb-6 text-lg text-[var(--color-body)]">
                SpiderShield is fully open source. MIT license.
              </p>

              <ul className="mb-8 space-y-3">
                {[
                  "Runtime guard",
                  "Security scanner (46 rules)",
                  "Policy engine (3 presets)",
                  "DLP scanner",
                  "CLI tools",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base text-[var(--color-body)]"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-[var(--color-safe-green)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://github.com/teehooai/spidershield"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-spider-red/40 px-6 py-3 text-base font-semibold text-spider-red transition-all hover:border-spider-red hover:bg-spider-red-subtle"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Cloud card */}
          <div className="group relative overflow-hidden rounded-2xl border border-spider-red/20 bg-card p-8 shadow-[0_0_40px_var(--color-spider-red-subtle)] transition-all duration-300 hover:border-spider-red/40 hover:shadow-[0_0_60px_var(--color-spider-red-subtle)]">
            {/* Gradient glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--color-spider-red)] opacity-[0.06] blur-[60px]" />

            <div className="relative">
              <div className="mb-2 inline-block rounded-full bg-[var(--color-spider-red)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Coming Soon
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">
                SpiderShield Cloud
              </h3>
              <p className="mb-6 text-lg text-body">
                Enterprise security for AI agents. Know who executed what tool, when, and why.
              </p>

              <ul className="mb-8 space-y-3">
                {[
                  "Security telemetry & dashboards",
                  "Central policy control",
                  "Audit logs & compliance",
                  "Incident investigation",
                  "Team RBAC & SSO",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-base text-[var(--color-body)]"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-[var(--color-spider-red)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/cloud"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-spider-red)] px-6 py-3 text-base font-semibold text-white shadow-[0_0_20px_var(--color-spider-red-glow)] transition-all hover:bg-[var(--color-spider-red-hover)] hover:shadow-[0_0_30px_var(--color-spider-red-glow)]"
              >
                Request Early Access &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
