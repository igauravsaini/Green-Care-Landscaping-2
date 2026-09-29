"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { business } from "@/content/site-config";
import type { StoredBooking } from "@/types/booking";

export default function AdminDashboardClient() {
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPath, setFilterPath] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<StoredBooking | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update Status
  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? data.booking : b))
        );
        if (selectedBooking?.id === id) {
          setSelectedBooking(data.booking);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoading(null);
    }
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus =
        filterStatus === "all" || b.status === filterStatus;
      const matchesPath = filterPath === "all" || b.path === filterPath;
      const matchesSearch =
        searchQuery === "" ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.includes(searchQuery) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesPath && matchesSearch;
    });
  }, [bookings, filterStatus, filterPath, searchQuery]);

  // Quick Stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const hardscaping = bookings.filter((b) => b.path === "hardscaping").length;
    return { total, pending, confirmed, hardscaping };
  }, [bookings]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "Booking ID",
      "Date Created",
      "Customer Name",
      "Phone",
      "Email",
      "Service Path",
      "Service Date",
      "Time",
      "Status",
      "Address",
      "Selected Services",
      "Notes",
    ];

    const rows = filteredBookings.map((b) => [
      `"${b.id}"`,
      `"${new Date(b.createdAt).toLocaleDateString()}"`,
      `"${b.name}"`,
      `"${b.phone}"`,
      `"${b.email}"`,
      `"${b.path}"`,
      `"${b.selectedDate}"`,
      `"${b.selectedTime}"`,
      `"${b.status}"`,
      `"${b.address || ""}"`,
      `"${b.selectedServices.join(", ")}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `green-care-bookings-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 pb-20 bg-stone-100 min-h-screen">
      {/* Top Banner */}
      <div className="bg-forest text-cream py-8 border-b border-forest/40">
        <div className="container-wide mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-serif text-white font-semibold">
                Crew & Booking Dispatch
              </h1>
              <span className="bg-brass/20 text-brass-light border border-brass/40 px-2.5 py-0.5 rounded-full text-xs font-medium">
                Internal Ops
              </span>
            </div>
            <p className="text-cream/70 text-sm mt-1">
              {business.name} · Washington, DC Ward 8 Dispatch Desk
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/20 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
            <Link
              href="/book"
              target="_blank"
              className="btn-brass text-xs py-2.5 px-4 rounded-xl flex items-center gap-2"
            >
              <span>+ New Booking</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-wide mx-auto px-4 md:px-8 mt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-charcoal/10 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-charcoal/50 font-medium">
              Total Inquiries
            </p>
            <p className="text-3xl font-serif text-forest font-bold mt-1">
              {stats.total}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-amber-800 font-medium">
              Pending Action
            </p>
            <p className="text-3xl font-serif text-amber-700 font-bold mt-1">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-moss/30 bg-moss/5 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-moss font-medium">
              Confirmed Scheduled
            </p>
            <p className="text-3xl font-serif text-forest font-bold mt-1">
              {stats.confirmed}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-charcoal/10 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-charcoal/50 font-medium">
              Hardscaping Assessments
            </p>
            <p className="text-3xl font-serif text-brass font-bold mt-1">
              {stats.hardscaping}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-charcoal/10 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-medium text-charcoal/60 mr-2">Status:</span>
            {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  filterStatus === st
                    ? "bg-forest text-white font-semibold"
                    : "bg-stone-100 hover:bg-stone-200 text-charcoal/70"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={filterPath}
              onChange={(e) => setFilterPath(e.target.value)}
              className="text-xs bg-stone-100 border border-charcoal/10 rounded-lg px-3 py-2 text-charcoal focus:outline-none"
            >
              <option value="all">All Service Types</option>
              <option value="maintenance">Maintenance Only</option>
              <option value="hardscaping">Hardscaping Only</option>
            </select>

            <input
              type="text"
              placeholder="Search customer, phone, street..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-stone-100 border border-charcoal/10 rounded-lg px-3 py-2 text-charcoal w-full md:w-60 focus:outline-none"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-3xl border border-charcoal/10 overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-charcoal/50 text-sm">
              Loading latest bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-16 text-center text-charcoal/50 text-sm">
              No matching bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-charcoal border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-charcoal/10 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">
                    <th className="py-4 px-6">ID & Date</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Type & Services</th>
                    <th className="py-4 px-6">Scheduled For</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/5">
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-cream/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedBooking(b)}
                    >
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs font-semibold text-forest">
                          {b.id}
                        </span>
                        <p className="text-xs text-charcoal/40 mt-0.5">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-charcoal">{b.name}</p>
                        <p className="text-xs text-charcoal/60">{b.phone}</p>
                        <p className="text-xs text-charcoal/40 truncate max-w-xs">
                          {b.address || "Address pending"}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                            b.path === "hardscaping"
                              ? "bg-brass/15 text-brass"
                              : "bg-moss/15 text-moss"
                          }`}
                        >
                          {b.path}
                        </span>
                        <p className="text-xs text-charcoal/70 mt-1 capitalize">
                          {b.selectedServices.join(", ").replace(/-/g, " ")}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-forest">
                          {b.selectedDate}
                        </p>
                        <p className="text-xs text-charcoal/50">
                          {b.selectedTime}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            b.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : b.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : b.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-stone-200 text-stone-700"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span className="capitalize">{b.status}</span>
                        </span>
                      </td>
                      <td
                        className="py-4 px-6 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status !== "confirmed" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "confirmed")}
                              className="px-2.5 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                              title="Mark as Confirmed"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== "completed" && (
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleStatusChange(b.id, "completed")}
                              className="px-2.5 py-1 text-xs bg-stone-700 hover:bg-stone-800 text-white rounded-lg transition-colors"
                              title="Mark as Completed"
                            >
                              Done
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 text-charcoal/60 hover:text-charcoal bg-stone-100 rounded-lg"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal/10 mb-6">
              <div>
                <span className="text-xs font-mono font-semibold text-brass">
                  {selectedBooking.id}
                </span>
                <h3 className="font-serif text-2xl text-forest font-bold">
                  {selectedBooking.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-charcoal/70"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-charcoal/80">
              {/* Direct Communications */}
              <div className="flex flex-wrap gap-2 p-3 bg-cream rounded-xl">
                <a
                  href={`tel:${selectedBooking.phone}`}
                  className="px-3 py-1.5 bg-forest text-cream text-xs rounded-lg font-medium hover:bg-moss flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call ({selectedBooking.phone})
                </a>
                <a
                  href={`sms:${selectedBooking.phone}`}
                  className="px-3 py-1.5 bg-moss text-white text-xs rounded-lg font-medium hover:bg-forest flex items-center gap-1.5"
                >
                  Text Customer
                </a>
                <a
                  href={`mailto:${selectedBooking.email}`}
                  className="px-3 py-1.5 bg-stone-200 text-charcoal text-xs rounded-lg font-medium hover:bg-stone-300 flex items-center gap-1.5"
                >
                  Email ({selectedBooking.email})
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-charcoal/50">Requested Slot</p>
                  <p className="font-semibold text-forest">
                    {selectedBooking.selectedDate} at {selectedBooking.selectedTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/50">Preferred Contact</p>
                  <p className="font-semibold capitalize text-charcoal">
                    {selectedBooking.preferredContact}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-charcoal/50">Property Address</p>
                <p className="font-medium text-charcoal">
                  {selectedBooking.address || "No address provided"}
                </p>
                {selectedBooking.propertyType && (
                  <p className="text-xs text-charcoal/60 capitalize mt-0.5">
                    Type: {selectedBooking.propertyType} · Yard Size:{" "}
                    {selectedBooking.yardSize || "Standard"}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs text-charcoal/50">Selected Services</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedBooking.selectedServices.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-stone-100 text-xs rounded text-charcoal capitalize"
                    >
                      {s.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>

              {selectedBooking.projectDetails && (
                <div className="p-3 bg-stone-50 rounded-xl">
                  <p className="text-xs text-charcoal/50 font-semibold mb-1">
                    Project Details:
                  </p>
                  <p className="text-xs leading-relaxed text-charcoal/80">
                    {selectedBooking.projectDetails}
                  </p>
                </div>
              )}

              {selectedBooking.notes && (
                <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                  <p className="text-xs text-amber-800 font-semibold mb-1">
                    Customer Notes:
                  </p>
                  <p className="text-xs leading-relaxed text-charcoal/80">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              {/* Status Update Quick Buttons */}
              <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
                <span className="text-xs text-charcoal/60">Change Status:</span>
                <div className="flex gap-2">
                  {["pending", "confirmed", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      disabled={actionLoading === selectedBooking.id}
                      onClick={() => handleStatusChange(selectedBooking.id, st)}
                      className={`text-xs px-2.5 py-1 rounded-lg capitalize ${
                        selectedBooking.status === st
                          ? "bg-forest text-white font-semibold"
                          : "bg-stone-100 hover:bg-stone-200 text-charcoal/70"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
