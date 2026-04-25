import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { staggerItem } from '../../animations/staggerVariants'
import Badge from '../ui/Badge'

export default function DestinationCard({ destination }) {
  const { t } = useTranslation()
  const { name, region, tagline, description, image, highlights, duration, bestTime, rating } =
    destination

  return (
    <motion.div
      variants={staggerItem}
      className="group relative rounded-sm overflow-hidden bg-dark-700 border border-white/5 card-hover"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden img-zoom">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="img-zoom-inner w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge variant="dark">{region}</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-2xl font-bold text-light">{name}</h3>
          <p className="text-secondary text-sm font-medium mt-0.5">{tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-light/50 leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 rounded-full text-xs bg-secondary/10 text-secondary/80 border border-secondary/20"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-xs text-light/40 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {duration}
            </span>
            <span className="text-xs text-light/40">{bestTime}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.25l-4.33 2.25.83-4.82L1 6.27l4.91-.71L8 1z"/></svg>
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>

        <Link
          to="/destinations"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-secondary border border-secondary/20 rounded-sm hover:bg-secondary/10 hover:border-secondary/40 transition-all duration-200"
        >
          {t('destinationCard.explorePrefix')} {name}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
    </motion.div>
  )
}
