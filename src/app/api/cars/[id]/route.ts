import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// Get single car details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('cars')
      .select(`
        *,
        owner:users!cars_owner_id_fkey(id, full_name, profile_image_url)
      `)
      .eq('id', params.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }

    // Get average rating
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('reviewee_id', data.owner_id)

    const avgRating = reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0

    return NextResponse.json({
      ...data,
      average_rating: avgRating,
      review_count: reviews?.length || 0,
    })
  } catch (error) {
    console.error('Error fetching car:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
