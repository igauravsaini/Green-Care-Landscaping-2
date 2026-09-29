"use client";

import React from "react";
import Link from "next/link";
import { FadeUp, SlideIn, AnimatedCounter } from "@/components/animations";
import { business, trustBadges } from "@/content/site-config";

export default function AboutPageClient() {
  const values = [
    {
      title: "Craftsmanship",
      description: "Every project receives the same meticulous attention to detail, whether it's a simple lawn cleanup or a complex patio installation.",
      icon: "🎯",
    },
    {
      title: "Reliability",
      description: "We show up on time, communicate clearly, and deliver on our promises. Your schedule matters as much as ours.",
      icon: "🤝",
    },
    {
      title: "Community",
      description: "As a Ward 8 company, we're invested in the neighborhoods we serve. This is our home — we treat every property like our own.",
      icon: "🏘️",
    },
    {
      title: "Responsiveness",
      description: "Fast confirmations, text updates, and a dedicated point of contact. We've built our processes around clear communication.",
      icon: "⚡",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80')`,
          }}
          role="img"
          aria-label="Green Care Landscaping team at work — REPLACE WITH REAL TEAM PHOTO"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 to-forest/70" />
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <FadeUp>
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              About Us
            </p>
            <h1 className="text-cream mb-6 max-w-3xl">
              Caring for DC&apos;s outdoor spaces since 2001
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl">
              What started as a small landscaping crew in Ward 8 has grown into
              one of DC&apos;s most trusted landscape companies — but our values
              haven&apos;t changed.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left">
              <div>
                <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                  Our Story
                </p>
                <h2 className="text-forest mb-6">
                  Built on hard work, grown through trust
                </h2>
                <div className="space-y-4 text-charcoal/70 leading-relaxed">
                  <p>
                    Green Care Landscaping was founded in 2001 with a simple
                    mission: provide excellent landscaping services to Washington,
                    DC neighborhoods with the care and attention they deserve.
                  </p>
                  <p>
                    Based in Ward 8, we started by serving our immediate community —
                    mowing lawns, cleaning up yards, and helping homeowners take
                    pride in their outdoor spaces. Word spread because our crews
                    showed up on time, worked hard, and treated every property with
                    respect.
                  </p>
                  <p>
                    Over two decades later, we&apos;ve expanded from residential
                    maintenance into custom hardscaping, commercial grounds
                    management, and institutional landscaping — serving homeowners,
                    developers, universities, and local government across the
                    District.
                  </p>
                  <p>
                    Through it all, our crews remain the heart of what we do: 
                    hard-working, friendly, and committed to doing the job right.
                  </p>
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="relative">
                <div
                  className="rounded-2xl overflow-hidden aspect-[4/5] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80')`,
                  }}
                  role="img"
                  aria-label="Green Care team members — REPLACE WITH REAL TEAM PHOTO"
                />
                <div className="absolute -bottom-6 -left-6 bg-brass text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl font-serif font-bold">
                    <AnimatedCounter target={trustBadges.yearsInBusiness} suffix="+" />
                  </div>
                  <p className="text-sm text-white/80">Years Serving DC</p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Our Values
              </p>
              <h2 className="text-forest">What Drives Us</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <FadeUp key={value.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-cream border border-cream-dark/30 hover:shadow-lg transition-all duration-300">
                  <span className="text-3xl block mb-4">{value.icon}</span>
                  <h3 className="font-serif text-forest text-xl mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Crew Culture */}
      <section className="section-padding gradient-forest">
        <div className="container-wide mx-auto text-center">
          <FadeUp>
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Our Team
            </p>
            <h2 className="text-cream mb-6 max-w-2xl mx-auto">
              Hard-working, friendly crews who take pride in every project
            </h2>
            <p className="text-cream/60 max-w-2xl mx-auto mb-10">
              Our field crews are the backbone of Green Care. They&apos;re skilled
              professionals who bring energy, expertise, and a genuine commitment
              to quality to every job site. We invest in training, safety, and
              crew well-being because great work starts with a great team.
            </p>
            <Link href="/book" className="btn-primary text-base">
              <span>Work With Us</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="container-wide mx-auto px-4 md:px-8">
          <FadeUp>
            <h2 className="text-forest mb-4">Ready to get started?</h2>
            <p className="text-charcoal/60 max-w-xl mx-auto mb-8">
              Whether you need weekly maintenance or a complete landscape
              transformation, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn-primary">
                <span>Book a Service</span>
              </Link>
              <a href={business.phoneHref} className="btn-secondary">
                Call {business.phoneDisplay}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
