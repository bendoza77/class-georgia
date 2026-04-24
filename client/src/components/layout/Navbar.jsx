import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import logo from '../../assets/Screenshot_2026-04-24_190625-removebg-preview.png'
import { navLinks } from '../../constants/navLinks'
import { ThemeContext } from '../../App'
import MobileMenu from './MobileMenu'
import Container from './Container'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { isDark, setIsDark } = useContext(ThemeContext)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <motion.img
                src={logo}
                alt="Class Georgia"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25 }}
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide underline-anim transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-secondary'
                      : 'text-light/70 hover:text-light'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-secondary"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle theme"
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-white/10 text-light/60 hover:text-secondary hover:border-secondary/40 transition-all duration-200"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>

              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 hover:border-secondary/30 transition-all duration-200 tracking-wide"
              >
                Book Now
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden flex flex-col gap-1.5 p-2 group"
              >
                <span className="block w-6 h-px bg-light/80 group-hover:bg-secondary transition-colors duration-200" />
                <span className="block w-4 h-px bg-light/80 group-hover:bg-secondary transition-colors duration-200" />
                <span className="block w-6 h-px bg-light/80 group-hover:bg-secondary transition-colors duration-200" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Scroll progress bar */}
      <ScrollProgress />

      <AnimatePresence>
        {menuOpen && <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div
      id="scroll-progress"
      style={{ scaleX, width: '100%' }}
    />
  )
}
