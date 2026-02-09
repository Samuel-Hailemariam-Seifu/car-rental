# CarRental - Premium Car Rental Marketplace

A production-ready car rental marketplace built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Multi-role Authentication**: Individual users, companies, car owners, fleet managers, admins, support, and finance staff
- **Car Listings**: Owners can list cars with photos, pricing, availability, and rules
- **Advanced Search**: Location-based search with filters for price, seats, model, and ratings
- **Booking System**: Secure booking with payment processing via Stripe
- **Role-based Dashboards**: Customized dashboards for each user type
- **Driver License Verification**: Upload and verify driver's licenses
- **Reviews & Ratings**: Rate cars and owners after trips
- **Admin Panel**: Complete user, listing, and booking management
- **Real-time Updates**: Live booking status and availability updates

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Authentication**: Custom authentication system (ready for Supabase Auth, NextAuth, or your preferred solution)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Payments**: Stripe (with Connect for payouts)
- **File Storage**: Supabase Storage
- **Testing**: Jest, Playwright, React Testing Library
- **Deployment**: Vercel (primary), Netlify (alternative)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (optional)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd car-rental-app-portfolio-project
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your credentials:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual credentials:

```env
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Stripe Payments (Optional)
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Database Setup

#### Option A: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration files in order:
   - `database/migrations/001_initial_schema.sql`
   - `database/migrations/002_rls_policies.sql`
4. Run the seed data:
   - `database/seeds/001_sample_data.sql`

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Start local Supabase (optional)
supabase start

# Apply migrations
supabase db push
```

### 4. Authentication Setup

The app currently uses a placeholder authentication system. You can integrate:
- **Supabase Auth**: Recommended for seamless integration with your database
- **NextAuth.js**: Popular Next.js authentication solution
- **Custom Auth**: Your own authentication system

Update `src/lib/auth.ts` to implement your chosen authentication method.

### 5. Stripe Setup (Optional)

1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set up webhooks for payment events
4. Configure Stripe Connect for owner payouts

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Protected dashboard routes
│   ├── sign-in/          # Authentication pages
│   ├── sign-up/
│   └── onboarding/       # User onboarding flow
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utility libraries
│   ├── auth.ts          # Authentication helpers
│   ├── supabase.ts      # Supabase client & types
│   └── stripe.ts        # Stripe payment helpers
└── hooks/               # Custom React hooks

database/
├── migrations/          # Database schema migrations
└── seeds/             # Sample data for development
```

## 🗄 Database Schema

### Core Tables

- **users**: Extended user profiles with roles and verification status
- **companies**: Company information and billing details
- **cars**: Vehicle listings with pricing, rules, and availability
- **bookings**: Rental reservations with payment tracking
- **transactions**: Payment and payout records
- **reviews**: User ratings and feedback
- **support_tickets**: Customer support system

### Row Level Security (RLS)

All tables have comprehensive RLS policies ensuring:

- Users can only access their own data
- Car owners can manage their listings
- Admins have full access
- Role-based permissions are enforced

## 🔐 Authentication & Authorization

### User Roles

- **customer**: Basic rental access
- **owner**: Can list and manage cars
- **fleet_manager**: Manages multiple cars for companies
- **admin**: Full system access
- **support**: Customer service access
- **finance**: Payment and transaction management

### Security Features

- Custom authentication system (implement in `src/lib/auth.ts`)
- Server-side role verification
- Row Level Security in Supabase
- Secure file uploads with signed URLs
- Payment data never stored locally

## 💳 Payment Processing

### Stripe Integration

- Payment intents for secure card processing
- Stripe Connect for owner payouts
- Webhook handling for payment events
- Refund and dispute management

### Pricing Structure

- Platform commission (configurable)
- Owner payouts
- Security deposits
- Cleaning and additional fees

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify (Alternative)

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Set environment variables in Netlify dashboard

## 📊 Monitoring & Analytics

- Built-in error tracking
- Performance monitoring
- User analytics
- Payment tracking
- Admin dashboard metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the documentation
- Open an issue on GitHub
- Contact the development team

## 🔄 Roadmap

### Phase 1 (Current)

- ✅ Basic authentication and user management
- ✅ Car listing and search functionality
- ✅ Booking system with payments
- ✅ Role-based dashboards

### Phase 2 (Planned)

- 🔄 Real-time updates with WebSockets
- 🔄 Advanced analytics and reporting
- 🔄 Mobile app development
- 🔄 International expansion

### Phase 3 (Future)

- 📋 AI-powered recommendations
- 📋 Dynamic pricing algorithms
- 📋 IoT integration for smart cars
- 📋 Blockchain-based verification

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
