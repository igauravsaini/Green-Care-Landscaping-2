"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { business } from "@/content/site-config";

export default function ContactPageClient() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 gradient-forest">
        <div className="container-wide mx-auto px-4 md:px-8">
          <FadeUp>
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Get in Touch
            </p>
            <h1 className="text-cream mb-4">Contact Us</h1>
            <p className="text-cream/60 text-lg max-w-xl">
              We&apos;d love to hear from you. Reach out by phone, text, or the
              form below.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <FadeUp>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-forest text-xl mb-4">Call or Text</h3>
                    <a
                      href={business.phoneHref}
                      className="block text-2xl font-serif text-brass hover:text-brass-light transition-colors mb-2"
                    >
                      {business.phoneDisplay}
                    </a>
                    <a
                      href={business.textHref}
                      className="text-charcoal/60 hover:text-brass transition-colors text-sm"
                    >
                      📱 Text us at this number
                    </a>
                  </div>

                  <div>
                    <h3 className="font-serif text-forest text-xl mb-4">Location</h3>
                    <p className="text-charcoal/70">{business.address.full}</p>
                  </div>

                  <div>
                    <h3 className="font-serif text-forest text-xl mb-4">Hours</h3>
                    <p className="text-charcoal/70">{business.hours.display}</p>
                  </div>

                  <div className="pt-6 border-t border-cream-dark/50">
                    <p className="text-charcoal/60 text-sm mb-4">
                      Need a quote? Skip the form and book directly:
                    </p>
                    <Link href="/book" className="btn-primary text-sm">
                      <span>Book Online</span>
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <FadeUp delay={0.1}>
                {sent ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-moss" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-forest text-2xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-charcoal/60">
                      We&apos;ll get back to you within one business day.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 space-y-6"
                  >
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 pointer-events-none h-0 w-0"
                      aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal mb-2">
                          Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-charcoal mb-2">
                          Phone *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal mb-2">
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-charcoal mb-2">
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
                      >
                        <option>General Inquiry</option>
                        <option>Request a Quote</option>
                        <option>Schedule Assessment</option>
                        <option>Commercial / Institutional</option>
                        <option>Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal mb-2">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all resize-none"
                        placeholder="Tell us about your project or question…"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center">
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
