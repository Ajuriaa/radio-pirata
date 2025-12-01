import { NextRequest, NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2Client, R2_BUCKET_NAME } from '@/lib/r2'

export async function POST(request: NextRequest) {
  try {
    const { audioUrl } = await request.json()

    if (!audioUrl) {
      return NextResponse.json(
        { error: 'audioUrl is required' },
        { status: 400 }
      )
    }

    // Extraer el key del audio_url
    // audioUrl formato: https://0d359657a312d76756f342a63687692d.r2.cloudflarestorage.com/audio-submissions/...
    const url = new URL(audioUrl)
    const key = url.pathname.substring(1) // Quitar el "/" inicial

    // Crear comando para GET
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })

    // Generar presigned URL (válida por 1 hora)
    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 3600,
    })

    return NextResponse.json({ presignedUrl })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate audio URL' },
      { status: 500 }
    )
  }
}
