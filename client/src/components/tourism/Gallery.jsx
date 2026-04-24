import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/staggerVariants'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const galleryImages = [
  { id: 1, src: 'https://picsum.photos/seed/gallery-1/600/400', alt: 'Tbilisi Old Town', span: 'col-span-2' },
  { id: 2, src: 'https://picsum.photos/seed/gallery-2/400/400', alt: 'Kazbegi Mountains', span: '' },
  { id: 3, src: 'https://picsum.photos/seed/gallery-3/400/400', alt: 'Georgian Wine', span: '' },
  { id: 4, src: 'https://picsum.photos/seed/gallery-4/400/400', alt: 'Svaneti Towers', span: '' },
  { id: 5, src: 'https://picsum.photos/seed/gallery-5/400/600', alt: 'Georgian Architecture', span: '' },
  { id: 6, src: 'https://picsum.photos/seed/gallery-6/600/400', alt: 'Batumi Boulevard', span: 'col-span-2' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const { ref, isInView } = useScrollAnimation()

  return (
    <>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {galleryImages.map((img) => (
          <motion.div
            key={img.id}
            variants={staggerItem}
            onClick={() => setLightbox(img)}
            className={`relative overflow-hidden rounded-sm cursor-zoom-in img-zoom ${img.span}`}
            style={{ aspectRatio: img.span ? '16/9' : '1/1' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="img-zoom-inner w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-dark/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center border border-secondary/40">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#C8A96A" strokeWidth="1.5">
                  <path d="M3 8h10M8 3v10" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-lg p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src.replace('/400/', '/1200/').replace('/600/', '/1200/')}
                alt={lightbox.alt}
                className="w-full h-auto rounded-sm max-h-[80vh] object-contain"
              />
              <p className="text-center text-sm text-secondary mt-3">{lightbox.alt}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center rounded-full bg-dark-700 border border-white/10 text-light/60 hover:text-secondary"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
