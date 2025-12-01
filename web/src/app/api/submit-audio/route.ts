import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, type AudioSubmission } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { username, topic, audio_url, audio_filename, audio_size, audio_duration, audio_source } = body

    // Validaciones
    if (!username || !topic || !audio_url || !audio_filename || !audio_size || !audio_source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insertar en Supabase usando admin client (bypasea RLS)
    const submission: Omit<AudioSubmission, 'id' | 'created_at'> = {
      username,
      topic,
      audio_url,
      audio_filename,
      audio_size,
      audio_duration,
      audio_source,
      status: 'pending',
    }

    const { data, error } = await supabaseAdmin
      .from('audio_submissions')
      .insert(submission)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error submitting audio:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
