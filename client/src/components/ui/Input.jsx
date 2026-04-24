import { clsx } from '../../utils/helpers'

export default function Input({
  label,
  error,
  icon,
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-light/70 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light/40">
            {icon}
          </span>
        )}
        <input
          className={clsx(
            'w-full bg-dark-700 border border-white/10 rounded-sm',
            'px-4 py-3 text-sm text-light placeholder:text-light/30',
            'focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20',
            'transition-all duration-200',
            icon && 'pl-10',
            error && 'border-red-500/60',
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', containerClassName = '', ...props }) {
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-light/70 tracking-wide">{label}</label>
      )}
      <textarea
        className={clsx(
          'w-full bg-dark-700 border border-white/10 rounded-sm',
          'px-4 py-3 text-sm text-light placeholder:text-light/30',
          'focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20',
          'transition-all duration-200 resize-none',
          error && 'border-red-500/60',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
