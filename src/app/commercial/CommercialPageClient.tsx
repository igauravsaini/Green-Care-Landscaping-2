"use client";

import React from "react";
import Link from "next/link";
import { FadeUp, Stagger, staggerChild } from "@/components/animations";
import { motion } from "framer-motion";
import { business } from "@/content/site-config";

export default function CommercialPageClient() {
  const capabilities = [
    { title: "Landscape Installations", desc: "Complete landscape design and installation for new developments and renovations." },
    { title: "Grounds Maintenance", desc: "Ongoing maintenance contracts for campuses, properties, and public spaces." },
    { title: "Seasonal Programs", desc: "Year-round seasonal care including spring/fall cleanups and winter prep." },
    { title: "Hardscape Construction", desc: "Commercial-grade patios, walkways, retaining walls, and site improvements." },
    { title: "Site Preparation", desc: "Grading, drainage solutions, and site clearing for construction projects." },
    { title: "Emergency Services", desc: "Storm damage cleanup and emergency landscape restoration." },
  ];

  const process = [
    { step: "1", title: "Initial Consultation", desc: "We meet to understand your project scope, timeline, and requirements." },
    { step: "2", title: "Site Assessment", desc: "Our team evaluates the property and develops a detailed plan." },
    { step: "3", title: "Proposal & Contract", desc: "You receive a comprehensive proposal with clear pricing and timelines." },
    { step: "4", title: "Execution & Reporting", desc: "Work proceeds with regular updates and quality checkpoints." },
  ];

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-forest overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brass/10 rounded-full blur-[120px]" />
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <FadeUp>
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Commercial & Public Sector
            </p>
            <h1 className="text-cream mb-6 max-w-3xl">
              Landscaping for developers, universities, and government
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl mb-8">
              Scalable landscaping solutions for commercial properties, institutional campuses, and municipal spaces across Washington, DC.
            </p>
            <Link href="#proposal-form" className="btn-primary">
              <span>Request a Proposal</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Capabilities
              </p>
              <h2 className="text-forest">What We Deliver</h2>
            </div>
          </FadeUp>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <motion.div key={cap.title} variants={staggerChild}>
                <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-moss/20 transition-all duration-300 h-full">
                  <h3 className="font-serif text-forest text-xl mb-3">{cap.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Our Process
              </p>
              <h2 className="text-forest">How We Work With You</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <FadeUp key={p.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brass text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {p.step}
                  </div>
                  <h4 className="font-serif text-forest text-lg mb-2">{p.title}</h4>
                  <p className="text-charcoal/60 text-sm">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Proposal Form */}
      <section id="proposal-form" className="section-padding bg-cream">
        <div className="container-narrow mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
                Request a Proposal
              </p>
              <h2 className="text-forest">Tell Us About Your Project</h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="org-name" className="block text-sm font-medium text-charcoal mb-2">Organization Name *</label>
                  <input id="org-name" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="org-type" className="block text-sm font-medium text-charcoal mb-2">Organization Type</label>
                  <select id="org-type" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all">
                    <option>Real Estate Developer</option>
                    <option>Property Manager</option>
                    <option>University / College</option>
                    <option>Government / Municipality</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="proposal-contact" className="block text-sm font-medium text-charcoal mb-2">Contact Name *</label>
                  <input id="proposal-contact" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="proposal-email" className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                  <input id="proposal-email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label htmlFor="proposal-scope" className="block text-sm font-medium text-charcoal mb-2">Project Scope *</label>
                <textarea id="proposal-scope" required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all resize-none" placeholder="Describe the scope of your landscaping needs..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="proposal-timeline" className="block text-sm font-medium text-charcoal mb-2">Timeline</label>
                  <select id="proposal-timeline" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all">
                    <option>ASAP</option>
                    <option>Within 1 month</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>Planning stage</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="proposal-phone" className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                  <input id="proposal-phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-charcoal focus:border-brass focus:ring-2 focus:ring-brass/20 outline-none transition-all" />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                <span>Submit Proposal Request</span>
              </button>
            </form>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
