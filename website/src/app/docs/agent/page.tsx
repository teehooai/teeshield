import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Agent Security — SpiderShield",
  description: "Config audit, skill scanning, toxic flow detection, and content pinning.",
};

const agentCheck = `# Audit an agent config file
$ spidershield agent-check ./agent-config.yaml

Agent Security Audit
━━━━━━━━━━━━━━━━━━━
Config:  ./agent-config.yaml
Skills:  12 registered
Flows:   3 toxic combinations detected

Findings:
  [TS-E001] CRITICAL  Skill "exec_shell" has unrestricted shell access
  [TS-E003] CRITICAL  Toxic flow: read_file + http_post (data exfiltration)
  [TS-W002] WARNING   Skill "fetch_url" allows arbitrary URL access
  [TS-W005] WARNING   No allowlist configured — all skills permitted

Score: 3.2 / 10.0  (Grade: D)`;

const pinning = `from spidershield.agent import pin_skills, verify_pins

# Pin current skill definitions (SHA-256 hash)
pin_skills("./agent-config.yaml", output="./skill-pins.json")

# Later — verify nothing changed (rug-pull detection)
changed = verify_pins("./agent-config.yaml", "./skill-pins.json")
if changed:
    print(f"ALERT: {len(changed)} skills modified since pinning!")
    for skill in changed:
        print(f"  {skill.name}: {skill.old_hash} → {skill.new_hash}")`;

const modules = [
  {
    name: "Config Audit",
    desc: "Analyzes agent configuration files for security misconfigurations: overly permissive settings, missing guardrails, insecure defaults.",
    code: "TS-C*",
  },
  {
    name: "Skill Scanner",
    desc: "Pattern matching against 20+ malicious skill patterns: shell injection, data exfiltration, credential theft, privilege escalation.",
    code: "TS-E*",
  },
  {
    name: "Toxic Flow Detection",
    desc: "Identifies dangerous capability combinations using keyword + AST analysis. Detects read+exfil, auth+impersonate, etc.",
    code: "TS-W*",
  },
  {
    name: "Content Pinning",
    desc: "SHA-256 hashing of skill definitions to detect rug-pull attacks — when previously approved skills are silently modified.",
    code: "TS-P*",
  },
];

export default function AgentPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4">
          <Link href="/docs" className="text-sm text-muted hover:text-spider-red transition-colors">
            &larr; Back to Docs
          </Link>
        </div>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Agent Security</h1>
          <p className="text-xl text-body">
            Security audit for agent configs, skills, toxic flows, and content pinning.
          </p>
        </div>

        {/* Modules */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Four Modules</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((mod) => (
              <div key={mod.name} className="rounded-xl border border-surface/50 bg-card p-6">
                <div className="mb-2 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{mod.name}</h3>
                  <code className="rounded bg-spider-red/10 px-2 py-0.5 font-mono text-xs text-spider-red">{mod.code}</code>
                </div>
                <p className="text-base text-body">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CLI usage */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Usage</h2>
          <CodeBlock code={agentCheck} language="bash" />
        </div>

        {/* Content pinning */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-white">Content Pinning</h2>
          <p className="mb-4 text-base text-body">
            Pin skill definitions with SHA-256 hashes. Detect silent modifications (rug-pull attacks) by verifying hashes later.
          </p>
          <CodeBlock code={pinning} language="python" />
        </div>

        {/* SARIF */}
        <div className="mb-12 rounded-xl border border-surface/50 bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">SARIF Output</h2>
          <p className="text-base text-body">
            Agent findings can be exported in SARIF format for integration with GitHub Code Scanning, VS Code, and other tools.
          </p>
          <div className="mt-4">
            <CodeBlock code="$ spidershield agent-check --format sarif ./agent-config.yaml > results.sarif" language="bash" />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between border-t border-surface/30 pt-8">
          <Link href="/docs/audit" className="text-base text-muted hover:text-spider-red transition-colors">
            &larr; Audit Logging
          </Link>
          <Link href="/docs" className="text-base text-spider-red hover:text-spider-red-hover transition-colors">
            All Docs &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
