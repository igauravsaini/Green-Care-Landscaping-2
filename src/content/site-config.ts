/**
 * GREEN CARE LANDSCAPING — Content & Configuration
 * =================================================
 * All editable business info, pricing, hours, and placeholders live here.
 * Before launch, search for "CONFIRM BEFORE LAUNCH" and replace every placeholder.
 *
 * ⚠️ CONFIRM BEFORE LAUNCH: Verify ALL values below with the business owner.
 */

// ─── Business Info ──────────────────────────────────────────────────────
export const business = {
  name: "Green Care Landscaping",
  shortName: "Green Care",
  tagline: "Outdoor spaces, crafted with care since 2001.",
  description:
    "Washington, DC's trusted landscaping partner since 2001. From seasonal yard maintenance to custom patios and retaining walls, we bring care, craft, and commitment to every project.",
  established: 2001,
  heroHeadline: "Outdoor spaces, cared for since 2001.",
  heroSubhead:
    "Expert landscaping and hardscaping for homes, developers, and institutions across Washington, DC.",
  phone: "+1 202-946-9600",
  phoneDisplay: "(202) 946-9600",
  phoneHref: "tel:+12029469600",
  textHref: "sms:+12029469600",
  email: "info@greencarelandscaping.com", // CONFIRM BEFORE LAUNCH
  address: {
    street: "Ward 8", // CONFIRM BEFORE LAUNCH: Add full street address
    city: "Washington",
    state: "DC",
    zip: "20020",
    full: "Ward 8, Washington, DC 20020",
  },
  /**
   * CONFIRM BEFORE LAUNCH — Hours
   * The owner should verify these are accurate.
   */
  hours: {
    display: "Sun–Fri: 8:30 AM – 7:00 PM · Closed Saturday",
    structured: [
      { days: "Sunday", open: "08:30", close: "19:00" },
      { days: "Monday", open: "08:30", close: "19:00" },
      { days: "Tuesday", open: "08:30", close: "19:00" },
      { days: "Wednesday", open: "08:30", close: "19:00" },
      { days: "Thursday", open: "08:30", close: "19:00" },
      { days: "Friday", open: "08:30", close: "19:00" },
      { days: "Saturday", open: null, close: null },
    ],
    closedDay: "Saturday",
  },
  /** Yelp listing */
  yelpUrl: "https://www.yelp.com/biz/green-care-landscaping-washington",
  /** Social links — CONFIRM BEFORE LAUNCH */
  social: {
    facebook: "", // CONFIRM BEFORE LAUNCH: Add Facebook URL
    instagram: "", // CONFIRM BEFORE LAUNCH: Add Instagram URL
    google: "", // CONFIRM BEFORE LAUNCH: Add Google Business URL
  },
} as const;

// ─── Trust Badges — Only shown when filled ──────────────────────────────
export const trustBadges = {
  license: "[Add DC license # here]", // CONFIRM BEFORE LAUNCH
  insurance: "[Add insurance info here]", // CONFIRM BEFORE LAUNCH
  associations: [] as string[], // CONFIRM BEFORE LAUNCH: e.g. ["NALP Member"]
  yearsInBusiness: new Date().getFullYear() - business.established,
  dcBasedCrews: true,
};

