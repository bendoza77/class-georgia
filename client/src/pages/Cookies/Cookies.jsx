import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import { pageTransitionProps } from '../../animations/pageTransition'

export default function Cookies() {
  const { t } = useTranslation()
  const hero = t('cookies.hero', { returnObjects: true })
  const cookieTypes = t('cookies.cookieTypes', { returnObjects: true })
  const sections = t('cookies.sections', { returnObjects: true })
  const browsers = t('cookies.browsers', { returnObjects: true })
  const cta = t('cookies.cta', { returnObjects: true })

  useDocumentTitle('Cookie Policy — Class Georgia')

  return (
    <motion.div {...pageTransitionProps} className="pt-20">

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-dark-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-[0.035]"
            style={{ background: 'radial-gradient(circle, #5B0E2D, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #C8A96A, transparent 70%)', transform: 'translate(15%, 15%)' }} />
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

      {/* Cookie types grid */}
      <section className="py-16 lg:py-20 bg-dark-800 border-b border-white/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">{t('cookies.typesEyebrow')}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-light">{t('cookies.typesTitle')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cookieTypes.map((type, i) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-xl border border-white/8 flex flex-col gap-4"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-light">{type.name}</h3>
                  <span
                    className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium tracking-wide"
                    style={
                      type.required
                        ? { background: 'rgba(91,14,45,0.3)', color: '#C8A96A', border: '1px solid rgba(200,169,106,0.25)' }
                        : { background: 'rgba(255,255,255,0.06)', color: 'rgba(248,245,240,0.4)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    {type.required ? t('cookies.required') : t('cookies.optional')}
                  </span>
                </div>
                <p className="text-sm text-light/50 leading-relaxed">{type.description}</p>
                <div className="pt-2 border-t border-white/6">
                  <p className="text-xs text-secondary/70 font-medium mb-2 tracking-wide">{t('cookies.examples')}</p>
                  <ul className="flex flex-wrap gap-2">
                    {type.examples.map(ex => (
                      <li
                        key={ex}
                        className="text-xs text-light/35 px-2 py-0.5 rounded"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Detailed content */}
      <section className="py-16 lg:py-24 bg-dark">
        <Container>
          <div className="max-w-3xl mx-auto space-y-14">
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
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-0.5 h-10 bg-gradient-to-b from-secondary to-secondary/10 shrink-0 mt-1" />
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-light">{section.title}</h2>
                </div>
                <p className="text-sm text-light/55 leading-relaxed pl-5">{section.content}</p>
              </motion.div>
            ))}

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Browser settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-0.5 h-10 bg-gradient-to-b from-secondary to-secondary/10 shrink-0 mt-1" />
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-light">{t('cookies.browserTitle')}</h2>
              </div>
              <p className="text-sm text-light/55 leading-relaxed pl-5 mb-6">
                {t('cookies.browserSubtitle')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-5">
                {browsers.map(browser => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-white/8 text-center text-sm text-light/50 hover:text-secondary hover:border-secondary/25 transition-all duration-200 group"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <span className="block text-lg mb-1 group-hover:scale-110 transition-transform duration-200">🌐</span>
                    {browser.name}
                  </a>
                ))}
              </div>
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
                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-white/15 text-light/60 hover:text-secondary hover:border-secondary/30 text-sm font-medium tracking-wide transition-all duration-200"
                >
                  {cta.privacyBtn}
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

    </motion.div>
  )
}
