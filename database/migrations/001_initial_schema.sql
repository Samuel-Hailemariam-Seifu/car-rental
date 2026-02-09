-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types
CREATE TYPE user_type AS ENUM ('individual', 'company');
CREATE TYPE car_status AS ENUM ('available', 'maintenance', 'disabled');
CREATE TYPE booking_status AS ENUM ('requested', 'confirmed', 'in_progress', 'completed', 'cancelled', 'dispute');
CREATE TYPE transaction_type AS ENUM ('payment', 'payout', 'refund');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- Users table (extends Clerk auth)
CREATE TABLE users (
    id UUID PRIMARY KEY, -- Clerk user ID
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    type user_type NOT NULL DEFAULT 'individual',
    company_id UUID REFERENCES companies(id),
    roles TEXT[] DEFAULT '{}',
    verified_driver_license BOOLEAN DEFAULT FALSE,
    driver_license_meta JSONB,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address JSONB,
    billing_info JSONB,
    admin_user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cars table
CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    transmission VARCHAR(20) NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    license_plate VARCHAR(20) UNIQUE,
    vin VARCHAR(17) UNIQUE,
    photos TEXT[] DEFAULT '{}',
    location POINT, -- PostGIS point for lat/lng
    city VARCHAR(100),
    description TEXT,
    pricing JSONB NOT NULL DEFAULT '{}',
    rules JSONB DEFAULT '{}',
    status car_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car availability/calendar
CREATE TABLE car_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    start_ts TIMESTAMP WITH TIME ZONE NOT NULL,
    end_ts TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'blocked', 'booked', 'maintenance'
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id),
    renter_id UUID NOT NULL REFERENCES users(id),
    start_ts TIMESTAMP WITH TIME ZONE NOT NULL,
    end_ts TIMESTAMP WITH TIME ZONE NOT NULL,
    total_amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status booking_status DEFAULT 'requested',
    payment_info JSONB DEFAULT '{}',
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    amount_cents INTEGER NOT NULL,
    fee_cents INTEGER DEFAULT 0,
    type transaction_type NOT NULL,
    status transaction_status DEFAULT 'pending',
    stripe_charge_id VARCHAR(255),
    stripe_payout_id VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance logs
CREATE TABLE maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id),
    description TEXT NOT NULL,
    cost_cents INTEGER DEFAULT 0,
    performed_by UUID REFERENCES users(id),
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    user_id UUID NOT NULL REFERENCES users(id),
    assignee_id UUID REFERENCES users(id),
    subject VARCHAR(255) NOT NULL,
    messages JSONB DEFAULT '[]',
    status ticket_status DEFAULT 'open',
    priority INTEGER DEFAULT 1, -- 1=low, 2=medium, 3=high, 4=urgent
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_cars_owner_id ON cars(owner_id);
CREATE INDEX idx_cars_location ON cars USING GIST(location);
CREATE INDEX idx_cars_city ON cars(city);
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_car_availability_car_id ON car_availability(car_id);
CREATE INDEX idx_car_availability_dates ON car_availability(start_ts, end_ts);
CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX idx_bookings_dates ON bookings(start_ts, end_ts);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_maintenance_logs_car_id ON maintenance_logs(car_id);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_assignee_id ON support_tickets(assignee_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
