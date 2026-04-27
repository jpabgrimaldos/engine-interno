import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 text-gray-400">
      <p className="text-5xl font-bold text-gray-200">404</p>
      <p className="text-sm">Página no encontrada</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="text-sm text-indigo-600 hover:underline"
      >
        Ir al Dashboard
      </button>
    </div>
  )
}
