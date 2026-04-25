import { useState } from 'react'
import { useSiteData } from '../../context/SiteDataContext'

const empty = {
  title: '', slug: '', category: 'Signature', badge: '', description: '', image: '',
  duration: '', groupSize: '', difficulty: 'Moderate', price: '', originalPrice: '',
  currency: 'USD', rating: 4.9, reviews: 0,
  includes: '', destinations: '', featured: false,
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function Modal({ tour, onClose, onSave }) {
  const [form, setForm] = useState(tour ? {
    ...tour,
    includes: tour.includes?.join(', ') || '',
    destinations: tour.destinations?.join(', ') || '',
    badge: tour.badge || '',
    originalPrice: tour.originalPrice ?? '',
  } : empty)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      id: tour?.id || Date.now(),
      slug: form.slug || slugify(form.title),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      badge: form.badge || null,
      includes: form.includes.split(',').map(s => s.trim()).filter(Boolean),
      destinations: form.destinations.split(',').map(s => s.trim()).filter(Boolean),
    })
  }

  const Field = ({ label, children }) => (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  )

  const inp = "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/50"

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#161616] border border-white/10 rounded-sm my-4">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-semibold text-white">{tour ? 'Edit Tour' : 'Add Tour'}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Title *">
            <input required className={inp} value={form.title} onChange={e => { set('title', e.target.value); set('slug', slugify(e.target.value)) }} />
          </Field>
          <Field label="Slug">
            <input className={inp} value={form.slug} onChange={e => set('slug', e.target.value)} />
          </Field>
          <Field label="Category">
            <select className={inp} value={form.category} onChange={e => set('category', e.target.value)}>
              {['Signature','Adventure','Culinary','Cultural','Leisure'].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Badge (optional)">
            <input className={inp} placeholder="e.g. Best Seller, New, Popular" value={form.badge} onChange={e => set('badge', e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description *">
              <textarea required rows={3} className={inp} value={form.description} onChange={e => set('description', e.target.value)} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Image URL">
              <input className={inp} placeholder="https://..." value={form.image} onChange={e => set('image', e.target.value)} />
            </Field>
          </div>
          <Field label="Duration">
            <input className={inp} placeholder="e.g. 7 days" value={form.duration} onChange={e => set('duration', e.target.value)} />
          </Field>
          <Field label="Group Size">
            <input className={inp} placeholder="e.g. 2–12" value={form.groupSize} onChange={e => set('groupSize', e.target.value)} />
          </Field>
          <Field label="Difficulty">
            <select className={inp} value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
              {['Easy','Moderate','Challenging'].map(d => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Currency">
            <select className={inp} value={form.currency} onChange={e => set('currency', e.target.value)}>
              {['USD','EUR','GEL'].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price *">
            <input required type="number" min="0" className={inp} value={form.price} onChange={e => set('price', e.target.value)} />
          </Field>
          <Field label="Original Price (if on sale)">
            <input type="number" min="0" className={inp} placeholder="Leave empty if no discount" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} />
          </Field>
          <Field label="Rating (1–5)">
            <input type="number" step="0.1" min="1" max="5" className={inp} value={form.rating} onChange={e => set('rating', e.target.value)} />
          </Field>
          <Field label="Reviews Count">
            <input type="number" min="0" className={inp} value={form.reviews} onChange={e => set('reviews', e.target.value)} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Includes (comma-separated)">
              <input className={inp} placeholder="All accommodation, Private transport, Expert guide" value={form.includes} onChange={e => set('includes', e.target.value)} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Destinations (comma-separated)">
              <input className={inp} placeholder="Tbilisi, Kazbegi, Kakheti" value={form.destinations} onChange={e => set('destinations', e.target.value)} />
            </Field>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-[#C8A96A] w-4 h-4" />
            <label htmlFor="featured" className="text-sm text-white/60">Featured on homepage</label>
          </div>
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] rounded-sm font-medium transition-colors">
              {tour ? 'Save Changes' : 'Add Tour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ToursManager() {
  const { tours, setTours } = useSiteData()
  const [modal, setModal] = useState(null) // null | 'add' | tour object
  const [deleteId, setDeleteId] = useState(null)
  const [saved, setSaved] = useState(false)

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const handleSave = (tour) => {
    const next = modal === 'add'
      ? [...tours, tour]
      : tours.map(t => t.id === tour.id ? tour : t)
    setTours(next)
    setModal(null)
    showSaved()
  }

  const handleDelete = (id) => {
    setTours(tours.filter(t => t.id !== id))
    setDeleteId(null)
  }

  const toggleFeatured = (id) => {
    setTours(tours.map(t => t.id === id ? { ...t, featured: !t.featured } : t))
    showSaved()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tours</h1>
          <p className="text-sm text-white/35 mt-0.5">{tours.length} tour{tours.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setModal('add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] text-sm font-medium rounded-sm transition-colors"
        >
          + Add Tour
        </button>
      </div>

      {saved && (
        <div className="mb-4 px-4 py-2 bg-green-900/20 border border-green-500/20 rounded-sm text-green-400 text-sm">
          ✓ Saved successfully
        </div>
      )}

      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium">Tour</th>
                <th className="text-left px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium hidden md:table-cell">Price</th>
                <th className="text-center px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium">Featured</th>
                <th className="text-right px-4 py-3 text-xs text-white/30 uppercase tracking-wider font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={tour.image} alt="" className="w-10 h-10 object-cover rounded-sm flex-shrink-0 bg-white/5" />
                      <div>
                        <p className="font-medium text-white text-sm leading-tight">{tour.title}</p>
                        <p className="text-xs text-white/30 mt-0.5">{tour.duration} · {tour.difficulty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="px-2 py-0.5 bg-[#5B0E2D]/20 text-[#C8A96A] text-xs rounded-full">{tour.category}</span>
                  </td>
                  <td className="px-4 py-3 text-white/60 hidden md:table-cell">
                    ${tour.price.toLocaleString()}
                    {tour.originalPrice && <span className="line-through text-white/25 ml-2">${tour.originalPrice.toLocaleString()}</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFeatured(tour.id)} className={`w-5 h-5 rounded-sm border transition-colors ${tour.featured ? 'bg-[#C8A96A] border-[#C8A96A]' : 'border-white/20 hover:border-white/40'}`}>
                      {tour.featured && <span className="text-[#0a0a0a] text-xs font-bold">✓</span>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setModal(tour)} className="px-3 py-1 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-sm transition-colors">Edit</button>
                      <button onClick={() => setDeleteId(tour.id)} className="px-3 py-1 text-xs text-red-400/70 hover:text-red-400 border border-red-500/15 hover:border-red-500/40 rounded-sm transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(modal === 'add' || (modal && modal !== 'add')) && (
        <Modal
          tour={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-sm p-6 max-w-sm w-full">
            <h3 className="text-base font-semibold text-white mb-2">Delete Tour</h3>
            <p className="text-sm text-white/40 mb-6">This will permanently remove the tour from the site. Are you sure?</p>
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
