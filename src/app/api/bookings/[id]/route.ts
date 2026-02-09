import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

// Get single booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        car:cars(*, owner:users!cars_owner_id_fkey(id, full_name, profile_image_url)),
        renter:users!bookings_renter_id_fkey(id, full_name, email)
      `)
      .eq('id', params.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user has access
    if (data.renter_id !== userId && data.car.owner_id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update booking (cancel, confirm, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status, cancellation_reason } = body

    // Get booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select('*, car:cars(*)')
      .eq('id', params.id)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check permissions
    const isRenter = booking.renter_id === userId
    const isOwner = booking.car.owner_id === userId

    if (!isRenter && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update booking
    const updateData: any = {}
    if (status) updateData.status = status
    if (cancellation_reason) updateData.cancellation_reason = cancellation_reason

    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      )
    }

    // If cancelled, remove availability block
    if (status === 'cancelled') {
      await supabaseAdmin
        .from('car_availability')
        .delete()
        .eq('car_id', booking.car_id)
        .eq('metadata->>booking_id', params.id)
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
