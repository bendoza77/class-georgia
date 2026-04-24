import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animations/fadeVariants'
import Button from '../ui/Button'
import Input from '../ui/Input'

const tourTypes = [
  'Ultimate Georgia Discovery',
  'Caucasus Mountain Trek',
  'Wine & Culture Journey',
  'Tbilisi Deep Dive',
  'Black Sea & Batumi Escape',
  'Svaneti & UNESCO Heritage',
]

export default function BookingWidget({ inline = false }) {
  const [form, setForm] = useState({
    tour: '',
    date: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center text-center py-12 gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center text-3xl">
          ✓
        </div>
        <h3 className="font-display text-2xl font-bold text-light">Booking Request Sent!</h3>
        <p className="text-light/50 max-w-xs">
          Our travel experts will contact you within 24 hours to finalise your journey.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-secondary underline-anim"
        >
          Make another enquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Tour Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-light/70 tracking-wide">Select Tour</label>
        <select
          name="tour"
          value={form.tour}
          onChange={handleChange}
          required
          className="w-full bg-dark-700 border border-white/10 rounded-sm px-4 py-3 text-sm text-light focus:outline-none focus:border-secondary/60 transition-colors appearance-none"
        >
          <option value="">Choose a tour…</option>
          {tourTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Departure Date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-light/70 tracking-wide">Guests</label>
          <select
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-white/10 rounded-sm px-4 py-3 text-sm text-light focus:outline-none focus:border-secondary/60 transition-colors"
          >
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
        <Input label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
      </div>

      <Input label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 8900" />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-light/70 tracking-wide">Special Requests</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Dietary requirements, accessibility needs, special occasions…"
          rows={3}
          className="w-full bg-dark-700 border border-white/10 rounded-sm px-4 py-3 text-sm text-light placeholder:text-light/30 focus:outline-none focus:border-secondary/60 transition-colors resize-none"
        />
      </div>

      <Button type="submit" fullWidth size="lg" loading={loading}>
        {loading ? 'Sending Request…' : 'Request Booking'}
      </Button>

      <p className="text-xs text-center text-light/30">
        No payment required · Free cancellation · Expert support
      </p>
    </form>
  )
}
