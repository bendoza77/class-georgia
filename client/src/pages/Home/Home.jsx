import { useEffect, useRef, useState } from 'react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Container from '../../components/layout/Container'
import SectionHeading from '../../components/shared/SectionHeading'
import DestinationCard from '../../components/tourism/DestinationCard'
import TourCard from '../../components/tourism/TourCard'
import ExperienceCard from '../../components/tourism/ExperienceCard'
import Gallery from '../../components/tourism/Gallery'
import BookingWidget from '../../components/tourism/BookingWidget'
import { destinations } from '../../constants/destinationsData'
import { tours, experiences } from '../../constants/toursData'
import { staggerContainer, staggerItem, counterVariant } from '../../animations/staggerVariants'
import { fadeInUp, fadeIn } from '../../animations/fadeVariants'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { pageTransitionProps } from '../../animations/pageTransition'

/* ─── Hero ─────────────────────────────────────────────── */
const heroImages = [
  'https://picsum.photos/seed/hero-georgia-1/1920/1080',
  'https://picsum.photos/seed/hero-georgia-2/1920/1080',
  'https://picsum.photos/seed/hero-georgia-3/1920/1080',
]

function HeroSection() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setImgIndex((i) => (i + 1) % heroImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imgIndex}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.img
            src={heroImages[imgIndex]}
            alt="Georgia landscape"
            style={{ y }}
            className="absolute inset-0 w-full h-[115%] object-cover -top-[8%]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/25 to-dark/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/40 via-transparent to-transparent z-10" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 w-full">
        <Container>
          <div className="max-w-3xl pt-20">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-medium text-secondary tracking-[0.18em] uppercase">
                Award-Winning Luxury Travel
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-light leading-[1.05] mb-6"
            >
              Discover
              <br />
              <em className="italic text-gradient not-italic">Georgia's</em>
              <br />
              Hidden Soul
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-base sm:text-lg text-light/60 max-w-lg leading-relaxed mb-10"
            >
              Immerse yourself in 3,000 years of culture, dramatic Caucasian landscapes, and the world's oldest wine tradition — expertly curated for the discerning traveller.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 hover:border-secondary/30 font-medium tracking-wide text-sm transition-all duration-300"
                >
                  Explore Tours
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm border border-white/20 text-light hover:border-secondary/50 hover:text-secondary font-medium tracking-wide text-sm backdrop-blur-sm transition-all duration-300"
                >
                  View Destinations
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-light/30 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-secondary/60 to-transparent"
        />
      </motion.div>

      {/* Hero image dots */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIndex(i)}
            className={`h-0.5 transition-all duration-500 rounded-full ${i === imgIndex ? 'w-8 bg-secondary' : 'w-3 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  )
}

/* ─── Stats ─────────────────────────────────────────────── */
const stats = [
  { value: 10000, suffix: '+', label: 'Happy Travellers', icon: '😊' },
  { value: 50, suffix: '+', label: 'Unique Tours', icon: '🗺️' },
  { value: 15, suffix: '+', label: 'Years of Excellence', icon: '⭐' },
  { value: 4.9, suffix: '', label: 'Average Rating', icon: '🏆' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const { ref, isInView } = useScrollAnimation()

  useEffect(() => {
    if (!isInView) return
    const isDecimal = !Number.isInteger(target)
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-bold text-secondary">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function StatsSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-16 bg-dark-800 border-y border-white/5">
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={counterVariant}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-3xl mb-2" role="img">{s.icon}</span>
              <Counter target={s.value} suffix={s.suffix} />
              <p className="text-sm text-light/40 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

/* ─── Destinations ──────────────────────────────────────── */
function DestinationsSection() {
  const { ref, isInView } = useScrollAnimation()
  const featured = destinations.filter((d) => d.featured)

  return (
    <section className="py-20 lg:py-28 bg-dark">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Where to Go"
            title={<>Featured<br />Destinations</>}
            subtitle="Hand-picked regions offering extraordinary experiences for every kind of explorer."
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-sm text-secondary underline-anim font-medium shrink-0"
            >
              All destinations
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

/* ─── Tours ─────────────────────────────────────────────── */
function ToursSection() {
  const { ref, isInView } = useScrollAnimation()
  const featured = tours.filter((t) => t.featured)

  return (
    <section className="py-20 lg:py-28 bg-dark-800">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Our Tours"
            title={<>Curated<br />Experiences</>}
            subtitle="Meticulously designed itineraries combining culture, adventure, and pure luxury."
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 text-sm text-secondary underline-anim font-medium shrink-0"
            >
              All tours
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

/* ─── Experiences ───────────────────────────────────────── */
function ExperiencesSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-20 lg:py-28 bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #5B0E2D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C8A96A 0%, transparent 40%)' }}
      />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="How We Travel"
          title="Ways to Experience Georgia"
          subtitle="Every journey is tailored to your passions. Choose your adventure."
          centered
          className="mb-14"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

/* ─── Gallery ───────────────────────────────────────────── */
function GallerySection() {
  return (
    <section className="py-20 lg:py-28 bg-dark-800">
      <Container>
        <SectionHeading
          eyebrow="Visual Journey"
          title="Georgia Through Our Lens"
          subtitle="A glimpse into the extraordinary landscapes and moments awaiting you."
          centered
          className="mb-12"
        />
        <Gallery />
      </Container>
    </section>
  )
}

/* ─── Testimonials ──────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: 'Sophie & James',
    country: 'United Kingdom',
    rating: 5,
    text: 'Class Georgia transformed our honeymoon into the most magical week of our lives. The attention to detail, the private experiences, the sheer beauty of every location — absolutely flawless.',
    avatar: 'https://picsum.photos/seed/avatar-1/80/80',
    tour: 'Ultimate Georgia Discovery',
  },
  {
    id: 2,
    name: 'Marco Ferretti',
    country: 'Italy',
    rating: 5,
    text: 'As a wine professional, the Kakheti experience exceeded every expectation. Tasting qvevri wines in 2,000-year-old cellars is something I cannot find anywhere else on Earth.',
    avatar: 'https://picsum.photos/seed/avatar-2/80/80',
    tour: 'Wine & Culture Journey',
  },
  {
    id: 3,
    name: 'Aiko Tanaka',
    country: 'Japan',
    rating: 5,
    text: "The mountain trek was breathtaking in every sense. Our guide's knowledge of Svaneti history made every stone tower feel alive. Already planning my return.",
    avatar: 'https://picsum.photos/seed/avatar-3/80/80',
    tour: 'Caucasus Mountain Trek',
  },
]

function TestimonialsSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-20 lg:py-28 bg-dark">
      <Container>
        <SectionHeading
          eyebrow="Traveller Stories"
          title="What Our Guests Say"
          centered
          className="mb-14"
        />
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={staggerItem}
              className="flex flex-col p-6 rounded-sm bg-dark-700 border border-white/5 hover:border-secondary/15 transition-colors duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#C8A96A"><path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.25l-4.33 2.25.83-4.82L1 6.27l4.91-.71L8 1z"/></svg>
                ))}
              </div>
              <p className="text-sm text-light/60 leading-relaxed italic flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-secondary/20" />
                <div>
                  <p className="text-sm font-medium text-light">{t.name}</p>
                  <p className="text-xs text-light/35">{t.country} · {t.tour}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

/* ─── CTA ───────────────────────────────────────────────── */
function CTASection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/cta-georgia/1920/800"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-dark/80" />
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-2xl"
        >
          <motion.p variants={staggerItem} className="text-xs font-medium tracking-[0.2em] uppercase text-secondary/80 mb-3">
            Your Journey Awaits
          </motion.p>
          <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Plan Your<br />
            <em className="italic">Perfect</em> Trip
          </motion.h2>
          <motion.p variants={staggerItem} className="text-base text-white/60 leading-relaxed mb-10 max-w-md">
            Let our travel experts craft a bespoke Georgian adventure tailored to your interests, pace, and budget.
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm bg-secondary hover:bg-secondary-light text-dark font-semibold text-sm tracking-wide transition-all duration-200"
              >
                Start Planning
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/tours"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm border border-white/30 text-white hover:border-white/60 font-medium text-sm tracking-wide transition-all duration-200"
              >
                Browse Tours
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-6">
            {['Free Consultation', 'Custom Itineraries', 'Expert Local Guides', '24/7 Support'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-white/55">
                <span className="w-1 h-1 rounded-full bg-secondary" />
                {f}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

/* ─── Booking Section ───────────────────────────────────── */
function QuickBookingSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-20 lg:py-28 bg-dark-800">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.p variants={staggerItem} className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">
              Book Your Tour
            </motion.p>
            <motion.h2 variants={staggerItem} className="font-display text-4xl sm:text-5xl font-bold text-light leading-tight mb-5">
              Ready to<br />Start Your Journey?
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base text-light/50 leading-relaxed mb-8">
              Fill in the form and our team will reach out within 24 hours to finalise your bespoke Georgian adventure.
            </motion.p>
            <motion.div variants={staggerItem} className="space-y-4">
              {[
                { icon: '📞', title: 'Dedicated Support', desc: '+995 32 200 0000 · Mon–Sun 9–21h' },
                { icon: '✉️', title: 'Email Us', desc: 'info@classgeorgia.com' },
                { icon: '📍', title: 'Visit Us', desc: '12 Rustaveli Ave, Tbilisi, Georgia' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-medium text-light">{title}</p>
                    <p className="text-sm text-light/40">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-700 border border-white/5 rounded-sm p-6 lg:p-8"
          >
            <BookingWidget />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Home Page ─────────────────────────────────────────── */
export default function Home() {
  useDocumentTitle(null)
  return (
    <motion.div {...pageTransitionProps}>
      <HeroSection />
      <StatsSection />
      <DestinationsSection />
      <ToursSection />
      <ExperiencesSection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <QuickBookingSection />
    </motion.div>
  )
}
