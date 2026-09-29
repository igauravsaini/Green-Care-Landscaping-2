import { Metadata } from "next";
import Link from "next/link";
import { serviceAreas, business } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Service Areas in Washington DC",
  description: "Green Care Landscaping serves all of Washington, DC — Ward 8, Anacostia, Capitol Hill, Georgetown, Petworth, Brookland, and more. Local landscaping since 2001.",
};

export default function ServiceAreasPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 gradient-forest">
        <div className="container-wide mx-auto px-4 md:px-8">
          <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Where We Work
          </p>
          <h1 className="text-cream mb-4">Service Areas</h1>
          <p className="text-cream/60 text-lg max-w-xl">
            We serve all of Washington, DC — from Capitol Hill to Anacostia and everywhere in between.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-moss/20 transition-all duration-300 h-full group-hover:-translate-y-1">
                  <div className="text-brass text-sm font-medium mb-1">
                    {area.ward || "Washington, DC"}
                  </div>
                  <h3 className="font-serif text-forest text-2xl mb-3 group-hover:text-moss transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                    {area.description.slice(0, 120)}…
                  </p>
                  <span className="text-brass text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    View Services →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-forest text-center">
        <div className="container-wide mx-auto px-4 md:px-8">
          <h2 className="text-cream font-serif mb-6">Don&apos;t see your neighborhood?</h2>
          <p className="text-cream/60 max-w-md mx-auto mb-8">
            We serve all of DC. Give us a call and we&apos;ll confirm service availability for your area.
          </p>
          <a href={business.phoneHref} className="btn-primary">
            <span>Call {business.phoneDisplay}</span>
          </a>
        </div>
      </section>
    </>
  );
}
