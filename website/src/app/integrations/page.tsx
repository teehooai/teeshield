import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Integrations — SpiderShield",
  description: "Connect SpiderShield with LangChain, OpenAI, CrewAI, AutoGen, and MCP servers.",
};

const integrations = [
  {
    name: "LangChain",
    desc: "Wrap LangChain tool calls with SpiderGuard for policy enforcement and DLP scanning.",
    status: "stable" as const,
    code: `from spidershield import SpiderGuard
from langchain.tools import Tool

guard = SpiderGuard(policy="balanced", dlp="redact")

# Wrap any LangChain tool
@guard.langchain_wrapper
def my_tool(query: str) -> str:
    return db.execute(query)`,
  },
  {
    name: "OpenAI Agents",
    desc: "Guard OpenAI function calls with pre/post execution checks and audit logging.",
    status: "stable" as const,
    code: `from spidershield import SpiderGuard

guard = SpiderGuard(policy="strict")

# Before function execution
result = guard.check(fn_name, fn_args)
if result.decision == Decision.ALLOW:
    output = execute_function(fn_name, fn_args)
    clean = guard.after_check(fn_name, output)`,
  },
  {
    name: "CrewAI",
    desc: "Add security guardrails to CrewAI agent crews with zero config changes.",
    status: "stable" as const,
    code: `from spidershield import SpiderGuard

guard = SpiderGuard(policy="balanced")

# Guard CrewAI tool execution
result = guard.check("search_web",
    {"query": user_input})
# Decision: ALLOW / DENY / ESCALATE`,
  },
  {
    name: "AutoGen",
    desc: "Intercept AutoGen agent tool calls with policy-based access control.",
    status: "stable" as const,
    code: `from spidershield import SpiderGuard

guard = SpiderGuard(policy="balanced")

# In your AutoGen agent's tool handler
def guarded_tool(name, args):
    check = guard.check(name, args)
    if check.decision == Decision.DENY:
        return f"Blocked: {check.reason}"
    return original_tool(name, args)`,
  },
  {
    name: "MCP Servers",
    desc: "Zero-code proxy mode for any MCP server. No SDK changes required.",
    status: "stable" as const,
    code: `# Wrap any MCP server with SpiderShield proxy
$ spidershield proxy \\
    --policy strict \\
    -- python my_mcp_server.py

# Or use guard mode for stdio servers
$ spidershield guard \\
    --preset balanced \\
    -- npx @modelcontextprotocol/server-filesystem /tmp`,
  },
  {
    name: "Claude Desktop",
    desc: "Add SpiderShield as an MCP proxy in your Claude Desktop config for automatic protection.",
    status: "beta" as const,
    code: `// claude_desktop_config.json
{
  "mcpServers": {
    "filesystem-guarded": {
      "command": "spidershield",
      "args": ["guard", "--preset", "balanced",
               "--", "npx",
               "@modelcontextprotocol/server-filesystem",
               "/home/user/safe-dir"]
    }
  }
}`,
  },
];

function statusBadge(status: "stable" | "beta" | "coming") {
  switch (status) {
    case "stable":
      return (
        <span className="rounded-full bg-safe-green/10 px-3 py-1 text-xs font-medium text-safe-green border border-safe-green/30">
          Stable
        </span>
      );
    case "beta":
      return (
        <span className="rounded-full bg-web-blue/10 px-3 py-1 text-xs font-medium text-web-blue border border-web-blue/30">
          Beta
        </span>
      );
    case "coming":
      return (
        <span className="rounded-full bg-warn-orange/10 px-3 py-1 text-xs font-medium text-warn-orange border border-warn-orange/30">
          Coming Soon
        </span>
      );
  }
}

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Integrations</h1>
          <p className="text-xl text-body">
            SpiderShield works with every major AI agent framework. Add security in minutes.
          </p>
        </div>

        {/* Integration cards */}
        <div className="space-y-8">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-xl border border-surface/50 bg-card overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-surface/30 px-6 py-4">
                <h2 className="text-xl font-bold text-white">{integration.name}</h2>
                {statusBadge(integration.status)}
              </div>
              <div className="grid md:grid-cols-2">
                <div className="flex flex-col justify-center p-6">
                  <p className="text-base text-body">{integration.desc}</p>
                </div>
                <div className="border-t border-surface/30 md:border-t-0 md:border-l">
                  <CodeBlock
                    code={integration.code}
                    language={integration.name === "MCP Servers" || integration.name === "Claude Desktop" ? "bash" : "python"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-body">
            Don&apos;t see your framework? SpiderShield&apos;s Python SDK works with any tool-calling agent.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/docs"
              className="rounded-lg bg-spider-red px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_var(--color-spider-red-glow)] transition-all hover:bg-spider-red-hover hover:shadow-[0_0_30px_var(--color-spider-red-glow)]"
            >
              Read the Docs
            </Link>
            <a
              href="https://github.com/teehooai/spidershield/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-surface px-8 py-3.5 text-base font-semibold text-body transition-all hover:border-spider-red/40 hover:text-white"
            >
              Request Integration
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
