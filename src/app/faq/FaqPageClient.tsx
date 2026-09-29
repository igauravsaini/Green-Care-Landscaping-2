"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/animations";
import { faqs, business } from "@/content/site-config";

export default function FaqPageClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="pt-32 pb-24 bg-cream">
      {/* Hero Header */}
      <section className="container-narrow mx-auto px-4 text-center mb-16">
        <FadeUp>
          <p className="text-brass font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Got Questions? We Have Answers
          </p>
          <h1 className="font-serif text-forest text-4xl md:text-5xl lg:text-6xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Everything you need to know about our landscaping packages, DC pricing, scheduling, and on-site consultations.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., pricing, rain, areas)..."
              className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border border-charcoal/15 focus:outline-none focus:border-brass text-sm text-charcoal placeholder:text-charcoal/40 shadow-sm"
            />
            <svg
              className="w-5 h-5 text-charcoal/40 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </FadeUp>
      </section>

      {/* Accordions */}
      <section className="container-narrow mx-auto px-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-charcoal/10 p-8">
            <p className="text-charcoal/60 mb-4">
              No matching answers found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="text-sm text-charcoal/80 mb-6">
              Call us directly and we&apos;ll be glad to help immediately:
            </p>
            <a href={business.phoneHref} className="btn-primary inline-flex">
              <span>Call (202) 946-9600</span>
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-moss/15 overflow-hidden transition-all duration-200 hover:border-moss/40"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brass/30"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-forest text-lg md:text-xl font-medium">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-cream flex items-center justify-center text-forest shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-moss text-white" : ""
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 md:px-7 md:pb-7 pt-1 text-charcoal/75 text-sm md:text-base leading-relaxed border-t border-charcoal/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Still have questions banner */}
        <div className="mt-16 bg-forest text-cream rounded-3xl p-8 md:p-12 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-cream/70 max-w-xl mx-auto mb-8 text-sm md:text-base">
            We promise clear, rapid communication. Reach out directly to speak with our DC landscape coordinators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={business.phoneHref}
              className="btn-brass inline-flex items-center justify-center gap-2"
            >
              <span>Call (202) 946-9600</span>
            </a>
            <a
              href={business.textHref}
              className="btn-outline border-cream text-cream hover:bg-cream hover:text-forest inline-flex items-center justify-center gap-2"
            >
              <span>Text Us Now</span>
            </a>
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-full font-sans text-sm font-semibold tracking-wide bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
