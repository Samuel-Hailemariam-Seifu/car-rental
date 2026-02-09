import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

// Get reviews for a car or user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const carId = searchParams.get('carId')
    const userId = searchParams.get('userId')
    const bookingId = searchParams.get('bookingId')

    let query = supabaseAdmin
      .from('reviews')
      .select(`
        *,
        reviewer:users!reviews_reviewer_id_fkey(id, full_name, profile_image_url),
        reviewee:users!reviews_reviewee_id_fkey(id, full_name, profile_image_url),
        booking:bookings(car_id, car:cars(make, model, year))
      `)
      .order('created_at', { ascending: false })

    if (bookingId) {
      query = query.eq('booking_id', bookingId)
    } else if (carId) {
      // Get reviews for the car owner
      const { data: car } = await supabaseAdmin
        .from('cars')
        .select('owner_id')
        .eq('id', carId)
        .single()

      if (car) {
        query = query.eq('reviewee_id', car.owner_id)
      }
    } else if (userId) {
      query = query.eq('reviewee_id', userId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create a review
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { bookingId, rating, comment } = body

    if (!bookingId || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('*, car:cars(owner_id)')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user is the renter
    if (booking.renter_id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return NextResponse.json(
        { error: 'Can only review completed bookings' },
        { status: 400 }
      )
    }

    // Check if review already exists
    const { data: existingReview } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .eq('booking_id', bookingId)
      .eq('reviewer_id', userId)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: 'Review already exists for this booking' },
        { status: 400 }
      )
    }

    // Create review (reviewer is renter, reviewee is car owner)
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        booking_id: bookingId,
        reviewer_id: userId,
        reviewee_id: booking.car.owner_id,
        rating,
        comment: comment || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