// ─── Services ───────────────────────────────────────────────────────────
export type ServiceCategory = "maintenance" | "hardscaping";

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  icon: string; // Lucide icon name
  image: string; // placeholder path
  imageAlt: string;
  bookable: boolean; // true = instant booking, false = assessment
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    id: "seasonal-cleanups",
    slug: "seasonal-cleanups",
    name: "Seasonal Cleanups",
    shortDescription:
      "Spring and fall cleanup including trash, debris pickup, and leaf removal to keep your property pristine year-round.",
    longDescription:
      "Our seasonal cleanup service prepares your yard for every season. In spring, we remove winter debris, dead foliage, and accumulated trash. In fall, we clear leaves, trim back perennials, and prepare your landscape for winter. Every cleanup includes a thorough inspection and recommendations for ongoing care.",
    category: "maintenance",
    icon: "Leaf",
    image: "/images/placeholder-seasonal-cleanup.jpg",
    imageAlt:
      "Professional seasonal yard cleanup in Washington DC — REPLACE WITH REAL PROJECT PHOTO",
    bookable: true,
    seoTitle: "Spring & Fall Cleanup Services in Washington DC | Green Care Landscaping",
    seoDescription:
      "Professional seasonal cleanup services in DC. Spring debris removal, fall leaf cleanup, and year-round property maintenance. Serving DC since 2001.",
  },
  {
    id: "mulching-edging",
    slug: "mulching-and-edging",
    name: "Mulching & Edging",
    shortDescription:
      "Fresh mulch and crisp bed edges that transform the look of your garden beds and suppress weeds.",
    longDescription:
      "Professional mulching and edging give your landscape a finished, polished look while protecting plant roots and suppressing weeds. We use premium hardwood mulch in natural or dyed varieties, applied at the ideal 2–3 inch depth. Our precision edging creates clean, defined borders between beds, walkways, and lawn areas.",
    category: "maintenance",
    icon: "Layers",
    image: "/images/placeholder-mulching.jpg",
    imageAlt:
      "Fresh mulch and precision edging on a DC residential property — REPLACE WITH REAL PROJECT PHOTO",
    bookable: true,
    seoTitle: "Mulching & Edging Services in Washington DC | Green Care Landscaping",
    seoDescription:
      "Premium mulching and precision edging in Washington DC. Weed suppression, moisture retention, and a polished landscape finish. Free estimates.",
  },
  {
    id: "lawn-seeding",
    slug: "lawn-seeding-and-maintenance",
    name: "Lawn Seeding & Maintenance",
    shortDescription:
      "From seeding and overseeding to ongoing mowing and fertilization — a lush, healthy lawn all season.",
    longDescription:
      "Whether you're establishing a new lawn or reviving a tired one, our lawn seeding and maintenance programs deliver results. We perform soil analysis, select the right seed blend for DC's climate, and provide ongoing care including mowing, fertilization, aeration, and weed management. Our maintenance plans are tailored to your property's unique needs.",
    category: "maintenance",
    icon: "Sprout",
    image: "/images/placeholder-lawn-maintenance.jpg",
    imageAlt:
      "Lush green lawn maintained by Green Care Landscaping in DC — REPLACE WITH REAL PROJECT PHOTO",
    bookable: true,
    seoTitle: "Lawn Seeding & Maintenance in Washington DC | Green Care Landscaping",
    seoDescription:
      "Expert lawn seeding, overseeding, and ongoing lawn maintenance in DC. Lush, healthy lawns tailored to Washington's climate. Call for a free estimate.",
  },
  {
    id: "patios",
    slug: "patios",
    name: "Custom Patios",
    shortDescription:
      "Beautifully designed patios in stone, pavers, or concrete that extend your living space outdoors.",
    longDescription:
      "A custom patio transforms your backyard into an outdoor living room. Our design team works with you to choose materials — from natural flagstone to architectural pavers — that complement your home and lifestyle. Every patio we build includes proper grading, a compacted aggregate base, and expert installation for decades of enjoyment.",
    category: "hardscaping",
    icon: "LayoutGrid",
    image: "/images/placeholder-patio.jpg",
    imageAlt:
      "Custom stone patio installation in Washington DC — REPLACE WITH REAL PROJECT PHOTO",
    bookable: false,
    seoTitle: "Custom Patio Installation in Washington DC | Green Care Landscaping",
    seoDescription:
      "Custom patio design and installation in DC. Stone, pavers, and concrete patios built to last. Free on-site assessment. Serving DC since 2001.",
  },
  {
    id: "retaining-walls",
    slug: "retaining-walls",
    name: "Retaining Walls",
    shortDescription:
      "Structural retaining walls that manage slopes, prevent erosion, and add architectural character.",
    longDescription:
      "Retaining walls solve grading challenges while adding beauty and value to your property. We engineer walls in natural stone, segmental block, or poured concrete — each designed for your site's specific soil conditions and drainage requirements. From garden terraces to structural grade changes, we build walls that stand the test of time.",
    category: "hardscaping",
    icon: "Blocks",
    image: "/images/placeholder-retaining-wall.jpg",
    imageAlt:
      "Stone retaining wall built by Green Care Landscaping in DC — REPLACE WITH REAL PROJECT PHOTO",
    bookable: false,
    seoTitle: "Retaining Wall Construction in Washington DC | Green Care Landscaping",
    seoDescription:
      "Expert retaining wall construction in DC. Natural stone, block, and concrete walls for erosion control and landscape design. Free assessment.",
  },
];

