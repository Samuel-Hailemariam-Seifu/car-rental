-- Insert sample companies
INSERT INTO companies (id, name, address, admin_user_id) VALUES
('11111111-1111-1111-1111-111111111111', 'TechCorp Fleet', '{"street": "123 Business Ave", "city": "San Francisco", "state": "CA", "zip": "94105"}', NULL),
('22222222-2222-2222-2222-222222222222', 'Enterprise Rentals', '{"street": "456 Corporate Blvd", "city": "New York", "state": "NY", "zip": "10001"}', NULL);

-- Insert sample users
INSERT INTO users (id, email, full_name, phone, type, company_id, roles, verified_driver_license) VALUES
-- Admin user
('00000000-0000-0000-0000-000000000001', 'admin@carrental.com', 'Admin User', '+1234567890', 'individual', NULL, '{"admin"}', true),

-- Individual users
('00000000-0000-0000-0000-000000000002', 'john.doe@email.com', 'John Doe', '+1234567891', 'individual', NULL, '{"customer"}', true),
('00000000-0000-0000-0000-000000000003', 'jane.smith@email.com', 'Jane Smith', '+1234567892', 'individual', NULL, '{"customer"}', true),

-- Company users
('00000000-0000-0000-0000-000000000004', 'fleet.manager@techcorp.com', 'Fleet Manager', '+1234567893', 'company', '11111111-1111-1111-1111-111111111111', '{"fleet_manager", "customer"}', true),
('00000000-0000-0000-0000-000000000005', 'employee@techcorp.com', 'TechCorp Employee', '+1234567894', 'company', '11111111-1111-1111-1111-111111111111', '{"customer"}', true),

-- Car owners
('00000000-0000-0000-0000-000000000006', 'owner1@email.com', 'Car Owner One', '+1234567895', 'individual', NULL, '{"owner"}', true),
('00000000-0000-0000-0000-000000000007', 'owner2@email.com', 'Car Owner Two', '+1234567896', 'individual', NULL, '{"owner"}', true),

-- Support staff
('00000000-0000-0000-0000-000000000008', 'support@carrental.com', 'Support Staff', '+1234567897', 'individual', NULL, '{"support"}', true),
('00000000-0000-0000-0000-000000000009', 'finance@carrental.com', 'Finance Staff', '+1234567898', 'individual', NULL, '{"finance"}', true);

-- Update company admin users
UPDATE companies SET admin_user_id = '00000000-0000-0000-0000-000000000004' WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE companies SET admin_user_id = '00000000-0000-0000-0000-000000000002' WHERE id = '22222222-2222-2222-2222-222222222222';

-- Insert sample cars
INSERT INTO cars (id, owner_id, make, model, year, seats, transmission, fuel_type, license_plate, vin, photos, location, city, description, pricing, rules, status) VALUES
-- Car 1: Tesla Model 3
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000006', 'Tesla', 'Model 3', 2023, 5, 'automatic', 'electric', 'TESLA001', '1HGBH41JXMN109186', 
 '{"https://example.com/tesla1.jpg", "https://example.com/tesla2.jpg"}', 
 POINT(-122.4194, 37.7749), 'San Francisco', 
 'Luxury electric sedan with autopilot features. Perfect for city driving and long trips.',
 '{"base_daily": 15000, "base_hourly": 2500, "cleaning_fee": 2000, "extra_driver_fee": 1000, "security_deposit": 50000}',
 '{"no_smoking": true, "no_pets": false, "minimum_age": 25, "license_required": true}',
 'available'),

-- Car 2: Honda Civic
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000006', 'Honda', 'Civic', 2022, 5, 'automatic', 'gasoline', 'HONDA001', '2HGBH41JXMN109187',
 '{"https://example.com/honda1.jpg", "https://example.com/honda2.jpg"}',
 POINT(-122.4094, 37.7849), 'San Francisco',
 'Reliable and fuel-efficient compact car. Great for daily commuting.',
 '{"base_daily": 8000, "base_hourly": 1500, "cleaning_fee": 1000, "extra_driver_fee": 500, "security_deposit": 25000}',
 '{"no_smoking": true, "no_pets": true, "minimum_age": 21, "license_required": true}',
 'available'),

-- Car 3: BMW X5
('cccccccc-cccc-cccc-cccc-cccccccccccc', '00000000-0000-0000-0000-000000000007', 'BMW', 'X5', 2023, 7, 'automatic', 'gasoline', 'BMW001', '3HGBH41JXMN109188',
 '{"https://example.com/bmw1.jpg", "https://example.com/bmw2.jpg"}',
 POINT(-122.3994, 37.7949), 'San Francisco',
 'Luxury SUV with premium features. Spacious and comfortable for families.',
 '{"base_daily": 20000, "base_hourly": 3500, "cleaning_fee": 3000, "extra_driver_fee": 1500, "security_deposit": 75000}',
 '{"no_smoking": true, "no_pets": false, "minimum_age": 25, "license_required": true}',
 'available'),

