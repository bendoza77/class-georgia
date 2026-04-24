import { clsx } from '../../utils/helpers'

export default function Section({
  children,
  className = '',
  dark = false,
  noPadding = false,
  id,
  ...props
}) {
  return (
    <section
      id={id}
      className={clsx(
        !noPadding && 'py-20 lg:py-28',
        dark ? 'bg-dark-800' : 'bg-dark',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
