import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerItem } from '../../animations/staggerVariants'
import Badge from '../ui/Badge'
import { formatPrice } from '../../utils/formatters'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill={s <= Math.round(rating) ? '#C8A96A' : 'none'}
          stroke="#C8A96A"
          strokeWidth="1"
        >
          <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.25l-4.33 2.25.83-4.82L1 6.27l4.91-.71L8 1z" />
        </svg>
      ))}
      <span className="text-xs text-secondary ml-0.5 font-medium">{rating}</span>
    </div>
  )
}

export default function TourCard({ tour }) {
  const { title, category, badge, description, image, duration, groupSize, difficulty, price, originalPrice, rating, reviews, destinations } = tour

  return (
    <motion.div
      variants={staggerItem}
      className="group flex flex-col rounded-sm overflow-hidden bg-dark-700 border border-white/5 card-hover h-full"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden img-zoom shrink-0">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="img-zoom-inner w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="wine">{category}</Badge>
          {badge && <Badge variant="gold">{badge}</Badge>}
        </div>
        <div className="absolute bottom-3 right-3 bg-dark/80 backdrop-blur-sm rounded-sm px-2 py-1 border border-white/10">
          <div className="flex items-baseline gap-1">
            {originalPrice && (
              <span className="text-xs text-light/30 line-through">{formatPrice(originalPrice)}</span>
            )}
            <span className="text-sm font-bold text-secondary">{formatPrice(price)}</span>
          </div>
          <span className="text-xs text-light/40">per person</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg font-bold text-light mb-2 group-hover:text-secondary transition-colors duration-200 leading-snug">
          {title}
        </h3>
        <p className="text-xs text-light/45 leading-relaxed mb-4 flex-1">{description}</p>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-white/5">
          {[
            { label: 'Duration', value: duration, icon: '🕐' },
            { label: 'Group', value: groupSize, icon: '👥' },
            { label: 'Level', value: difficulty, icon: '📊' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="text-center">
              <span className="text-base">{icon}</span>
              <p className="text-xs font-medium text-light mt-0.5">{value}</p>
              <p className="text-xs text-light/30">{label}</p>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={rating} />
          <span className="text-xs text-light/35">({reviews} reviews)</span>
        </div>

        {/* Destinations */}
        <div className="flex flex-wrap gap-1 mb-4">
          {destinations.map((d) => (
            <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-light/40">
              {d}
            </span>
          ))}
        </div>

        <Link
          to="/contact"
          className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-sm bg-primary hover:bg-primary-light text-secondary border border-primary/60 hover:border-secondary/30 transition-all duration-200"
        >
          Book This Tour
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
    </motion.div>
  )
}
