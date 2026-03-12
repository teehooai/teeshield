const comparisons = [
  {
    attack: "Agent calls rm -rf /",
    without: "Executed. System destroyed.",
    with: "DENIED: destructive command blocked",
  },
  {
    attack: "Agent reads /etc/passwd",
    without: "File contents leaked.",
    with: "DENIED: system file access blocked",
  },
  {
    attack: "Agent sends data to C2 server",
    without: "Data exfiltrated silently.",
    with: "DENIED: suspicious network target",
  },
  {
    attack: "Tool output contains API keys",
    without: "Keys exposed in response.",
    with: "REDACTED: secret pattern detected",
  },
  {
    attack: "Agent installs untrusted MCP server",
    without: "Arbitrary code runs unchecked.",
    with: "DENIED: unverified MCP server",
  },
];

export function WhySection() {
  return (
    <section className="border-t border-surface/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Why generic guardrails aren&apos;t enough
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-body">
            LLM guardrails protect prompts.{" "}
            <span className="font-semibold text-white">
              SpiderShield protects tool execution.
            </span>
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-surface bg-card">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-surface px-6 py-4 text-sm font-semibold uppercase tracking-wider">
            <span className="text-muted">Attack</span>
            <span className="text-muted">Without SpiderShield</span>
            <span className="text-spider-red">With SpiderShield</span>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-b border-surface/50 px-6 py-5 text-base transition-colors last:border-b-0 hover:bg-elevated"
            >
              <span className="text-base font-medium text-body">
                {row.attack}
              </span>
              <span className="text-muted">{row.without}</span>
              <span className="font-semibold text-safe-green">
                {row.with}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
