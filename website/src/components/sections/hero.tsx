import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

const heroCode = `from spidershield import SpiderGuard, Decision

guard = SpiderGuard(policy="balanced")

# Agent attempts a dangerous command
result = guard.check("execute_shell", {
    "command": "rm -rf /"
})
# result.decision == Decision.DENY
# result.reason == "Destructive command blocked"`;

const frameworks = [
  "LangChain",
  "OpenAI Agents",
  "CrewAI",
  "AutoGen",
  "MCP Servers",
];

export function HeroSection() {
  return (
    <section className="spider-web-bg relative overflow-hidden pt-40 pb-20">
      {/* Red glow behind spider */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[var(--color-spider-red)] opacity-[0.04] blur-[100px]" />
      {/* Blue web glow */}
      <div className="pointer-events-none absolute top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[var(--color-web-blue)] opacity-[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Spider mascot */}
        <div className="animate-float mx-auto mb-8 w-32 h-32 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/spider-mascot.svg"
            alt="SpiderShield mascot"
            width={128}
            height={128}
            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(255,64,64,0.4)]"
          />
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-up mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Secure your AI agents.
        </h1>

        {/* Red subheadline */}
        <p className="animate-fade-up-delay-1 mb-6 text-base font-semibold tracking-wide text-spider-red">
          Runtime security for agent tool execution
        </p>

        {/* Description */}
        <p className="animate-fade-up-delay-2 mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-body">
          Intercept every tool call before it runs.
          <br />
          Block dangerous filesystem, shell, network, and database access.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-2 mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-spider-red px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_25px_var(--color-spider-red-glow)] transition-all hover:bg-spider-red-hover hover:shadow-[0_0_40px_var(--color-spider-red-glow)]"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/teehooai/spidershield"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-spider-red/40 px-8 py-3.5 text-base font-semibold text-spider-red transition-all hover:border-spider-red hover:bg-spider-red-subtle"
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Open source badge */}
        <p className="animate-fade-up-delay-2 mb-12 text-base text-muted">
          Open source. MIT licensed.
        </p>

        {/* Code block */}
        <div className="animate-fade-up-delay-3 mx-auto max-w-2xl">
          <CodeBlock code={heroCode} language="python" />
        </div>

        {/* Framework logos */}
        <div className="mt-12 flex flex-nowrap items-center justify-center gap-3">
          <span className="shrink-0 text-base text-body">Works with:</span>
          {frameworks.map((fw) => (
            <span
              key={fw}
              className="shrink-0 rounded-full border border-surface/60 px-3.5 py-1.5 text-sm text-body transition-colors hover:border-spider-red/40 hover:text-white"
            >
              {fw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
