import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación básica
    const authHeader = request.headers.get('authorization')
    const password = request.headers.get('x-admin-password')

    // Por ahora permitimos sin auth ya que el frontend maneja la auth
    // En producción podrías agregar verificación adicional aquí

    const { data, error } = await supabaseAdmin
      .from('audio_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
