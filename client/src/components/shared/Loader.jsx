import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <span className="font-display text-2xl font-bold tracking-[0.15em] text-secondary uppercase">
          Class Georgia
        </span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-secondary"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-sm overflow-hidden bg-dark-700 animate-pulse">
      <div className="h-52 bg-dark-600" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-dark-600 rounded w-2/3" />
        <div className="h-3 bg-dark-600 rounded w-full" />
        <div className="h-3 bg-dark-600 rounded w-4/5" />
      </div>
    </div>
  )
}
