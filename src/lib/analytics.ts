/**
 * Google Analytics 4 (GA4) Event Dispatcher
 *
 * Typed event helpers for key conversion actions:
 * - booking_started
 * - booking_step
 * - booking_completed
 * - call_click
 * - text_click
 * - estimate_viewed
 */

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[GA4 Event] ${eventName}:`, params);
  }
}

export function trackBookingStarted(path: "maintenance" | "hardscaping") {
  trackEvent("booking_started", {
    event_category: "conversion",
    event_label: path,
  });
}

export function trackBookingStep(stepNumber: number, stepLabel: string) {
  trackEvent("booking_step", {
    event_category: "conversion",
    event_label: `step_${stepNumber}_${stepLabel}`,
    value: stepNumber,
  });
}

export function trackBookingCompleted(
  bookingId: string,
  path: "maintenance" | "hardscaping",
  serviceCount: number
) {
  trackEvent("booking_completed", {
    event_category: "conversion",
    event_label: path,
    booking_id: bookingId,
    service_count: serviceCount,
    value: 1,
  });
}

export function trackCallClick(source: string) {
  trackEvent("call_click", {
    event_category: "engagement",
    event_label: source,
  });
}

export function trackTextClick(source: string) {
  trackEvent("text_click", {
    event_category: "engagement",
    event_label: source,
  });
}
