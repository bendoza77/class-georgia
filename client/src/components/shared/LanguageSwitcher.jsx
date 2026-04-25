import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation()
  const current = i18n.language
  const toggle = () => i18n.changeLanguage(current === 'en' ? 'ka' : 'en')

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.95 }}
      aria-label="Switch language"
      className={`flex items-center gap-1 h-9 px-3 rounded-full border border-white/10 hover:border-secondary/40 transition-all duration-200 ${className}`}
    >
      <span className={`text-xs font-semibold tracking-wider transition-colors duration-200 ${current === 'en' ? 'text-secondary' : 'text-light/40'}`}>
        EN
      </span>
      <span className="text-light/20 text-xs">|</span>
      <span className={`text-xs font-semibold tracking-wider transition-colors duration-200 ${current === 'ka' ? 'text-secondary' : 'text-light/40'}`}>
        KA
      </span>
    </motion.button>
  )
}
