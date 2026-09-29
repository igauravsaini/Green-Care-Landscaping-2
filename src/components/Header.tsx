"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { business, navigation, services } from "@/content/site-config";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for subtle shadow elevation (no layout/padding shift)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Handle dropdown hover with safe clearance delay
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center bg-forest/95 backdrop-blur-md border-b border-cream/10 transition-shadow duration-300 ${
          scrolled ? "shadow-xl shadow-black/25" : "shadow-md shadow-black/10"
        }`}
        role="banner"
      >
        <div className="container-wide mx-auto px-4 md:px-8 w-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Green Care Landscaping — Home"
            className="flex items-center shrink-0 py-1 transition-opacity hover:opacity-90"
          >
            <Logo className="h-10 md:h-12 w-auto" color="cream" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main navigation"
          >
            {navigation.main.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`px-3.5 py-2 text-sm font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? "text-brass bg-white/5 font-semibold"
                          : "text-cream/90 hover:text-white hover:bg-white/10"
                      }`}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180 text-brass" : "text-cream/60"
                        }`}
                        viewBox="0 0 12 12"
                        fill="currentColor"
                      >
                        <path d="M6 8L2 4h8z" />
                      </svg>
                    </Link>

                    {/* Desktop Dropdown with safe hover bridge */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 pt-2 w-72 z-50"
                        >
                          <div className="bg-white rounded-2xl shadow-2xl shadow-black/25 border border-forest/10 p-2 overflow-hidden">
                            <div className="px-3 py-2 border-b border-gray-100 mb-1">
                              <p className="text-[11px] font-semibold tracking-wider text-forest/50 uppercase">
                                Available Services
                              </p>
                            </div>
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                    isChildActive
                                      ? "bg-forest/5 text-brass font-semibold"
                                      : "text-charcoal hover:bg-cream/60 hover:text-forest"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                            <div className="mt-1 pt-1 border-t border-gray-100">
                              <Link
                                href="/services"
                                className="block px-3 py-2 text-xs font-semibold text-brass hover:text-brass-dark"
                              >
                                View All Services →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-brass bg-white/5 font-semibold"
                      : "text-cream/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Direct Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={business.phoneHref}
              className="phone-chip"
              aria-label={`Call us at ${business.phoneDisplay}`}
            >
              <svg className="w-4 h-4 shrink-0 text-brass" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>{business.phoneDisplay}</span>
            </a>

            <Link href="/book" className="btn-primary text-sm py-2.5 px-5">
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="lg:hidden p-2.5 rounded-xl text-cream hover:bg-white/10 transition-colors focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-6 bg-cream rounded-full transition-transform duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-cream rounded-full transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-cream rounded-full transition-transform duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay (Z-index 70 to sit comfortably above all elements) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-forest/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Top Close Bar in overlay */}
            <div className="absolute top-5 right-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 text-cream hover:bg-white/10 rounded-xl"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-3 my-auto py-4">
              {navigation.main.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <div key={item.href} className="border-b border-cream/10 pb-2">
                    <Link
                      href={item.href}
                      className={`text-xl font-serif flex items-center justify-between py-1 transition-colors ${
                        isActive ? "text-brass font-bold" : "text-cream hover:text-brass"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-brass" />}
                    </Link>

                    {/* Submenu for services on mobile */}
                    {item.children && (
                      <div className="pl-4 mt-2 space-y-2 border-l border-moss/40">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block text-sm text-cream/70 hover:text-cream py-1"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer CTAs */}
            <div className="flex flex-col gap-3 pt-4 border-t border-cream/15">
              <Link
                href="/book"
                className="btn-primary w-full py-3.5 text-center text-base"
                onClick={() => setMobileOpen(false)}
              >
                <span>Book a Service</span>
              </Link>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <a
                  href={business.phoneHref}
                  className="py-3 px-4 bg-white/10 hover:bg-white/15 text-cream text-center rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 text-brass" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span>Call Us</span>
                </a>
                <a
                  href={business.textHref}
                  className="py-3 px-4 bg-moss hover:bg-moss-light text-white text-center rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                  <span>Text Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
