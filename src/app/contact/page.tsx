import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Green Care Landscaping in Washington, DC. Call (202) 946-9600, text us, or fill out our contact form. Located in Ward 8, DC 20020.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
