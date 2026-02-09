import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          type: 'individual' | 'company'
          company_id: string | null
          roles: string[]
          verified_driver_license: boolean
          driver_license_meta: any
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          type?: 'individual' | 'company'
          company_id?: string | null
          roles?: string[]
          verified_driver_license?: boolean
          driver_license_meta?: any
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          type?: 'individual' | 'company'
          company_id?: string | null
          roles?: string[]
          verified_driver_license?: boolean
          driver_license_meta?: any
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          address: any
          billing_info: any
          admin_user_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: any
          billing_info?: any
          admin_user_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: any
          billing_info?: any
          admin_user_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          owner_id: string
          company_id: string | null
          make: string
          model: string
          year: number
          seats: number
          transmission: string
          fuel_type: string
          license_plate: string | null
          vin: string | null
          photos: string[]
          location: any
          city: string | null
          description: string | null
          pricing: any
          rules: any
          status: 'available' | 'maintenance' | 'disabled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          company_id?: string | null
          make: string
          model: string
          year: number
          seats: number
          transmission: string
          fuel_type: string
          license_plate?: string | null
          vin?: string | null
          photos?: string[]
          location?: any
          city?: string | null
          description?: string | null
          pricing?: any
          rules?: any
          status?: 'available' | 'maintenance' | 'disabled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          company_id?: string | null
          make?: string
          model?: string
          year?: number
          seats?: number
          transmission?: string
          fuel_type?: string
          license_plate?: string | null
          vin?: string | null
          photos?: string[]
          location?: any
          city?: string | null
          description?: string | null
          pricing?: any
          rules?: any
          status?: 'available' | 'maintenance' | 'disabled'
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          car_id: string
          renter_id: string
          start_ts: string
          end_ts: string
          total_amount_cents: number
          currency: string
          status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'dispute'
          payment_info: any
          cancellation_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          car_id: string
          renter_id: string
          start_ts: string
          end_ts: string
          total_amount_cents: number
          currency?: string
          status?: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'dispute'
          payment_info?: any
          cancellation_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          car_id?: string
          renter_id?: string
          start_ts?: string
          end_ts?: string
          total_amount_cents?: number
          currency?: string
          status?: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'dispute'
          payment_info?: any
          cancellation_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