// ─── Service Area ───────────────────────────────────────────────────────
export interface ServiceArea {
  name: string;
  slug: string;
  ward?: string;
  seoTitle: string;
  seoDescription: string;
  description: string; // unique SEO copy
}

export const serviceAreas: ServiceArea[] = [
  {
    name: "Ward 8",
    slug: "ward-8",
    ward: "Ward 8",
    seoTitle: "Landscaping in Ward 8, Washington DC | Green Care Landscaping",
    seoDescription:
      "Professional landscaping services in Ward 8, DC. Lawn maintenance, seasonal cleanups, patios, and retaining walls. Locally based since 2001.",
    description:
      "As a Ward 8-based company, Green Care Landscaping is proud to serve the neighborhood we call home. From Congress Heights to Bellevue, we provide expert lawn care, seasonal maintenance, and hardscaping services to homeowners and institutions throughout Ward 8.",
  },
  {
    name: "Anacostia",
    slug: "anacostia",
    ward: "Ward 8",
    seoTitle: "Landscaping in Anacostia, Washington DC | Green Care Landscaping",
    seoDescription:
      "Trusted Anacostia landscaping since 2001. Lawn care, mulching, patios, and retaining walls. Your local DC landscaper.",
    description:
      "Anacostia deserves beautiful outdoor spaces. Green Care Landscaping brings over two decades of expertise to Anacostia homes and commercial properties, delivering expert lawn care, garden design, and hardscape construction that honors the character of this historic neighborhood.",
  },
  {
    name: "Capitol Hill",
    slug: "capitol-hill",
    ward: "Ward 6",
    seoTitle: "Landscaping in Capitol Hill, Washington DC | Green Care Landscaping",
    seoDescription:
      "Capitol Hill landscaping and hardscaping services. Row house gardens, patios, and year-round lawn maintenance. Serving DC since 2001.",
    description:
      "Capitol Hill's charming row houses deserve equally charming outdoor spaces. We specialize in the unique challenges of urban DC properties — small but impactful front gardens, rear patio installations, and ongoing maintenance that keeps your Capitol Hill home looking its best.",
  },
  {
    name: "Georgetown",
    slug: "georgetown",
    seoTitle: "Landscaping in Georgetown, Washington DC | Green Care Landscaping",
    seoDescription:
      "Georgetown landscaping services. Garden maintenance, patio design, and seasonal care for DC's premier neighborhood.",
    description:
      "Georgetown's lush gardens and historic properties require a landscaper who understands both horticulture and heritage. Green Care Landscaping provides meticulous lawn care, garden maintenance, and custom hardscaping that respects Georgetown's distinctive character.",
  },
  {
    name: "Petworth",
    slug: "petworth",
    ward: "Ward 4",
    seoTitle: "Landscaping in Petworth, Washington DC | Green Care Landscaping",
    seoDescription:
      "Petworth landscaping company. Lawn care, mulching, patios, and seasonal cleanups. Locally trusted since 2001.",
    description:
      "Petworth's tree-lined streets and generous yards are a landscaper's canvas. From lawn renovation and seasonal maintenance to paver patios and garden walls, Green Care Landscaping helps Petworth homeowners make the most of their outdoor spaces.",
  },
  {
    name: "Brookland",
    slug: "brookland",
    ward: "Ward 5",
    seoTitle: "Landscaping in Brookland, Washington DC | Green Care Landscaping",
    seoDescription:
      "Brookland landscaping and lawn care. Seasonal cleanups, mulching, edging, and custom patios. Your DC landscaper since 2001.",
    description:
      "Brookland's spacious lots and community-focused neighborhoods are perfect for creative landscaping. We serve Brookland residents with everything from basic lawn maintenance to complete landscape transformations, always with the friendly, responsive service our clients expect.",
  },
];

