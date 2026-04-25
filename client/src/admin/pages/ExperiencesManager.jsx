import { useState } from 'react'
import { useSiteData } from '../../context/SiteDataContext'

const empty = { title: '', description: '', icon: '🌟', color: '#5B0E2D' }

function Modal({ exp, onClose, onSave }) {
  const [form, setForm] = useState(exp || empty)
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
      <div className="w-full max-w-md bg-[#161616] border border-white/10 rounded-sm">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-base font-semibold text-white">{exp ? 'Edit Experience' : 'Add Experience'}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none">×</button>
        </div>
        <form
          onSubmit={e => { e.preventDefault(); onSave({ ...form, id: exp?.id || Date.now() }) }}
          className="p-5 flex flex-col gap-4"
        >
          <F label="Title *">
            <input required className={inp} value={form.title} onChange={e => set('title', e.target.value)} />
          </F>
          <F label="Description *">
            <textarea required rows={3} className={inp} value={form.description} onChange={e => set('description', e.target.value)} />
          </F>
          <div className="flex gap-4">
            <div className="flex-1">
              <F label="Icon (emoji)">
                <input className={inp} maxLength={4} value={form.icon} onChange={e => set('icon', e.target.value)} />
              </F>
            </div>
            <div>
              <F label="Color">
                <input type="color" value={form.color} onChange={e => set('color', e.target.value)}
                  className="w-20 h-9 rounded-sm border border-white/10 bg-transparent cursor-pointer" />
              </F>
            </div>
          </div>
          {/* Preview */}
          <div className="p-3 rounded-sm border border-white/5" style={{ backgroundColor: form.color + '22' }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{form.icon}</span>
              <div>
                <p className="text-sm font-medium text-white">{form.title || 'Preview'}</p>
                <p className="text-xs text-white/40">{form.description || 'Description…'}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-sm transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] rounded-sm font-medium transition-colors">
              {exp ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ExperiencesManager() {
  const { experiences, setExperiences } = useSiteData()
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [saved, setSaved] = useState(false)

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const handleSave = (exp) => {
    const next = modal === 'add'
      ? [...experiences, exp]
      : experiences.map(e => e.id === exp.id ? exp : e)
    setExperiences(next)
    setModal(null)
    showSaved()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Experiences</h1>
          <p className="text-sm text-white/35 mt-0.5">{experiences.length} experience{experiences.length !== 1 ? 's' : ''} shown on homepage</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] text-sm font-medium rounded-sm transition-colors">
          + Add Experience
        </button>
      </div>

      {saved && <div className="mb-4 px-4 py-2 bg-green-900/20 border border-green-500/20 rounded-sm text-green-400 text-sm">✓ Saved successfully</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-[#161616] border border-white/6 rounded-sm p-4 hover:border-white/12 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center text-2xl" style={{ backgroundColor: exp.color + '25' }}>
                  {exp.icon}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{exp.title}</p>
                  <div className="w-12 h-1 rounded-full mt-1" style={{ backgroundColor: exp.color }} />
                </div>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed mb-4">{exp.description}</p>
            <div className="flex gap-2">
              <button onClick={() => setModal(exp)} className="flex-1 py-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-sm transition-colors">Edit</button>
              <button onClick={() => setDeleteId(exp.id)} className="flex-1 py-1.5 text-xs text-red-400/60 hover:text-red-400 border border-red-500/10 hover:border-red-500/30 rounded-sm transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {(modal === 'add' || (modal && modal !== 'add')) && (
        <Modal exp={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-sm p-6 max-w-sm w-full">
            <h3 className="text-base font-semibold text-white mb-2">Delete Experience</h3>
            <p className="text-sm text-white/40 mb-6">Are you sure?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-sm transition-colors">Cancel</button>
              <button onClick={() => { setExperiences(experiences.filter(e => e.id !== deleteId)); setDeleteId(null); showSaved() }} className="px-4 py-2 text-sm bg-red-900 hover:bg-red-800 text-red-200 rounded-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