-- Car 4: Toyota Camry
('dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000007', 'Toyota', 'Camry', 2021, 5, 'automatic', 'hybrid', 'TOYOTA001', '4HGBH41JXMN109189',
 '{"https://example.com/toyota1.jpg", "https://example.com/toyota2.jpg"}',
 POINT(-74.0060, 40.7128), 'New York',
 'Efficient hybrid sedan. Eco-friendly and economical.',
 '{"base_daily": 12000, "base_hourly": 2000, "cleaning_fee": 1500, "extra_driver_fee": 800, "security_deposit": 30000}',
 '{"no_smoking": true, "no_pets": true, "minimum_age": 21, "license_required": true}',
 'available'),

-- Car 5: Ford Mustang
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000006', 'Ford', 'Mustang', 2023, 4, 'manual', 'gasoline', 'FORD001', '5HGBH41JXMN109190',
 '{"https://example.com/ford1.jpg", "https://example.com/ford2.jpg"}',
 POINT(-74.0160, 40.7028), 'New York',
 'Classic American muscle car. Manual transmission for driving enthusiasts.',
 '{"base_daily": 18000, "base_hourly": 3000, "cleaning_fee": 2500, "extra_driver_fee": 1200, "security_deposit": 60000}',
 '{"no_smoking": true, "no_pets": true, "minimum_age": 25, "license_required": true, "manual_transmission_required": true}',
 'available');

-- Insert sample car availability (some blocked dates)
INSERT INTO car_availability (car_id, start_ts, end_ts, type, metadata) VALUES
-- Tesla Model 3 - booked for next week
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2024-01-15 09:00:00+00', '2024-01-17 18:00:00+00', 'booked', '{"booking_id": "booking-1"}'),
-- BMW X5 - maintenance
('cccccccc-cccc-cccc-cccc-cccccccccccc', '2024-01-20 08:00:00+00', '2024-01-22 17:00:00+00', 'maintenance', '{"reason": "scheduled_service"}'),
-- Honda Civic - owner blocked
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2024-01-25 00:00:00+00', '2024-01-28 23:59:59+00', 'blocked', '{"reason": "personal_use"}');

-- Insert sample bookings
INSERT INTO bookings (id, car_id, renter_id, start_ts, end_ts, total_amount_cents, currency, status, payment_info) VALUES
-- Completed booking
('booking-1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000002', '2024-01-15 09:00:00+00', '2024-01-17 18:00:00+00', 45000, 'USD', 'completed', '{"stripe_charge_id": "ch_1234567890", "payout_status": "paid"}'),
-- Confirmed booking
('booking-2', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000003', '2024-01-30 10:00:00+00', '2024-02-01 16:00:00+00', 24000, 'USD', 'confirmed', '{"stripe_charge_id": "ch_1234567891", "payout_status": "pending"}'),
-- Requested booking
('booking-3', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000005', '2024-02-05 08:00:00+00', '2024-02-07 20:00:00+00', 36000, 'USD', 'requested', '{"stripe_payment_intent_id": "pi_1234567890"}');

-- Insert sample transactions
INSERT INTO transactions (booking_id, amount_cents, fee_cents, type, status, stripe_charge_id, metadata) VALUES
('booking-1', 45000, 4500, 'payment', 'completed', 'ch_1234567890', '{"commission_rate": 0.10}'),
('booking-1', 40500, 0, 'payout', 'completed', NULL, '{"payout_to_owner": true}'),
('booking-2', 24000, 2400, 'payment', 'completed', 'ch_1234567891', '{"commission_rate": 0.10}');

-- Insert sample reviews
INSERT INTO reviews (booking_id, reviewer_id, reviewee_id, rating, comment) VALUES
('booking-1', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000006', 5, 'Excellent car! Clean, fast, and the autopilot feature was amazing. Will definitely rent again.'),
('booking-1', '00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 5, 'Great renter! Returned the car in perfect condition and was very respectful.');

-- Insert sample maintenance logs
INSERT INTO maintenance_logs (car_id, description, cost_cents, performed_by) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Regular oil change and tire rotation', 15000, '00000000-0000-0000-0000-000000000006'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Brake pad replacement', 25000, '00000000-0000-0000-0000-000000000006');

-- Insert sample support tickets
INSERT INTO support_tickets (booking_id, user_id, subject, messages, status, priority) VALUES
('booking-2', '00000000-0000-0000-0000-000000000003', 'Car not available at pickup time', '[{"sender": "customer", "message": "The car was not at the designated pickup location", "timestamp": "2024-01-30T10:15:00Z"}, {"sender": "support", "message": "We apologize for the inconvenience. We are looking into this issue.", "timestamp": "2024-01-30T10:30:00Z"}]', 'in_progress', 2);

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, new_values, ip_address, user_agent) VALUES
('00000000-0000-0000-0000-000000000001', 'user_role_updated', 'users', '00000000-0000-0000-0000-000000000002', '{"roles": ["customer", "owner"]}', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
('00000000-0000-0000-0000-000000000001', 'car_status_updated', 'cars', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '{"status": "maintenance"}', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
