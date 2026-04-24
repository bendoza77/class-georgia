import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import Container from '../../components/layout/Container'
import TourCard from '../../components/tourism/TourCard'
import BookingWidget from '../../components/tourism/BookingWidget'
import { tours } from '../../constants/toursData'
import { staggerContainer } from '../../animations/staggerVariants'
import { pageTransitionProps } from '../../animations/pageTransition'

const categories = ['All', 'Signature', 'Adventure', 'Culinary', 'Cultural', 'Leisure']
const difficulties = ['Any', 'Easy', 'Moderate', 'Challenging']

export default function Tours() {
  useDocumentTitle('Tours')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('Any')
  const [showBooking, setShowBooking] = useState(false)

  const filtered = tours.filter((t) => {
    const catOk = category === 'All' || t.category === category
    const diffOk = difficulty === 'Any' || t.difficulty === difficulty
    return catOk && diffOk
  })

  return (
    <motion.div {...pageTransitionProps} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(ellipse at 100% 50%, #5B0E2D 0%, transparent 60%), radial-gradient(ellipse at 0% 0%, #C8A96A 0%, transparent 40%)' }}
        />
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-secondary mb-3">Our Offerings</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-light leading-tight mb-5">
              All Tours
            </h1>
            <p className="text-base sm:text-lg text-light/50 max-w-xl leading-relaxed mb-8">
              From intimate wine explorations to epic mountain treks — there's a perfect Georgian journey for every traveller.
            </p>
            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 hover:border-secondary/30 font-medium text-sm tracking-wide transition-all duration-200"
            >
              Enquire Now
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-6 bg-dark sticky top-16 lg:top-20 z-30 border-b border-white/5 bg-dark/90 backdrop-blur-sm">
        <Container>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    category === c ? 'bg-primary text-secondary border border-secondary/30' : 'bg-dark-700 text-light/50 border border-white/5 hover:text-secondary hover:border-secondary/20'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    difficulty === d ? 'bg-secondary/20 text-secondary border border-secondary/30' : 'text-light/40 border border-white/5 hover:text-secondary'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Tours Grid */}
      <section className="py-16 lg:py-24 bg-dark">
        <Container>
          <p className="text-sm text-light/35 mb-8">
            Showing <span className="text-secondary font-medium">{filtered.length}</span> tour{filtered.length !== 1 && 's'}
          </p>
          <motion.div
            key={`${category}-${difficulty}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-light/30 text-lg">No tours match your filters.</p>
              <button onClick={() => { setCategory('All'); setDifficulty('Any') }} className="mt-4 text-sm text-secondary underline-anim">
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm" onClick={() => setShowBooking(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="relative bg-dark-800 border border-white/10 rounded-sm p-6 lg:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-bold text-light">Book a Tour</h3>
              <button onClick={() => setShowBooking(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-light/50 hover:text-secondary">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <BookingWidget />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
