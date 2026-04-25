import { useState } from 'react'
import { useSiteData } from '../../context/SiteDataContext'

export default function HeroManager() {
  const { heroImages, setHeroImages } = useSiteData()
  const [newUrl, setNewUrl] = useState('')
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(null)

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const addImage = () => {
    if (!newUrl.trim()) return
    setHeroImages([...heroImages, newUrl.trim()])
    setNewUrl('')
    showSaved()
  }

  const removeImage = (i) => {
    setHeroImages(heroImages.filter((_, idx) => idx !== i))
    showSaved()
  }

  const moveUp = (i) => {
    if (i === 0) return
    const next = [...heroImages]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    setHeroImages(next)
    showSaved()
  }

  const moveDown = (i) => {
    if (i === heroImages.length - 1) return
    const next = [...heroImages]
    ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
    setHeroImages(next)
    showSaved()
  }

  const updateUrl = (i, val) => {
    const next = [...heroImages]
    next[i] = val
    setHeroImages(next)
    showSaved()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Hero Images</h1>
        <p className="text-sm text-white/35 mt-0.5">Manage the carousel images shown in the homepage hero section</p>
      </div>

      {saved && <div className="mb-4 px-4 py-2 bg-green-900/20 border border-green-500/20 rounded-sm text-green-400 text-sm">✓ Saved successfully</div>}

      {/* Add new */}
      <div className="bg-[#161616] border border-white/6 rounded-sm p-5 mb-6">
        <h2 className="text-sm font-medium text-white mb-3">Add New Image</h2>
        <div className="flex gap-3">
          <input
            type="url"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addImage()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/50"
          />
          <button
            onClick={addImage}
            disabled={!newUrl.trim()}
            className="px-4 py-2 bg-[#5B0E2D] hover:bg-[#7a1240] disabled:opacity-40 text-[#C8A96A] text-sm font-medium rounded-sm transition-colors"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-white/25 mt-2">Recommended size: 1920×1080px. Images auto-cycle every 5 seconds.</p>
      </div>

      {/* Images list */}
      <div className="flex flex-col gap-3">
        {heroImages.map((url, i) => (
          <div key={i} className="bg-[#161616] border border-white/6 rounded-sm p-4 flex items-center gap-4">
            {/* Order controls */}
            <div className="flex flex-col gap-1">
              <button onClick={() => moveUp(i)} disabled={i === 0} className="w-6 h-6 text-white/30 hover:text-white disabled:opacity-20 transition-colors text-xs border border-white/10 rounded flex items-center justify-center">▲</button>
              <span className="text-xs text-white/20 text-center">{i + 1}</span>
              <button onClick={() => moveDown(i)} disabled={i === heroImages.length - 1} className="w-6 h-6 text-white/30 hover:text-white disabled:opacity-20 transition-colors text-xs border border-white/10 rounded flex items-center justify-center">▼</button>
            </div>

            {/* Thumbnail */}
            <div
              className="w-20 h-14 rounded-sm bg-white/5 overflow-hidden flex-shrink-0 cursor-pointer border border-white/8 hover:border-white/20 transition-colors"
              onClick={() => setPreview(url)}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>

            {/* URL */}
            <input
              type="url"
              value={url}
              onChange={e => updateUrl(i, e.target.value)}
              className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-xs text-white/60 focus:text-white focus:outline-none focus:border-[#C8A96A]/50 transition-colors"
            />

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setPreview(url)} className="px-3 py-1.5 text-xs text-white/40 hover:text-white border border-white/10 hover:border-white/25 rounded-sm transition-colors">Preview</button>
              <button onClick={() => removeImage(i)} disabled={heroImages.length <= 1} className="px-3 py-1.5 text-xs text-red-400/60 hover:text-red-400 disabled:opacity-30 border border-red-500/10 hover:border-red-500/30 rounded-sm transition-colors">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreview(null)}
        >
          <div className="max-w-4xl w-full">
            <img src={preview} alt="Preview" className="w-full rounded-sm object-contain max-h-[80vh]" />
            <p className="text-center text-xs text-white/30 mt-3">Click anywhere to close</p>
          </div>
        </div>
      )}
    </div>
  )
}
