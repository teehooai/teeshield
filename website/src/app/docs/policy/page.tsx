import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Policy Engine — SpiderShield",
  description: "YAML-based security policies for AI agent tool calls.",
};

const customPolicy = `# my-policy.yaml
name: "production-api-guard"
version: "1.0"

rules:
  # Block all shell commands
  - name: no-shell
    tool: "run_command|execute_shell|bash"
    pattern: ".*"
    match_on: "tool_name"
    decision: DENY
    reason: "Shell access is disabled in production"

  # Allow read-only SQL, block mutations
  - name: sql-readonly
    tool: "execute_sql"
    pattern: "INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|CREATE"
    match_on: "arguments.query"
    decision: DENY
    reason: "Only SELECT queries are allowed"

  # Escalate file access outside safe directory
  - name: safe-directory
    tool: "read_file|write_file"
    pattern: "^(?!/app/data/)"
    match_on: "arguments.path"
    decision: ESCALATE
    reason: "File access outside /app/data/ requires approval"

  # Allow everything else
  - name: default-allow
    tool: ".*"
    pattern: ".*"
    match_on: "tool_name"
    decision: ALLOW`;

const validateExample = `# Validate your custom policy
$ spidershield policy validate ./my-policy.yaml
✓ Policy "production-api-guard" is valid (4 rules)

# List built-in presets
$ spidershield policy list
  permissive  — Log only, no blocking
  balanced    — Block dangerous, escalate writes
  strict      — Deny by default, allowlist only

# Show preset rules
$ spidershield policy show balanced`;

export default function PolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4">
          <Link href="/docs" className="text-sm text-muted hover:text-spider-red transition-colors">
            &larr; Back to Docs
          </Link>
        </div>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Policy Engine</h1>
          <p className="text-xl text-body">
            YAML-based security policies with pattern matching on tool names and arguments.
          </p>
        </div>

        {/* Rule anatomy */}
        <div className="mb-12 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Rule Anatomy</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { field: "name", desc: "Human-readable rule identifier" },
              { field: "tool", desc: "Regex matching tool name(s)" },
              { field: "pattern", desc: "Regex matching the target field" },
              { field: "match_on", desc: 'What to match: "tool_name" or "arguments.<field>"' },
              { field: "decision", desc: "ALLOW, DENY, or ESCALATE" },
              { field: "reason", desc: "Message returned to the agent on DENY/ESCALATE" },
            ].map((item) => (
              <div key={item.field} className="flex items-start gap-3">
                <code className="shrink-0 rounded bg-background px-2 py-1 font-mono text-sm text-spider-red">
                  {item.field}
                </code>
                <span className="text-base text-body">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom policy */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Custom Policy Example</h2>
          <CodeBlock code={customPolicy} language="yaml" />
        </div>

        {/* CLI */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Policy CLI</h2>
          <CodeBlock code={validateExample} language="bash" />
        </div>

        {/* Evaluation order */}
        <div className="mb-12 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Evaluation Order</h2>
          <p className="mb-4 text-base text-body">
            Rules are evaluated top-to-bottom. The first matching rule wins.
          </p>
          <ol className="space-y-3">
            {[
              "Each tool call is checked against rules in order",
              "First rule where both tool and pattern match is applied",
              "If no rule matches, the default decision is ALLOW",
              "DENY rules should come before ALLOW rules for safety",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-body">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-spider-red/10 text-xs font-bold text-spider-red">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between border-t border-surface/30 pt-8">
          <Link href="/docs/cli" className="text-base text-muted hover:text-spider-red transition-colors">
            &larr; CLI Reference
          </Link>
          <Link href="/docs/audit" className="text-base text-spider-red hover:text-spider-red-hover transition-colors">
            Audit Logging &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
