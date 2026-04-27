import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Search,
  ClipboardList,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/grupos', label: 'Grupos', icon: Users },
  { to: '/comerciales', label: 'Comerciales', icon: UserCheck },
  { to: '/leads', label: 'Tracking de Leads', icon: Search },
  { to: '/historial', label: 'Historial de Cambios', icon: ClipboardList },
  { to: '/usuarios', label: 'Usuarios y Permisos', icon: ShieldCheck },
]

export default function RootLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const superadminEmails = (import.meta.env.VITE_SUPERADMIN_EMAILS ?? '')
    .split(',')
    .map((e: string) => e.trim())

  const isSuperadmin = user?.email && superadminEmails.includes(user.email)

  const visibleNav = NAV_ITEMS.filter(
    (item) => item.to !== '/usuarios' || isSuperadmin
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 flex flex-col
          bg-[#1e1b4b] text-[#e0e7ff]
          transform transition-transform duration-200
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-[#3730a3]">
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-white tracking-tight">Engine</span>
            <span className="text-[10px] text-indigo-300 leading-none">
              powered by{' '}
              <span className="font-semibold text-indigo-100">Habi</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {visibleNav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-[#312e81] text-white'
                    : 'text-[#c7d2fe] hover:bg-[#312e81]/60 hover:text-white'
                }`
              }
            >
              <Icon size={17} className="shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        <div className="px-3 py-4 border-t border-[#3730a3]">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name ?? 'Usuario'}</p>
              <p className="text-xs text-indigo-300 truncate">
                {isSuperadmin ? 'Superadministrador' : 'Administrador'}
              </p>
            </div>
            <ChevronDown size={14} className="text-indigo-400 shrink-0 ml-auto" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[#c7d2fe] hover:bg-red-900/40 hover:text-red-300 transition-colors"
          >
            <LogOut size={15} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-semibold text-gray-800">Engine — Habi</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
