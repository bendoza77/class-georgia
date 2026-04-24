export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatRating(value) {
  return Number(value).toFixed(1)
}

export function formatDuration(str) {
  return str
}

export function formatCount(num) {
  if (num >= 1000) return `${(num / 1000).toFixed(0)}k+`
  return `${num}+`
}
