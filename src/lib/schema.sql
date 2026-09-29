-- Green Care Landscaping — Supabase / PostgreSQL Database Schema
-- Run this in your Supabase SQL Editor or psql console

-- 1. Create Enums
CREATE TYPE booking_path AS ENUM ('maintenance', 'hardscaping');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE contact_method AS ENUM ('call', 'text', 'email');

-- 2. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number VARCHAR(32) NOT NULL UNIQUE,
  path booking_path NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  
  -- Services & Property
  selected_services TEXT[] NOT NULL,
  property_type VARCHAR(32),
  yard_size VARCHAR(32),
  address TEXT,
  city VARCHAR(64) DEFAULT 'Washington',
  state VARCHAR(8) DEFAULT 'DC',
  zip_code VARCHAR(16),
  
  -- Schedule
  scheduled_date DATE NOT NULL,
  scheduled_time VARCHAR(32) NOT NULL,
  
  -- Customer
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(128) NOT NULL,
  preferred_contact contact_method NOT NULL DEFAULT 'call',
  sms_consent BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  
  -- Hardscaping project specifics
  project_type VARCHAR(128),
  budget_range VARCHAR(64),
  timeline VARCHAR(64),
  has_blueprints BOOLEAN DEFAULT FALSE,
  project_details TEXT,
  
  -- Third-party integration IDs
  calendar_event_id VARCHAR(128),
  email_sent_at TIMESTAMPTZ,
  sms_sent_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(128) NOT NULL,
  service VARCHAR(64),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for public booking forms
CREATE POLICY "Allow public booking inserts" ON bookings
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admin access
CREATE POLICY "Allow authenticated read/write on bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');
