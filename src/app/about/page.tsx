import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us — Our Story Since 2001",
  description:
    "Learn about Green Care Landscaping — serving Washington, DC since 2001 with hard-working, friendly crews. Our story, values, and commitment to your outdoor spaces.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
