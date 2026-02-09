import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

// Get user's favorites
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from('favorites')
      .select(`
        *,
        car:cars(
          *,
          owner:users!cars_owner_id_fkey(id, full_name, profile_image_url)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Add to favorites
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { carId } = body

    if (!carId) {
      return NextResponse.json(
        { error: 'Missing carId' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('favorites')
      .insert({
        user_id: userId,
        car_id: carId,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        // Already favorited
        return NextResponse.json({ message: 'Already in favorites' })
      }
      return NextResponse.json(
        { error: 'Failed to add to favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error adding favorite:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Remove from favorites
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const carId = searchParams.get('carId')

    if (!carId) {
      return NextResponse.json(
        { error: 'Missing carId' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('car_id', carId)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing favorite:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
