import { createContext, useContext, useState } from 'react'
import { tours as defaultTours, experiences as defaultExperiences } from '../constants/toursData'
import { destinations as defaultDestinations } from '../constants/destinationsData'

const defaultTestimonials = [
  {
    id: 1, name: 'Sophie & James', country: 'United Kingdom', rating: 5,
    text: 'Class Georgia transformed our honeymoon into the most magical week of our lives. The attention to detail, the private experiences, the sheer beauty of every location — absolutely flawless.',
    avatar: 'https://picsum.photos/seed/avatar-1/80/80', tour: 'Ultimate Georgia Discovery',
  },
  {
    id: 2, name: 'Marco Ferretti', country: 'Italy', rating: 5,
    text: 'As a wine professional, the Kakheti experience exceeded every expectation. Tasting qvevri wines in 2,000-year-old cellars is something I cannot find anywhere else on Earth.',
    avatar: 'https://picsum.photos/seed/avatar-2/80/80', tour: 'Wine & Culture Journey',
  },
  {
    id: 3, name: 'Aiko Tanaka', country: 'Japan', rating: 5,
    text: "The mountain trek was breathtaking in every sense. Our guide's knowledge of Svaneti history made every stone tower feel alive. Already planning my return.",
    avatar: 'https://picsum.photos/seed/avatar-3/80/80', tour: 'Caucasus Mountain Trek',
  },
]

const defaultHeroImages = [
  'https://picsum.photos/seed/hero-georgia-1/1920/1080',
  'https://picsum.photos/seed/hero-georgia-2/1920/1080',
  'https://picsum.photos/seed/hero-georgia-3/1920/1080',
]

const SiteDataContext = createContext(null)

function load(key, fallback) {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  } catch {
    return fallback
  }
}

export function SiteDataProvider({ children }) {
  const [tours, setToursRaw] = useState(() => load('cg_tours', defaultTours))
  const [destinations, setDestinationsRaw] = useState(() => load('cg_destinations', defaultDestinations))
  const [experiences, setExperiencesRaw] = useState(() => load('cg_experiences', defaultExperiences))
  const [testimonials, setTestimonialsRaw] = useState(() => load('cg_testimonials', defaultTestimonials))
  const [heroImages, setHeroImagesRaw] = useState(() => load('cg_hero_images', defaultHeroImages))

  const persist = (key, setter) => (data) => {
    localStorage.setItem(key, JSON.stringify(data))
    setter(data)
  }

  const setTours = persist('cg_tours', setToursRaw)
  const setDestinations = persist('cg_destinations', setDestinationsRaw)
  const setExperiences = persist('cg_experiences', setExperiencesRaw)
  const setTestimonials = persist('cg_testimonials', setTestimonialsRaw)
  const setHeroImages = persist('cg_hero_images', setHeroImagesRaw)

  const resetAll = () => {
    ['cg_tours','cg_destinations','cg_experiences','cg_testimonials','cg_hero_images',
     'cg_translations_en','cg_translations_ka'].forEach(k => localStorage.removeItem(k))
    setToursRaw(defaultTours)
    setDestinationsRaw(defaultDestinations)
    setExperiencesRaw(defaultExperiences)
    setTestimonialsRaw(defaultTestimonials)
    setHeroImagesRaw(defaultHeroImages)
  }

  return (
    <SiteDataContext.Provider value={{
      tours, destinations, experiences, testimonials, heroImages,
      setTours, setDestinations, setExperiences, setTestimonials, setHeroImages,
      resetAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export const useSiteData = () => useContext(SiteDataContext)
