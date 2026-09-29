import { Metadata } from "next";
import CommercialPageClient from "./CommercialPageClient";

export const metadata: Metadata = {
  title: "Commercial & Public Sector Landscaping",
  description:
    "Commercial landscaping services in Washington, DC. Landscape installations for developers, campus maintenance for universities, and grounds management for government agencies.",
};

export default function CommercialPage() {
  return <CommercialPageClient />;
}
