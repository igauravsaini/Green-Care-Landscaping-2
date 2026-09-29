"use client";

import React from "react";
import Link from "next/link";
import { business } from "@/content/site-config";

export default function MobileActionBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden glass-dark border-t border-cream/10"
      role="toolbar"
      aria-label="Quick actions"
    >
      <div className="flex items-stretch">
        {/* Call Button */}
        <a
          href={business.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-cream hover:bg-white/5 transition-colors active:bg-white/10"
          aria-label={`Call ${business.phoneDisplay}`}
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "call_click", {
                event_category: "engagement",
                event_label: "mobile_bar",
              });
            }
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="text-sm font-semibold">Call</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-cream/10" />

        {/* Book Button */}
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-brass hover:bg-brass-light transition-colors active:bg-brass-dark"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "booking_started", {
                event_category: "conversion",
                event_label: "mobile_bar",
              });
            }
          }}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-sm font-semibold text-white">Book Now</span>
        </Link>
      </div>
    </div>
  );
}
