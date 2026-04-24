export function clsx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function truncate(str, maxLen) {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd() + '…'
}

export function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function lerp(a, b, t) {
  return a + (b - a) * t
}
