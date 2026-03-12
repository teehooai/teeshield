import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — SpiderShield",
  description: "Security research, product updates, and MCP ecosystem insights.",
};

const posts = [
  {
    title: "Introducing SpiderShield v0.3: Runtime Guard for AI Agents",
    excerpt: "The first open-source runtime security layer for MCP tool calls. Policy enforcement, DLP scanning, and audit logging — all in one SDK.",
    date: "2026-03-08",
    tag: "Release",
    tagClasses: "border-spider-red/30 bg-spider-red/10 text-spider-red",
  },
  {
    title: "Why MCP Servers Need Security Guardrails",
    excerpt: "MCP gives AI agents access to real-world tools. Without guardrails, a single prompt injection can lead to data exfiltration, destructive operations, or credential theft.",
    date: "2026-03-05",
    tag: "Research",
    tagClasses: "border-web-blue/30 bg-web-blue/10 text-web-blue",
  },
  {
    title: "SpiderRating: Security Scores for 3,500+ MCP Servers",
    excerpt: "We scanned the entire MCP ecosystem and graded every server. Here's what we found — and why 40% of servers have critical security issues.",
    date: "2026-03-01",
    tag: "Data",
    tagClasses: "border-safe-green/30 bg-safe-green/10 text-safe-green",
  },
  {
    title: "The Anatomy of a Tool Poisoning Attack",
    excerpt: "How attackers can embed malicious instructions in MCP tool descriptions to hijack agent behavior, and how SpiderShield detects it.",
    date: "2026-02-25",
    tag: "Research",
    tagClasses: "border-web-blue/30 bg-web-blue/10 text-web-blue",
  },
  {
    title: "Building a Data Flywheel for Agent Security",
    excerpt: "How SpiderShield's local-first telemetry feeds back into better security patterns — without sending your data to the cloud.",
    date: "2026-02-20",
    tag: "Engineering",
    tagClasses: "border-warn-orange/30 bg-warn-orange/10 text-warn-orange",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Blog</h1>
          <p className="text-xl text-body">
            Security research, product updates, and MCP ecosystem insights.
          </p>
        </div>

        {/* Featured post */}
        <div className="mb-12">
          <div className="rounded-xl border border-surface/50 bg-card p-8">
            <div className="mb-3 flex items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${posts[0].tagClasses}`}>
                {posts[0].tag}
              </span>
              <span className="text-sm text-muted">{formatDate(posts[0].date)}</span>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              {posts[0].title}
            </h2>
            <p className="text-lg text-body">{posts[0].excerpt}</p>
            <span className="mt-4 inline-block text-base font-medium text-spider-red">
              Coming soon
            </span>
          </div>
        </div>

        {/* Post list */}
        <div className="space-y-6">
          {posts.slice(1).map((post) => (
            <div
              key={post.title}
              className="flex flex-col gap-4 rounded-xl border border-surface/50 bg-card p-6 md:flex-row md:items-center"
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${post.tagClasses}`}>
                    {post.tag}
                  </span>
                  <span className="text-sm text-muted">{formatDate(post.date)}</span>
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {post.title}
                </h3>
                <p className="text-base text-body">{post.excerpt}</p>
              </div>
              <span className="shrink-0 text-sm text-muted">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-xl border border-spider-red/20 bg-spider-red/5 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-white">Stay Updated</h2>
          <p className="mb-6 text-base text-body">
            Get notified about new security research and product updates.
          </p>
          <div className="mx-auto flex max-w-md gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-surface bg-background px-4 py-3 text-base text-white outline-none placeholder:text-muted focus:border-spider-red focus:shadow-[0_0_0_3px_var(--color-spider-red-subtle)]"
            />
            <button className="shrink-0 rounded-lg bg-spider-red px-6 py-3 text-base font-semibold text-white transition-all hover:bg-spider-red-hover">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
