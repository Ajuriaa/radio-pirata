'use client'

import { useState, useRef } from 'react'
import { Mic, Upload, X } from 'lucide-react'

export default function AudioForm() {
  const [username, setUsername] = useState('')
  const [topic, setTopic] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Tu navegador no soporta grabación de audio')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' })
        setAudioFile(file)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('No se pudo acceder al micrófono')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('El archivo debe ser menor a 10MB')
        return
      }
      setAudioFile(file)
      setAudioUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert('Debes aceptar los términos de uso y privacidad')
      return
    }
    if (!audioFile) {
      alert('Debes grabar o subir un audio')
      return
    }
    // TODO: Implement backend submission
    console.log({ username: username || 'Anonimo', topic, audioFile })
    alert('Audio enviado (backend pendiente)')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      {/* Username */}
      <div>
        <label className="block text-gray-800 font-bold mb-2">
          Nombre de usuario:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Anonimo"
          className="text-black w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-op-gold focus:outline-none"
        />
      </div>

      {/* Topic */}
      <div>
        <label className="block text-gray-800 font-bold mb-2">
          Tema:
        </label>
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="text-black w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-op-gold focus:outline-none appearance-none bg-white"
          required
        >
          <option value="">Selecciona un tema</option>
          <option value="Manga">Manga</option>
          <option value="Enjoyer">Enjoyer</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* Recording Section */}
      <div className="border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="text-op-blue" />
          <h3 className="text-xl font-bold text-gray-800">Grabar Audio</h3>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            onClick={startRecording}
            disabled={isRecording}
            className="bg-op-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            GRABAR AUDIO
          </button>
          <button
            type="button"
            onClick={stopRecording}
            disabled={!isRecording}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            DETENER
          </button>
          <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-gray-300">
            <span className="text-2xl font-bold text-gray-700">
              {isRecording ? formatTime(recordingTime) : '0'}
            </span>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="border-2 border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Subir Archivo</h3>
        </div>
        <label className="block">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg cursor-pointer inline-block transition">
            Seleccionar archivo de audio
          </span>
        </label>
        <p className="text-sm text-gray-500 mt-2 italic">
          Entre 5 segundos y 2 minutos. Máximo 10MB
        </p>
        {audioFile && (
          <p className="text-sm text-green-600 mt-2 font-medium">
            ✓ {audioFile.name}
          </p>
        )}
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="border-2 border-gray-200 rounded-xl p-4">
          <audio controls className="w-full" src={audioUrl}>
            Tu navegador no soporta el reproductor de audio.
          </audio>
        </div>
      )}

      {/* Terms */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-2 border-gray-300 focus:ring-op-gold"
          required
        />
        <label htmlFor="terms" className="text-gray-700">
          Acepto los{' '}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="text-op-blue font-bold hover:underline"
          >
            términos de uso y privacidad
          </button>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition shadow-lg"
      >
        ENVIAR AUDIO
      </button>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-[family-name:var(--font-manga)] text-op-dark mb-4">
              🏴‍☠️ Términos de Uso y Privacidad
            </h2>
            <p className="text-sm text-gray-600 mb-6">Última actualización: Noviembre 2025</p>

            <div className="space-y-6 text-gray-800">
              <section>
                <h3 className="text-xl font-bold mb-2">1. Aceptación de Términos</h3>
                <p>
                  Al enviar un audio a Radio Pirata, aceptas estos términos de uso. Esta plataforma
                  permite a los usuarios enviar audios de forma voluntaria para ser utilizados en
                  podcasts.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">2. Uso de Audios</h3>
                <p>Los audios enviados podrán ser:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Reproducidos durante episodios del podcast Radio Pirata</li>
                  <li>Editados para mejorar la calidad o duración</li>
                  <li>Publicados en plataformas de podcast (Spotify, Youtube, iVoox, etc.)</li>
                  <li>Compartidos en redes sociales relacionadas con el podcast</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">3. Derechos del Usuario</h3>
                <p>Al enviar un audio, declaras que:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Eres el autor original del contenido o tienes permiso para compartirlo</li>
                  <li>El contenido no infringe derechos de terceros</li>
                  <li>Aceptas voluntariamente que tu audio sea usado según estos términos</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">4. Datos Personales</h3>
                <p>
                  Solo recopilamos el nombre de usuario que proporciones (opcional, por defecto
                  &quot;Anónimo&quot;) y el audio grabado.
                </p>
                <p className="mt-2 font-semibold">No recopilamos:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Correos electrónicos</li>
                  <li>Direcciones IP (más allá del límite de rate limiting temporal)</li>
                  <li>Información de ubicación</li>
                  <li>Datos de navegación</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">5. Almacenamiento</h3>
                <p>
                  Los audios se almacenan de forma segura en servicios en la nube y base de datos.
                  Solo los administradores tienen acceso para gestionar los envíos.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">6. Contenido Prohibido</h3>
                <p>No se permite enviar audios que contengan:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Información personal de terceros sin consentimiento</li>
                  <li>Spam o publicidad no autorizada</li>
                  <li>Material protegido por derechos de autor sin permiso</li>
                </ul>
                <p className="mt-2">
                  Los administradores se reservan el derecho de eliminar cualquier audio que viole
                  estos términos.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">7. Limitación de Responsabilidad</h3>
                <p>
                  Radio Pirata no se hace responsable del uso que los usuarios hagan de la
                  plataforma ni de los contenidos enviados por terceros.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-2">8. Modificaciones</h3>
                <p>
                  Estos términos pueden actualizarse ocasionalmente. El uso continuado de la
                  plataforma implica la aceptación de cualquier modificación.
                </p>
              </section>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="mt-6 w-full bg-op-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
