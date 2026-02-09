# Environment Variables Setup Guide

## Environment Variables

Create a new file named `.env.local` in the root directory of your project with the following content:

```env
# Supabase Database
# Get these from https://supabase.com/dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe Payments (Optional - for payment features)
# Get these from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 1: Get Your Supabase Keys

If you want to use the database features:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project (or use an existing one)
3. Go to **Settings** → **API**
4. Copy the **Project URL**
5. Copy the **anon/public key**
6. Copy the **service_role key** (keep this secret!)
7. Replace the placeholder values in `.env.local`

### Step 2: Get Your Stripe Keys (Optional)

If you want to use payment features:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in
3. Go to **Developers** → **API keys**
4. Copy the **Publishable key** (starts with `pk_test_`)
5. Copy the **Secret key** (starts with `sk_test_`)
6. Replace the placeholder values in `.env.local`

### Step 3: Restart Your Development Server

After creating/updating `.env.local`:

1. Stop your current dev server (Ctrl+C)
2. Restart it with `npm run dev`

## Quick Start (Minimal Setup)

If you just want to get the app running quickly, you can start with just Supabase:

```env
# Minimum required for app to run
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

You can add Stripe keys later when you need payment features.

## Important Notes

- **Never commit `.env.local` to git** - it's already in `.gitignore`
- Use **test keys** (`pk_test_`, `sk_test_`) for development
- Use **live keys** (`pk_live_`, `sk_live_`) only in production
- The `NEXT_PUBLIC_` prefix makes variables available to the browser
- Variables without `NEXT_PUBLIC_` are server-side only

## Troubleshooting

### App works but features don't?
- Database features require Supabase keys
- Payment features require Stripe keys
- Some features will gracefully degrade if keys are missing
