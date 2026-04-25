import { createContext, useState, useContext, useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/shared/ScrollToTop'
import AIChat from './components/shared/AIChat'
import AppRoutes from './routes'
import AdminRoutes from './admin/AdminRoutes'
import { SiteDataProvider } from './context/SiteDataContext'

export const ThemeContext = createContext({
  isDark: true,
  setIsDark: () => {},
})

export const useTheme = () => useContext(ThemeContext)

function AppShell() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/class-panel')

  if (isAdmin) {
    return <AdminRoutes />
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark text-light overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <ScrollToTop />
      <AIChat />
    </div>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('light')
    } else {
      html.classList.add('light')
    }
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <SiteDataProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </SiteDataProvider>
    </ThemeContext.Provider>
  )
}
