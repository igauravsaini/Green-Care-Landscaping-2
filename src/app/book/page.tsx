import { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Book landscaping services in Washington, DC. Seasonal cleanups, mulching, lawn care, patios, and retaining walls. Instant estimates and online booking.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream pt-24">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brass/30 border-t-brass rounded-full animate-spin mx-auto mb-4" />
            <p className="text-charcoal/50 text-sm">Loading booking...</p>
          </div>
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
