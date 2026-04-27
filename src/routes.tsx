import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import RootLayout from '@/layouts/RootLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Groups from '@/pages/Groups'
import Comerciales from '@/pages/Comerciales'
import Leads from '@/pages/Leads'
import AuditLog from '@/pages/AuditLog'
import UserManagement from '@/pages/UserManagement'
import NotFound from '@/pages/NotFound'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <RootLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="grupos" element={<Groups />} />
        <Route path="comerciales" element={<Comerciales />} />
        <Route path="leads" element={<Leads />} />
        <Route path="historial" element={<AuditLog />} />
        <Route path="usuarios" element={<UserManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
