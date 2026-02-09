# Database Migrations Guide

This guide will help you run all database migrations for the car rental app.

## Migration Files (Run in Order)

1. `001_initial_schema.sql` - Creates all core tables
2. `002_rls_policies.sql` - Sets up Row Level Security policies
3. `003_favorites_messages.sql` - Creates favorites, messages, and notifications tables
4. `004_rls_favorites_messages.sql` - Sets up RLS for new tables

## Option 1: Using Supabase Dashboard (Recommended for Beginners)

### Step 1: Open Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)

### Step 2: Open SQL Editor
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**

### Step 3: Run Migrations in Order

**Migration 1: Initial Schema**
1. Copy the contents of `database/migrations/001_initial_schema.sql`
2. Paste into the SQL Editor
3. Click **Run** (or press Ctrl+Enter)
4. Wait for success message

**Migration 2: RLS Policies**
1. Copy the contents of `database/migrations/002_rls_policies.sql`
2. Paste into the SQL Editor
3. Click **Run**
4. Wait for success message

**Migration 3: Favorites, Messages, Notifications**
1. Copy the contents of `database/migrations/003_favorites_messages.sql`
2. Paste into the SQL Editor
3. Click **Run**
4. Wait for success message

**Migration 4: RLS for New Tables**
1. Copy the contents of `database/migrations/004_rls_favorites_messages.sql`
2. Paste into the SQL Editor
3. Click **Run**
4. Wait for success message

### Step 4: Verify Migrations
1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - users
   - companies
   - cars
   - car_availability
   - bookings
   - transactions
   - reviews
   - maintenance_logs
   - support_tickets
   - audit_logs
   - favorites (new)
   - messages (new)
   - notifications (new)

## Option 2: Using Supabase CLI (For Advanced Users)

### Prerequisites
```bash
# Install Supabase CLI globally
npm install -g supabase
```

### Step 1: Login to Supabase
```bash
supabase login
```

### Step 2: Link Your Project
```bash
supabase link --project-ref your-project-ref
```
(Get your project ref from Supabase dashboard URL: `https://supabase.com/dashboard/project/your-project-ref`)

### Step 3: Run Migrations
```bash
# Run all migrations in order
supabase db push
```

Or run individually:
```bash
# Run specific migration
psql -h your-db-host -U postgres -d postgres -f database/migrations/001_initial_schema.sql
psql -h your-db-host -U postgres -d postgres -f database/migrations/002_rls_policies.sql
psql -h your-db-host -U postgres -d postgres -f database/migrations/003_favorites_messages.sql
psql -h your-db-host -U postgres -d postgres -f database/migrations/004_rls_favorites_messages.sql
```

## Option 3: Combined Migration Script

I've created a combined migration file that you can run all at once:
- `database/migrations/000_all_migrations.sql`

This combines all migrations in the correct order for convenience.

## Important Notes

### Authentication Function
The RLS policies use `auth.uid()` which is a Supabase Auth function. If you're:
- **Using Supabase Auth**: These policies will work automatically
- **Not using Supabase Auth yet**: You may need to adjust the policies or implement a custom auth function

### PostGIS Extension
The initial schema enables PostGIS extension for location-based features. Make sure PostGIS is available in your Supabase project (it should be by default).

### UUID Extension
The schema uses `uuid-ossp` extension which should be available by default in Supabase.

## Troubleshooting

### Error: Extension not found
If you get errors about missing extensions:
```sql
-- These should already be enabled, but if not:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
```

### Error: Table already exists
If you've run migrations before and get "table already exists" errors:
- Option 1: Drop and recreate (⚠️ **WARNING**: This deletes all data)
- Option 2: Skip the CREATE TABLE statements and only run the new parts

### Error: Policy already exists
If policies already exist, you can either:
- Drop them first: `DROP POLICY IF EXISTS "policy_name" ON table_name;`
- Or use `CREATE POLICY IF NOT EXISTS` (PostgreSQL 9.5+)

## Verification Queries

After running migrations, verify everything is set up:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;

-- Check indexes
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public';
```

## Next Steps

After migrations are complete:
1. ✅ Verify all tables are created
2. ✅ Check RLS policies are active
3. ✅ Set up your authentication system
4. ✅ Run seed data (optional): `database/seeds/001_sample_data.sql`
