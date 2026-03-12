import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SpiderShield",
  description: "SpiderShield privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-4">
          <Link href="/" className="text-sm text-muted hover:text-spider-red transition-colors">
            &larr; Home
          </Link>
        </div>

        <h1 className="mb-4 text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="mb-12 text-base text-muted">Last updated: March 10, 2026</p>

        <div className="prose-spidershield space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">Overview</h2>
            <p className="text-base text-body leading-relaxed">
              SpiderShield is built with a local-first architecture. The open-source SDK processes all data locally on your machine. No scan results, tool calls, or audit logs are sent to our servers unless you explicitly opt in to SpiderShield Cloud.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">Data We Collect</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-surface/50 bg-card px-6 py-4">
                <h3 className="mb-1 text-base font-semibold text-white">Open-Source SDK</h3>
                <p className="text-base text-body">
                  <span className="font-semibold text-safe-green">No data collected.</span> All processing is local. Scan results, audit logs, and guard decisions stay on your machine in SQLite and JSONL files.
                </p>
              </div>
              <div className="rounded-lg border border-surface/50 bg-card px-6 py-4">
                <h3 className="mb-1 text-base font-semibold text-white">SpiderShield Cloud (opt-in)</h3>
                <p className="text-base text-body">
                  If you opt in, we collect: anonymized telemetry (tool call counts, decision distributions), account information (email, team name), and policy configurations. We never collect tool arguments, outputs, or raw audit data.
                </p>
              </div>
              <div className="rounded-lg border border-surface/50 bg-card px-6 py-4">
                <h3 className="mb-1 text-base font-semibold text-white">Website</h3>
                <p className="text-base text-body">
                  Basic analytics (page views, referrers) via privacy-respecting analytics. No cookies, no tracking pixels, no third-party ad networks.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">Data Storage</h2>
            <p className="text-base text-body leading-relaxed">
              SDK data is stored locally at <code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm text-spider-red">~/.spidershield/</code>. Cloud data is stored in encrypted databases in the EU (Frankfurt). We do not sell, share, or monetize your data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">Your Rights</h2>
            <p className="text-base text-body leading-relaxed">
              You can delete all local data by removing the <code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm text-spider-red">~/.spidershield/</code> directory. For Cloud accounts, you can export or delete your data at any time from the dashboard, or by emailing{" "}
              <a href="mailto:privacy@spidershield.dev" className="text-spider-red hover:text-spider-red-hover transition-colors">
                privacy@spidershield.dev
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">Third-Party Services</h2>
            <p className="text-base text-body leading-relaxed">
              The LLM rewrite feature (<code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm text-spider-red">spidershield rewrite</code>) sends tool descriptions to your configured LLM provider (Anthropic, OpenAI, or Google). This is user-initiated and uses your own API key. We do not proxy or store these requests.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">Contact</h2>
            <p className="text-base text-body leading-relaxed">
              For privacy questions, email{" "}
              <a href="mailto:privacy@spidershield.dev" className="text-spider-red hover:text-spider-red-hover transition-colors">
                privacy@spidershield.dev
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
