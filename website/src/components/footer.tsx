import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Runtime Guard", href: "/docs/runtime-guard" },
      { label: "DLP", href: "/docs/dlp" },
      { label: "Scanner", href: "/docs/cli" },
      { label: "Cloud", href: "/cloud" },
      { label: "SpiderRating", href: "https://spiderrating.com" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Quickstart", href: "/docs" },
      { label: "API Reference", href: "/docs" },
      { label: "Integrations", href: "/integrations" },
      { label: "CLI Reference", href: "/docs/cli" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:contact@spidershield.dev" },
      { label: "Security", href: "mailto:security@spidershield.dev" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/teehooai/spidershield" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface/30 bg-[#08080e]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top */}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/spider-logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[var(--color-spider-red)]">Spider</span>
                <span className="text-white">Shield</span>
              </span>
            </div>
            <p className="text-base text-[var(--color-muted)]">
              Runtime security for AI agents. Open source.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-base font-semibold text-white">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-[var(--color-muted)] transition-colors hover:text-[var(--color-spider-red)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-surface/30 pt-8">
          <p className="text-center text-sm text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} SpiderShield. Open source under MIT
            License.
          </p>
        </div>
      </div>
    </footer>
  );
}
