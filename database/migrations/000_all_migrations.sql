-- ============================================
-- COMPLETE DATABASE MIGRATION
-- Run this file to set up the entire database
-- ============================================

-- ============================================
-- MIGRATION 001: Initial Schema
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create custom types (only if they don't exist)
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('individual', 'company');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE car_status AS ENUM ('available', 'maintenance', 'disabled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('requested', 'confirmed', 'in_progress', 'completed', 'cancelled', 'dispute');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('payment', 'payout', 'refund');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table (extends auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    type user_type NOT NULL DEFAULT 'individual',
    company_id UUID,
    roles TEXT[] DEFAULT '{}',
    verified_driver_license BOOLEAN DEFAULT FALSE,
    driver_license_meta JSONB,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address JSONB,
    billing_info JSONB,
    admin_user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint for users.company_id
ALTER TABLE users ADD CONSTRAINT users_company_id_fkey 
    FOREIGN KEY (company_id) REFERENCES companies(id);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
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
    location POINT,
    city VARCHAR(100),
    description TEXT,
    pricing JSONB NOT NULL DEFAULT '{}',
    rules JSONB DEFAULT '{}',
    status car_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car availability/calendar
CREATE TABLE IF NOT EXISTS car_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    start_ts TIMESTAMP WITH TIME ZONE NOT NULL,
    end_ts TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR(20) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
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
CREATE TABLE IF NOT EXISTS transactions (
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
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance logs
CREATE TABLE IF NOT EXISTS maintenance_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID NOT NULL REFERENCES cars(id),
    description TEXT NOT NULL,
    cost_cents INTEGER DEFAULT 0,
    performed_by UUID REFERENCES users(id),
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    user_id UUID NOT NULL REFERENCES users(id),
    assignee_id UUID REFERENCES users(id),
    subject VARCHAR(255) NOT NULL,
    messages JSONB DEFAULT '[]',
    status ticket_status DEFAULT 'open',
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
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
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_cars_owner_id ON cars(owner_id);
CREATE INDEX IF NOT EXISTS idx_cars_location ON cars USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_cars_city ON cars(city);
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_car_availability_car_id ON car_availability(car_id);
CREATE INDEX IF NOT EXISTS idx_car_availability_dates ON car_availability(start_ts, end_ts);
CREATE INDEX IF NOT EXISTS idx_bookings_car_id ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_ts, end_ts);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_logs_car_id ON maintenance_logs(car_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assignee_id ON support_tickets(assignee_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON support_tickets;
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION 002: RLS Policies
-- ============================================

-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user has role
CREATE OR REPLACE FUNCTION user_has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND required_role = ANY(roles)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN user_has_role('admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is owner of car
CREATE OR REPLACE FUNCTION is_car_owner(car_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM cars 
        WHERE id = car_id 
        AND owner_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own profile" ON users;
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all users" ON users;
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all users" ON users;
CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (is_admin());

-- Companies table policies
DROP POLICY IF EXISTS "Users can view companies they belong to" ON companies;
CREATE POLICY "Users can view companies they belong to" ON companies
    FOR SELECT USING (
        id IN (
            SELECT company_id FROM users WHERE id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Company admins can update their company" ON companies;
CREATE POLICY "Company admins can update their company" ON companies
    FOR UPDATE USING (
        admin_user_id = auth.uid() OR is_admin()
    );

DROP POLICY IF EXISTS "Admins can view all companies" ON companies;
CREATE POLICY "Admins can view all companies" ON companies
    FOR SELECT USING (is_admin());

-- Cars table policies
DROP POLICY IF EXISTS "Anyone can view available cars" ON cars;
CREATE POLICY "Anyone can view available cars" ON cars
    FOR SELECT USING (status = 'available');

DROP POLICY IF EXISTS "Car owners can view their own cars" ON cars;
CREATE POLICY "Car owners can view their own cars" ON cars
    FOR SELECT USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "Car owners can update their own cars" ON cars;
CREATE POLICY "Car owners can update their own cars" ON cars
    FOR UPDATE USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "Car owners can insert their own cars" ON cars;
CREATE POLICY "Car owners can insert their own cars" ON cars
    FOR INSERT WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all cars" ON cars;
CREATE POLICY "Admins can view all cars" ON cars
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all cars" ON cars;
CREATE POLICY "Admins can update all cars" ON cars
    FOR UPDATE USING (is_admin());

-- Car availability policies
DROP POLICY IF EXISTS "Anyone can view car availability" ON car_availability;
CREATE POLICY "Anyone can view car availability" ON car_availability
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Car owners can manage their car availability" ON car_availability;
CREATE POLICY "Car owners can manage their car availability" ON car_availability
    FOR ALL USING (is_car_owner(car_id));

DROP POLICY IF EXISTS "Admins can manage all car availability" ON car_availability;
CREATE POLICY "Admins can manage all car availability" ON car_availability
    FOR ALL USING (is_admin());

-- Bookings table policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (renter_id = auth.uid());

DROP POLICY IF EXISTS "Car owners can view bookings for their cars" ON bookings;
CREATE POLICY "Car owners can view bookings for their cars" ON bookings
    FOR SELECT USING (is_car_owner(car_id));

DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;
CREATE POLICY "Users can create their own bookings" ON bookings
    FOR INSERT WITH CHECK (renter_id = auth.uid());

DROP POLICY IF EXISTS "Car owners can update bookings for their cars" ON bookings;
CREATE POLICY "Car owners can update bookings for their cars" ON bookings
    FOR UPDATE USING (is_car_owner(car_id));

DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE USING (renter_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all bookings" ON bookings;
CREATE POLICY "Admins can view all bookings" ON bookings
    FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all bookings" ON bookings;
CREATE POLICY "Admins can update all bookings" ON bookings
    FOR UPDATE USING (is_admin());

-- Transactions table policies
DROP POLICY IF EXISTS "Users can view transactions for their bookings" ON transactions;
CREATE POLICY "Users can view transactions for their bookings" ON transactions
    FOR SELECT USING (
        booking_id IN (
            SELECT id FROM bookings WHERE renter_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Car owners can view transactions for their car bookings" ON transactions;
CREATE POLICY "Car owners can view transactions for their car bookings" ON transactions
    FOR SELECT USING (
        booking_id IN (
            SELECT id FROM bookings WHERE car_id IN (
                SELECT id FROM cars WHERE owner_id = auth.uid()
            )
        )
    );

DROP POLICY IF EXISTS "Finance and admin can view all transactions" ON transactions;
CREATE POLICY "Finance and admin can view all transactions" ON transactions
    FOR SELECT USING (
        user_has_role('finance') OR user_has_role('admin')
    );

DROP POLICY IF EXISTS "Finance and admin can update transactions" ON transactions;
CREATE POLICY "Finance and admin can update transactions" ON transactions
    FOR UPDATE USING (
        user_has_role('finance') OR user_has_role('admin')
    );

-- Reviews table policies
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create reviews for their bookings" ON reviews;
CREATE POLICY "Users can create reviews for their bookings" ON reviews
    FOR INSERT WITH CHECK (
        reviewer_id = auth.uid() AND
        booking_id IN (
            SELECT id FROM bookings WHERE renter_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Admins can manage all reviews" ON reviews;
CREATE POLICY "Admins can manage all reviews" ON reviews
    FOR ALL USING (is_admin());

-- Maintenance logs policies
DROP POLICY IF EXISTS "Car owners can view maintenance for their cars" ON maintenance_logs;
CREATE POLICY "Car owners can view maintenance for their cars" ON maintenance_logs
    FOR SELECT USING (
        car_id IN (SELECT id FROM cars WHERE owner_id = auth.uid())
    );

DROP POLICY IF EXISTS "Car owners can create maintenance logs for their cars" ON maintenance_logs;
CREATE POLICY "Car owners can create maintenance logs for their cars" ON maintenance_logs
    FOR INSERT WITH CHECK (
        car_id IN (SELECT id FROM cars WHERE owner_id = auth.uid())
    );

DROP POLICY IF EXISTS "Admins can view all maintenance logs" ON maintenance_logs;
CREATE POLICY "Admins can view all maintenance logs" ON maintenance_logs
    FOR SELECT USING (is_admin());

-- Support tickets policies
DROP POLICY IF EXISTS "Users can view their own tickets" ON support_tickets;
CREATE POLICY "Users can view their own tickets" ON support_tickets
    FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create tickets" ON support_tickets;
CREATE POLICY "Users can create tickets" ON support_tickets
    FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Support staff can view assigned tickets" ON support_tickets;
CREATE POLICY "Support staff can view assigned tickets" ON support_tickets
    FOR SELECT USING (
        assignee_id = auth.uid() OR user_has_role('support') OR user_has_role('admin')
    );

DROP POLICY IF EXISTS "Support staff can update tickets" ON support_tickets;
CREATE POLICY "Support staff can update tickets" ON support_tickets
    FOR UPDATE USING (
        assignee_id = auth.uid() OR user_has_role('support') OR user_has_role('admin')
    );

-- Audit logs policies
DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_logs;
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (is_admin());

-- ============================================
-- MIGRATION 003: Favorites, Messages, Notifications
-- ============================================

-- Favorites/Wishlist table
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, car_id)
);

-- Messages table for communication between users
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    sender_id UUID NOT NULL REFERENCES users(id),
    receiver_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_car_id ON favorites(car_id);
CREATE INDEX IF NOT EXISTS idx_messages_booking_id ON messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- MIGRATION 004: RLS for New Tables
-- ============================================

-- Enable RLS on new tables
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Favorites policies
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
CREATE POLICY "Users can view their own favorites" ON favorites
    FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can add their own favorites" ON favorites;
CREATE POLICY "Users can add their own favorites" ON favorites
    FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;
CREATE POLICY "Users can delete their own favorites" ON favorites
    FOR DELETE USING (user_id = auth.uid());

-- Messages policies
DROP POLICY IF EXISTS "Users can view messages they sent or received" ON messages;
CREATE POLICY "Users can view messages they sent or received" ON messages
    FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (sender_id = auth.uid());

DROP POLICY IF EXISTS "Users can update messages they received (mark as read)" ON messages;
CREATE POLICY "Users can update messages they received (mark as read)" ON messages
    FOR UPDATE USING (receiver_id = auth.uid());

-- Notifications policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify all tables were created
DO $$
DECLARE
    table_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name IN (
        'users', 'companies', 'cars', 'car_availability', 'bookings',
        'transactions', 'reviews', 'maintenance_logs', 'support_tickets',
        'audit_logs', 'favorites', 'messages', 'notifications'
    );
    
    IF table_count = 13 THEN
        RAISE NOTICE '✅ All 13 tables created successfully!';
    ELSE
        RAISE WARNING '⚠️ Expected 13 tables, found %', table_count;
    END IF;
END $$;
