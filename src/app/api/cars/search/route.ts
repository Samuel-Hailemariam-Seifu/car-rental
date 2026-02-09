import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const make = searchParams.get('make')
    const model = searchParams.get('model')
    const seats = searchParams.get('seats')
    const transmission = searchParams.get('transmission')
    const fuelType = searchParams.get('fuelType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('cars')
      .select(`
        *,
        owner:users!cars_owner_id_fkey(id, full_name, profile_image_url)
      `)
      .eq('status', 'available')

    // Apply filters
    if (city) {
      query = query.ilike('city', `%${city}%`)
    }

    if (make) {
      query = query.ilike('make', `%${make}%`)
    }

    if (model) {
      query = query.ilike('model', `%${model}%`)
    }

    if (seats) {
      query = query.eq('seats', parseInt(seats))
    }

    if (transmission) {
      query = query.eq('transmission', transmission)
    }

    if (fuelType) {
      query = query.eq('fuel_type', fuelType)
    }

    // Price filter (on pricing JSONB field)
    if (minPrice || maxPrice) {
      // This is a simplified filter - in production, you'd want a more robust solution
      // For now, we'll filter after fetching
    }

    // Availability filter
    if (startDate && endDate) {
      // Get cars that have conflicts
      const { data: conflicts } = await supabase
        .from('car_availability')
        .select('car_id')
        .or(`and(start_ts.lte.${endDate},end_ts.gte.${startDate},type.eq.booked),and(start_ts.lte.${endDate},end_ts.gte.${startDate},type.eq.blocked)`)

      if (conflicts && conflicts.length > 0) {
        const conflictCarIds = conflicts.map(c => c.car_id)
        query = query.not('id', 'in', `(${conflictCarIds.join(',')})`)
      }
    }

    // Apply sorting
    if (sortBy === 'price_low') {
      // Sort by pricing->daily (JSONB field)
      query = query.order('pricing->daily', { ascending: true })
    } else if (sortBy === 'price_high') {
      query = query.order('pricing->daily', { ascending: false })
    } else {
      query = query.order(sortBy, { ascending: false })
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to search cars' },
        { status: 500 }
      )
    }

    // Apply price filter if needed (post-query filtering)
    let filteredData = data || []
    if (minPrice || maxPrice) {
      filteredData = filteredData.filter((car: any) => {
        const dailyPrice = car.pricing?.daily || 0
        if (minPrice && dailyPrice < parseFloat(minPrice)) return false
        if (maxPrice && dailyPrice > parseFloat(maxPrice)) return false
        return true
      })
    }

    // Get average ratings for each car
    const carIds = filteredData.map((car: any) => car.id)
    const { data: reviews } = await supabase
      .from('reviews')
      .select('reviewee_id, rating')
      .in('reviewee_id', filteredData.map((car: any) => car.owner_id))

    // Calculate average ratings
    const ratingsMap = new Map()
    reviews?.forEach((review: any) => {
      if (!ratingsMap.has(review.reviewee_id)) {
        ratingsMap.set(review.reviewee_id, [])
      }
      ratingsMap.get(review.reviewee_id).push(review.rating)
    })

    const carsWithRatings = filteredData.map((car: any) => {
      const ownerRatings = ratingsMap.get(car.owner_id) || []
      const avgRating = ownerRatings.length > 0
        ? ownerRatings.reduce((sum: number, r: number) => sum + r, 0) / ownerRatings.length
        : 0

      return {
        ...car,
        average_rating: avgRating,
        review_count: ownerRatings.length,
      }
    })

    return NextResponse.json({
      cars: carsWithRatings,
      total: carsWithRatings.length,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error searching cars:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
