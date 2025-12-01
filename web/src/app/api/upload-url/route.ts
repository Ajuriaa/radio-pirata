import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2Client, R2_BUCKET_NAME } from '@/lib/r2'

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType } = await request.json()

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'Filename and contentType are required' },
        { status: 400 }
      )
    }

    // Generar un nombre único para el archivo
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const key = `audio-submissions/${timestamp}-${randomString}-${filename}`

    // Crear comando para upload
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    })

    // Generar presigned URL (válida por 5 minutos)
    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 300,
    })

    return NextResponse.json({
      presignedUrl,
      key,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}
