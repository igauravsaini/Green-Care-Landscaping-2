import { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Portal — Booking & Schedule Management",
  description: "Internal dashboard for Green Care Landscaping crew dispatch, booking management, and project status.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
