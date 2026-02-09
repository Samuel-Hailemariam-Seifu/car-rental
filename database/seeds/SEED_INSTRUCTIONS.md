# Database Seeding Instructions

## Quick Start

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project
   - Click on **SQL Editor**

2. **Run the Seed File**
   - Click **New Query**
   - Open `database/seeds/001_sample_data.sql`
   - Copy all contents
   - Paste into SQL Editor
   - Click **Run** (or press Ctrl+Enter)

3. **Verify Data**
   - Go to **Table Editor** in Supabase
   - Check that tables have data:
     - `users` - Should have 11 users
     - `cars` - Should have 7 cars
     - `bookings` - Should have 4 bookings
     - etc.

## What's Included

The seed data includes:

### Users (11 total)
- 1 Admin user
- 4 Customer users
- 3 Car owners
- 1 Fleet manager
- 1 Support staff
- 1 Finance staff

### Cars (7 total)
- Tesla Model S (Luxury Electric) - $150/day
- Honda Civic (Economy) - $45/day
- BMW X5 (Luxury SUV) - $200/day
- Toyota Camry (Hybrid) - $60/day
- Ford Mustang (Sports Car) - $180/day
- Mercedes-Benz SL-Class (Luxury Convertible) - $250/day
- Toyota Sienna (Family Minivan) - $80/day

### Bookings (4 total)
- 1 Completed booking (past)
- 1 Confirmed booking (upcoming)
- 1 Requested booking (pending)
- 1 In-progress booking

### Other Data
- 2 Companies
- 3 Availability blocks
- 4 Transactions
- 2 Reviews
- 3 Maintenance logs
- 2 Support tickets
- 3 Audit logs

## Important Notes

### User IDs
The seed data uses hardcoded UUIDs for users. If you're using Supabase Auth or another authentication system:

1. **Option 1**: Create users in your auth system first, then update the seed file with actual user IDs
2. **Option 2**: Use the seed data as-is for testing, but note that these users won't be able to authenticate

### Dates
- All dates are relative to the current date (`CURRENT_DATE`)
- Past bookings use `CURRENT_DATE - INTERVAL 'X days'`
- Future bookings use `CURRENT_DATE + INTERVAL 'X days'`
- This ensures the data is always relevant regardless of when you run it

### Images
- Car photos use Unsplash image URLs
- These are placeholder images that should work
- In production, you'd upload actual car photos to Supabase Storage

### Pricing
- All prices are in cents (e.g., 15000 = $150.00)
- The `pricing` JSONB field uses keys: `daily`, `weekly`, `monthly`, `deposit`
- This matches the app's expected pricing structure

## Customizing Seed Data

To customize the seed data:

1. **Add more cars**: Copy a car INSERT statement and modify the values
2. **Add more users**: Copy a user INSERT statement and modify the values
3. **Change locations**: Update the POINT coordinates (longitude, latitude)
4. **Adjust prices**: Modify the pricing JSONB values

## Troubleshooting

### Error: Foreign key constraint violation
- Make sure you've run all migrations first
- Check that referenced user IDs exist in the users table

### Error: Duplicate key violation
- The seed uses `ON CONFLICT DO NOTHING` to prevent duplicates
- If you want to replace data, remove the `ON CONFLICT` clauses or use `ON CONFLICT DO UPDATE`

### Dates seem wrong
- The seed uses relative dates based on `CURRENT_DATE`
- If you want fixed dates, replace `CURRENT_DATE + INTERVAL 'X days'` with actual dates like `'2024-02-15'::date`

### Images not loading
- Unsplash URLs should work, but if they don't, replace with your own image URLs
- Or upload images to Supabase Storage and use those URLs

## Resetting Seed Data

To clear and reseed:

```sql
-- WARNING: This deletes all data!
TRUNCATE TABLE 
  audit_logs, 
  support_tickets, 
  maintenance_logs, 
  reviews, 
  transactions, 
  bookings, 
  car_availability, 
  cars, 
  users, 
  companies 
CASCADE;

-- Then run the seed file again
```

## Next Steps

After seeding:
1. ✅ Verify data in Table Editor
2. ✅ Test your app with the sample data
3. ✅ Create real users through your auth system
4. ✅ Replace placeholder user IDs with real ones
5. ✅ Upload actual car photos
