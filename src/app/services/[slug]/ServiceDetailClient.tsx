"use client";

import React from "react";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { business } from "@/content/site-config";
import type { Service } from "@/content/site-config";

interface Props {
  service: Service;
}

export default function ServiceDetailClient({ service }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')`,
          }}
          role="img"
          aria-label={service.imageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/85 to-forest/70" />
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <FadeUp>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-cream/60 text-sm mb-6 hover:text-cream transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
            <span className="inline-block bg-brass/20 text-brass text-xs font-medium px-3 py-1 rounded-full mb-4">
              {service.category === "maintenance"
                ? "Maintenance & Seasonal"
                : "Hardscaping & Construction"}
            </span>
            <h1 className="text-cream mb-6 max-w-3xl">{service.name}</h1>
            <p className="text-cream/70 text-lg max-w-2xl mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={
                  service.bookable
                    ? `/book?service=${service.id}`
                    : "/book?type=assessment"
                }
                className="btn-primary"
              >
                <span>
                  {service.bookable ? "Book This Service" : "Request Free Assessment"}
                </span>
              </Link>
              <a href={business.phoneHref} className="btn-secondary-light">
                Call {business.phoneDisplay}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-cream">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <FadeUp>
                <h2 className="text-forest mb-6">About This Service</h2>
                <div className="prose prose-lg text-charcoal/70 leading-relaxed">
                  <p>{service.longDescription}</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100">
                  <h3 className="font-serif text-forest text-xl mb-4">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Professional site evaluation",
                      "Detailed written quote within 24 hours",
                      "Expert crew with proper equipment",
                      "Full cleanup after completion",
                      "Follow-up satisfaction check",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-charcoal/70 text-sm">
                        <svg
                          className="w-5 h-5 text-moss shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeUp delay={0.1}>
                <div className="sticky top-28 bg-forest rounded-2xl p-8 text-cream">
                  <h3 className="font-serif text-xl mb-4">Get Started Today</h3>
                  <p className="text-cream/60 text-sm mb-6">
                    {service.bookable
                      ? "Book online in under 2 minutes and get an instant estimate."
                      : "Schedule your free on-site assessment. No obligation."}
                  </p>
                  <Link
                    href={
                      service.bookable
                        ? `/book?service=${service.id}`
                        : "/book?type=assessment"
                    }
                    className="btn-primary w-full justify-center mb-4"
                  >
                    <span>
                      {service.bookable ? "Book Now" : "Schedule Assessment"}
                    </span>
                  </Link>
                  <div className="text-center">
                    <p className="text-cream/40 text-xs mb-2">or call us directly</p>
                    <a
                      href={business.phoneHref}
                      className="text-brass font-semibold hover:text-brass-light transition-colors"
                    >
                      {business.phoneDisplay}
                    </a>
                  </div>

                  <div className="mt-8 pt-6 border-t border-cream/10">
                    <h4 className="text-sm font-semibold mb-3">Hours</h4>
                    <p className="text-cream/60 text-sm">{business.hours.display}</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-forest text-center">
        <div className="container-wide mx-auto px-4 md:px-8">
          <FadeUp>
            <h2 className="text-cream font-serif mb-6">
              Ready for a{" "}
              {service.bookable ? "beautiful landscape" : "custom project"}?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={
                  service.bookable
                    ? `/book?service=${service.id}`
                    : "/book?type=assessment"
                }
                className="btn-primary"
              >
                <span>
                  {service.bookable ? "Book This Service" : "Schedule Free Assessment"}
                </span>
              </Link>
              <a
                href={business.textHref}
                className="btn-secondary-light"
              >
                Text Us
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
