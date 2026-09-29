import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { seo, business } from "@/content/site-config";

export const metadata: Metadata = {
  title: {
    default: seo.defaultTitle,
    template: `%s | ${seo.siteName}`,
  },
  description: seo.defaultDescription,
  metadataBase: new URL(seo.url),
  openGraph: {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    url: seo.url,
    siteName: seo.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: business.name,
    url: seo.url,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: business.hours.structured
      .filter((d) => d.open !== null)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: d.days,
        opens: d.open,
        closes: d.close,
      })),
    areaServed: {
      "@type": "City",
      name: "Washington, DC",
    },
    foundingDate: `${business.established}`,
    description: seo.defaultDescription,
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brass focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
