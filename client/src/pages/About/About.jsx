import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import SectionHeading from '../../components/shared/SectionHeading'
import { staggerContainer, staggerItem } from '../../animations/staggerVariants'
import { pageTransitionProps } from '../../animations/pageTransition'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const teamMembers = [
  { key: 'nino', name: 'Nino Kvaratskhelia', image: 'https://picsum.photos/seed/team-1/300/300' },
  { key: 'giorgi', name: 'Giorgi Beridze', image: 'https://picsum.photos/seed/team-2/300/300' },
  { key: 'tamara', name: 'Tamara Lomidze', image: 'https://picsum.photos/seed/team-3/300/300' },
  { key: 'davit', name: 'Davit Chkhaidze', image: 'https://picsum.photos/seed/team-4/300/300' },
]

const valueKeys = ['authentic', 'quality', 'local', 'sustainable']
const valueIcons = { authentic: '🌿', quality: '⭐', local: '🤝', sustainable: '🌍' }

const statsKeys = ['yearsLabel', 'travellersLabel', 'countriesLabel', 'ratingLabel']
const statsValues = ['15+', '10k+', '60+', '4.9']

export default function About() {
  const { t } = useTranslation()
  useDocumentTitle('About Us')
  const { ref: teamRef, isInView: teamInView } = useScrollAnimation()
  const { ref: valuesRef, isInView: valuesInView } = useScrollAnimation()

  const hero = t('about.hero', { returnObjects: true })
  const story = t('about.story', { returnObjects: true })
  const values = t('about.values', { returnObjects: true })
  const team = t('about.team', { returnObjects: true })
  const cta = t('about.cta', { returnObjects: true })

  return (
    <motion.div {...pageTransitionProps} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/about-hero/1920/800" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">{hero.eyebrow}</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-tight mb-6">
              {hero.titleL1}<br />{hero.titleL2}<br />
              <em className="italic text-gradient">{hero.titleGradient}</em>
            </h1>
            <p className="text-base sm:text-lg text-light/60 leading-relaxed">
              {hero.description}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">{story.eyebrow}</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-light leading-tight mb-6">
                {story.titleL1}<br />{story.titleL2}
              </h2>
              <div className="space-y-4 text-base text-light/55 leading-relaxed">
                <p>{story.p1}</p>
                <p>{story.p2}</p>
                <p>{story.p3}</p>
              </div>
              <div className="mt-8 flex gap-6">
                {statsKeys.map((key, i) => (
                  <div key={key} className="text-center">
                    <p className="font-display text-3xl font-bold text-secondary">{statsValues[i]}</p>
                    <p className="text-xs text-light/40 mt-0.5">{story[key]}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                {['about-img-1', 'about-img-2', 'about-img-3', 'about-img-4'].map((seed, i) => (
                  <div key={seed} className={`overflow-hidden rounded-sm ${i === 0 || i === 3 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                    <img src={`https://picsum.photos/seed/${seed}/400/400`} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-sm bg-primary flex flex-col items-center justify-center border border-secondary/20">
                <p className="font-display text-3xl font-bold text-secondary">2009</p>
                <p className="text-xs text-secondary/60 text-center leading-tight mt-0.5 whitespace-pre-line">{story.estBadge}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <Container>
          <SectionHeading eyebrow={values.eyebrow} title={values.title} centered className="mb-14" />
          <motion.div
            ref={valuesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueKeys.map((key) => (
              <motion.div key={key} variants={staggerItem} className="p-6 rounded-sm bg-dark-700 border border-white/5 hover:border-secondary/15 transition-colors duration-300 text-center">
                <span className="text-4xl mb-4 block">{valueIcons[key]}</span>
                <h3 className="font-display text-lg font-bold text-light mb-2">{values[key].title}</h3>
                <p className="text-sm text-light/45 leading-relaxed">{values[key].desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-dark">
        <Container>
          <SectionHeading eyebrow={team.eyebrow} title={team.title} subtitle={team.subtitle} centered className="mb-14" />
          <motion.div
            ref={teamRef}
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.key} variants={staggerItem} className="group text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-secondary/30 transition-colors duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-display text-lg font-bold text-light">{member.name}</h3>
                <p className="text-xs font-medium text-secondary mb-2">{team.members[member.key].role}</p>
                <p className="text-sm text-light/40 leading-relaxed">{team.members[member.key].bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-800 border-t border-white/5">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-light mb-4">{cta.title}</h2>
            <p className="text-base text-light/45 mb-8">{cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tours" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 font-medium text-sm transition-all duration-200">
                {cta.viewTours}
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm border border-white/15 text-light hover:border-secondary/40 hover:text-secondary font-medium text-sm transition-all duration-200">
                {cta.contactUs}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  )
}
