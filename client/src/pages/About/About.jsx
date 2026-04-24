import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import SectionHeading from '../../components/shared/SectionHeading'
import { staggerContainer, staggerItem } from '../../animations/staggerVariants'
import { pageTransitionProps } from '../../animations/pageTransition'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const team = [
  { name: 'Nino Kvaratskhelia', role: 'Founder & CEO', bio: 'Born in Tbilisi, Nino has 20 years of experience crafting extraordinary journeys through her homeland.', image: 'https://picsum.photos/seed/team-1/300/300' },
  { name: 'Giorgi Beridze', role: 'Head of Experiences', bio: 'A former mountain guide turned luxury tour designer, Giorgi knows every trail and hidden village.', image: 'https://picsum.photos/seed/team-2/300/300' },
  { name: 'Tamara Lomidze', role: 'Culinary & Wine Director', bio: 'Certified sommelier and food writer specialising in Georgian gastronomy and ancient winemaking.', image: 'https://picsum.photos/seed/team-3/300/300' },
  { name: 'Davit Chkhaidze', role: 'Head Guide, Caucasus', bio: 'Mountaineer and cultural historian with 15 years leading expeditions through Kazbegi and Svaneti.', image: 'https://picsum.photos/seed/team-4/300/300' },
]

const values = [
  { icon: '🌿', title: 'Authentic Experiences', desc: 'We go beyond tourist trails to reveal the real Georgia — its people, traditions, and hidden landscapes.' },
  { icon: '⭐', title: 'Uncompromising Quality', desc: 'Every hotel, guide, and activity is personally vetted to meet our exacting luxury standards.' },
  { icon: '🤝', title: 'Local Partnership', desc: 'We work exclusively with Georgian-owned businesses, ensuring your money benefits local communities.' },
  { icon: '🌍', title: 'Sustainable Travel', desc: 'We minimise environmental impact and actively support conservation projects across Georgia.' },
]

export default function About() {
  useDocumentTitle('About Us')
  const { ref: teamRef, isInView: teamInView } = useScrollAnimation()
  const { ref: valuesRef, isInView: valuesInView } = useScrollAnimation()

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
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">Our Story</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-tight mb-6">
              Passionate<br />About<br />
              <em className="italic text-gradient">Georgia</em>
            </h1>
            <p className="text-base sm:text-lg text-light/60 leading-relaxed">
              Founded in 2009 by a Tbilisi native, Class Georgia was born from a simple belief: that Georgia is one of the world's most extraordinary travel destinations, and that the world deserves to know it.
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">Who We Are</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-light leading-tight mb-6">
                Georgia's Premier<br />Luxury Travel Studio
              </h2>
              <div className="space-y-4 text-base text-light/55 leading-relaxed">
                <p>
                  We are a boutique travel agency headquartered in Tbilisi, dedicated entirely to one country: Georgia. This singular focus means our knowledge runs deep — from the back streets of the Old Town to the remotest Svaneti valleys.
                </p>
                <p>
                  Our team of 24 local experts includes former mountain guides, certified sommeliers, art historians, and culinary specialists — each passionate about sharing their homeland with the world.
                </p>
                <p>
                  Over 15 years, we've welcomed more than 10,000 travellers from 60+ countries, crafting journeys that consistently earn 5-star reviews and lifelong clients.
                </p>
              </div>
              <div className="mt-8 flex gap-6">
                {[{ n: '15+', l: 'Years' }, { n: '10k+', l: 'Travellers' }, { n: '60+', l: 'Countries' }, { n: '4.9', l: 'Rating' }].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-display text-3xl font-bold text-secondary">{n}</p>
                    <p className="text-xs text-light/40 mt-0.5">{l}</p>
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
                <p className="text-xs text-secondary/60 text-center leading-tight mt-0.5">Est. in<br />Tbilisi</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-dark-800">
        <Container>
          <SectionHeading eyebrow="Our Philosophy" title="What Drives Us" centered className="mb-14" />
          <motion.div
            ref={valuesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={staggerItem} className="p-6 rounded-sm bg-dark-700 border border-white/5 hover:border-secondary/15 transition-colors duration-300 text-center">
                <span className="text-4xl mb-4 block">{v.icon}</span>
                <h3 className="font-display text-lg font-bold text-light mb-2">{v.title}</h3>
                <p className="text-sm text-light/45 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-dark">
        <Container>
          <SectionHeading eyebrow="The People" title="Meet Our Team" subtitle="Passionate locals who live and breathe Georgia." centered className="mb-14" />
          <motion.div
            ref={teamRef}
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={staggerItem} className="group text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-secondary/30 transition-colors duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-display text-lg font-bold text-light">{member.name}</h3>
                <p className="text-xs font-medium text-secondary mb-2">{member.role}</p>
                <p className="text-sm text-light/40 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-800 border-t border-white/5">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-light mb-4">Ready to Travel with Us?</h2>
            <p className="text-base text-light/45 mb-8">Let's create your perfect Georgian adventure together.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tours" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 font-medium text-sm transition-all duration-200">
                View Tours
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm border border-white/15 text-light hover:border-secondary/40 hover:text-secondary font-medium text-sm transition-all duration-200">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  )
}
