import { clsx } from '../../utils/helpers'

export default function Card({ children, className = '', glass = false, hover = false, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-sm overflow-hidden',
        glass
          ? 'glass'
          : 'bg-dark-700 border border-white/5',
        hover && 'card-hover cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
