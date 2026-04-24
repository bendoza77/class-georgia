import { motion } from 'framer-motion'
import { staggerItem } from '../../animations/staggerVariants'

export default function ExperienceCard({ experience }) {
  const { title, description, icon } = experience

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group flex flex-col items-center text-center p-6 rounded-sm border border-white/5 bg-dark-700 hover:border-secondary/20 hover:bg-dark-600 transition-all duration-300 cursor-default"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/20 border border-primary/30 group-hover:border-secondary/40 group-hover:bg-secondary/10 transition-all duration-300 mb-4">
        <span className="text-3xl" role="img" aria-label={title}>
          {icon}
        </span>
      </div>
      <h3 className="font-display text-lg font-semibold text-light group-hover:text-secondary transition-colors duration-200 mb-2">
        {title}
      </h3>
      <p className="text-sm text-light/45 leading-relaxed">{description}</p>
    </motion.div>
  )
}
