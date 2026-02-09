import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { stripe, formatAmountForStripe } from '@/lib/stripe'

// Create a new booking
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { carId, startDate, endDate } = body

    if (!carId || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get car details
    const { data: car, error: carError } = await supabaseAdmin
      .from('cars')
      .select('*, owner:users!cars_owner_id_fkey(id)')
      .eq('id', carId)
      .single()

    if (carError || !car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }

    // Check availability
    const { data: conflicts } = await supabaseAdmin
      .from('car_availability')
      .select('id')
      .eq('car_id', carId)
      .or(`and(start_ts.lte.${endDate},end_ts.gte.${startDate},type.eq.booked),and(start_ts.lte.${endDate},end_ts.gte.${startDate},type.eq.blocked)`)

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'Car is not available for selected dates' },
        { status: 400 }
      )
    }

    // Calculate price
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const dailyRate = car.pricing?.daily || 0
    const deposit = car.pricing?.deposit || 0
    const totalAmount = (dailyRate * days) + deposit

    // Create booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        car_id: carId,
        renter_id: userId,
        start_ts: startDate,
        end_ts: endDate,
        total_amount_cents: formatAmountForStripe(totalAmount),
        status: 'requested',
      })
      .select()
      .single()

    if (bookingError) {
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Block availability
    await supabaseAdmin
      .from('car_availability')
      .insert({
        car_id: carId,
        start_ts: startDate,
        end_ts: endDate,
        type: 'booked',
        metadata: { booking_id: booking.id },
      })

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(totalAmount),
      currency: 'usd',
      metadata: {
        booking_id: booking.id,
        car_id: carId,
        renter_id: userId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Update booking with payment info
    await supabaseAdmin
      .from('bookings')
      .update({
        payment_info: {
          payment_intent_id: paymentIntent.id,
          client_secret: paymentIntent.client_secret,
        },
      })
      .eq('id', booking.id)

    return NextResponse.json({
      booking,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get user's bookings
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabaseAdmin
      .from('bookings')
      .select(`
        *,
        car:cars(*, owner:users!cars_owner_id_fkey(id, full_name, profile_image_url))
      `)
      .eq('renter_id', userId)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
