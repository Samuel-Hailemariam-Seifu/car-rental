-- ============================================
-- SAMPLE DATA FOR CAR RENTAL APP
-- Run this after migrations are complete
-- ============================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE audit_logs, support_tickets, maintenance_logs, reviews, transactions, bookings, car_availability, cars, users, companies CASCADE;

-- Insert sample companies
INSERT INTO companies (id, name, address, billing_info, admin_user_id) VALUES
('11111111-1111-1111-1111-111111111111', 'TechCorp Fleet', 
 '{"street": "123 Business Ave", "city": "San Francisco", "state": "CA", "zip": "94105", "country": "USA"}',
 '{"tax_id": "12-3456789", "payment_method": "bank_transfer"}',
 NULL),
('22222222-2222-2222-2222-222222222222', 'Enterprise Rentals', 
 '{"street": "456 Corporate Blvd", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}',
 '{"tax_id": "98-7654321", "payment_method": "bank_transfer"}',
 NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert sample users
-- Note: These user IDs should match your authentication system user IDs
-- If using Supabase Auth, you'll need to create users first and use their actual IDs
INSERT INTO users (id, email, full_name, phone, type, company_id, roles, verified_driver_license, profile_image_url) VALUES
-- Admin user
('00000000-0000-0000-0000-000000000001', 'admin@carrental.com', 'Admin User', '+1234567890', 'individual', NULL, ARRAY['admin'], true, NULL),

-- Individual users (customers)
('00000000-0000-0000-0000-000000000002', 'john.doe@email.com', 'John Doe', '+1234567891', 'individual', NULL, ARRAY['customer'], true, NULL),
('00000000-0000-0000-0000-000000000003', 'jane.smith@email.com', 'Jane Smith', '+1234567892', 'individual', NULL, ARRAY['customer'], true, NULL),
('00000000-0000-0000-0000-000000000010', 'mike.johnson@email.com', 'Mike Johnson', '+1234567899', 'individual', NULL, ARRAY['customer'], true, NULL),

-- Company users
('00000000-0000-0000-0000-000000000004', 'fleet.manager@techcorp.com', 'Fleet Manager', '+1234567893', 'company', '11111111-1111-1111-1111-111111111111', ARRAY['fleet_manager', 'customer'], true, NULL),
('00000000-0000-0000-0000-000000000005', 'employee@techcorp.com', 'TechCorp Employee', '+1234567894', 'company', '11111111-1111-1111-1111-111111111111', ARRAY['customer'], true, NULL),

-- Car owners
('00000000-0000-0000-0000-000000000006', 'owner1@email.com', 'Sarah Williams', '+1234567895', 'individual', NULL, ARRAY['owner'], true, NULL),
('00000000-0000-0000-0000-000000000007', 'owner2@email.com', 'David Brown', '+1234567896', 'individual', NULL, ARRAY['owner'], true, NULL),
('00000000-0000-0000-0000-000000000011', 'owner3@email.com', 'Emily Davis', '+1234567900', 'individual', NULL, ARRAY['owner'], true, NULL),

-- Support and finance staff
('00000000-0000-0000-0000-000000000008', 'support@carrental.com', 'Support Staff', '+1234567897', 'individual', NULL, ARRAY['support'], true, NULL),
('00000000-0000-0000-0000-000000000009', 'finance@carrental.com', 'Finance Staff', '+1234567898', 'individual', NULL, ARRAY['finance'], true, NULL)
ON CONFLICT (id) DO NOTHING;

-- Update company admin users
UPDATE companies SET admin_user_id = '00000000-0000-0000-0000-000000000004' WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE companies SET admin_user_id = '00000000-0000-0000-0000-000000000002' WHERE id = '22222222-2222-2222-2222-222222222222';

-- Insert sample cars with realistic data
-- Using Unsplash images for car photos
INSERT INTO cars (id, owner_id, make, model, year, seats, transmission, fuel_type, license_plate, vin, photos, location, city, description, pricing, rules, status) VALUES
-- Luxury Electric Car
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000006', 'Tesla', 'Model S', 2023, 5, 'automatic', 'electric', 'TESLA001', '1HGBH41JXMN109186', 
 ARRAY[
   'https://images.unsplash.com/photo-1560958035-887f8720e5b4?w=800',
   'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
   'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'
 ], 
 POINT(-122.4194, 37.7749), 'San Francisco', 
 'Premium electric sedan with autopilot features. Perfect for city driving and long trips. Includes premium sound system and all-weather floor mats.',
 '{"daily": 150, "weekly": 900, "monthly": 3500, "deposit": 500}',
 '{"min_age": 25, "max_km": 200, "smoking": false, "pets": true}',
 'available'),

