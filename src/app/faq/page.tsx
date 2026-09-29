import { Metadata } from "next";
import FaqPageClient from "./FaqPageClient";
import { faqs, business } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Pricing, Service Areas & Process",
  description:
    "Find answers to common questions about Green Care Landscaping services, pricing estimates in Washington DC, scheduling, and our customer satisfaction process.",
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqPageClient />
    </>
  );
}
