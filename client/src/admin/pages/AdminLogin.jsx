import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../AdminContext'

export default function AdminLogin() {
  const { login, error } = useAdmin()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const ok = login(password)
      if (ok) navigate('/class-panel/dashboard')
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-sm bg-[#5B0E2D] items-center justify-center mb-4">
            <span className="text-[#C8A96A] font-bold text-xl">CG</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Class Georgia</h1>
          <p className="text-sm text-white/35 mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111111] border border-white/8 rounded-sm p-6">
          <h2 className="text-base font-medium text-white mb-5">Sign in</h2>

          <label className="block mb-1 text-xs text-white/40 uppercase tracking-wider">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/50 transition-colors mb-4"
            autoFocus
          />

          {error && (
            <p className="text-xs text-red-400 mb-4 bg-red-900/15 px-3 py-2 rounded-sm border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 bg-[#5B0E2D] hover:bg-[#7a1240] disabled:opacity-50 text-[#C8A96A] text-sm font-medium rounded-sm transition-colors duration-200"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-[11px] text-white/20 text-center mt-4">
            Default password: <code className="text-white/35">admin2025</code>
          </p>
        </form>
      </div>
    </div>
  )
}