-- Economy Car
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000006', 'Honda', 'Civic', 2022, 5, 'automatic', 'gasoline', 'HONDA001', '2HGBH41JXMN109187',
 ARRAY[
   'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800',
   'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800'
 ],
 POINT(-122.4094, 37.7849), 'San Francisco',
 'Reliable and fuel-efficient compact car. Great for daily commuting. Excellent fuel economy and low maintenance costs.',
 '{"daily": 45, "weekly": 280, "monthly": 1100, "deposit": 250}',
 '{"min_age": 21, "max_km": 300, "smoking": false, "pets": false}',
 'available'),

-- Luxury SUV
('cccccccc-cccc-cccc-cccc-cccccccccccc', '00000000-0000-0000-0000-000000000007', 'BMW', 'X5', 2023, 7, 'automatic', 'gasoline', 'BMW001', '3HGBH41JXMN109188',
 ARRAY[
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
   'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
 ],
 POINT(-122.3994, 37.7949), 'San Francisco',
 'Luxury SUV with premium features. Spacious and comfortable for families. Includes panoramic sunroof, premium leather seats, and advanced safety features.',
 '{"daily": 200, "weekly": 1200, "monthly": 4500, "deposit": 750}',
 '{"min_age": 25, "max_km": 250, "smoking": false, "pets": true}',
 'available'),

-- Hybrid Sedan
('dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000007', 'Toyota', 'Camry', 2021, 5, 'automatic', 'hybrid', 'TOYOTA001', '4HGBH41JXMN109189',
 ARRAY[
   'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800',
   'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800'
 ],
 POINT(-74.0060, 40.7128), 'New York',
 'Efficient hybrid sedan. Eco-friendly and economical. Perfect balance of performance and fuel efficiency.',
 '{"daily": 60, "weekly": 380, "monthly": 1500, "deposit": 300}',
 '{"min_age": 21, "max_km": 350, "smoking": false, "pets": false}',
 'available'),

-- Sports Car
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000006', 'Ford', 'Mustang', 2023, 4, 'manual', 'gasoline', 'FORD001', '5HGBH41JXMN109190',
 ARRAY[
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
   'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'
 ],
 POINT(-74.0160, 40.7028), 'New York',
 'Classic American muscle car. Manual transmission for driving enthusiasts. High performance V8 engine with sport mode.',
 '{"daily": 180, "weekly": 1100, "monthly": 4000, "deposit": 600}',
 '{"min_age": 25, "max_km": 200, "smoking": false, "pets": false}',
 'available'),

-- Luxury Convertible
('ffffffff-ffff-ffff-ffff-ffffffffffff', '00000000-0000-0000-0000-000000000011', 'Mercedes-Benz', 'SL-Class', 2023, 2, 'automatic', 'gasoline', 'MB001', '6HGBH41JXMN109191',
 ARRAY[
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
   'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
   'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
 ],
 POINT(-122.4294, 37.7649), 'San Francisco',
 'Premium luxury convertible. Perfect for scenic drives. Includes retractable hardtop, premium sound system, and advanced driver assistance.',
 '{"daily": 250, "weekly": 1500, "monthly": 5500, "deposit": 1000}',
 '{"min_age": 30, "max_km": 150, "smoking": false, "pets": false}',
 'available'),

