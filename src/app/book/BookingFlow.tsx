"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/animations";
import {
  business,
  services,
  pricingTable,
  blockedDates,
} from "@/content/site-config";

/* ─── Types ──────────────────────────────────────────────────────────── */
type BookingPath = "maintenance" | "hardscaping" | null;
type Step = 1 | 2 | 3 | 4 | 5 | 6;
type PropertyType = "house" | "rowhouse" | "commercial";
type YardSize = "small" | "medium" | "large" | "not-sure";
type ContactMethod = "call" | "text" | "email";

interface BookingState {
  path: BookingPath;
  selectedServices: string[];
  address: string;
  propertyType: PropertyType | null;
  yardSize: YardSize | null;
  selectedDate: string | null;
  selectedTime: string | null;
  name: string;
  phone: string;
  email: string;
  preferredContact: ContactMethod;
  notes: string;
  smsConsent: boolean;
  // Path B specific
  projectType: string;
  budgetRange: string;
  timeline: string;
  hasBluepints: boolean;
  projectDetails: string;
}

const initialState: BookingState = {
  path: null,
  selectedServices: [],
  address: "",
  propertyType: null,
  yardSize: null,
  selectedDate: null,
  selectedTime: null,
  name: "",
  phone: "",
  email: "",
  preferredContact: "call",
  notes: "",
  smsConsent: false,
  projectType: "",
  budgetRange: "",
  timeline: "",
  hasBluepints: false,
  projectDetails: "",
};

