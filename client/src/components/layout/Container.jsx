import { clsx } from '../../utils/helpers'

export default function Container({ children, className = '', narrow = false, ...props }) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        narrow ? 'max-w-4xl' : 'max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
