export function ArchitectureSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Where SpiderShield fits
          </h2>
          <p className="text-xl text-body">
            Policy enforcement before every tool execution.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="mx-auto max-w-md">
          {/* Agent Framework */}
          <div className="mb-2 rounded-xl border border-[var(--color-surface)] bg-[var(--color-card)] px-6 py-4 text-center">
            <span className="text-base font-semibold text-white">
              AI Agent Framework
            </span>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              LangChain / OpenAI / CrewAI / AutoGen
            </p>
          </div>

          {/* Connection line */}
          <div className="mx-auto flex h-8 w-px flex-col items-center justify-center">
            <div className="h-full w-px bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-web-blue)]" />
            <svg className="h-2 w-2 text-[var(--color-web-blue)]" viewBox="0 0 8 8">
              <polygon points="4,8 0,0 8,0" fill="currentColor" />
            </svg>
          </div>

          {/* SpiderShield Guard */}
          <div className="mb-2 rounded-xl border-2 border-spider-red/40 bg-card p-6 shadow-[0_0_40px_var(--color-spider-red-subtle)]">
            <div className="mb-4 text-center">
              <span className="flex items-center justify-center gap-2 text-xl font-bold text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/spider-logo.svg" alt="" width={28} height={28} className="h-7 w-7" />
                SpiderShield Guard
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Policy Engine", desc: "ALLOW / DENY / ESCALATE" },
                { name: "DLP Scanner", desc: "PII, Secrets, Injection" },
                { name: "Audit Logger", desc: "JSONL, queryable" },
              ].map((mod) => (
                <div
                  key={mod.name}
                  className="rounded-lg border border-[var(--color-surface)] bg-[var(--color-background)] p-3 text-center"
                >
                  <span className="block text-base font-semibold text-spider-red">
                    {mod.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {mod.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Connection line */}
          <div className="mx-auto flex h-8 w-px flex-col items-center justify-center">
            <div className="h-full w-px bg-gradient-to-b from-[var(--color-web-blue)] to-[var(--color-surface)]" />
            <svg className="h-2 w-2 text-[var(--color-surface)]" viewBox="0 0 8 8">
              <polygon points="4,8 0,0 8,0" fill="currentColor" />
            </svg>
          </div>

          {/* Tool Execution */}
          <div className="rounded-xl border border-[var(--color-surface)] bg-[var(--color-card)] px-6 py-4 text-center">
            <span className="text-base font-semibold text-white">
              Tool Execution
            </span>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              MCP Servers / APIs / Shell / Filesystem
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
