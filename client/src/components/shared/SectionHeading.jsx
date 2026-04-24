import { motion } from 'framer-motion'
import { fadeInUp } from '../../animations/fadeVariants'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { clsx } from '../../utils/helpers'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
  className = '',
}) {
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className={clsx(centered && 'text-center', className)}
    >
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-secondary"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeInUp}
        className={clsx(
          'font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
          light ? 'text-dark' : 'text-light',
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={clsx(
            'mt-4 max-w-2xl text-base sm:text-lg leading-relaxed',
            centered && 'mx-auto',
            light ? 'text-dark/60' : 'text-light/50',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
