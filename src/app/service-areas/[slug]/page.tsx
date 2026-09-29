import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceAreas, services, business } from "@/content/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return { title: area.seoTitle, description: area.seoDescription };
}

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 gradient-forest">
        <div className="container-wide mx-auto px-4 md:px-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-cream/60 text-sm mb-6 hover:text-cream transition-colors"
          >
            ← All Service Areas
          </Link>
          <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {area.ward || "Washington, DC"}
          </p>
          <h1 className="text-cream mb-4">
            Landscaping in {area.name}
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl">
            {area.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          <h2 className="text-forest font-serif mb-8">
            Services Available in {area.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group block bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-moss/20 transition-all"
              >
                <h3 className="font-serif text-forest text-lg mb-2 group-hover:text-moss transition-colors">
                  {svc.name}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {svc.shortDescription.slice(0, 100)}…
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-forest font-serif text-2xl mb-4">
              Ready to get started in {area.name}?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn-primary">
                <span>Book a Service</span>
              </Link>
              <a href={business.phoneHref} className="btn-secondary">
                Call {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