const timeSlots = [
  "8:30 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

/* ─── Helpers ────────────────────────────────────────────────────────── */
function isBlocked(dateStr: string) {
  const d = new Date(dateStr);
  return d.getDay() === 6 || blockedDates.includes(dateStr) || d < new Date();
}

function getEstimate(
  selectedServices: string[],
  yardSize: YardSize | null
): { min: number; max: number } | null {
  if (!yardSize || yardSize === "not-sure" || selectedServices.length === 0)
    return null;
  let totalMin = 0;
  let totalMax = 0;
  for (const svc of selectedServices) {
    const pricing = pricingTable[svc];
    if (pricing && pricing[yardSize]) {
      totalMin += pricing[yardSize].min;
      totalMax += pricing[yardSize].max;
    }
  }
  if (totalMin === 0) return null;
  return { min: totalMin, max: totalMax };
}

/* ─── Step Components ────────────────────────────────────────────────── */
function StepServices({
  state,
  setState,
}: {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
}) {
  const available = services.filter((s) =>
    state.path === "maintenance"
      ? s.category === "maintenance"
      : s.category === "hardscaping"
  );

  const iconMap: Record<string, string> = {
    Leaf: "🍂",
    Layers: "🧱",
    Sprout: "🌱",
    LayoutGrid: "⬛",
    Blocks: "🏗️",
  };

  return (
    <div>
      <h2 className="font-serif text-forest text-2xl mb-2">Select Your Services</h2>
      <p className="text-charcoal/60 text-sm mb-8">
        {state.path === "maintenance"
          ? "Choose one or more maintenance services."
          : "Select the type of project you have in mind."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {available.map((svc) => {
          const selected = state.selectedServices.includes(svc.id);
          return (
            <button
              key={svc.id}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  selectedServices: selected
                    ? prev.selectedServices.filter((id) => id !== svc.id)
                    : [...prev.selectedServices, svc.id],
                }))
              }
              className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                selected
                  ? "border-brass bg-brass/5 shadow-md"
                  : "border-gray-200 bg-white hover:border-moss/30"
              }`}
              aria-pressed={selected}
            >
              <div className="text-2xl mb-3">{iconMap[svc.icon] || "🌿"}</div>
              <h3 className="font-serif text-forest text-lg mb-1">{svc.name}</h3>
              <p className="text-charcoal/60 text-xs leading-relaxed">
                {svc.shortDescription.slice(0, 80)}…
              </p>
              {selected && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-brass text-xs font-semibold">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepProperty({
  state,
  setState,
}: {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
}) {
  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: "house", label: "Single-Family Home" },
    { value: "rowhouse", label: "Rowhouse / Townhouse" },
    { value: "commercial", label: "Commercial Property" },
  ];

  const yardSizes: { value: YardSize; label: string; desc: string }[] = [
    { value: "small", label: "Small", desc: "Under 1,500 sq ft" },
    { value: "medium", label: "Medium", desc: "1,500 – 5,000 sq ft" },
    { value: "large", label: "Large", desc: "Over 5,000 sq ft" },
    { value: "not-sure", label: "Not Sure", desc: "We'll assess on-site" },
  ];

  return (
    <div>
      <h2 className="font-serif text-forest text-2xl mb-2">Property Details</h2>
      <p className="text-charcoal/60 text-sm mb-8">
        Tell us about your property so we can provide an accurate estimate.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-charcoal mb-2">
            Property Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter your DC address…"
            value={state.address}
            onChange={(e) =>
              setState((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-charcoal mb-3">Property Type</p>
          <div className="grid grid-cols-3 gap-3">
            {propertyTypes.map((pt) => (
              <button
                key={pt.value}
                onClick={() =>
                  setState((prev) => ({ ...prev, propertyType: pt.value }))
                }
                className={`p-4 rounded-xl border-2 text-center text-sm transition-all ${
                  state.propertyType === pt.value
                    ? "border-brass bg-brass/5 font-semibold text-forest"
                    : "border-gray-200 bg-white text-charcoal/70 hover:border-moss/30"
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-charcoal mb-3">
            Approximate Yard Size
          </p>
          <div className="grid grid-cols-2 gap-3">
            {yardSizes.map((ys) => (
              <button
                key={ys.value}
                onClick={() =>
                  setState((prev) => ({ ...prev, yardSize: ys.value }))
                }
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  state.yardSize === ys.value
                    ? "border-brass bg-brass/5"
                    : "border-gray-200 bg-white hover:border-moss/30"
                }`}
              >
                <span className="block text-sm font-semibold text-forest">
                  {ys.label}
                </span>
                <span className="block text-xs text-charcoal/50 mt-0.5">
                  {ys.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepEstimate({
  state,
}: {
  state: BookingState;
}) {
  const estimate = getEstimate(state.selectedServices, state.yardSize);
  const isAssessment = state.path === "hardscaping";

  return (
    <div>
      <h2 className="font-serif text-forest text-2xl mb-2">
        {isAssessment ? "Project Details" : "Your Estimate"}
      </h2>

      {isAssessment ? (
        <div className="bg-forest/5 rounded-2xl p-8 mt-6">
          <p className="text-charcoal/70 mb-6">
            Hardscaping projects are custom-quoted after an on-site assessment.
            We&apos;ll visit your property, discuss your vision, and provide a
            detailed written quote within 24 hours.
          </p>
          <div className="bg-brass/10 rounded-xl p-6 border border-brass/20">
            <p className="text-brass font-semibold text-lg mb-1">Free On-Site Assessment</p>
            <p className="text-charcoal/60 text-sm">
              No obligation. Pick a date on the next step.
            </p>
          </div>
        </div>
      ) : estimate ? (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 mt-6">
          <p className="text-charcoal/60 text-sm mb-4">Estimated price range:</p>
          <div className="text-4xl font-serif text-forest mb-2">
            ${estimate.min} – ${estimate.max}
          </div>
          <p className="text-xs text-charcoal/40 italic">
            Estimate only — confirmed after on-site assessment
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-charcoal mb-3">
              Selected services:
            </h4>
            <ul className="space-y-1">
              {state.selectedServices.map((id) => {
                const svc = services.find((s) => s.id === id);
                return (
                  <li key={id} className="text-sm text-charcoal/70 flex items-center gap-2">
                    <svg className="w-4 h-4 text-moss" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {svc?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-cream-dark rounded-2xl p-8 mt-6 text-center">
          <p className="text-charcoal/60">
            Select services and yard size for an instant estimate.
          </p>
        </div>
      )}
    </div>
  );
}

function StepDateTime({
  state,
  setState,
}: {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
}) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      arr.push({ day: d, dateStr, blocked: isBlocked(dateStr) });
    }
    return arr;
  }, [viewMonth, viewYear, daysInMonth, firstDay]);

  return (
    <div>
      <h2 className="font-serif text-forest text-2xl mb-2">
        {state.path === "hardscaping" ? "Assessment Date & Time" : "Service Date & Time"}
      </h2>
      <p className="text-charcoal/60 text-sm mb-8">
        We operate Sunday through Friday, 8:30 AM – 7:00 PM.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                if (viewMonth === 0) {
                  setViewMonth(11);
                  setViewYear(viewYear - 1);
                } else {
                  setViewMonth(viewMonth - 1);
                }
              }}
              className="p-2 hover:bg-cream rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h3 className="font-semibold text-charcoal">
              {new Date(viewYear, viewMonth).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              onClick={() => {
                if (viewMonth === 11) {
                  setViewMonth(0);
                  setViewYear(viewYear + 1);
                } else {
                  setViewMonth(viewMonth + 1);
                }
              }}
              className="p-2 hover:bg-cream rounded-lg transition-colors"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-charcoal/40 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="py-2 font-medium">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((item, i) => {
              if (!item)
                return <div key={`empty-${i}`} className="py-3" />;
              return (
                <button
                  key={item.dateStr}
                  disabled={item.blocked}
                  onClick={() =>
                    setState((prev) => ({ ...prev, selectedDate: item.dateStr }))
                  }
                  className={`py-3 rounded-lg text-sm transition-all ${
                    item.blocked
                      ? "text-charcoal/20 cursor-not-allowed"
                      : state.selectedDate === item.dateStr
                      ? "bg-brass text-white font-semibold shadow-md"
                      : "text-charcoal hover:bg-cream"
                  }`}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <p className="text-sm font-medium text-charcoal mb-3">
            {state.selectedDate
              ? `Available times for ${new Date(state.selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`
              : "Select a date first"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                disabled={!state.selectedDate}
                onClick={() =>
                  setState((prev) => ({ ...prev, selectedTime: slot }))
                }
                className={`py-3 px-4 rounded-xl text-sm border-2 transition-all ${
                  !state.selectedDate
                    ? "border-gray-100 text-charcoal/30 cursor-not-allowed"
                    : state.selectedTime === slot
                    ? "border-brass bg-brass/5 text-forest font-semibold"
                    : "border-gray-200 bg-white text-charcoal hover:border-moss/30"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepContact({
  state,
  setState,
}: {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
}) {
  return (
    <div>
      <h2 className="font-serif text-forest text-2xl mb-2">Contact Information</h2>
      <p className="text-charcoal/60 text-sm mb-8">
        How should we reach you to confirm your booking?
      </p>

      <div className="space-y-5">
        {/* Honeypot — spam protection */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 pointer-events-none h-0 w-0"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="booking-name" className="block text-sm font-medium text-charcoal mb-2">
            Full Name *
          </label>
          <input
            id="booking-name"
            type="text"
            value={state.name}
            onChange={(e) => setState((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="booking-phone" className="block text-sm font-medium text-charcoal mb-2">
              Phone *
            </label>
            <input
              id="booking-phone"
              type="tel"
              value={state.phone}
              onChange={(e) => setState((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="booking-email" className="block text-sm font-medium text-charcoal mb-2">
              Email *
            </label>
            <input
              id="booking-email"
              type="email"
              value={state.email}
              onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-charcoal mb-3">Preferred Contact Method</p>
          <div className="flex gap-3">
            {(["call", "text", "email"] as ContactMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => setState((prev) => ({ ...prev, preferredContact: method }))}
                className={`px-5 py-2.5 rounded-xl text-sm border-2 transition-all capitalize ${
                  state.preferredContact === method
                    ? "border-brass bg-brass/5 font-semibold text-forest"
                    : "border-gray-200 bg-white text-charcoal/70 hover:border-moss/30"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="booking-notes" className="block text-sm font-medium text-charcoal mb-2">
            Additional Notes
          </label>
          <textarea
            id="booking-notes"
            value={state.notes}
            onChange={(e) => setState((prev) => ({ ...prev, notes: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all resize-none"
            placeholder="Anything else we should know?"
          />
        </div>
      </div>
    </div>
  );
}

function StepReview({
  state,
  setState,
}: {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
}) {
  const estimate = getEstimate(state.selectedServices, state.yardSize);

  return (
    <div>
      <h2 className="font-serif text-forest text-2xl mb-2">Review & Confirm</h2>
      <p className="text-charcoal/60 text-sm mb-8">
        Please review your booking details below.
      </p>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
        <div className="p-6">
          <h4 className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3">
            Services
          </h4>
          <ul className="space-y-1">
            {state.selectedServices.map((id) => (
              <li key={id} className="text-sm text-charcoal">
                {services.find((s) => s.id === id)?.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6">
          <h4 className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3">
            Property
          </h4>
          <p className="text-sm text-charcoal">{state.address || "Not provided"}</p>
          <p className="text-sm text-charcoal/60">
            {state.propertyType} · {state.yardSize} yard
          </p>
        </div>

        {estimate && (
          <div className="p-6">
            <h4 className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3">
              Estimate
            </h4>
            <p className="text-2xl font-serif text-forest">
              ${estimate.min} – ${estimate.max}
            </p>
            <p className="text-xs text-charcoal/40 italic">Confirmed on site</p>
          </div>
        )}

        <div className="p-6">
          <h4 className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3">
            Date & Time
          </h4>
          <p className="text-sm text-charcoal">
            {state.selectedDate
              ? new Date(state.selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "Not selected"}
            {state.selectedTime && ` at ${state.selectedTime}`}
          </p>
        </div>

        <div className="p-6">
          <h4 className="text-xs font-medium text-charcoal/40 uppercase tracking-wider mb-3">
            Contact
          </h4>
          <p className="text-sm text-charcoal">{state.name}</p>
          <p className="text-sm text-charcoal/60">
            {state.phone} · {state.email}
          </p>
          <p className="text-sm text-charcoal/60">
            Preferred: {state.preferredContact}
          </p>
        </div>
      </div>

      {/* Consent */}
      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={state.smsConsent}
            onChange={(e) =>
              setState((prev) => ({ ...prev, smsConsent: e.target.checked }))
            }
            className="mt-1 w-5 h-5 rounded border-gray-300 text-brass focus:ring-brass"
          />
          <span className="text-sm text-charcoal/60">
            I consent to receive SMS and email notifications about my booking,
            including confirmations, reminders, and updates. Standard rates may
            apply. You can opt out at any time.
          </span>
        </label>
      </div>
    </div>
  );
}

/* ─── Main Booking Component ─────────────────────────────────────────── */
export default function BookingFlow() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<BookingState>(() => {
    const initial = { ...initialState };
    const type = searchParams.get("type");
    const path = searchParams.get("path");
    const service = searchParams.get("service");

    if (type === "assessment" || path === "hardscaping") {
      initial.path = "hardscaping";
    } else if (path === "maintenance") {
      initial.path = "maintenance";
    }
    if (service) {
      const svc = services.find((s) => s.id === service);
      if (svc) {
        initial.path = svc.category;
        initial.selectedServices = [svc.id];
      }
    }
    return initial;
  });

  const [currentStep, setCurrentStep] = useState<Step>(state.path ? 1 : 0 as unknown as Step);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>("");

  const stepLabels = ["Service", "Property", "Estimate", "Date & Time", "Contact", "Review"];

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return state.selectedServices.length > 0;
      case 2:
        return true; // Address is optional
      case 3:
        return true; // Estimate is informational
      case 4:
        return !!state.selectedDate && !!state.selectedTime;
      case 5:
        return Boolean(state.name && state.phone && state.email);
      case 6:
        return state.smsConsent;
      default:
        return true;
    }
  }, [currentStep, state]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to confirm booking. Please try again.");
      }

      setConfirmedBookingId(data.bookingId || "GC-CONFIRMED");

      // GA4 event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "booking_completed", {
          event_category: "conversion",
          event_label: state.path,
          booking_id: data.bookingId,
          value: 1,
        });
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Booking submission error:", err);
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  }, [state]);

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream px-4 pt-24 pb-16">
        <FadeUp>
          <div className="max-w-lg text-center bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-moss/10">
            <div className="w-20 h-20 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-moss" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-brass font-semibold mb-2">
              Confirmation #{confirmedBookingId}
            </p>
            <h2 className="font-serif text-forest text-3xl mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              We&apos;ve reserved your spot for <strong>{state.selectedDate}</strong> at <strong>{state.selectedTime}</strong>. A full confirmation was sent to <strong>{state.email}</strong>.
            </p>
            <div className="p-4 bg-cream rounded-xl text-left text-xs space-y-2 mb-6 text-charcoal/80">
              <p><strong>Customer:</strong> {state.name} ({state.phone})</p>
              <p><strong>Service Type:</strong> {state.path === "hardscaping" ? "Hardscaping Consultation" : "Seasonal Maintenance"}</p>
              {state.address && <p><strong>Address:</strong> {state.address}</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-primary justify-center text-sm py-3 px-6">
                <span>Return Home</span>
              </Link>
              <a
                href={business.phoneHref}
                className="btn-outline justify-center text-sm py-3 px-6"
              >
                Call (202) 946-9600
              </a>
            </div>
          </div>
        </FadeUp>
      </section>
    );
  }

  // Path selection
  if (!state.path) {
    return (
      <section className="min-h-screen bg-cream px-4 pt-32 pb-20">
        <div className="container-narrow mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Book Now
              </p>
              <h1 className="text-forest font-serif mb-4">
                What are you looking for?
              </h1>
              <p className="text-charcoal/60">
                Choose your path and we&apos;ll guide you through the process.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                path: "maintenance" as const,
                title: "Keep it beautiful",
                subtitle: "Maintenance & Seasonal",
                desc: "Seasonal cleanups, mulching, lawn care — book instantly with an estimate.",
                emoji: "🌿",
              },
              {
                path: "hardscaping" as const,
                title: "Build something new",
                subtitle: "Patios & Walls",
                desc: "Custom patios and retaining walls — schedule a free assessment.",
                emoji: "🏗️",
              },
            ].map((option) => (
              <FadeUp key={option.path} delay={option.path === "hardscaping" ? 0.1 : 0}>
                <button
                  onClick={() => {
                    setState((prev) => ({ ...prev, path: option.path }));
                    setCurrentStep(1);
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "booking_started", {
                        event_category: "conversion",
                        event_label: option.path,
                      });
                    }
                  }}
                  className="w-full text-left p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-brass hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="text-4xl block mb-4">{option.emoji}</span>
                  <p className="text-brass text-xs font-medium tracking-widest uppercase mb-1">
                    {option.subtitle}
                  </p>
                  <h3 className="font-serif text-forest text-2xl mb-2 group-hover:text-moss transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm">{option.desc}</p>
                </button>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream px-4 pt-32 pb-20">
      <div className="container-narrow mx-auto">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    i + 1 < currentStep
                      ? "bg-moss text-white"
                      : i + 1 === currentStep
                      ? "bg-brass text-white"
                      : "bg-gray-200 text-charcoal/40"
                  }`}
                >
                  {i + 1 < currentStep ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className={`hidden md:block w-full h-0.5 mx-2 transition-colors ${
                      i + 1 < currentStep ? "bg-moss" : "bg-gray-200"
                    }`}
                    style={{ width: "clamp(20px, 6vw, 80px)" }}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-charcoal/40 text-center">
            Step {currentStep} of 6: {stepLabels[currentStep - 1]}
          </p>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-cream-dark/30 rounded-3xl p-6 md:p-10"
          >
            {currentStep === 1 && (
              <StepServices state={state} setState={setState} />
            )}
            {currentStep === 2 && (
              <StepProperty state={state} setState={setState} />
            )}
            {currentStep === 3 && <StepEstimate state={state} />}
            {currentStep === 4 && (
              <StepDateTime state={state} setState={setState} />
            )}
            {currentStep === 5 && (
              <StepContact state={state} setState={setState} />
            )}
            {currentStep === 6 && (
              <StepReview state={state} setState={setState} />
            )}
          </motion.div>
        </AnimatePresence>

        {submitError && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() =>
              setCurrentStep((prev) =>
                prev === 1 ? 1 : ((prev - 1) as Step)
              )
            }
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              currentStep === 1
                ? "text-charcoal/20 cursor-not-allowed"
                : "text-charcoal hover:bg-white"
            }`}
            disabled={currentStep === 1 || isSubmitting}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {currentStep === 6 ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
              className={`btn-primary px-8 py-3 flex items-center gap-2 ${
                !canProceed || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm Booking</span>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentStep((prev) => ((prev + 1) as Step));
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "booking_step", {
                    event_category: "conversion",
                    event_label: `step_${currentStep + 1}`,
                    value: currentStep + 1,
                  });
                }
              }}
              disabled={!canProceed}
              className={`btn-primary px-8 py-3 ${
                !canProceed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>Next</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
