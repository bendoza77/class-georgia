export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
  },
}

export const pageTransitionProps = {
  variants: pageVariants,
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
}
