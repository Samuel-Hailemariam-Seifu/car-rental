#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Setting up CarRental application...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from template...')
  try {
    fs.copyFileSync('.env.example', '.env.local')
    console.log('✅ .env.local created successfully')
    console.log('⚠️  Please update .env.local with your actual credentials\n')
  } catch (error) {
    console.log('❌ Failed to create .env.local:', error.message)
    process.exit(1)
  }
} else {
  console.log('✅ .env.local already exists\n')
}

// Check Node.js version
const nodeVersion = process.version
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
if (majorVersion < 18) {
  console.log(
    '❌ Node.js 18 or higher is required. Current version:',
    nodeVersion
  )
  process.exit(1)
}
console.log('✅ Node.js version check passed:', nodeVersion)

// Check if dependencies are installed
const nodeModulesPath = path.join(process.cwd(), 'node_modules')
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...')
  try {
    execSync('npm install', { stdio: 'inherit' })
    console.log('✅ Dependencies installed successfully\n')
  } catch (error) {
    console.log('❌ Failed to install dependencies:', error.message)
    process.exit(1)
  }
} else {
  console.log('✅ Dependencies already installed\n')
}

// Create necessary directories
const directories = [
  'src/app/api',
  'src/components/forms',
  'src/components/layout',
  'src/hooks',
  'src/types',
  'public/images',
  'public/uploads',
]

console.log('📁 Creating project directories...')
directories.forEach((dir) => {
  const dirPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})
console.log('')

// Database setup instructions
console.log('🗄️  Database Setup Instructions:')
console.log('1. Create a new Supabase project at https://supabase.com')
console.log('2. Go to SQL Editor in your Supabase dashboard')
console.log('3. Run the migration files in order:')
console.log('   - database/migrations/001_initial_schema.sql')
console.log('   - database/migrations/002_rls_policies.sql')
console.log('4. Run the seed data:')
console.log('   - database/seeds/001_sample_data.sql')
console.log('5. Update your .env.local with Supabase credentials\n')

// Clerk setup instructions
console.log('🔐 Clerk Setup Instructions:')
console.log('1. Create a new Clerk application at https://clerk.com')
console.log('2. Configure custom user metadata fields:')
console.log('   - roles (array of strings)')
console.log('   - user_type (individual | company)')
console.log('   - company_id (string, optional)')
console.log('   - onboarding_complete (boolean)')
console.log('   - license_uploaded (boolean)')
console.log('   - license_verified (boolean)')
console.log('3. Update your .env.local with Clerk credentials\n')

// Stripe setup instructions
console.log('💳 Stripe Setup Instructions (Optional):')
console.log('1. Create a Stripe account at https://stripe.com')
console.log('2. Get your API keys from the dashboard')
console.log('3. Set up webhooks for payment events')
console.log('4. Update your .env.local with Stripe credentials\n')

console.log('🎉 Setup complete! Next steps:')
console.log('1. Update .env.local with your credentials')
console.log('2. Set up your database (see instructions above)')
console.log('3. Run: npm run dev')
console.log('4. Open http://localhost:3000 in your browser\n')

console.log('📚 For more information, see README.md')
