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
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (is_admin());

-- Companies table policies
CREATE POLICY "Users can view companies they belong to" ON companies
    FOR SELECT USING (
        id IN (
            SELECT company_id FROM users WHERE id = auth.uid()
        )
    );

CREATE POLICY "Company admins can update their company" ON companies
    FOR UPDATE USING (
        admin_user_id = auth.uid() OR is_admin()
    );

CREATE POLICY "Admins can view all companies" ON companies
    FOR SELECT USING (is_admin());

-- Cars table policies
CREATE POLICY "Anyone can view available cars" ON cars
    FOR SELECT USING (status = 'available');

CREATE POLICY "Car owners can view their own cars" ON cars
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Car owners can update their own cars" ON cars
    FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Car owners can insert their own cars" ON cars
    FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Admins can view all cars" ON cars
    FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all cars" ON cars
    FOR UPDATE USING (is_admin());

-- Car availability policies
CREATE POLICY "Anyone can view car availability" ON car_availability
    FOR SELECT USING (true);

CREATE POLICY "Car owners can manage their car availability" ON car_availability
    FOR ALL USING (is_car_owner(car_id));

CREATE POLICY "Admins can manage all car availability" ON car_availability
    FOR ALL USING (is_admin());

-- Bookings table policies
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (renter_id = auth.uid());

CREATE POLICY "Car owners can view bookings for their cars" ON bookings
    FOR SELECT USING (is_car_owner(car_id));

CREATE POLICY "Users can create their own bookings" ON bookings
    FOR INSERT WITH CHECK (renter_id = auth.uid());

CREATE POLICY "Car owners can update bookings for their cars" ON bookings
    FOR UPDATE USING (is_car_owner(car_id));

CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE USING (renter_id = auth.uid());

CREATE POLICY "Admins can view all bookings" ON bookings
    FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all bookings" ON bookings
    FOR UPDATE USING (is_admin());

-- Transactions table policies
CREATE POLICY "Users can view transactions for their bookings" ON transactions
    FOR SELECT USING (
        booking_id IN (
            SELECT id FROM bookings WHERE renter_id = auth.uid()
        )
    );

CREATE POLICY "Car owners can view transactions for their car bookings" ON transactions
    FOR SELECT USING (
        booking_id IN (
            SELECT id FROM bookings WHERE car_id IN (
                SELECT id FROM cars WHERE owner_id = auth.uid()
            )
        )
    );

CREATE POLICY "Finance and admin can view all transactions" ON transactions
    FOR SELECT USING (
        user_has_role('finance') OR user_has_role('admin')
    );

CREATE POLICY "Finance and admin can update transactions" ON transactions
    FOR UPDATE USING (
        user_has_role('finance') OR user_has_role('admin')
    );

-- Reviews table policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON reviews
    FOR INSERT WITH CHECK (
        reviewer_id = auth.uid() AND
        booking_id IN (
            SELECT id FROM bookings WHERE renter_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all reviews" ON reviews
    FOR ALL USING (is_admin());

-- Maintenance logs policies
CREATE POLICY "Car owners can view maintenance for their cars" ON maintenance_logs
    FOR SELECT USING (
        car_id IN (SELECT id FROM cars WHERE owner_id = auth.uid())
    );

CREATE POLICY "Car owners can create maintenance logs for their cars" ON maintenance_logs
    FOR INSERT WITH CHECK (
        car_id IN (SELECT id FROM cars WHERE owner_id = auth.uid())
    );

CREATE POLICY "Admins can view all maintenance logs" ON maintenance_logs
    FOR SELECT USING (is_admin());

-- Support tickets policies
CREATE POLICY "Users can view their own tickets" ON support_tickets
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets" ON support_tickets
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Support staff can view assigned tickets" ON support_tickets
    FOR SELECT USING (
        assignee_id = auth.uid() OR user_has_role('support') OR user_has_role('admin')
    );

CREATE POLICY "Support staff can update tickets" ON support_tickets
    FOR UPDATE USING (
        assignee_id = auth.uid() OR user_has_role('support') OR user_has_role('admin')
    );

-- Audit logs policies
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (is_admin());

-- Create function to handle user creation from Clerk
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (id, email, full_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation (if using Supabase Auth)
-- This would be triggered by Clerk webhooks in practice
