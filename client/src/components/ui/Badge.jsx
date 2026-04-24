import { clsx } from '../../utils/helpers'

const variants = {
  gold: 'bg-secondary/15 text-secondary border border-secondary/30',
  wine: 'bg-primary/20 text-light border border-primary/40',
  dark: 'bg-white/5 text-light/70 border border-white/10',
  light: 'bg-dark/5 text-dark/70 border border-dark/10',
  green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
}

export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