-- Family Minivan
('11111111-1111-1111-1111-111111111112', '00000000-0000-0000-0000-000000000011', 'Toyota', 'Sienna', 2022, 8, 'automatic', 'hybrid', 'TOYOTA002', '7HGBH41JXMN109192',
 ARRAY[
   'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800',
   'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=800'
 ],
 POINT(-74.0260, 40.6928), 'New York',
 'Spacious hybrid minivan perfect for families. Seats 8 comfortably with plenty of cargo space. Great fuel economy.',
 '{"daily": 80, "weekly": 500, "monthly": 1900, "deposit": 400}',
 '{"min_age": 21, "max_km": 400, "smoking": false, "pets": true}',
 'available')
ON CONFLICT (id) DO NOTHING;

-- Insert sample car availability (using future dates)
INSERT INTO car_availability (car_id, start_ts, end_ts, type, metadata) VALUES
-- Tesla Model S - booked for next week
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
 (CURRENT_DATE + INTERVAL '7 days')::timestamp with time zone + INTERVAL '9 hours',
 (CURRENT_DATE + INTERVAL '9 days')::timestamp with time zone + INTERVAL '18 hours',
 'booked', '{"booking_id": "10000000-0000-0000-0000-000000000001"}'),
-- BMW X5 - maintenance next month
('cccccccc-cccc-cccc-cccc-cccccccccccc', 
 (CURRENT_DATE + INTERVAL '30 days')::timestamp with time zone + INTERVAL '8 hours',
 (CURRENT_DATE + INTERVAL '32 days')::timestamp with time zone + INTERVAL '17 hours',
 'maintenance', '{"reason": "scheduled_service"}'),
-- Honda Civic - owner blocked for personal use
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
 (CURRENT_DATE + INTERVAL '15 days')::timestamp with time zone,
 (CURRENT_DATE + INTERVAL '18 days')::timestamp with time zone + INTERVAL '23 hours' + INTERVAL '59 minutes',
 'blocked', '{"reason": "personal_use"}')
ON CONFLICT DO NOTHING;

-- Insert sample bookings (using future dates)
INSERT INTO bookings (id, car_id, renter_id, start_ts, end_ts, total_amount_cents, currency, status, payment_info) VALUES
-- Completed booking (past)
('10000000-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000002', 
 (CURRENT_DATE - INTERVAL '5 days')::timestamp with time zone + INTERVAL '9 hours',
 (CURRENT_DATE - INTERVAL '3 days')::timestamp with time zone + INTERVAL '18 hours',
 45000, 'USD', 'completed', 
 '{"stripe_charge_id": "ch_1234567890", "payout_status": "paid"}'),
-- Confirmed booking (upcoming)
('10000000-0000-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000003', 
 (CURRENT_DATE + INTERVAL '10 days')::timestamp with time zone + INTERVAL '10 hours',
 (CURRENT_DATE + INTERVAL '12 days')::timestamp with time zone + INTERVAL '16 hours',
 24000, 'USD', 'confirmed', 
 '{"stripe_charge_id": "ch_1234567891", "payout_status": "pending"}'),
-- Requested booking (pending)
('10000000-0000-0000-0000-000000000003', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000005', 
 (CURRENT_DATE + INTERVAL '20 days')::timestamp with time zone + INTERVAL '8 hours',
 (CURRENT_DATE + INTERVAL '22 days')::timestamp with time zone + INTERVAL '20 hours',
 36000, 'USD', 'requested', 
 '{"stripe_payment_intent_id": "pi_1234567890"}'),
