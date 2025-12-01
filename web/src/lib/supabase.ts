import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente para el frontend (con anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente para el backend (con service role key - bypasea RLS)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export type AudioSubmission = {
  id?: string
  username: string
  topic: string
  audio_url: string
  audio_filename: string
  audio_size: number
  audio_duration?: number
  audio_source: 'recording' | 'upload'
  status?: string
  created_at?: string
}
