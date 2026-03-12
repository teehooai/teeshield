"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const tabs = [
  {
    label: "Python",
    language: "python",
    code: `pip install spidershield

from spidershield import SpiderGuard, Decision

guard = SpiderGuard(policy="balanced", dlp="redact")

# Before tool execution
result = guard.check("execute_sql",
    {"query": "DROP TABLE users"})
assert result.decision == Decision.DENY

# After tool execution — scan output for secrets
clean = guard.after_check("read_file", raw_output)
# API keys automatically redacted`,
  },
  {
    label: "CLI",
    language: "bash",
    code: `# Guard mode — wrap any MCP server
$ spidershield guard --preset balanced -- npx @modelcontextprotocol/server-filesystem /tmp

# Scan mode — static security analysis
$ spidershield scan ./my-mcp-server

# Proxy mode — transparent interception
$ spidershield proxy --policy strict -- python my_mcp_server.py`,
  },
  {
    label: "MCP Proxy",
    language: "bash",
    code: `# Zero-code protection for any MCP server
$ spidershield proxy --policy strict -- python my_mcp_server.py

# All tool calls are intercepted and checked:
#   read_file("/etc/passwd")  → DENIED
#   exec("rm -rf /")          → DENIED
#   fetch("https://c2.evil")  → DENIED
#   read_file("./data.csv")   → ALLOWED`,
  },
];

const frameworks = [
  "LangChain",
  "OpenAI Agents",
  "CrewAI",
  "AutoGen",
  "MCP Servers",
];

export function CodeExampleSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="border-t border-surface/30 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Get started in 3 lines
          </h2>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-1 rounded-lg border border-[var(--color-surface)] bg-[var(--color-card)] p-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`flex-1 rounded-md px-4 py-2.5 text-base font-medium transition-all ${
                activeTab === i
                  ? "bg-[var(--color-spider-red)] text-white shadow-[0_0_15px_var(--color-spider-red-glow)]"
                  : "text-[var(--color-muted)] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code */}
        <CodeBlock
          code={tabs[activeTab].code}
          language={tabs[activeTab].language}
        />

        {/* Framework badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="text-base text-body">Works with:</span>
          {frameworks.map((fw) => (
            <span
              key={fw}
              className="rounded-full border border-surface/60 px-4 py-2 text-base text-body transition-colors hover:border-spider-red/40 hover:text-white"
            >
              {fw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
