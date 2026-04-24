import { useEffect } from 'react'

const BRAND = 'Class Georgia'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND}` : `${BRAND} | Luxury Travel Experiences`
  }, [title])
}
