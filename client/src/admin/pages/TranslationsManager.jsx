import { useState, useMemo } from 'react'
import i18n from '../../i18n'
import en from '../../locales/en/translation.json'
import ka from '../../locales/ka/translation.json'

function flattenObj(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(acc, flattenObj(v, key))
    } else {
      acc[key] = v
    }
    return acc
  }, {})
}

function unflattenObj(flat) {
  const result = {}
  for (const [dotKey, val] of Object.entries(flat)) {
    const parts = dotKey.split('.')
    let cur = result
    for (let i = 0; i < parts.length - 1; i++) {
      if (cur[parts[i]] === undefined) cur[parts[i]] = {}
      cur = cur[parts[i]]
    }
    cur[parts[parts.length - 1]] = val
  }
  return result
}

function loadSaved(lang, defaults) {
  try {
    const s = localStorage.getItem(`cg_translations_${lang}`)
    if (s) {
      const saved = JSON.parse(s)
      return { ...flattenObj(defaults), ...saved }
    }
  } catch { /* ignore */ }
  return flattenObj(defaults)
}

const topSections = ['nav','home','destinations','tours','about','contact','footer','booking','tourCard','destinationCard','mobileMenu','notFound','ai','data']

export default function TranslationsManager() {
  const [lang, setLang] = useState('en')
  const [enFlat, setEnFlat] = useState(() => loadSaved('en', en))
  const [kaFlat, setKaFlat] = useState(() => loadSaved('ka', ka))
  const [search, setSearch] = useState('')
  const [section, setSection] = useState('home')
  const [saved, setSaved] = useState(false)

  const flat = lang === 'en' ? enFlat : kaFlat
  const setFlat = lang === 'en' ? setEnFlat : setKaFlat

  const filtered = useMemo(() => {
    return Object.entries(flat).filter(([k, v]) => {
      if (typeof v !== 'string') return false
      const inSection = k.startsWith(section + '.')
      const matchSearch = !search || k.includes(search.toLowerCase()) || String(v).toLowerCase().includes(search.toLowerCase())
      return inSection && matchSearch
    })
  }, [flat, section, search, lang])

  const setValue = (key, val) => {
    setFlat(f => ({ ...f, [key]: val }))
  }

  const saveTranslations = () => {
    localStorage.setItem(`cg_translations_${lang}`, JSON.stringify(flat))
    const full = unflattenObj(flat)
    i18n.addResourceBundle(lang, 'translation', full, true, true)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const resetLang = () => {
    localStorage.removeItem(`cg_translations_${lang}`)
    const defaults = flattenObj(lang === 'en' ? en : ka)
    setFlat(defaults)
    i18n.addResourceBundle(lang, 'translation', lang === 'en' ? en : ka, true, true)
    setSaved(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Translations</h1>
          <p className="text-sm text-white/35 mt-0.5">Edit all text and copy across both languages</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={resetLang} className="px-3 py-2 text-xs text-white/35 hover:text-red-400 border border-white/8 hover:border-red-500/30 rounded-sm transition-colors">
            Reset {lang.toUpperCase()} to defaults
          </button>
          <button onClick={saveTranslations} className="px-4 py-2 bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] text-sm font-medium rounded-sm transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {saved && <div className="mb-4 px-4 py-2 bg-green-900/20 border border-green-500/20 rounded-sm text-green-400 text-sm">✓ Translations saved and applied live</div>}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Language toggle */}
        <div className="flex bg-[#161616] border border-white/8 rounded-sm overflow-hidden">
          {['en','ka'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${lang === l ? 'bg-[#5B0E2D] text-[#C8A96A]' : 'text-white/40 hover:text-white'}`}
            >
              {l === 'en' ? '🇬🇧 English' : '🇬🇪 Georgian'}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search key or text…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] bg-[#161616] border border-white/8 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C8A96A]/40"
        />
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {topSections.map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${section === s ? 'bg-[#5B0E2D]/40 text-[#C8A96A] border border-[#C8A96A]/30' : 'text-white/35 border border-white/8 hover:text-white hover:border-white/20'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Key-value editor */}
      <div className="bg-[#161616] border border-white/6 rounded-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-white/25 text-sm">
            {search ? 'No matches found.' : 'No string keys in this section.'}
          </div>
        ) : (
          <div className="divide-y divide-white/4">
            {filtered.map(([key, val]) => {
              const shortKey = key.replace(section + '.', '')
              const isLong = String(val).length > 80
              return (
                <div key={key} className="flex flex-col sm:flex-row gap-2 px-4 py-3 hover:bg-white/2 transition-colors">
                  <div className="sm:w-64 flex-shrink-0">
                    <code className="text-xs text-[#C8A96A]/70 break-all">{shortKey}</code>
                  </div>
                  <div className="flex-1">
                    {isLong ? (
                      <textarea
                        rows={Math.min(6, Math.ceil(String(val).length / 60))}
                        value={String(val)}
                        onChange={e => setValue(key, e.target.value)}
                        className="w-full bg-white/4 border border-white/8 rounded-sm px-2.5 py-1.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#C8A96A]/40 resize-y leading-relaxed"
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(val)}
                        onChange={e => setValue(key, e.target.value)}
                        className="w-full bg-white/4 border border-white/8 rounded-sm px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#C8A96A]/40"
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={saveTranslations} className="px-5 py-2.5 bg-[#5B0E2D] hover:bg-[#7a1240] text-[#C8A96A] text-sm font-medium rounded-sm transition-colors">
          Save All Changes
        </button>
      </div>

      <div className="mt-4 bg-[#161616] border border-white/5 rounded-sm p-4">
        <p className="text-xs text-white/25 leading-relaxed">
          <strong className="text-white/40">Note:</strong> Only string values are shown here. Arrays (like FAQs, policy sections) are not editable via this interface.
          Changes are saved to localStorage and applied instantly via i18next — no page reload needed.
        </p>
      </div>
    </div>
  )
}
