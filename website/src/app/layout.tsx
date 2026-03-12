import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SpiderShield — Secure your AI agents",
  description:
    "Runtime security layer for AI agent tool calls. Prevent dangerous filesystem, shell, and API access. Open source.",
  keywords: [
    "AI agent security",
    "MCP security",
    "tool call protection",
    "runtime guard",
    "prompt injection",
    "SpiderShield",
  ],
  openGraph: {
    title: "SpiderShield — Secure your AI agents",
    description:
      "Runtime security layer for AI agent tool calls. Open source.",
    type: "website",
    url: "https://spidershield.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpiderShield — Secure your AI agents",
    description:
      "Runtime security layer for AI agent tool calls. Open source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
