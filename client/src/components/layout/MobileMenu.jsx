import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/Screenshot_2026-04-24_190625-removebg-preview.png'
import { navLinks } from '../../constants/navLinks'
import { mobileMenuVariant, overlayVariant } from '../../animations/slideVariants'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import Button from '../ui/Button'
import LanguageSwitcher from '../shared/LanguageSwitcher'

const itemVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  const { t } = useTranslation()
  useLockBodyScroll(isOpen)

  return (
    <>
      <motion.div
        key="overlay"
        variants={overlayVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm"
      />

      <motion.nav
        key="menu"
        variants={mobileMenuVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-dark-800 border-l border-white/5 flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <img src={logo} alt="Class Georgia" className="h-10 w-auto object-contain" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-light/60 hover:text-secondary hover:border-secondary/40 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <ul className="flex flex-col px-6 pt-8 gap-1 flex-1">
          {navLinks.map((link, i) => (
            <motion.li key={link.path} custom={i} variants={itemVariant} initial="hidden" animate="visible">
              <Link
                to={link.path}
                onClick={onClose}
                className={`flex items-center justify-between py-4 border-b border-white/5 text-lg font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-secondary'
                    : 'text-light/80 hover:text-secondary'
                }`}
              >
                {t(`nav.${link.key}`)}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8h8M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="px-6 pb-10 pt-6">
          <Button as={Link} to="/contact" onClick={onClose} fullWidth size="lg">
            {t('mobileMenu.bookJourney')}
          </Button>
          <p className="mt-5 text-center text-xs text-light/30">
            {t('mobileMenu.contact')}
          </p>
        </div>
      </motion.nav>
    </>
  )
}
