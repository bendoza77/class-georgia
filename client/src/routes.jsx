import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Loader from './components/shared/Loader'

const Home = lazy(() => import('./pages/Home/Home'))
const Destinations = lazy(() => import('./pages/Destinations/Destinations'))
const Tours = lazy(() => import('./pages/Tours/Tours'))
const About = lazy(() => import('./pages/About/About'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms/Terms'))
const Cookies = lazy(() => import('./pages/Cookies/Cookies'))

export default function AppRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<Loader />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">{t('notFound.eyebrow')}</p>
      <h1 className="font-display text-6xl font-bold text-light mb-4">{t('notFound.title')}</h1>
      <p className="text-base text-light/45 mb-8 max-w-sm">{t('notFound.description')}</p>
      <a href="/" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 font-medium text-sm transition-all duration-200">
        {t('notFound.backHome')}
      </a>
    </div>
  )
}
