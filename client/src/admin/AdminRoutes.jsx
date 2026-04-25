import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminProvider, useAdmin } from './AdminContext'
import AdminLayout from './layout/AdminLayout'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ToursManager from './pages/ToursManager'
import DestinationsManager from './pages/DestinationsManager'
import ExperiencesManager from './pages/ExperiencesManager'
import TestimonialsManager from './pages/TestimonialsManager'
import HeroManager from './pages/HeroManager'
import TranslationsManager from './pages/TranslationsManager'

function Protected({ children }) {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/class-panel" replace />
}

function AdminApp() {
  return (
    <Routes>
      <Route path="/class-panel" element={<AdminLogin />} />
      <Route path="/class-panel/dashboard" element={<Protected><AdminDashboard /></Protected>} />
      <Route path="/class-panel/tours" element={<Protected><ToursManager /></Protected>} />
      <Route path="/class-panel/destinations" element={<Protected><DestinationsManager /></Protected>} />
      <Route path="/class-panel/experiences" element={<Protected><ExperiencesManager /></Protected>} />
      <Route path="/class-panel/testimonials" element={<Protected><TestimonialsManager /></Protected>} />
      <Route path="/class-panel/hero" element={<Protected><HeroManager /></Protected>} />
      <Route path="/class-panel/translations" element={<Protected><TranslationsManager /></Protected>} />
      <Route path="/class-panel/*" element={<Navigate to="/class-panel" replace />} />
    </Routes>
  )
}

export default function AdminRoutes() {
  return (
    <AdminProvider>
      <AdminApp />
    </AdminProvider>
  )
}
