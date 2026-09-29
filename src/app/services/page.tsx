import { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site-config";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Landscaping Services in Washington DC",
  description:
    "Professional landscaping services in Washington, DC. Seasonal cleanups, mulching, edging, lawn maintenance, custom patios, and retaining walls. Free estimates.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
