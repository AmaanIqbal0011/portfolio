import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manho.dev"),
  title: {
    default: "Manho — AI Agent Developer | AI SaaS & Agentic AI",
    template: "%s | Manho",
  },
  description:
    "AI Agent Developer building intelligent AI agents, AI employees, automation systems, and production-ready AI SaaS products.",
  keywords: [
    "AI Agent Developer",
    "AI SaaS",
    "Agentic AI",
    "AI Automation",
    "Full-Stack Developer",
    "Next.js",
    "Python",
    "OpenAI",
  ],
  authors: [{ name: "Manho" }],
  creator: "Manho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manho.dev",
    siteName: "Manho — AI Agent Developer",
    title: "Manho — AI Agent Developer | AI SaaS & Agentic AI",
    description:
      "AI Agent Developer building intelligent AI agents, AI employees, automation systems, and production-ready AI SaaS products.",
    images: [
      {
        url: "/me1.png",
        width: 1200,
        height: 630,
        alt: "Manho — AI Agent Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manho — AI Agent Developer | AI SaaS & Agentic AI",
    description:
      "AI Agent Developer building intelligent AI agents, AI employees, automation systems, and production-ready AI SaaS products.",
    images: ["/me1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manho",
    jobTitle: "AI Agent Developer",
    description:
      "AI Agent Developer building intelligent AI agents, AI employees, automation systems, and production-ready AI SaaS products.",
    url: "https://manho.dev",
    sameAs: ["https://github.com/AmaanIqbal0011", "https://www.linkedin.com/in/amaniqbal0011/"],
    knowsAbout: [
      "AI Agents",
      "Agentic AI",
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "OpenAI Agent SDK",
      "SaaS Development",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