// ─── How It Works ───────────────────────────────────────────────────────
export const howItWorks = [
  {
    step: 1,
    title: "Book Online or Call",
    description:
      "Choose your service and preferred date in under two minutes — or simply give us a call.",
    icon: "CalendarCheck",
  },
  {
    step: 2,
    title: "On-Site Assessment",
    description:
      "We visit your property, evaluate the scope, and discuss your vision in person.",
    icon: "ClipboardCheck",
  },
  {
    step: 3,
    title: "Written Quote",
    description:
      "You receive a clear, itemized quote within 24 hours — no surprises, no hidden fees.",
    icon: "FileText",
  },
  {
    step: 4,
    title: "Work Done & Follow-Up",
    description:
      "Our crew completes the work, walks you through the results, and follows up to ensure you're satisfied.",
    icon: "CheckCircle",
  },
];

// ─── Communication Promise ─────────────────────────────────────────────
/**
 * CONFIRM BEFORE LAUNCH — These response-time promises need owner sign-off.
 */
export const communicationPromise = {
  headline: "Our Communication Promise",
  subhead:
    "We know you value responsiveness as much as quality work. Here's what you can expect:",
  promises: [
    {
      title: "Booking confirmation in minutes",
      description: "You'll receive a confirmation text or email within 15 minutes of booking.", // CONFIRM BEFORE LAUNCH: verify 15 min
      icon: "Zap",
    },
    {
      title: "A named point of contact",
      description:
        "One dedicated team member handles your project from start to finish — no runaround.",
      icon: "User",
    },
    {
      title: "Text updates at every stage",
      description:
        "We text you when the crew is on the way, when work begins, and when it's complete.",
      icon: "MessageSquare",
    },
    {
      title: "Quick reply to change requests",
      description:
        "Need to adjust the scope or schedule? We respond to mid-project changes within 2 hours.", // CONFIRM BEFORE LAUNCH: verify 2 hours
      icon: "RefreshCw",
    },
  ],
};

// ─── Pricing Table ──────────────────────────────────────────────────────
/**
 * CONFIRM BEFORE LAUNCH — All prices need owner verification.
 * Prices are [min, max] ranges in USD.
 */
export interface PriceRange {
  min: number;
  max: number;
}

export const pricingTable: Record<string, Record<string, PriceRange>> = {
  "seasonal-cleanups": {
    small: { min: 150, max: 250 },
    medium: { min: 250, max: 400 },
    large: { min: 400, max: 650 },
  },
  "mulching-edging": {
    small: { min: 120, max: 200 },
    medium: { min: 200, max: 350 },
    large: { min: 350, max: 550 },
  },
  "lawn-seeding": {
    small: { min: 200, max: 350 },
    medium: { min: 350, max: 550 },
    large: { min: 550, max: 850 },
  },
};

// ─── Blocked Dates ──────────────────────────────────────────────────────
/**
 * CONFIRM BEFORE LAUNCH — Add any dates the crew is unavailable.
 * Format: "YYYY-MM-DD"
 */
export const blockedDates: string[] = [
  // Example: "2025-12-25", "2025-01-01"
];

// ─── Testimonials (PLACEHOLDERS) ────────────────────────────────────────
/**
 * REPLACE WITH REAL REVIEWS before launch.
 * Do NOT use these as-is — they are clearly labelled placeholders.
 */
export const testimonials = [
  {
    id: 1,
    quote:
      "[Placeholder review] The crew was incredibly hard-working and friendly. They transformed our backyard in just two days.",
    author: "[Client Name]",
    location: "[Neighborhood, DC]",
    service: "Patio Installation",
    rating: 5,
    source: "google" as const,
    isPlaceholder: true,
  },
  {
    id: 2,
    quote:
      "[Placeholder review] We've used Green Care for seasonal maintenance for three years. Consistently professional and responsive.",
    author: "[Client Name]",
    location: "[Neighborhood, DC]",
    service: "Seasonal Maintenance",
    rating: 5,
    source: "yelp" as const,
    isPlaceholder: true,
  },
  {
    id: 3,
    quote:
      "[Placeholder review] From the initial assessment to the final walkthrough, communication was clear and timely. Highly recommend.",
    author: "[Client Name]",
    location: "[Neighborhood, DC]",
    service: "Retaining Wall",
    rating: 5,
    source: "google" as const,
    isPlaceholder: true,
  },
  {
    id: 4,
    quote:
      "[Placeholder review] They showed up on time, worked efficiently, and left our property spotless. The best landscapers we've hired in DC.",
    author: "[Client Name]",
    location: "[Neighborhood, DC]",
    service: "Spring Cleanup",
    rating: 5,
    source: "yelp" as const,
    isPlaceholder: true,
  },
];

