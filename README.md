# Green Care Landscaping — Web Platform

A premium, conversion-focused web application and booking platform built for **Green Care Landscaping** (Ward 8, Washington, DC — Serving DC since 2001).

Designed with the aesthetic feel of a boutique landscape architecture studio meets botanical garden: deep forest green, moss, warm cream, charcoal, and warm brass accents.

---

## 📋 Table of Contents
1. [Core Features](#core-features)
2. [Tech Stack](#tech-stack)
3. [Local Development Setup](#local-development-setup)
4. [Critical Owner Launch Checklist](#critical-owner-launch-checklist)
5. [Third-Party Integrations Guide](#third-party-integrations-guide)
   - [Calendar Availability (Google Calendar / Cal.com)](#1-calendar-availability)
   - [Email Confirmations (Resend)](#2-email-confirmations)
   - [SMS Updates (Twilio)](#3-sms-updates)
   - [Database Connection (Supabase / PostgreSQL)](#4-database-connection)
6. [Replacing Placeholders & Real Photos](#replacing-placeholders--real-photos)
7. [SEO & Analytics](#seo--analytics)

---

## 🌟 Core Features

- **Conversion-Optimized 2-Path Booking Engine (`/book`)**:
  - **Path A (Instant Maintenance Booking)**: Seasonal cleanup, mulching & edging, lawn seeding with real-time price estimation based on DC property sizes.
  - **Path B (Assessment Booking)**: Custom patios and retaining walls consultations with budget, timeline, and site specification collection.
  - Saturday blocking logic matching DC business operating schedule.
  - SMS notification opt-in compliant with TCPA messaging regulations.
- **Service Catalog (`/services`, `/services/[slug]`)**:
  - Dedicated pages for Seasonal Cleanups, Mulching & Edging, Lawn Seeding, Custom Patios, and Retaining Walls.
  - Rich metadata, process breakdowns, and transparent pricing ranges.
- **Service Area Landing Pages (`/service-areas`, `/service-areas/[slug]`)**:
  - Targeted pages for DC neighborhoods: Ward 8, Capitol Hill, Georgetown, Petworth, Brookland, Dupont Circle, Navy Yard, Cleveland Park.
- **Commercial & Institutional Portal (`/commercial`)**:
  - RFP intake for real estate developers, property managers, universities, and municipal agencies.
- **Filterable Project Portfolio (`/projects`)**:
  - Before/after showcase cards with challenges, solutions, and deliverables.
- **FAQ Page with Live Search (`/faq`)**:
  - Collapsible accordions with schema.org `FAQPage` JSON-LD markup.
- **Internal Crew & Dispatch Dashboard (`/admin`)**:
  - Live table of inquiries and bookings with status toggles (`pending`, `confirmed`, `completed`, `cancelled`).
  - Customer contact modal with tap-to-call, text customer, and email links.
  - One-click CSV export for crew route planning.
- **Mobile First Action Bar**:
  - Sticky bottom contact bar for mobile visitors with instant tap-to-call, text us, and book buttons.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Animations**: React 19, Framer Motion, Tailwind CSS v4
- **Validation**: Zod (Schema validation on booking payloads)
- **Icons**: Handcrafted accessible SVGs styled with Tailwind tokens
- **Typography**: Playfair/Cormorant serif headlines, Inter sans-serif body
- **Color Tokens**:
  - Forest Green: `#14301F` (`--forest`)
  - Moss Accent: `#4C6B3A` (`--moss`)
  - Warm Cream: `#F6F1E7` (`--cream`)
  - Charcoal Body: `#1B1B1B` (`--charcoal`)
  - Brass/Gold CTA: `#B98B3E` (`--brass`)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18.18+ or 20+
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ⚠️ Critical Owner Launch Checklist

Before launching to the public, the business owner must confirm and update the following items in **`src/content/site-config.ts`**:

| Item | Location in `site-config.ts` | Status |
| :--- | :--- | :--- |
| **Operating Hours** | `business.hours` | Confirm Sunday–Friday 8:30 AM–7:00 PM, Saturday Closed |
| **Street Address** | `business.address.street` | Replace `"Ward 8"` with exact street address |
| **DC License Number** | `trustBadges.license` | Replace `"[Add DC license # here]"` with active license |
| **Insurance Information** | `trustBadges.insurance` | Replace `"[Add insurance info here]"` with insurer & coverage |
| **Industry Associations** | `trustBadges.associations` | Add NALP or DC Chamber memberships if applicable |
| **Pricing Ranges** | `pricingTable` | Verify small / medium / large property price tiers |
| **Blocked Crew Dates** | `blockedDates` | Add planned holidays and company blackout dates |
| **Real Customer Reviews** | `testimonials` | Replace placeholder quotes with authentic Yelp/Google reviews |
| **Real Project Photos** | `projects` | Replace placeholder photos with high-res DC job photos |
| **Social Media Profiles** | `business.social` | Add Facebook, Instagram, Google Business Profile URLs |

---

## 🔌 Third-Party Integrations Guide

### 1. Calendar Availability
Currently, `src/app/api/bookings/route.ts` implements a mock adapter pattern `CalendarAdapter`. To connect Google Calendar or Cal.com:

1. Obtain a Google Cloud Service Account with Google Calendar API scope (`calendar.events`).
2. Set `GOOGLE_CALENDAR_ID` and `GOOGLE_SERVICE_ACCOUNT_EMAIL` in `.env.local`.
3. In `src/app/api/bookings/route.ts`, replace `mockCalendar.checkAvailability` with:
```typescript
import { google } from "googleapis";

const calendar = google.calendar({ version: "v3", auth: serviceAccountAuth });
const res = await calendar.freebusy.query({
  requestBody: {
    timeMin: new Date(`${date}T00:00:00Z`).toISOString(),
    timeMax: new Date(`${date}T23:59:59Z`).toISOString(),
    items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
  },
});
```

### 2. Email Confirmations
To send transactional emails to customers and internal notifications to the crew coordinator via **Resend**:

1. Install Resend: `npm install resend`
2. Add `RESEND_API_KEY` to `.env.local`.
3. In `src/app/api/bookings/route.ts`, replace `mockEmail.sendConfirmation` with:
```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Green Care Landscaping <bookings@greencarelandscaping.com>",
  to: data.email,
  subject: `Booking Confirmed: ${bookingId} - Green Care Landscaping`,
  html: `<p>Hi ${data.name}, your service is scheduled for ${data.selectedDate} at ${data.selectedTime}.</p>`,
});
```

### 3. SMS Updates
To send text confirmations and updates via **Twilio**:

1. Install Twilio: `npm install twilio`
2. Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` to `.env.local`.
3. In `src/app/api/bookings/route.ts`, replace `mockSMS.sendConfirmation` with:
```typescript
import twilio from "twilio";
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

if (data.smsConsent) {
  await client.messages.create({
    body: `Green Care Landscaping: Your booking (${bookingId}) is confirmed for ${data.selectedDate} at ${data.selectedTime}. Call/text (202) 946-9600 with any questions. Reply STOP to opt out.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: data.phone,
  });
}
```

### 4. Database Connection
A complete PostgreSQL / Supabase migration script is provided in:
- `src/lib/schema.sql` (Raw SQL with RLS policies and indexes)
- `prisma/schema.prisma` (Prisma schema)

To connect Supabase:
1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and paste the contents of `src/lib/schema.sql`.
3. Copy your project connection string into `.env.local` as `DATABASE_URL`.

---

## 📷 Replacing Placeholders & Real Photos

All placeholder image paths are referenced in:
- `src/content/site-config.ts` (`services` and `projects` arrays)
- Store high-resolution `.webp` or `.jpg` project photos inside `/public/images/`:
  - `/public/images/seasonal-cleanup-capitol-hill.jpg`
  - `/public/images/mulching-georgetown.jpg`
  - `/public/images/patio-ward8-before.jpg`
  - `/public/images/patio-ward8-after.jpg`
- Update the image path strings in `site-config.ts` and set `isPlaceholder: false`.

---

## 📊 SEO & Analytics

### Structured Data (JSON-LD)
- **LocalBusiness / LandscapingBusiness**: Implemented in `src/app/layout.tsx` with business hours, address, phone number, and service area.
- **FAQPage**: Implemented in `src/app/faq/page.tsx`.

### GA4 Tracking
Event dispatchers are configured in `src/lib/analytics.ts` and wired into user interactions:
- `booking_started` (triggered when choosing Path A or Path B)
- `booking_step` (triggered on each step progression 1–6)
- `booking_completed` (triggered on API confirmation)
- `call_click` (triggered when clicking phone numbers or tap-to-call)
- `text_click` (triggered when clicking "Text us")
#   G r e e n - C a r e - L a n d s c a p i n g - 2  
 