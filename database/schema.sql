-- Greenlife Spaces database schema
-- Target: PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE request_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE inquiry_status AS ENUM ('new_status', 'in_progress', 'resolved', 'archived');
CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  short_description VARCHAR(240) NOT NULL,
  description TEXT NOT NULL,
  starting_price_label VARCHAR(80) NOT NULL,
  starting_price_inr NUMERIC(10, 2),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id UUID NOT NULL REFERENCES offers(id),
  customer_name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(255),
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  requested_date DATE NOT NULL,
  notes TEXT,
  status request_status NOT NULL DEFAULT 'pending',
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX service_requests_status_idx ON service_requests(status);
CREATE INDEX service_requests_requested_date_idx ON service_requests(requested_date);

CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(255),
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status inquiry_status NOT NULL DEFAULT 'new_status',
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX inquiries_status_idx ON inquiries(status);

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE showcase_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name VARCHAR(180) NOT NULL,
  location VARCHAR(180) NOT NULL,
  duration VARCHAR(120) NOT NULL,
  summary TEXT NOT NULL,
  visual_tone VARCHAR(20) NOT NULL DEFAULT 'moss',
  status project_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT showcase_projects_visual_tone_check CHECK (visual_tone IN ('moss', 'sage', 'ochre'))
);

CREATE TABLE showcase_project_offers (
  project_id UUID NOT NULL REFERENCES showcase_projects(id) ON DELETE CASCADE,
  offer_id UUID NOT NULL REFERENCES offers(id),
  PRIMARY KEY (project_id, offer_id)
);

CREATE TABLE showcase_project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES showcase_projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(240) NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX showcase_projects_status_idx ON showcase_projects(status);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER offers_updated_at BEFORE UPDATE ON offers FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER service_requests_updated_at BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER showcase_projects_updated_at BEFORE UPDATE ON showcase_projects FOR EACH ROW EXECUTE FUNCTION set_updated_at();