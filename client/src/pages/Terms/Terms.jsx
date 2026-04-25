import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import { pageTransitionProps } from '../../animations/pageTransition'

export default function Terms() {
  const { t } = useTranslation()
  const hero = t('terms.hero', { returnObjects: true })
  const sections = t('terms.sections', { returnObjects: true })
  const cancellationCards = t('terms.cancellationCards', { returnObjects: true })
  const cta = t('terms.cta', { returnObjects: true })

  useDocumentTitle('Terms of Service — Class Georgia')

  return (
    <motion.div {...pageTransitionProps} className="pt-20">

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-dark-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.035]"
            style={{ background: 'radial-gradient(circle, #5B0E2D, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #C8A96A, transparent 70%)', transform: 'translate(-20%, 20%)' }} />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-4">{hero.eyebrow}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-tight mb-6">
              {hero.title1}<br />
              <em className="italic text-gradient">{hero.title2}</em>
            </h1>
            <p className="text-base text-light/50 leading-relaxed mb-6 max-w-xl">
              {hero.subtitle}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-secondary/40" />
              <span className="text-xs text-light/30 tracking-widest uppercase">{hero.lastUpdated}</span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quick-nav pills */}
      <section className="sticky top-16 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5 py-3 hidden lg:block">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/10 text-light/40 hover:text-secondary hover:border-secondary/30 transition-all duration-200 whitespace-nowrap"
              >
                {s.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-dark">
        <Container>
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map((section, si) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: si * 0.04 }}
                className="scroll-mt-32"
              >
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-0.5 h-10 bg-gradient-to-b from-secondary to-secondary/10 shrink-0 mt-1" />
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-light">{section.title}</h2>
                </div>

                <div className="space-y-7 pl-5">
                  {section.blocks.map((block, bi) => (
                    <div key={bi}>
                      <h3 className="text-sm font-semibold tracking-wide text-secondary mb-2">{block.subtitle}</h3>
                      <p className="text-sm text-light/55 leading-relaxed">{block.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Cancellation highlight cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {cancellationCards.map(item => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border border-white/8 text-center"
                  style={{ background: 'rgba(255,255,255,0.025)' }}
                >
                  <p className="font-display text-lg font-bold text-secondary mb-1">{item.label}</p>
                  <p className="text-xs text-light/40">{item.detail}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="p-8 rounded-xl border border-white/8"
              style={{ background: 'rgba(91,14,45,0.08)' }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-3">{cta.eyebrow}</p>
              <h3 className="font-display text-2xl font-bold text-light mb-3">{cta.title}</h3>
              <p className="text-sm text-light/50 leading-relaxed mb-5">{cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 text-sm font-medium tracking-wide transition-all duration-200"
                >
                  {cta.contactBtn}
                </Link>
                <a
                  href="mailto:info@classgeorgia.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-white/15 text-light/60 hover:text-secondary hover:border-secondary/30 text-sm font-medium tracking-wide transition-all duration-200"
                >
                  {cta.emailBtn}
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

    </motion.div>
  )
}
