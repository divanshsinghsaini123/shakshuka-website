import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shakshuka - Commit and complete",
    template: "%s | Shakshuka",
  },
  description: "Transform chaos into calm with Shakshuka - a mindful task management application featuring beautiful UI, daily planning, analytics, and encrypted local storage. Free, open-source productivity tool for Windows.",
  keywords: [
    "task management",
    "productivity app",
    "daily planner",
    "task tracker",
    "productivity tools",
    "task organization",
    "time management",
    "open source",
    "free task manager",
    "Windows task manager",
    "analytics dashboard",
    "encrypted storage",
  ],
  authors: [{ name: "Shakshuka Team" }],
  creator: "Shakshuka",
  publisher: "Shakshuka",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env['NEXT_PUBLIC_SITE_URL'] || "https://shakshuka.app",
    siteName: "Shakshuka",
    title: "Shakshuka - Commit and complete",
    description: "Transform chaos into calm with mindful task management. Beautiful UI, daily planning, analytics, and encrypted local storage.",
    images: [
      {
        url: "/icon.ico",
        width: 512,
        height: 512,
        alt: "Shakshuka Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shakshuka - Commit and complete",
    description: "Transform chaos into calm with mindful task management. Beautiful UI, daily planning, analytics, and encrypted local storage.",
    images: ["/icon.ico"],
    creator: "@shakshuka",
  },
  alternates: {
    canonical: process.env['NEXT_PUBLIC_SITE_URL'] || "https://shakshuka.app",
  },
  category: "productivity",
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] || "https://shakshuka.app"),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // Add verification codes if needed
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env['NEXT_PUBLIC_SITE_URL'] || "https://shakshuka.app";
  
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Shakshuka",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Windows",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Transform chaos into calm with mindful task management. Beautiful UI, daily planning, analytics, and encrypted local storage.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
    featureList: [
      "Task Management",
      "Daily Planner",
      "Data Security",
      "Auto-Start",
      "Analytics",
      "Beautiful UI",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shakshuka",
    url: siteUrl,
    description: "Transform chaos into calm with mindful task management",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shakshuka",
    url: siteUrl,
    logo: `${siteUrl}/icon.ico`,
    description: "Free, open-source task management application",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Structured Data - JSON-LD */}
        <Script
          id="software-application-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
