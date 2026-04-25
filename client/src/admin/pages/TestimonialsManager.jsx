import { useState } from 'react'
import { useSiteData } from '../../context/SiteDataContext'

const empty = { name: '', country: '', rating: 5, text: '', avatar: '', tour: '' }

function Modal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || empty)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const inp = "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/50"
  const F = ({ label, children }) => (
    <div>
      <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#161616] border border-white/10 rounded-sm">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-semibold text-white">{item ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none">×</button>
        </div>
        <form
          onSubmit={e => { e.preventDefault(); onSave({ ...form, id: item?.id || Date.now(), rating: Number(form.rating) }) }}
          className="p-5 flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <F label="Name *">
              <input required className={inp} value={form.name} onChange={e => set('name', e.target.value)} />
            </F>
            <F label="Country *">
              <input required className={inp} value={form.country} onChange={e => set('country', e.target.value)} />
            </F>
          </div>
          <F label="Review Text *">
            <textarea required rows={4} className={inp} value={form.text} onChange={e => set('text', e.target.value)} />
          </F>
          <div className="grid grid-cols-2 gap-4">
            <F label="Tour Name">
              <input className={inp} placeholder="e.g. Ultimate Georgia Discovery" value={form.tour} onChange={e => set('tour', e.target.value)} />
            </F>
            <F label="Rating (1–5)">
              <select className={inp} value={form.rating} onChange={e => set('rating', e.target.value)}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} star{n!==1?'s':''}</option>)}
              </select>
            </F>
          </div>
          <F label="Avatar Image URL (optional)">
            <input className={inp} placeholder="https://..." value={form.avatar} onChange={e => set('avatar', e.target.value)} />
          </F>
          <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-sm transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] rounded-sm font-medium transition-colors">
              {item ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function TestimonialsManager() {
  const { testimonials, setTestimonials } = useSiteData()
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saved, setSaved] = useState(false)

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const handleSave = (item) => {
    const next = modal === 'add'
      ? [...testimonials, item]
      : testimonials.map(t => t.id === item.id ? item : t)
    setTestimonials(next)
    setModal(null)
    showSaved()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-white/35 mt-0.5">{testimonials.length} review{testimonials.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] text-sm font-medium rounded-sm transition-colors">
          + Add Testimonial
        </button>
      </div>

      {saved && <div className="mb-4 px-4 py-2 bg-green-900/20 border border-green-500/20 rounded-sm text-green-400 text-sm">✓ Saved successfully</div>}

      <div className="flex flex-col gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#161616] border border-white/6 rounded-sm p-5 hover:border-white/12 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#5B0E2D]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C8A96A] text-sm font-bold">{t.name[0]}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-white text-sm">{t.name}</p>
                    <span className="text-xs text-white/30">·</span>
                    <p className="text-xs text-white/35">{t.country}</p>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill={i < t.rating ? '#C8A96A' : '#ffffff15'}>
                        <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.25l-4.33 2.25.83-4.82L1 6.27l4.91-.71L8 1z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/50 italic leading-relaxed">"{t.text}"</p>
                  {t.tour && <p className="text-xs text-[#C8A96A]/60 mt-2">Tour: {t.tour}</p>}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setModal(t)} className="px-3 py-1 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-sm transition-colors">Edit</button>
                <button onClick={() => setDeleteId(t.id)} className="px-3 py-1 text-xs text-red-400/70 hover:text-red-400 border border-red-500/15 hover:border-red-500/40 rounded-sm transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(modal === 'add' || (modal && modal !== 'add')) && (
        <Modal item={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-sm p-6 max-w-sm w-full">
            <h3 className="text-base font-semibold text-white mb-2">Delete Testimonial</h3>
            <p className="text-sm text-white/40 mb-6">Are you sure you want to delete this review?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-sm transition-colors">Cancel</button>
              <button onClick={() => { setTestimonials(testimonials.filter(t => t.id !== deleteId)); setDeleteId(null); showSaved() }} className="px-4 py-2 text-sm bg-red-900 hover:bg-red-800 text-red-200 rounded-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
