-- Agregar policy para service_role (admin panel)
-- Ejecuta esto solo si ya tienes la tabla creada

DROP POLICY IF EXISTS "allow_service_role_all" ON audio_submissions;

CREATE POLICY "allow_service_role_all"
  ON audio_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Verificar
SELECT 'Policies actuales:' AS status, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'audio_submissions';
