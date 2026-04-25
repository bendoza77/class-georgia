import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAdmin } from '../AdminContext'

const navItems = [
  { to: '/class-panel/dashboard', icon: '▦', label: 'Dashboard' },
  { to: '/class-panel/tours', icon: '🗺', label: 'Tours' },
  { to: '/class-panel/destinations', icon: '📍', label: 'Destinations' },
  { to: '/class-panel/experiences', icon: '✨', label: 'Experiences' },
  { to: '/class-panel/testimonials', icon: '💬', label: 'Testimonials' },
  { to: '/class-panel/hero', icon: '🖼', label: 'Hero Images' },
  { to: '/class-panel/translations', icon: '🌐', label: 'Translations' },
]

export default function AdminLayout({ children }) {
  const { logout } = useAdmin()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/class-panel')
  }

  return (
    <div className="min-h-screen flex bg-[#0d0d0d] text-white font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#111111] border-r border-white/5 flex flex-col z-30 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#5B0E2D] flex items-center justify-center">
              <span className="text-[#C8A96A] font-bold text-sm">CG</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Class Georgia</p>
              <p className="text-[10px] text-white/30 tracking-widest uppercase">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <p className="px-6 mb-2 text-[10px] font-medium text-white/20 uppercase tracking-[0.15em]">Content</p>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#5B0E2D]/30 text-[#C8A96A] border-r-2 border-[#C8A96A]'
                    : 'text-white/50 hover:text-white hover:bg-white/4'
                }`
              }
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
            </NavLink>
          ))}

          <div className="mt-4 px-6">
            <div className="h-px bg-white/5" />
          </div>
          <p className="px-6 mt-4 mb-2 text-[10px] font-medium text-white/20 uppercase tracking-[0.15em]">Site</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/4 transition-all duration-150"
          >
            <span className="text-base w-5 text-center">↗</span>
            View Site
          </a>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm text-white/40 hover:text-red-400 hover:bg-red-900/10 transition-all duration-150"
          >
            <span className="text-base">⏻</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 h-14 bg-[#111111]/90 backdrop-blur border-b border-white/5 flex items-center px-4 lg:px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-white/50 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect y="3" width="20" height="2" rx="1"/>
              <rect y="9" width="20" height="2" rx="1"/>
              <rect y="15" width="20" height="2" rx="1"/>
            </svg>
          </button>
          <div className="flex-1" />
          <span className="text-xs text-white/25">Password: <code className="text-white/40">admin2025</code></span>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
