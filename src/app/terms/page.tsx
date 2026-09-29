import { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Green Care Landscaping. Service agreements, weather policies, and cancellation terms.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container-narrow mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-moss/10 shadow-sm">
          <p className="text-brass font-sans text-xs uppercase tracking-widest font-semibold mb-3">
            Legal & Compliance
          </p>
          <h1 className="font-serif text-forest text-3xl md:text-5xl mb-6">
            Terms of Service
          </h1>
          <p className="text-xs text-charcoal/50 mb-10">
            Last Updated: January 1, 2026
          </p>

          <div className="prose prose-stone max-w-none text-charcoal/80 space-y-8 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">1. Scope of Work & Estimates</h2>
              <p>
                All landscaping and hardscaping services provided by {business.name} are executed according to mutually agreed work orders or written estimates. Maintenance estimates generated online provide price guidance based on typical property sizes; final pricing is confirmed upon arrival or initial assessment.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">2. Property Access & Water Utilities</h2>
              <p>
                Clients agree to provide unhindered access to work areas (including unlocking back gates, securing domestic pets, and keeping driveways clear for equipment). For sodding, seeding, or planting services, access to an exterior water source is required unless other arrangements have been documented.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">3. Weather & Safety Policy</h2>
              <p>
                Field crew safety and landscape integrity are top priorities. In the event of severe rain, lightning, saturated soil, or freezing conditions, scheduled visits will be rescheduled to the earliest available working day without cancellation penalty.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">4. Cancellations & Rescheduling</h2>
              <p>
                To cancel or reschedule a scheduled maintenance visit, please notify us at least 24 hours in advance via call or text at {business.phoneDisplay}. Custom hardscaping contracts are governed by the deposit and milestone schedules specified in your signed project agreement.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">5. Communication Commitment</h2>
              <p>
                We pledge active, timely communication before, during, and following project completion. Mid-project change requests submitted via text or call will be acknowledged and evaluated promptly with clear cost adjustments before implementation.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10 flex justify-between items-center text-sm">
            <Link href="/" className="text-forest hover:text-brass font-medium">
              ← Back to Home
            </Link>
            <Link href="/privacy" className="text-forest hover:text-brass font-medium">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
