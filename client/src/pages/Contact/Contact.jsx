import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import BookingWidget from '../../components/tourism/BookingWidget'
import { staggerContainer, staggerItem } from '../../animations/staggerVariants'
import { pageTransitionProps } from '../../animations/pageTransition'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 6–8 weeks in advance for peak season (June–September). However, we can sometimes accommodate last-minute requests.' },
  { q: 'Are tours private or group-based?', a: 'All Class Georgia tours are private by default. We do not mix strangers. Your journey is entirely yours.' },
  { q: 'What is included in the price?', a: 'Each tour has a detailed inclusions list. Typically: all accommodation, private transport, expert guides, and most meals.' },
  { q: 'Do I need a visa to visit Georgia?', a: 'Citizens of 95+ countries can enter Georgia visa-free. We provide full pre-trip documentation support to all clients.' },
  { q: 'Can you accommodate dietary requirements?', a: 'Absolutely. Georgian cuisine is naturally diverse. We customise every meal to your needs, whether vegan, gluten-free, or otherwise.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-light group-hover:text-secondary transition-colors duration-200 pr-4">{q}</span>
        <span className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-white/10 text-light/50 group-hover:border-secondary/30 group-hover:text-secondary transition-all duration-200 ${open ? 'rotate-45' : ''}`} style={{ transition: 'transform 0.3s, color 0.2s, border-color 0.2s' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-light/45 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  )
}

export default function Contact() {
  useDocumentTitle('Contact & Book')
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div {...pageTransitionProps} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-dark-800 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, #5B0E2D 0%, transparent 60%)' }}
        />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">Get in Touch</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-tight mb-5">
              Let's Plan<br />Your Journey
            </h1>
            <p className="text-base sm:text-lg text-light/50 leading-relaxed">
              Whether you're ready to book or simply exploring, our team is here to answer every question and craft the perfect Georgian itinerary for you.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact + Booking */}
      <section className="py-16 lg:py-24 bg-dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              ref={ref}
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="lg:col-span-2 space-y-8"
            >
              <motion.div variants={staggerItem}>
                <h2 className="font-display text-3xl font-bold text-light mb-2">Contact Us</h2>
                <p className="text-sm text-light/45">Our team is available Mon–Sun, 9am–9pm (Tbilisi time, UTC+4).</p>
              </motion.div>

              {[
                { icon: '📞', label: 'Phone', value: '+995 32 200 0000', href: 'tel:+995322000000' },
                { icon: '✉️', label: 'Email', value: 'info@classgeorgia.com', href: 'mailto:info@classgeorgia.com' },
                { icon: '📍', label: 'Address', value: '12 Rustaveli Avenue\nTbilisi 0108, Georgia', href: null },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sun: 9:00 – 21:00\n(UTC+4 Tbilisi Time)', href: null },
              ].map(({ icon, label, value, href }) => (
                <motion.div key={label} variants={staggerItem} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-lg">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider uppercase text-secondary mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-light/70 hover:text-secondary transition-colors duration-200 underline-anim whitespace-pre-line">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-light/70 whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social */}
              <motion.div variants={staggerItem}>
                <p className="text-xs font-medium tracking-wider uppercase text-secondary mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {['Facebook', 'Instagram', 'TikTok'].map((s) => (
                    <a key={s} href="#" className="px-4 py-2 text-xs font-medium border border-white/10 rounded-sm text-light/40 hover:text-secondary hover:border-secondary/30 transition-all duration-200">
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Booking Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 bg-dark-700 border border-white/5 rounded-sm p-6 lg:p-8"
            >
              <h3 className="font-display text-2xl font-bold text-light mb-1">Book a Tour</h3>
              <p className="text-sm text-light/40 mb-6">Fill in the details below and we'll get back to you within 24 hours.</p>
              <BookingWidget />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="h-72 lg:h-96 bg-dark-700 relative overflow-hidden border-y border-white/5">
        <img src="https://picsum.photos/seed/tbilisi-map/1920/600" alt="Tbilisi location" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass rounded-sm px-8 py-5 text-center">
            <p className="text-sm font-medium text-secondary mb-1">📍 Class Georgia</p>
            <p className="text-xs text-light/50">12 Rustaveli Avenue, Tbilisi, Georgia</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-dark">
        <Container narrow>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">FAQ</p>
            <h2 className="font-display text-4xl font-bold text-light">Frequently Asked Questions</h2>
          </motion.div>
          <div>
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </Container>
      </section>
    </motion.div>
  )
}
