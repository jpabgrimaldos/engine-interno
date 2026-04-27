import { ShieldCheck } from 'lucide-react'

export default function UserManagement() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-xl font-bold text-gray-900 mb-2">Usuarios y Permisos</h1>
      <p className="text-sm text-gray-400 mb-8">Gestión de usuarios de la plataforma.</p>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 flex flex-col items-center gap-3 text-gray-400">
        <ShieldCheck size={36} className="text-gray-200" />
        <p className="text-sm">Próximamente — conectar con el backend</p>
      </div>
    </div>
  )
}
