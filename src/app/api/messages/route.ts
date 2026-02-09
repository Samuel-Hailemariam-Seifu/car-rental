import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

// Get messages for a user
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')
    const otherUserId = searchParams.get('otherUserId')

    let query = supabaseAdmin
      .from('messages')
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, full_name, profile_image_url),
        receiver:users!messages_receiver_id_fkey(id, full_name, profile_image_url)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: true })

    if (bookingId) {
      query = query.eq('booking_id', bookingId)
    }

    if (otherUserId) {
      query = query.or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    // Mark messages as read
    if (data && data.length > 0) {
      await supabaseAdmin
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', userId)
        .eq('read', false)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Send a message
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { receiverId, bookingId, content } = body

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert({
        sender_id: userId,
        receiver_id: receiverId,
        booking_id: bookingId || null,
        content,
      })
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, full_name, profile_image_url),
        receiver:users!messages_receiver_id_fkey(id, full_name, profile_image_url)
      `)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // Create notification for receiver
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: receiverId,
        type: 'new_message',
        title: 'New Message',
        message: `You have a new message from ${data.sender.full_name || 'a user'}`,
        link: `/messages?bookingId=${bookingId || ''}`,
      })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