-- In progress booking
('10000000-0000-0000-0000-000000000004', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000010', 
 (CURRENT_DATE - INTERVAL '1 day')::timestamp with time zone + INTERVAL '9 hours',
 (CURRENT_DATE + INTERVAL '2 days')::timestamp with time zone + INTERVAL '18 hours',
 54000, 'USD', 'in_progress', 
 '{"stripe_charge_id": "ch_1234567892", "payout_status": "pending"}')
ON CONFLICT (id) DO NOTHING;

-- Insert sample transactions
INSERT INTO transactions (booking_id, amount_cents, fee_cents, type, status, stripe_charge_id, metadata) VALUES
('10000000-0000-0000-0000-000000000001', 45000, 4500, 'payment', 'completed', 'ch_1234567890', '{"commission_rate": 0.10}'),
('10000000-0000-0000-0000-000000000001', 40500, 0, 'payout', 'completed', NULL, '{"payout_to_owner": true, "stripe_payout_id": "po_1234567890"}'),
('10000000-0000-0000-0000-000000000002', 24000, 2400, 'payment', 'completed', 'ch_1234567891', '{"commission_rate": 0.10}'),
('10000000-0000-0000-0000-000000000004', 54000, 5400, 'payment', 'completed', 'ch_1234567892', '{"commission_rate": 0.10}')
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (booking_id, reviewer_id, reviewee_id, rating, comment) VALUES
('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', 5, 
 'Excellent car! Clean, fast, and the autopilot feature was amazing. The owner was very responsive and helpful. Will definitely rent again!'),
('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 5, 
 'Great renter! Returned the car in perfect condition and was very respectful. Communication was excellent throughout the rental period.')
ON CONFLICT DO NOTHING;

-- Insert sample maintenance logs
INSERT INTO maintenance_logs (car_id, description, cost_cents, performed_by) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Regular oil change and tire rotation', 15000, '00000000-0000-0000-0000-000000000007'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Brake pad replacement and brake fluid flush', 25000, '00000000-0000-0000-0000-000000000006'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Battery inspection and software update', 5000, '00000000-0000-0000-0000-000000000007')
ON CONFLICT DO NOTHING;

-- Insert sample support tickets
INSERT INTO support_tickets (booking_id, user_id, subject, messages, status, priority) VALUES
('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'Car not available at pickup time', 
 '[{"sender": "customer", "message": "The car was not at the designated pickup location at the scheduled time.", "timestamp": "2024-01-30T10:15:00Z"}, 
   {"sender": "support", "message": "We apologize for the inconvenience. We are looking into this issue and will contact the owner immediately.", "timestamp": "2024-01-30T10:30:00Z"}]', 
 'in_progress', 2),
(NULL, '00000000-0000-0000-0000-000000000002', 'Question about insurance coverage', 
 '[{"sender": "customer", "message": "What insurance coverage is included with the rental?", "timestamp": "2024-01-25T14:20:00Z"}]', 
 'open', 1)
ON CONFLICT DO NOTHING;

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_values, ip_address, user_agent) VALUES
('00000000-0000-0000-0000-000000000001', 'user_role_updated', 'users', '00000000-0000-0000-0000-000000000002', 
 '{"roles": ["customer", "owner"]}', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('00000000-0000-0000-0000-000000000001', 'car_status_updated', 'cars', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 
 '{"status": "maintenance"}', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('00000000-0000-0000-0000-000000000006', 'car_created', 'cars', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
 '{"make": "Tesla", "model": "Model S", "year": 2023}', '192.168.1.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
ON CONFLICT DO NOTHING;

-- ============================================
-- SEED DATA COMPLETE
-- ============================================
-- Summary:
-- - 2 companies
-- - 11 users (1 admin, 4 customers, 3 owners, 2 staff, 1 fleet manager)
-- - 7 cars (various types and price ranges)
-- - 3 availability blocks
-- - 4 bookings (1 completed, 1 confirmed, 1 requested, 1 in progress)
-- - 4 transactions
-- - 2 reviews
-- - 3 maintenance logs
-- - 2 support tickets
-- - 3 audit logs
-- ============================================
