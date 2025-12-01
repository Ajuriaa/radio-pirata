-- Setup completo para Radio Pirata - Supabase
-- Ejecuta este SQL una sola vez en tu proyecto de Supabase

-- 1. Crear tabla de audio submissions
CREATE TABLE IF NOT EXISTS audio_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  topic TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  audio_filename TEXT NOT NULL,
  audio_size INTEGER NOT NULL,
  audio_duration INTEGER, -- en segundos
  audio_source TEXT NOT NULL CHECK (audio_source IN ('recording', 'upload')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security
ALTER TABLE audio_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Eliminar policies existentes (por si ya existen)
DROP POLICY IF EXISTS "Anyone can insert submissions" ON audio_submissions;
DROP POLICY IF EXISTS "Enable insert for everyone" ON audio_submissions;
DROP POLICY IF EXISTS "allow_anonymous_insert" ON audio_submissions;

-- 4. Crear policies
-- Policy para permitir INSERT público (usuarios envían audios)
CREATE POLICY "allow_anonymous_insert"
  ON audio_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy para permitir SELECT y UPDATE al service role (admin panel)
-- Nota: service_role bypasea RLS automáticamente, pero las definimos por claridad
CREATE POLICY "allow_service_role_all"
  ON audio_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_audio_submissions_created_at
  ON audio_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audio_submissions_status
  ON audio_submissions(status);

-- 6. Verificar que todo se creó correctamente
SELECT 'Tabla creada:' AS status, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'audio_submissions';

SELECT 'Policy creada:' AS status, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'audio_submissions';
