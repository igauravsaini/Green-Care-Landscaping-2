"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, Stagger, staggerChild } from "@/components/animations";
import { projects, business } from "@/content/site-config";

export default function ProjectsPageClient() {
  const [filter, setFilter] = useState<"all" | "maintenance" | "hardscaping">("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-forest overflow-hidden">
        <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
          <FadeUp>
            <p className="text-brass font-sans text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Our Work
            </p>
            <h1 className="text-cream mb-6">Projects & Portfolio</h1>
            <p className="text-cream/60 text-lg max-w-xl">
              Explore our recent landscape transformations across Washington, DC.
            </p>
            <p className="text-cream/30 text-sm mt-4 italic">
              All projects below are placeholders — replace with real project photos and details before launch.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-wide mx-auto">
          {/* Filter */}
          <FadeUp>
            <div className="flex items-center justify-center gap-3 mb-12">
              {[
                { value: "all" as const, label: "All Projects" },
                { value: "maintenance" as const, label: "Maintenance" },
                { value: "hardscaping" as const, label: "Hardscaping" },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    filter === f.value
                      ? "bg-forest text-cream"
                      : "bg-white text-charcoal/70 hover:bg-forest/5"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <motion.div key={project.id} variants={staggerChild} layout>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80')`,
                      }}
                      role="img"
                      aria-label={project.imageAlt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
                    <span className="absolute top-4 left-4 bg-brass/90 text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-forest text-xl mb-2">
                      {project.title}
                    </h3>
                    <p className="text-charcoal/50 text-xs mb-3">{project.location}</p>
                    <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                      {project.challenge.slice(0, 100)}…
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.serviceTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-cream px-2 py-1 rounded text-forest/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 gradient-forest text-center">
        <div className="container-wide mx-auto px-4 md:px-8">
          <FadeUp>
            <h2 className="text-cream font-serif mb-6">
              Want similar results for your property?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn-primary">
                <span>Book a Service</span>
              </Link>
              <a href={business.phoneHref} className="btn-secondary-light">
                Call {business.phoneDisplay}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
