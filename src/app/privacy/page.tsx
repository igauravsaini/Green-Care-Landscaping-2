import { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Green Care Landscaping. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="container-narrow mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-moss/10 shadow-sm">
          <p className="text-brass font-sans text-xs uppercase tracking-widest font-semibold mb-3">
            Legal & Compliance
          </p>
          <h1 className="font-serif text-forest text-3xl md:text-5xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal/50 mb-10">
            Last Updated: January 1, 2026
          </p>

          <div className="prose prose-stone max-w-none text-charcoal/80 space-y-8 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">1. Information We Collect</h2>
              <p>
                When you visit our website, submit a booking or consultation request, or communicate with {business.name}, we may collect personal information such as:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-charcoal/70">
                <li>Your name, email address, telephone number, and residential/commercial property address.</li>
                <li>Project preferences, yard size, service requirements, and scheduling requests.</li>
                <li>Technical analytics data such as device type, browser, approximate location, and referral source.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-charcoal/70">
                <li>Schedule and perform requested landscaping or hardscaping assessments and services.</li>
                <li>Send transactional confirmations, appointment updates, weather reschedule notifications, and invoices.</li>
                <li>Provide prompt customer service and respond to mid-project change requests.</li>
                <li>Improve our site speed, user experience, and service offerings across Washington, DC.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">3. SMS & Text Messaging Consent</h2>
              <p>
                If you opt in to receive SMS text updates during your booking, we will use your phone number strictly for service-related communications (such as &ldquo;crew en route&rdquo; notices, weather schedule updates, or urgent project questions).
              </p>
              <p className="mt-2 text-charcoal/70">
                We never sell, rent, or share your mobile number or consent status with third parties for promotional or marketing purposes. You can reply STOP at any time to opt out.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">4. Information Sharing & Security</h2>
              <p>
                We do not sell your personal data. We only share information with trusted service providers who assist us in operating our platform (e.g., secure payment gateways, email delivery, and cloud infrastructure) under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-forest text-2xl mb-3">5. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to modify your information, contact us at:
              </p>
              <div className="mt-3 p-4 bg-cream rounded-xl text-sm">
                <p className="font-medium text-forest">{business.name}</p>
                <p>{business.address.full}</p>
                <p>Phone: {business.phoneDisplay}</p>
                <p>Email: {business.email}</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10 flex justify-between items-center text-sm">
            <Link href="/" className="text-forest hover:text-brass font-medium">
              ← Back to Home
            </Link>
            <Link href="/terms" className="text-forest hover:text-brass font-medium">
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
