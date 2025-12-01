'use client'

import { useState, useEffect } from 'react'
import { supabaseAdmin } from '@/lib/supabase'

type AudioSubmission = {
  id: string
  username: string
  topic: string
  audio_url: string
  audio_filename: string
  audio_size: number
  audio_duration: number | null
  audio_source: 'recording' | 'upload'
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  presigned_url?: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState<AudioSubmission[]>([])
  const [loading, setLoading] = useState(false)
  const [playingId, setPlayingId] = useState<string | null>(null)

  useEffect(() => {
    // Verificar si ya está autenticado en localStorage
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('admin_auth')
      if (auth === 'Radio-Pirata@2025') {
        setIsAuthenticated(true)
        fetchSubmissions()
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'Radio-Pirata@2025') {
      localStorage.setItem('admin_auth', password)
      setIsAuthenticated(true)
      fetchSubmissions()
    } else {
      alert('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    setIsAuthenticated(false)
    setPassword('')
    setSubmissions([])
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/submissions')
      const data = await response.json()
      if (data.success) {
        // Obtener presigned URLs para cada submission
        const submissionsWithUrls = await Promise.all(
          data.data.map(async (sub: AudioSubmission) => {
            try {
              const urlResponse = await fetch('/api/get-audio-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audioUrl: sub.audio_url }),
              })
              const urlData = await urlResponse.json()
              return {
                ...sub,
                presigned_url: urlData.presignedUrl || sub.audio_url,
              }
            } catch (error) {
              console.error('Error getting presigned URL for', sub.id, error)
              return { ...sub, presigned_url: sub.audio_url }
            }
          })
        )
        setSubmissions(submissionsWithUrls)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      alert('Error al cargar las submissions')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })

      const data = await response.json()
      if (data.success) {
        setSubmissions(prev =>
          prev.map(sub => (sub.id === id ? { ...sub, status: newStatus } : sub))
        )
      } else {
        alert('Error al actualizar el estado')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error al actualizar el estado')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-op-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Fondo pirata */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🏴‍☠️</div>
          <div className="absolute bottom-10 right-10 text-9xl">⚓</div>
          <div className="absolute top-1/2 left-1/4 text-7xl">💀</div>
        </div>

        <div className="bg-op-paper/95 rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-op-gold relative z-10">
          <h1 className="text-4xl font-[family-name:var(--font-manga)] text-op-dark mb-2 text-center text-stroke">
            🏴‍☠️ ADMIN PANEL
          </h1>
          <p className="text-center text-op-red font-bold mb-6">Radio Pirata</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-800 font-bold mb-2">
                Contraseña de Capitán:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-op-gold rounded-lg focus:border-op-red focus:outline-none text-black bg-white"
                placeholder="Ingresa la contraseña secreta"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-op-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg border-2 border-white uppercase tracking-wide"
            >
              ⚔️ ZARPAR AL PANEL
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-op-dark p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-op-paper rounded-xl shadow-2xl p-6 mb-6 border-4 border-op-gold">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-[family-name:var(--font-manga)] text-op-dark text-stroke">
                🏴‍☠️ PANEL DEL CAPITÁN
              </h1>
              <p className="text-op-red font-bold text-lg mt-1">
                Radio Pirata - Audios de la Tripulación
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchSubmissions}
                className="bg-op-blue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg border-2 border-white"
              >
                🔄 Recargar
              </button>
              <button
                onClick={handleLogout}
                className="bg-op-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg border-2 border-white"
              >
                ⚓ Salir
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:flex md:items-center gap-2">
            <span className="bg-op-gold text-op-dark font-bold px-4 py-2 rounded-lg text-center">
              📊 Total: {submissions.length}
            </span>
            <span className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg text-center">
              ⏳ {submissions.filter(s => s.status === 'pending').length}
            </span>
            <span className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-center">
              ✅ {submissions.filter(s => s.status === 'approved').length}
            </span>
            <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-center">
              ❌ {submissions.filter(s => s.status === 'rejected').length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="bg-op-paper rounded-xl shadow-2xl p-12 text-center border-4 border-op-gold">
            <p className="text-2xl font-bold text-op-dark">⏳ Cargando el tesoro...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-op-paper rounded-xl shadow-2xl p-12 text-center border-4 border-op-gold">
            <p className="text-3xl font-[family-name:var(--font-manga)] text-op-dark mb-2">
              🏴‍☠️ El cofre está vacío
            </p>
            <p className="text-lg text-gray-600">No hay audios de la tripulación todavía</p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((sub) => (
              <div key={sub.id} className="bg-op-paper rounded-xl shadow-2xl p-6 border-4 border-op-gold">
                {/* Header de la tarjeta */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-[family-name:var(--font-manga)] text-op-dark">
                      {sub.username}
                    </h3>
                    <p className="text-op-red font-bold">Tema: {sub.topic}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold ${
                    sub.status === 'pending' ? 'bg-yellow-500' :
                    sub.status === 'approved' ? 'bg-green-500' :
                    'bg-red-500'
                  } text-white`}>
                    {sub.status === 'pending' ? '⏳ Pendiente' :
                     sub.status === 'approved' ? '✅ Aprobado' :
                     '❌ Rechazado'}
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white/50 rounded-lg p-3 border-2 border-op-gold">
                    <p className="text-xs text-gray-600 font-bold">📅 FECHA</p>
                    <p className="text-sm font-bold text-op-dark">{formatDate(sub.created_at)}</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 border-2 border-op-gold">
                    <p className="text-xs text-gray-600 font-bold">🎤 FUENTE</p>
                    <p className="text-sm font-bold text-op-dark">
                      {sub.audio_source === 'recording' ? 'Grabación' : 'Archivo'}
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 border-2 border-op-gold">
                    <p className="text-xs text-gray-600 font-bold">⏱️ DURACIÓN</p>
                    <p className="text-sm font-bold text-op-dark">{formatDuration(sub.audio_duration)}</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 border-2 border-op-gold">
                    <p className="text-xs text-gray-600 font-bold">📦 TAMAÑO</p>
                    <p className="text-sm font-bold text-op-dark">{formatSize(sub.audio_size)}</p>
                  </div>
                </div>

                {/* Reproductor de Audio */}
                <div className="mb-6 bg-white/70 rounded-lg p-4 border-2 border-op-blue">
                  <p className="text-sm font-bold text-op-dark mb-2 uppercase">🎧 Reproductor</p>
                  <audio
                    controls
                    className="w-full mb-2"
                    src={sub.presigned_url || sub.audio_url}
                    onPlay={() => setPlayingId(sub.id)}
                    onPause={() => setPlayingId(null)}
                  >
                    Tu navegador no soporta el reproductor de audio.
                  </audio>
                  <a
                    href={sub.presigned_url || sub.audio_url}
                    download={sub.audio_filename}
                    className="inline-flex items-center gap-2 bg-op-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md"
                  >
                    ⬇️ Descargar Audio
                  </a>
                  <p className="text-xs text-gray-600 mt-2">📁 {sub.audio_filename}</p>
                </div>

                {/* Botones de Estado */}
                <div className="border-t-2 border-op-gold pt-4">
                  <p className="text-sm font-bold text-op-dark mb-3 uppercase">⚔️ Cambiar Estado:</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => updateStatus(sub.id, 'pending')}
                      className={`px-6 py-3 rounded-lg font-bold transition shadow-lg border-2 ${
                        sub.status === 'pending'
                          ? 'bg-yellow-500 text-white border-yellow-700 scale-105'
                          : 'bg-white text-yellow-600 border-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      ⏳ Pendiente
                    </button>
                    <button
                      onClick={() => updateStatus(sub.id, 'approved')}
                      className={`px-6 py-3 rounded-lg font-bold transition shadow-lg border-2 ${
                        sub.status === 'approved'
                          ? 'bg-green-500 text-white border-green-700 scale-105'
                          : 'bg-white text-green-600 border-green-500 hover:bg-green-50'
                      }`}
                    >
                      ✅ Aprobado
                    </button>
                    <button
                      onClick={() => updateStatus(sub.id, 'rejected')}
                      className={`px-6 py-3 rounded-lg font-bold transition shadow-lg border-2 ${
                        sub.status === 'rejected'
                          ? 'bg-red-500 text-white border-red-700 scale-105'
                          : 'bg-white text-red-600 border-red-500 hover:bg-red-50'
                      }`}
                    >
                      ❌ Rechazado
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
