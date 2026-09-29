"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeUp,
  SlideIn,
  Stagger,
  staggerChild,
  AnimatedCounter,
  ScaleHover,
} from "@/components/animations";
import {
  business,
  services,
  howItWorks,
  communicationPromise,
  testimonials,
  clientTypes,
  seasonalBanners,
  faqs,
  trustBadges,
} from "@/content/site-config";

/* ════════════════════════════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')`,
          }}
          role="img"
          aria-label="Lush green landscape in Washington DC — REPLACE WITH REAL PROJECT PHOTO"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/60 to-forest/90" />
      </div>

      <div className="relative z-10 container-wide mx-auto px-4 md:px-8 text-center pt-32 pb-20 md:pt-40 md:pb-28">
        <FadeUp>
          <p className="text-brass font-sans text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6">
            Serving DC Since {business.established}
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-cream text-balance font-serif max-w-4xl mx-auto mb-6">
            {business.heroHeadline}
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {business.heroSubhead}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              <span>Book a Service</span>
            </Link>
            <Link
              href="/book?type=assessment"
              className="btn-secondary-light text-base px-8 py-4"
            >
              Free On-Site Assessment
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <a href={business.phoneHref} className="phone-chip inline-flex">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            {business.phoneDisplay}
          </a>
        </FadeUp>

        {/* Trust Strip */}
        <FadeUp delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-cream/10">
            {[
              { label: "Licensed & Insured", icon: "🛡️" },
              {
                label: `${trustBadges.yearsInBusiness}+ Years in Business`,
                icon: "⭐",
              },
              { label: "DC-Based Crews", icon: "📍" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-cream/50 text-sm"
              >
                <span className="text-lg">{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-6 h-6 text-cream/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SERVICE PATH CHOOSER
   ════════════════════════════════════════════════════════════════════════ */
function ServiceChooser() {
  const paths = [
    {
      title: "Keep it beautiful",
      subtitle: "Maintenance & Seasonal",
      description:
        "Seasonal cleanups, mulching, edging, lawn seeding, and ongoing maintenance to keep your property looking its best.",
      href: "/book?path=maintenance",
      image:
        "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80",
      imageAlt: "Beautiful maintained lawn — REPLACE WITH REAL PROJECT PHOTO",
      services: ["Seasonal Cleanups", "Mulching & Edging", "Lawn Maintenance"],
    },
    {
      title: "Build something new",
      subtitle: "Patios & Walls",
      description:
        "Custom patios, retaining walls, and hardscape installations designed and built to transform your outdoor space.",
      href: "/book?path=hardscaping",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      imageAlt: "Custom stone patio installation — REPLACE WITH REAL PROJECT PHOTO",
      services: ["Custom Patios", "Retaining Walls"],
    },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              What do you need?
            </p>
            <h2 className="text-forest">Choose Your Path</h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {paths.map((path, i) => (
            <FadeUp key={path.title} delay={i * 0.15}>
              <Link href={path.href} className="group block">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${path.image}')` }}
                      role="img"
                      aria-label={path.imageAlt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <p className="text-brass text-xs font-medium tracking-widest uppercase mb-1">
                        {path.subtitle}
                      </p>
                      <h3 className="text-cream text-2xl md:text-3xl font-serif">
                        {path.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-charcoal/70 text-sm leading-relaxed mb-4">
                      {path.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {path.services.map((s) => (
                        <span
                          key={s}
                          className="text-xs font-medium bg-cream px-3 py-1.5 rounded-full text-forest"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-brass font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                      <span>Get Started</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SERVICES GRID
   ════════════════════════════════════════════════════════════════════════ */
function ServicesGrid() {
  const iconMap: Record<string, React.ReactNode> = {
    Leaf: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 17 3.5s1 1.5 1 5.5a11 11 0 01-7 11z" />
        <path d="M11 20V9c3-2 5-3 6-3.5" />
      </svg>
    ),
    Layers: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    Sprout: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10 .1-2.8 2.5-5 5-6-3 .5-5.5 3-5 7-1 2-3 3.5-3 9zM12 20c-5.5-2.5-.8-6.4-3-10-.1-2.8-2.5-5-5-6 3 .5 5.5 3 5 7 1 2 3 3.5 3 9z" />
      </svg>
    ),
    LayoutGrid: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    Blocks: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="4" y="14" width="16" height="4" rx="1" />
      </svg>
    ),
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-wide mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="text-forest mb-4">Our Services</h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto">
              From weekly lawn maintenance to custom hardscape construction, we
              handle every aspect of your outdoor space.
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div key={service.id} variants={staggerChild}>
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <div className="h-full p-8 rounded-2xl border border-gray-100 bg-white hover:border-moss/30 hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-moss mb-6 group-hover:bg-moss group-hover:text-cream transition-colors duration-300">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-xl font-serif text-forest mb-3 group-hover:text-moss transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <span className="text-brass text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn More
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HOW IT WORKS + COMMUNICATION PROMISE
   ════════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const stepIcons: Record<string, React.ReactNode> = {
    CalendarCheck: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M9 16l2 2 4-4" />
      </svg>
    ),
    ClipboardCheck: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    FileText: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    CheckCircle: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  };

  const promiseIcons: Record<string, React.ReactNode> = {
    Zap: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    User: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    MessageSquare: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    RefreshCw: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
    ),
  };

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide mx-auto">
        {/* Steps */}
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Simple Process
            </p>
            <h2 className="text-forest mb-4">How It Works</h2>
            <p className="text-charcoal/60 max-w-xl mx-auto">
              From booking to completion, we make every step easy and
              transparent.
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {howItWorks.map((step, i) => (
            <motion.div key={step.step} variants={staggerChild}>
              <div className="relative text-center group">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-brass rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
                  {step.step}
                </div>
                <div className="pt-8 pb-6 px-6 rounded-2xl bg-white border border-gray-100 group-hover:shadow-lg group-hover:border-moss/20 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-moss mx-auto mb-4">
                    {stepIcons[step.icon]}
                  </div>
                  <h4 className="text-forest font-serif text-lg mb-2">
                    {step.title}
                  </h4>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connector line (hidden on mobile & last item) */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-moss/30 to-moss/10" />
                )}
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Communication Promise */}
        <FadeUp>
          <div className="bg-forest rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-moss/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brass/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-brass/20 text-brass px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Fast & Clear Communication
                </div>
                <h3 className="text-cream font-serif text-3xl md:text-4xl mb-4">
                  {communicationPromise.headline}
                </h3>
                <p className="text-cream/60 max-w-2xl mx-auto">
                  {communicationPromise.subhead}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {communicationPromise.promises.map((promise, i) => (
                  <FadeUp key={promise.title} delay={i * 0.1}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300">
                      <div className="text-brass mb-3">
                        {promiseIcons[promise.icon]}
                      </div>
                      <h4 className="text-cream font-sans font-semibold text-base mb-2">
                        {promise.title}
                      </h4>
                      <p className="text-cream/50 text-sm leading-relaxed">
                        {promise.description}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FEATURED PROJECTS with BEFORE/AFTER SLIDER
   ════════════════════════════════════════════════════════════════════════ */
function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number, rect: DOMRect) => {
      if (!isDragging) return;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    },
    [isDragging]
  );

  return (
    <div
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={(e) =>
        handleMove(e.clientX, e.currentTarget.getBoundingClientRect())
      }
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove(
          touch.clientX,
          e.currentTarget.getBoundingClientRect()
        );
      }}
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
    >
      {/* After Image (Full) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80')`,
        }}
      />
      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80')`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />
      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-charcoal/70 backdrop-blur-sm text-cream text-xs font-medium px-3 py-1.5 rounded-full">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-brass/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
        After
      </div>
    </div>
  );
}

function FeaturedProjects() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Our Work
            </p>
            <h2 className="text-forest mb-4">Featured Projects</h2>
            <p className="text-charcoal/60 max-w-xl mx-auto">
              See the transformations we&apos;ve delivered for homeowners and
              institutions across DC.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider />
            <p className="text-center text-charcoal/40 text-sm mt-4 italic">
              Drag the slider to compare — REPLACE WITH REAL PROJECT PHOTOS
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/projects" className="btn-secondary inline-flex">
              View All Projects
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   WHO WE SERVE
   ════════════════════════════════════════════════════════════════════════ */
function WhoWeServe() {
  const clientIcons: Record<string, React.ReactNode> = {
    Home: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    Building2: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18H6zM6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" />
        <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
      </svg>
    ),
    Landmark: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
        <line x1="2" y1="18" x2="22" y2="18" />
      </svg>
    ),
  };

  return (
    <section className="section-padding gradient-forest">
      <div className="container-wide mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Who We Serve
            </p>
            <h2 className="text-cream mb-4">Trusted Across DC</h2>
            <p className="text-cream/60 max-w-xl mx-auto">
              From residential homeowners to major institutions, we deliver
              exceptional results at every scale.
            </p>
          </div>
        </FadeUp>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {clientTypes.map((client) => (
            <motion.div key={client.title} variants={staggerChild}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                <div className="text-brass mb-6">{clientIcons[client.icon]}</div>
                <h3 className="text-cream font-serif text-2xl mb-3">
                  {client.title}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed mb-6 flex-1">
                  {client.description}
                </p>
                <Link
                  href={client.href}
                  className="inline-flex items-center gap-2 text-brass text-sm font-semibold hover:gap-3 transition-all"
                >
                  {client.cta}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Stats */}
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-cream/10">
            {[
              { value: trustBadges.yearsInBusiness, suffix: "+", label: "Years in Business" },
              { value: 500, suffix: "+", label: "Projects Completed" },
              { value: 100, suffix: "%", label: "DC-Based Crews" },
              { value: 24, suffix: "h", label: "Quote Turnaround" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-brass font-serif text-4xl md:text-5xl mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-cream/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Client Reviews
            </p>
            <h2 className="text-forest mb-4">What Our Clients Say</h2>
            <p className="text-charcoal/40 text-sm">
              All testimonials below are{" "}
              <strong>placeholders — replace with real reviews before launch</strong>
            </p>
          </div>
        </FadeUp>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[200px]">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1 : 0.95,
                  y: i === active ? 0 : 20,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`${i === active ? "relative" : "absolute inset-0"} text-center`}
                aria-hidden={i !== active}
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg
                      key={s}
                      className="w-5 h-5 text-brass"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-charcoal text-lg md:text-xl font-serif leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="text-charcoal/60 text-sm">
                  <span className="font-semibold text-charcoal">{t.author}</span>
                  <span className="mx-2">·</span>
                  <span>{t.location}</span>
                  <span className="mx-2">·</span>
                  <span className="capitalize">{t.source}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-brass w-8" : "bg-charcoal/20 hover:bg-charcoal/40"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Review badges */}
          <FadeUp delay={0.2}>
            <div className="flex items-center justify-center gap-6 mt-10">
              <a
                href={business.yelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-charcoal/70"
              >
                <span className="font-semibold">Yelp</span>
                <span className="text-charcoal/40">·</span>
                <span className="text-brass">[Add rating]</span>
              </a>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm text-charcoal/70">
                <span className="font-semibold">Google</span>
                <span className="text-charcoal/40">·</span>
                <span className="text-brass">[Add rating]</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SEASONAL BANNER
   ════════════════════════════════════════════════════════════════════════ */
function SeasonalBanner() {
  const currentMonth = new Date().getMonth() + 1;
  const banner = useMemo(
    () =>
      seasonalBanners.find((b) => b.months.includes(currentMonth)) ||
      seasonalBanners[0],
    [currentMonth]
  );

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-moss via-forest to-moss" />
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTMwIDBMNjAgMzBMMzAgNjBMMCAzMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] bg-repeat" />

      <div className="relative z-10 container-wide mx-auto px-4 md:px-8 text-center">
        <FadeUp>
          <h2 className="text-cream font-serif text-3xl md:text-4xl mb-3">
            {banner.headline}
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto mb-8">
            {banner.subhead}
          </p>
          <Link href={`/book?service=${banner.service}`} className="btn-primary text-base">
            <span>{banner.cta}</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FAQ ACCORDION
   ════════════════════════════════════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Frequently Asked
            </p>
            <h2 className="text-forest mb-4">Common Questions</h2>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:border-moss/20 transition-colors">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  id={`faq-q-${i}`}
                  aria-controls={`faq-a-${i}`}
                >
                  <span className="font-serif text-forest text-lg pr-8">
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-brass shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </motion.svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <p className="px-6 pb-6 text-charcoal/60 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FINAL CTA BAND
   ════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section className="section-padding gradient-forest relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brass/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-moss/20 rounded-full blur-[100px]" />

      <div className="relative z-10 container-wide mx-auto text-center">
        <FadeUp>
          <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-6">
            Ready to Start?
          </p>
          <h2 className="text-cream font-serif text-4xl md:text-5xl mb-6 max-w-3xl mx-auto text-balance">
            Let&apos;s transform your outdoor space
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto mb-10 text-lg">
            Book a service online, schedule a free assessment, or call us
            directly. We respond within minutes.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/book" className="btn-primary text-base px-8 py-4">
              <span>Book a Service</span>
            </Link>
            <Link
              href="/book?type=assessment"
              className="btn-secondary-light text-base px-8 py-4"
            >
              Free On-Site Assessment
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream/50">
            <a
              href={business.phoneHref}
              className="flex items-center gap-2 hover:text-cream transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {business.phoneDisplay}
            </a>
            <a
              href={business.textHref}
              className="flex items-center gap-2 hover:text-cream transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
              </svg>
              Text Us
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   HOME PAGE
   ════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceChooser />
      <ServicesGrid />
      <HowItWorks />
      <FeaturedProjects />
      <WhoWeServe />
      <TestimonialsSection />
      <SeasonalBanner />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
