import { z } from "zod";

export const bookingSchema = z.object({
  path: z.enum(["maintenance", "hardscaping"]),
  selectedServices: z.array(z.string()).min(1, "Select at least one service"),
  address: z.string().optional().default(""),
  propertyType: z.enum(["house", "rowhouse", "commercial"]).nullable().optional(),
  yardSize: z.enum(["small", "medium", "large", "not-sure"]).nullable().optional(),
  selectedDate: z.string().min(1, "Select a date"),
  selectedTime: z.string().min(1, "Select a time"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  preferredContact: z.enum(["call", "text", "email"]),
  notes: z.string().optional().default(""),
  smsConsent: z.boolean().default(false),
  // Path B fields
  projectType: z.string().optional().default(""),
  budgetRange: z.string().optional().default(""),
  timeline: z.string().optional().default(""),
  hasBluepints: z.boolean().optional().default(false),
  projectDetails: z.string().optional().default(""),
});

export type BookingData = z.infer<typeof bookingSchema>;

export interface StoredBooking {
  id: string;
  createdAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
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
