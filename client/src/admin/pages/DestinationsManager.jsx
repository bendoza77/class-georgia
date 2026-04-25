import { useState } from 'react'
import { useSiteData } from '../../context/SiteDataContext'

const regions = ['Capital City','Greater Caucasus','Adjara','Wine Country','Upper Svaneti','Kartli']

const empty = {
  name: '', region: 'Capital City', tagline: '', description: '',
  image: '', heroImage: '', highlights: '', duration: '', bestTime: '',
  rating: 4.8, reviews: 0, featured: false,
}

function Modal({ dest, onClose, onSave }) {
  const [form, setForm] = useState(dest ? {
    ...dest,
    highlights: dest.highlights?.join(', ') || '',
  } : empty)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/50"
  const F = ({ label, children }) => (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      id: dest?.id || Date.now(),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      highlights: form.highlights.split(',').map(s => s.trim()).filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#161616] border border-white/10 rounded-sm my-4">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-semibold text-white">{dest ? 'Edit Destination' : 'Add Destination'}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Name *">
            <input required className={inp} value={form.name} onChange={e => set('name', e.target.value)} />
          </F>
          <F label="Region">
            <select className={inp} value={form.region} onChange={e => set('region', e.target.value)}>
              {regions.map(r => <option key={r}>{r}</option>)}
            </select>
          </F>
          <F label="Tagline *">
            <input required className={inp} placeholder="e.g. Where East Meets West" value={form.tagline} onChange={e => set('tagline', e.target.value)} />
          </F>
          <F label="Duration">
            <input className={inp} placeholder="e.g. 2–3 days" value={form.duration} onChange={e => set('duration', e.target.value)} />
          </F>
          <div className="sm:col-span-2">
            <F label="Description *">
              <textarea required rows={3} className={inp} value={form.description} onChange={e => set('description', e.target.value)} />
            </F>
          </div>
          <div className="sm:col-span-2">
            <F label="Card Image URL">
              <input className={inp} placeholder="https://..." value={form.image} onChange={e => set('image', e.target.value)} />
            </F>
          </div>
          <div className="sm:col-span-2">
            <F label="Hero Image URL">
              <input className={inp} placeholder="https://..." value={form.heroImage} onChange={e => set('heroImage', e.target.value)} />
            </F>
          </div>
          <div className="sm:col-span-2">
            <F label="Highlights (comma-separated)">
              <input className={inp} placeholder="Old Town, Narikala Fortress, Sulfur Baths" value={form.highlights} onChange={e => set('highlights', e.target.value)} />
            </F>
          </div>
          <F label="Best Time to Visit">
            <input className={inp} placeholder="e.g. Apr – Jun, Sep – Oct" value={form.bestTime} onChange={e => set('bestTime', e.target.value)} />
          </F>
          <F label="Rating (1–5)">
            <input type="number" step="0.1" min="1" max="5" className={inp} value={form.rating} onChange={e => set('rating', e.target.value)} />
          </F>
          <F label="Reviews Count">
            <input type="number" min="0" className={inp} value={form.reviews} onChange={e => set('reviews', e.target.value)} />
          </F>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="feat" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-[#C8A96A] w-4 h-4" />
            <label htmlFor="feat" className="text-sm text-white/60">Featured on homepage</label>
          </div>
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-sm transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] rounded-sm font-medium transition-colors">
              {dest ? 'Save Changes' : 'Add Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function DestinationsManager() {
  const { destinations, setDestinations } = useSiteData()
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saved, setSaved] = useState(false)

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const handleSave = (dest) => {
    const next = modal === 'add'
      ? [...destinations, dest]
      : destinations.map(d => d.id === dest.id ? dest : d)
    setDestinations(next)
    setModal(null)
    showSaved()
  }

  const handleDelete = (id) => {
    setDestinations(destinations.filter(d => d.id !== id))
    setDeleteId(null)
  }

  const toggleFeatured = (id) => {
    setDestinations(destinations.map(d => d.id === id ? { ...d, featured: !d.featured } : d))
    showSaved()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinations</h1>
          <p className="text-sm text-white/35 mt-0.5">{destinations.length} destination{destinations.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] text-sm font-medium rounded-sm transition-colors">
          + Add Destination
        </button>
      </div>

      {saved && <div className="mb-4 px-4 py-2 bg-green-900/20 border border-green-500/20 rounded-sm text-green-400 text-sm">✓ Saved successfully</div>}

      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium">Destination</th>
                <th className="text-left px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium hidden sm:table-cell">Region</th>
                <th className="text-left px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium hidden md:table-cell">Rating</th>
                <th className="text-center px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium">Featured</th>
                <th className="text-right px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr key={dest.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={dest.image} alt="" className="w-10 h-10 object-cover rounded-sm flex-shrink-0 bg-white/5" />
                      <div>
                        <p className="font-medium text-white">{dest.name}</p>
                        <p className="text-xs text-white/30">{dest.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="px-2 py-0.5 bg-blue-900/20 text-blue-300 text-xs rounded-full">{dest.region}</span>
                  </td>
                  <td className="px-4 py-3 text-white/60 hidden md:table-cell">
                    ★ {dest.rating} · {dest.reviews} reviews
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFeatured(dest.id)} className={`w-5 h-5 rounded-sm border transition-colors ${dest.featured ? 'bg-[#C8A96A] border-[#C8A96A]' : 'border-white/20 hover:border-white/40'}`}>
                      {dest.featured && <span className="text-[#0a0a0a] text-xs font-bold">✓</span>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setModal(dest)} className="px-3 py-1 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-sm transition-colors">Edit</button>
                      <button onClick={() => setDeleteId(dest.id)} className="px-3 py-1 text-xs text-red-400/70 hover:text-red-400 border border-red-500/15 hover:border-red-500/40 rounded-sm transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(modal === 'add' || (modal && modal !== 'add')) && (
        <Modal dest={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-sm p-6 max-w-sm w-full">
            <h3 className="text-base font-semibold text-white mb-2">Delete Destination</h3>
            <p className="text-sm text-white/40 mb-6">This will permanently remove this destination. Are you sure?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-sm transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm bg-red-900 hover:bg-red-800 text-red-200 rounded-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