// ─── Portfolio / Projects (PLACEHOLDERS) ────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  serviceTags: string[];
  location: string;
  beforeImage: string;
  afterImage: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  result: string;
  isPlaceholder: boolean;
}

export const projects: Project[] = [
  {
    id: "project-1",
    slug: "capitol-hill-patio-transformation",
    title: "Capitol Hill Patio Transformation",
    category: "hardscaping",
    serviceTags: ["patios", "retaining-walls"],
    location: "[Capitol Hill, DC]",
    beforeImage: "/images/placeholder-before-1.jpg",
    afterImage: "/images/placeholder-after-1.jpg",
    imageAlt: "Before and after patio installation — REPLACE WITH REAL PROJECT PHOTO",
    challenge:
      "[Placeholder] The homeowner's backyard was an uneven, underused dirt patch with drainage issues.",
    solution:
      "[Placeholder] We designed a multi-level flagstone patio with integrated drainage and a low retaining wall to create usable outdoor living space.",
    result:
      "[Placeholder] The family gained 400 sq ft of entertaining space and the property value increased significantly.",
    isPlaceholder: true,
  },
  {
    id: "project-2",
    slug: "ward-8-community-garden",
    title: "Ward 8 Community Garden Renovation",
    category: "maintenance",
    serviceTags: ["seasonal-cleanups", "mulching-edging", "lawn-seeding"],
    location: "[Ward 8, DC]",
    beforeImage: "/images/placeholder-before-2.jpg",
    afterImage: "/images/placeholder-after-2.jpg",
    imageAlt: "Before and after community garden renovation — REPLACE WITH REAL PROJECT PHOTO",
    challenge:
      "[Placeholder] A neglected community green space needed a complete refresh to become an inviting neighborhood gathering spot.",
    solution:
      "[Placeholder] Our team cleared debris, re-graded the site, seeded new lawn areas, installed fresh mulch beds, and added clean edging throughout.",
    result:
      "[Placeholder] The space is now a vibrant community hub used daily by residents and neighborhood organizations.",
    isPlaceholder: true,
  },
  {
    id: "project-3",
    slug: "university-campus-landscaping",
    title: "University Campus Landscape Overhaul",
    category: "maintenance",
    serviceTags: ["seasonal-cleanups", "lawn-seeding", "mulching-edging"],
    location: "[University Campus, DC]",
    beforeImage: "/images/placeholder-before-3.jpg",
    afterImage: "/images/placeholder-after-3.jpg",
    imageAlt: "Before and after campus landscaping — REPLACE WITH REAL PROJECT PHOTO",
    challenge:
      "[Placeholder] Aging campus grounds with patchy lawns, overgrown beds, and inconsistent maintenance across multiple buildings.",
    solution:
      "[Placeholder] We implemented a comprehensive grounds management program including seasonal cleanups, lawn renovation, and ongoing weekly maintenance.",
    result:
      "[Placeholder] The campus now presents a cohesive, well-maintained appearance that impresses prospective students and visitors.",
    isPlaceholder: true,
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────
export const faqs = [
  {
    question: "How much does landscaping cost in DC?",
    answer:
      "Costs vary based on the service, property size, and scope of work. Seasonal cleanups for a typical DC rowhouse start around $150–$250. Mulching and edging packages begin at $120. Hardscaping projects like patios are quoted individually after an on-site assessment. We provide transparent, written estimates before any work begins.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can book online through our website in under two minutes, call us at (202) 946-9600, or text us at the same number. For maintenance services, you'll get an instant estimate. For patios and retaining walls, we'll schedule a free on-site assessment.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve all of Washington, DC, with a focus on Ward 8, Anacostia, Capitol Hill, Georgetown, Petworth, Brookland, and surrounding neighborhoods. We also work with commercial clients and institutions throughout the District.",
  },
  {
    question: "What happens during a free on-site assessment?",
    answer:
      "One of our team leads visits your property, reviews the scope of work with you, takes measurements and photos, discusses materials and design options, and answers any questions. You'll receive a detailed written quote within 24 hours of the visit.",
  },
  {
    question: "What if it rains on my scheduled service day?",
    answer:
      "Safety comes first. If weather prevents us from working, we'll text you to reschedule at the earliest available date — usually within 1–2 business days. You're never charged for weather-related delays.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, Green Care Landscaping is fully licensed and insured to operate in Washington, DC. [Add specific license and insurance details here — CONFIRM BEFORE LAUNCH]",
  },
  {
    question: "Do you work with commercial clients?",
    answer:
      "Absolutely. We serve real estate developers, property managers, universities, and local government agencies. Our commercial team handles everything from landscape installations for new developments to ongoing grounds maintenance contracts. Contact us for a custom proposal.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "For routine maintenance, we can usually accommodate requests within a week. During peak seasons (spring and fall), we recommend booking 2–3 weeks ahead. Hardscaping projects typically require 3–4 weeks of lead time for design and material sourcing.",
  },
];

// ─── Who We Serve ───────────────────────────────────────────────────────
export const clientTypes = [
  {
    title: "Homeowners",
    description:
      "From row houses to estates, we keep DC homes looking their best with reliable maintenance and thoughtful design.",
    icon: "Home",
    cta: "Book a Service",
    href: "/book",
  },
  {
    title: "Developers & Property Managers",
    description:
      "Landscape installations for new builds, renovations, and ongoing property management across DC.",
    icon: "Building2",
    cta: "Request a Proposal",
    href: "/commercial",
  },
  {
    title: "Universities & Government",
    description:
      "Campus grounds, public spaces, and municipal properties maintained to the highest standards.",
    icon: "Landmark",
    cta: "Request a Proposal",
    href: "/commercial",
  },
];

// ─── Seasonal Banners ──────────────────────────────────────────────────
export const seasonalBanners = [
  {
    months: [3, 4, 5], // March, April, May
    headline: "Spring Cleanup Season Is Here",
    subhead:
      "Clear winter debris, refresh your beds, and get your yard ready for the warm months.",
    cta: "Book Spring Cleanup",
    service: "seasonal-cleanups",
  },
  {
    months: [6, 7, 8], // June, July, August
    headline: "Keep Your Lawn Thriving This Summer",
    subhead:
      "Ongoing maintenance, fresh mulch, and expert care to keep your yard looking lush all summer.",
    cta: "Schedule Maintenance",
    service: "lawn-seeding",
  },
  {
    months: [9, 10, 11], // September, October, November
    headline: "Fall Cleanup — Prepare for Winter",
    subhead:
      "Leaf removal, bed prep, and seasonal care to protect your landscape through the cold months.",
    cta: "Book Fall Cleanup",
    service: "seasonal-cleanups",
  },
  {
    months: [12, 1, 2], // December, January, February
    headline: "Plan Your Spring Landscape Now",
    subhead:
      "Get ahead of the season — schedule your spring cleanup or hardscaping project today.",
    cta: "Book Ahead",
    service: "seasonal-cleanups",
  },
];

// ─── Navigation ─────────────────────────────────────────────────────────
export const navigation = {
  main: [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      children: services.map((s) => ({
        label: s.name,
        href: `/services/${s.slug}`,
      })),
    },
    { label: "Commercial", href: "/commercial" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Book Now", href: "/book" },
};

// ─── SEO Defaults ───────────────────────────────────────────────────────
export const seo = {
  siteName: "Green Care Landscaping",
  defaultTitle: "Green Care Landscaping | Washington DC Landscaper Since 2001",
  defaultDescription:
    "Professional landscaping and hardscaping in Washington, DC. Seasonal cleanups, lawn maintenance, custom patios, and retaining walls. Serving DC since 2001. Call (202) 946-9600.",
  defaultOgImage: "/images/og-default.jpg", // REPLACE WITH REAL OG IMAGE
  url: "https://greencarelandscaping.com", // CONFIRM BEFORE LAUNCH
};
