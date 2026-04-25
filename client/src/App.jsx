import { createContext, useState, useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/shared/ScrollToTop'
import AIChat from './components/shared/AIChat'
import AppRoutes from './routes'

export const ThemeContext = createContext({
  isDark: true,
  setIsDark: () => {},
})

export const useTheme = () => useContext(ThemeContext)

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
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-dark text-light overflow-x-hidden transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
          <ScrollToTop />
          <AIChat />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}
