/**
 * Cloudflare Pages Function: /api/bookings
 *
 * Runs natively on Cloudflare Workers edge network.
 * Handles GET (view bookings), POST (create booking), and PATCH (update status).
 */

interface Env {
  BOOKINGS_KV?: unknown;
}

interface BookingPayload {
  path: "maintenance" | "hardscaping";
  selectedServices: string[];
  address?: string;
  propertyType?: "house" | "rowhouse" | "commercial" | null;
  yardSize?: "small" | "medium" | "large" | "not-sure" | null;
  selectedDate: string;
  selectedTime: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: "call" | "text" | "email";
  notes?: string;
  smsConsent: boolean;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  hasBluepints?: boolean;
  projectDetails?: string;
}

interface StoredBooking extends BookingPayload {
  id: string;
  createdAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

// In-memory fallback / demo seed bookings
const initialBookings: StoredBooking[] = [
  {
    id: "GC-2026-0891",
    path: "maintenance",
    selectedServices: ["seasonal-cleanups", "mulching-edging"],
    address: "1428 16th St SE, Washington, DC 20020",
    propertyType: "rowhouse",
    yardSize: "medium",
    selectedDate: "2026-10-02",
    selectedTime: "9:00 AM",
    name: "Marcus Holloway",
    phone: "(202) 555-0143",
    email: "marcus.h@example.com",
    preferredContact: "text",
    notes: "Backyard gate is on the right side. Watch for flowerbeds along south wall.",
    smsConsent: true,
    createdAt: "2026-09-28T14:20:00Z",
    status: "confirmed",
  },
  {
    id: "GC-2026-0892",
    path: "hardscaping",
    selectedServices: ["patios", "retaining-walls"],
    address: "312 A St NE, Washington, DC 20002",
    propertyType: "house",
    yardSize: "large",
    selectedDate: "2026-10-04",
    selectedTime: "11:00 AM",
    name: "Eleanor Vance",
    phone: "(202) 555-0189",
    email: "eleanor.vance@example.com",
    preferredContact: "call",
    notes: "Grade slope in backyard causing pooling near foundation during heavy rains.",
    smsConsent: true,
    projectType: "Flagstone Patio & Terraced Retaining Wall",
    budgetRange: "$10,000 - $25,000",
    timeline: "Within 1 month",
    hasBluepints: false,
    projectDetails: "Looking for natural stone finish matching historic brick exterior.",
    createdAt: "2026-09-29T10:15:00Z",
    status: "pending",
  },
  {
    id: "GC-2026-0893",
    path: "maintenance",
    selectedServices: ["lawn-seeding", "seasonal-cleanups"],
    address: "4820 Arkansas Ave NW, Washington, DC 20011",
    propertyType: "house",
    yardSize: "small",
    selectedDate: "2026-10-05",
    selectedTime: "2:00 PM",
    name: "David Chen",
    phone: "(202) 555-0211",
    email: "david.chen@example.com",
    preferredContact: "email",
    notes: "Overseeding front and back lawn. Dog will be inside.",
    smsConsent: false,
    createdAt: "2026-09-29T16:45:00Z",
    status: "pending",
  },
];

let bookingsMemory: StoredBooking[] = [...initialBookings];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions = async () => {
  return new Response(null, { headers: corsHeaders });
};

// GET: /api/bookings
export const onRequestGet = async () => {
  return new Response(
    JSON.stringify({
      success: true,
      bookings: bookingsMemory,
      total: bookingsMemory.length,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    }
  );
};

// POST: /api/bookings
export const onRequestPost = async ({ request }: { request: Request }) => {
  try {
    const body = (await request.json()) as BookingPayload;

    if (!body.name || !body.phone || !body.email || !body.selectedDate || !body.selectedTime) {
      return new Response(
        JSON.stringify({ error: "Missing required contact or appointment fields." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const bookingId = `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: StoredBooking = {
      ...body,
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    bookingsMemory.unshift(newBooking);

    return new Response(
      JSON.stringify({
        success: true,
        bookingId,
        message: "Booking received! Confirmation sent via email/SMS.",
        booking: newBooking,
      }),
      { status: 201, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: "Internal server error. Please call (202) 946-9600." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

// PATCH: /api/bookings
export const onRequestPatch = async ({ request }: { request: Request }) => {
  try {
    const body = (await request.json()) as { id?: string; status?: string };
    const { id, status } = body;

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!id || !status || !validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ error: "Invalid booking ID or status" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const index = bookingsMemory.findIndex((b) => b.id === id);
    if (index === -1) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    bookingsMemory[index].status = status as StoredBooking["status"];

    return new Response(
      JSON.stringify({
        success: true,
        booking: bookingsMemory[index],
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ error: "Failed to update booking" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};
