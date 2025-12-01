# Setup Backend - Radio Pirata

## 1. Configurar Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/zijmbnwtffldwnfdjovq
2. Ve a SQL Editor
3. Copia y pega el contenido de `supabase-setup.sql`
4. Ejecuta el script (esto crea la tabla, RLS policies e índices)

## 2. Configurar Cloudflare R2

1. Ve a tu bucket `radio-pirata` en Cloudflare R2
2. Asegúrate de que tenga las siguientes configuraciones:
   - Bucket creado: ✅
   - API Tokens generados: ✅
   - Public Access (opcional): Si quieres que los audios sean accesibles públicamente

**Para hacer el bucket público (opcional pero recomendado):**
- Ve a Settings del bucket
- Habilita "Public Access" o configura un custom domain

## 3. Variables de Entorno

El archivo `.env.local` ya está configurado con tus credenciales. **NO lo subas a GitHub** (ya está en .gitignore).

Para producción (Vercel), agrega estas variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://zijmbnwtffldwnfdjovq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG... (anon key pública)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG... (service_role key - SECRETA, solo backend)
R2_ACCOUNT_ID=0d359657...
R2_ACCESS_KEY_ID=23d88fc7...
R2_SECRET_ACCESS_KEY=377d3460...
R2_BUCKET_NAME=radio-pirata
R2_PUBLIC_URL=https://0d359657...
NEXT_PUBLIC_R2_PUBLIC_URL=https://0d359657...
```

## 4. Reiniciar el servidor

```bash
# Detén el servidor actual (Ctrl+C)
# Inicia de nuevo
./radio start
```

## 5. Probar

1. Ve a http://localhost:3000/audio
2. Llena el formulario
3. Graba o sube un audio
4. Click en "ENVIAR AUDIO"
5. Verifica en Supabase que se creó el registro
6. Verifica en R2 que se subió el archivo

## Arquitectura

```
Usuario → AudioForm (Frontend)
         ↓
         1. POST /api/upload-url → Genera presigned URL
         ↓
         2. PUT a R2 (directo) → Sube el archivo
         ↓
         3. POST /api/submit-audio → Guarda metadata en Supabase
```

## Seguridad

✅ Credenciales de R2 solo en el servidor (API routes)
✅ Presigned URLs expiran en 5 minutos
✅ RLS habilitado en Supabase (con policy para INSERT anónimo)
✅ Service Role Key solo se usa en backend (bypasea RLS de forma segura)
✅ Anon Key expuesta en frontend (protegida por RLS)
✅ Validaciones de tamaño y duración en cliente y servidor
