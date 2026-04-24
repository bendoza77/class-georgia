import { motion } from 'framer-motion'
import { clsx } from '../../utils/helpers'

const variants = {
  primary:
    'bg-primary hover:bg-primary-light text-light border border-primary hover:border-primary-light',
  secondary:
    'bg-secondary hover:bg-secondary-light text-dark border border-secondary',
  outline:
    'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-dark',
  ghost:
    'bg-transparent border border-white/20 text-light hover:border-secondary hover:text-secondary',
  dark:
    'bg-dark-700 hover:bg-dark-600 text-light border border-white/10 hover:border-secondary/30',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconRight,
  loading = false,
  fullWidth = false,
  as: Tag = 'button',
  ...props
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={fullWidth ? 'w-full' : 'inline-block'}
    >
      <Tag
        className={clsx(
          'inline-flex items-center justify-center gap-2',
          'font-medium tracking-wide rounded-sm',
          'transition-all duration-300 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children}
        {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
      </Tag>
    </motion.div>
  )
}
