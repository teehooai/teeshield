import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "DLP Scanner — SpiderShield",
  description: "Detect and redact PII, secrets, and prompt injection in tool outputs.",
};

const basicUsage = `from spidershield import SpiderGuard

guard = SpiderGuard(policy="balanced", dlp="redact")

# Tool returns sensitive data
raw_output = """
User: John Smith
Email: john@example.com
SSN: 123-45-6789
API Key: sk-proj-abc123def456
"""

# DLP scans and redacts
clean = guard.after_check("read_database", raw_output)
# Output:
# User: John Smith
# Email: [EMAIL_REDACTED]
# SSN: [SSN_REDACTED]
# API Key: [API_KEY_REDACTED]`;

const modes = `# Log mode — detect and log, don't modify output
guard = SpiderGuard(dlp="log")

# Redact mode — replace sensitive data with placeholders
guard = SpiderGuard(dlp="redact")

# Block mode — reject the entire output if sensitive data found
guard = SpiderGuard(dlp="block")`;

const detectionTypes = [
  {
    category: "PII",
    patterns: ["Email addresses", "Phone numbers", "Social Security Numbers", "Credit card numbers", "Physical addresses", "Names (contextual)"],
  },
  {
    category: "Secrets",
    patterns: ["API keys (OpenAI, AWS, Stripe, etc.)", "OAuth tokens", "JWT tokens", "Database connection strings", "Private keys (RSA, SSH)", "Password patterns"],
  },
  {
    category: "Injection",
    patterns: ["Prompt injection attempts", "System prompt extraction", "Jailbreak patterns", "Instruction override attempts", "Role manipulation", "Context window attacks"],
  },
];

export default function DlpPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-4">
          <Link href="/docs" className="text-sm text-muted hover:text-spider-red transition-colors">
            &larr; Back to Docs
          </Link>
        </div>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">DLP Scanner</h1>
          <p className="text-xl text-body">
            Detect and redact PII, API keys, secrets, and prompt injection in tool outputs.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-spider-red/10 text-sm font-bold text-spider-red">1</span>
              <div>
                <h3 className="text-base font-semibold text-white">Tool executes</h3>
                <p className="text-base text-body">The tool runs and produces output (file contents, database rows, API responses).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-spider-red/10 text-sm font-bold text-spider-red">2</span>
              <div>
                <h3 className="text-base font-semibold text-white">DLP scans output</h3>
                <p className="text-base text-body">Pattern matching detects PII, secrets, and injection attempts in the raw output.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-spider-red/10 text-sm font-bold text-spider-red">3</span>
              <div>
                <h3 className="text-base font-semibold text-white">Action taken</h3>
                <p className="text-base text-body">Based on DLP mode: log the finding, redact the sensitive data, or block the entire output.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Usage</h2>
          <CodeBlock code={basicUsage} language="python" />
        </div>

        {/* Modes */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">DLP Modes</h2>
          <CodeBlock code={modes} language="python" />
        </div>

        {/* Detection types */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">What We Detect</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {detectionTypes.map((type) => (
              <div key={type.category} className="rounded-xl border border-surface/50 bg-card p-6">
                <h3 className="mb-4 text-lg font-bold text-spider-red">{type.category}</h3>
                <ul className="space-y-2">
                  {type.patterns.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-base text-body">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spider-red/60" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between border-t border-surface/30 pt-8">
          <Link href="/docs/runtime-guard" className="text-base text-muted hover:text-spider-red transition-colors">
            &larr; Runtime Guard
          </Link>
          <Link href="/docs/cli" className="text-base text-spider-red hover:text-spider-red-hover transition-colors">
            CLI Reference &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
