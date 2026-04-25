import { useSiteData } from '../../context/SiteDataContext'
import { Link } from 'react-router-dom'

function StatCard({ label, value, icon, to, color }) {
  return (
    <Link
      to={to}
      className="bg-[#161616] border border-white/6 rounded-sm p-5 hover:border-white/15 transition-colors duration-200 group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>Manage →</span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/35">{label}</p>
    </Link>
  )
}

export default function AdminDashboard() {
  const { tours, destinations, experiences, testimonials, heroImages } = useSiteData()

  const stats = [
    { label: 'Tours', value: tours.length, icon: '🗺', to: '/class-panel/tours', color: 'bg-[#5B0E2D]/30 text-[#C8A96A]' },
    { label: 'Destinations', value: destinations.length, icon: '📍', to: '/class-panel/destinations', color: 'bg-blue-900/30 text-blue-300' },
    { label: 'Experiences', value: experiences.length, icon: '✨', to: '/class-panel/experiences', color: 'bg-purple-900/30 text-purple-300' },
    { label: 'Testimonials', value: testimonials.length, icon: '💬', to: '/class-panel/testimonials', color: 'bg-green-900/30 text-green-300' },
    { label: 'Hero Images', value: heroImages.length, icon: '🖼', to: '/class-panel/hero', color: 'bg-amber-900/30 text-amber-300' },
    { label: 'Languages', value: 2, icon: '🌐', to: '/class-panel/translations', color: 'bg-cyan-900/30 text-cyan-300' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/35 mt-1">Manage every piece of content on your site</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-[#161616] border border-white/6 rounded-sm p-5">
        <h2 className="text-sm font-medium text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Tour', to: '/class-panel/tours', icon: '+' },
            { label: 'Add Destination', to: '/class-panel/destinations', icon: '+' },
            { label: 'Edit Translations', to: '/class-panel/translations', icon: '✎' },
            { label: 'Manage Hero', to: '/class-panel/hero', icon: '🖼' },
          ].map(({ label, to, icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-sm text-sm text-white/60 hover:text-white transition-all duration-150"
            >
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#161616] border border-[#C8A96A]/15 rounded-sm p-5">
        <h2 className="text-sm font-medium text-[#C8A96A] mb-2">ℹ About Admin Data</h2>
        <p className="text-xs text-white/35 leading-relaxed">
          All changes are saved in your browser's localStorage and applied to the live site immediately.
          Use the <strong className="text-white/50">Reset to Defaults</strong> option in any manager to restore original content.
          Translations are applied in real-time via i18next.
        </p>
      </div>
    </div>
  )
}
