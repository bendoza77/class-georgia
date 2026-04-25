import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import SectionHeading from '../../components/shared/SectionHeading'
import DestinationCard from '../../components/tourism/DestinationCard'
import { useSiteData } from '../../context/SiteDataContext'
import { staggerContainer } from '../../animations/staggerVariants'
import { pageTransitionProps } from '../../animations/pageTransition'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const regionKeys = ['All', 'Capital City', 'Greater Caucasus', 'Adjara', 'Wine Country', 'Upper Svaneti', 'Kartli']

export default function Destinations() {
  const { t } = useTranslation()
  useDocumentTitle('Destinations')
  const { destinations } = useSiteData()
  const [activeRegion, setActiveRegion] = useState('All')
  const { ref, isInView } = useScrollAnimation()

  const destTranslations = t('data.destinations', { returnObjects: true })
  const localizedDestinations = destinations.map((d) => ({
    ...d,
    ...destTranslations[String(d.id)],
  }))

  const filtered = activeRegion === 'All'
    ? localizedDestinations
    : localizedDestinations.filter((d) => destinations.find(r => r.id === d.id)?.region === activeRegion)

  const count = filtered.length

  return (
    <motion.div {...pageTransitionProps} className="pt-20">
      {/* Page Hero */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(ellipse at 0% 50%, #5B0E2D 0%, transparent 60%), radial-gradient(ellipse at 100% 0%, #C8A96A 0%, transparent 50%)' }}
        />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">{t('destinations.eyebrow')}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-tight mb-5">
              {t('destinations.title')}
            </h1>
            <p className="text-base sm:text-lg text-light/50 max-w-xl leading-relaxed">
              {t('destinations.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filter */}
      <section className="py-8 bg-dark sticky top-16 lg:top-20 z-30 border-b border-white/5 backdrop-blur-sm bg-dark/80">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          >
            {regionKeys.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  activeRegion === r
                    ? 'bg-primary text-secondary border border-secondary/30'
                    : 'bg-dark-700 text-light/50 border border-white/5 hover:text-secondary hover:border-secondary/20'
                }`}
              >
                {t(`destinations.regions.${r}`)}
              </button>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-24 bg-dark">
        <Container>
          <p className="text-sm text-light/35 mb-8">
            {t('destinations.showing')} <span className="text-secondary font-medium">{count}</span> {count !== 1 ? t('destinations.destinations') : t('destinations.destination')}
          </p>
          <motion.div
            ref={ref}
            key={activeRegion}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-light/30 text-lg">{t('destinations.noResults')}</p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-dark-800 border-t border-white/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-sm bg-gradient-to-r from-primary/30 to-dark-700 border border-primary/20"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-light mb-1">
                {t('destinations.ctaTitle')}
              </h3>
              <p className="text-sm text-light/45">{t('destinations.ctaSubtitle')}</p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-secondary hover:bg-secondary-light text-dark font-semibold text-sm transition-all duration-200"
            >
              {t('destinations.ctaButton')}
            </Link>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  )
}
