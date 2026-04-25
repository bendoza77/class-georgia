import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeInUp } from '../../animations/fadeVariants'
import Button from '../ui/Button'
import Input from '../ui/Input'

const tourSlugs = [
  'ultimate-georgia-discovery',
  'caucasus-mountain-trek',
  'wine-culture-journey',
  'tbilisi-deep-dive',
  'black-sea-batumi-escape',
  'svaneti-unesco-heritage',
]

export default function BookingWidget({ inline = false }) {
  const { t } = useTranslation()
  const tourTitles = t('data.tours', { returnObjects: true })

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
        <h3 className="font-display text-2xl font-bold text-light">{t('booking.successTitle')}</h3>
        <p className="text-light/50 max-w-xs">{t('booking.successDesc')}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-secondary underline-anim"
        >
          {t('booking.anotherEnquiry')}
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Tour Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-light/70 tracking-wide">{t('booking.selectTour')}</label>
        <select
          name="tour"
          value={form.tour}
          onChange={handleChange}
          required
          className="w-full bg-dark-700 border border-white/10 rounded-sm px-4 py-3 text-sm text-light focus:outline-none focus:border-secondary/60 transition-colors appearance-none"
        >
          <option value="">{t('booking.chooseTour')}</option>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <option key={id} value={tourSlugs[id - 1]}>
              {tourTitles[String(id)]?.title || tourSlugs[id - 1]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('booking.departureDate')}
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-light/70 tracking-wide">{t('booking.guests')}</label>
          <select
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className="w-full bg-dark-700 border border-white/10 rounded-sm px-4 py-3 text-sm text-light focus:outline-none focus:border-secondary/60 transition-colors"
          >
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? t('booking.guest') : t('booking.guestPlural')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label={t('booking.fullName')} type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('booking.namePlaceholder')} required />
        <Input label={t('booking.emailAddress')} type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
      </div>

      <Input label={t('booking.phoneNumber')} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t('booking.phonePlaceholder')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-light/70 tracking-wide">{t('booking.specialRequests')}</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={t('booking.specialPlaceholder')}
          rows={3}
          className="w-full bg-dark-700 border border-white/10 rounded-sm px-4 py-3 text-sm text-light placeholder:text-light/30 focus:outline-none focus:border-secondary/60 transition-colors resize-none"
        />
      </div>

      <Button type="submit" fullWidth size="lg" loading={loading}>
        {loading ? t('booking.sending') : t('booking.requestBooking')}
      </Button>

      <p className="text-xs text-center text-light/30">
        {t('booking.footer')}
      </p>
    </form>
  )
}
