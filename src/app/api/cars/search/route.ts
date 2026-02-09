import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('Supabase URL configured:', !!supabaseUrl)
    console.log('Supabase Service Role Key configured:', !!supabaseKey)
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase environment variables not configured')
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
      console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'Set' : 'Missing')
      return NextResponse.json(
        { error: 'Database not configured', details: 'Missing Supabase environment variables' },
        { status: 500 }
      )
    }

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

    // Start with a simple query
    let query = supabaseAdmin
      .from('cars')
      .select('*')
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

    // Availability filter
    if (startDate && endDate) {
      // Get cars that have conflicts
      const { data: conflicts, error: conflictsError } = await supabaseAdmin
        .from('car_availability')
        .select('car_id')
        .or(`and(start_ts.lte.${endDate},end_ts.gte.${startDate},type.eq.booked),and(start_ts.lte.${endDate},end_ts.gte.${startDate},type.eq.blocked)`)

      if (conflictsError) {
        console.error('Error checking availability:', conflictsError)
      } else if (conflicts && conflicts.length > 0) {
        const conflictCarIds = conflicts.map(c => c.car_id)
        query = query.not('id', 'in', `(${conflictCarIds.join(',')})`)
      }
    }

    // Apply sorting
    if (sortBy === 'price_low' || sortBy === 'price_high') {
      // For price sorting, we'll sort after fetching
      query = query.order('created_at', { ascending: false })
    } else {
      query = query.order(sortBy, { ascending: false })
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    console.log('Executing Supabase query...')
    const { data, error } = await query

    if (error) {
      console.error('=== SUPABASE QUERY ERROR ===')
      console.error('Error object:', JSON.stringify(error, null, 2))
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      console.error('===========================')
      return NextResponse.json(
        { 
          error: 'Failed to search cars', 
          details: error.message || 'Unknown database error',
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      )
    }

    console.log('✅ Cars fetched successfully:', data?.length || 0, 'cars')

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

    // Apply price sorting if needed (post-query sorting)
    if (sortBy === 'price_low') {
      filteredData.sort((a: any, b: any) => {
        const priceA = a.pricing?.daily || 0
        const priceB = b.pricing?.daily || 0
        return priceA - priceB
      })
    } else if (sortBy === 'price_high') {
      filteredData.sort((a: any, b: any) => {
        const priceA = a.pricing?.daily || 0
        const priceB = b.pricing?.daily || 0
        return priceB - priceA
      })
    }

    // Get owner details separately
    const ownerIds = [...new Set(filteredData.map((car: any) => car.owner_id).filter(Boolean))]
    let ownersMap = new Map()
    
    if (ownerIds.length > 0) {
      const { data: ownersData, error: ownersError } = await supabaseAdmin
        .from('users')
        .select('id, full_name, profile_image_url')
        .in('id', ownerIds)
      
      if (ownersError) {
        console.error('Error fetching owners:', ownersError)
      } else if (ownersData) {
        ownersData.forEach((owner: any) => {
          ownersMap.set(owner.id, owner)
        })
      }
    }

    // Get average ratings for each car
    let reviews: any[] = []
    if (ownerIds.length > 0) {
      const { data: reviewsData, error: reviewsError } = await supabaseAdmin
        .from('reviews')
        .select('reviewee_id, rating')
        .in('reviewee_id', ownerIds)
      
      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError)
      } else if (reviewsData) {
        reviews = reviewsData
      }
    }

    // Calculate average ratings
    const ratingsMap = new Map()
    if (reviews && reviews.length > 0) {
      reviews.forEach((review: any) => {
        if (!ratingsMap.has(review.reviewee_id)) {
          ratingsMap.set(review.reviewee_id, [])
        }
        ratingsMap.get(review.reviewee_id).push(review.rating)
      })
    }

    const carsWithRatings = filteredData.map((car: any) => {
      const ownerRatings = ratingsMap.get(car.owner_id) || []
      const avgRating = ownerRatings.length > 0
        ? ownerRatings.reduce((sum: number, r: number) => sum + r, 0) / ownerRatings.length
        : 0

      const owner = ownersMap.get(car.owner_id) || null

      return {
        ...car,
        owner,
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
    console.error('=== CATCH BLOCK ERROR ===')
    console.error('Error type:', typeof error)
    console.error('Error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    console.error('Error stringified:', JSON.stringify(error, Object.getOwnPropertyNames(error)))
    console.error('========================')
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage,
        type: typeof error,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    )
  }
}
