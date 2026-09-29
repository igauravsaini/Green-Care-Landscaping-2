"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, Stagger, staggerChild } from "@/components/animations";
import { services, business } from "@/content/site-config";

export default function ServicesPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-forest overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-moss/20 rounded-full blur-[120px]" />
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <FadeUp>
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Our Services
            </p>
            <h1 className="text-cream mb-6 max-w-3xl">
              Everything your landscape needs
            </h1>
            <p className="text-cream/60 text-lg max-w-2xl mb-8">
              From weekly lawn care to custom outdoor construction, we handle
              every aspect of your property&apos;s exterior.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary">
                <span>Book a Service</span>
              </Link>
              <a href={business.phoneHref} className="btn-secondary-light">
                Call {business.phoneDisplay}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          <FadeUp>
            <div className="mb-12">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Maintenance & Seasonal
              </p>
              <h2 className="text-forest">Keep It Beautiful</h2>
            </div>
          </FadeUp>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services
              .filter((s) => s.category === "maintenance")
              .map((service) => (
                <motion.div key={service.id} variants={staggerChild}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                      <div className="h-48 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80')`,
                          }}
                          role="img"
                          aria-label={service.imageAlt}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
                        <span className="absolute top-4 left-4 bg-brass text-white text-xs font-medium px-3 py-1 rounded-full">
                          Instant Booking
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-xl text-forest mb-2 group-hover:text-moss transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                          {service.shortDescription}
                        </p>
                        <span className="text-brass text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </Stagger>
        </div>
      </section>

      {/* Hardscaping Services */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <FadeUp>
            <div className="mb-12">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Hardscaping & Construction
              </p>
              <h2 className="text-forest">Build Something New</h2>
            </div>
          </FadeUp>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services
              .filter((s) => s.category === "hardscaping")
              .map((service) => (
                <motion.div key={service.id} variants={staggerChild}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <div className="h-full bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                      <div className="h-64 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80')`,
                          }}
                          role="img"
                          aria-label={service.imageAlt}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
                        <span className="absolute top-4 left-4 bg-forest text-cream text-xs font-medium px-3 py-1 rounded-full">
                          Free Assessment
                        </span>
                      </div>
                      <div className="p-8">
                        <h3 className="font-serif text-2xl text-forest mb-3 group-hover:text-moss transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-charcoal/60 text-sm leading-relaxed mb-6">
                          {service.shortDescription}
                        </p>
                        <span className="text-brass text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-forest text-center">
        <div className="container-wide mx-auto px-4 md:px-8">
          <FadeUp>
            <h2 className="text-cream font-serif mb-4">
              Not sure what you need?
            </h2>
            <p className="text-cream/60 max-w-xl mx-auto mb-8">
              Schedule a free on-site assessment and we&apos;ll recommend the
              right services for your property.
            </p>
            <Link href="/book?type=assessment" className="btn-primary text-base">
              <span>Schedule Free Assessment</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
