import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/* ─── Icons ─────────────────────────────────────────────────────── */
function SparkleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
      <path d="M5 2l.97 2.03L8 5l-2.03.97L5 8l-.97-2.03L2 5l2.03-.97z" opacity="0.6" />
      <path d="M19 16l.73 1.52L21.25 18l-1.52.73L19 20.25l-.73-1.52L16.75 18l1.52-.73z" opacity="0.5" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function MinimiseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

/* ─── Typing indicator ───────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-secondary/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function AIChat() {
  const { t } = useTranslation()
  const suggestedPrompts = t('ai.suggestedPrompts', { returnObjects: true })
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggested, setShowSuggested] = useState(true)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  /* auto-inject welcome message */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('ai.welcome') }])
    }
  }, [isOpen, t, messages.length])

  /* scroll to bottom on new messages */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  /* focus input when opening */
  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 350)
  }, [isOpen])

  /* auto-grow textarea */
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 100) + 'px'
  }, [input])

  const sendMessage = useCallback(async (text = input) => {
    const content = (text || '').trim()
    if (!content || isLoading) return

    const userMsg = { role: 'user', content }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setIsLoading(true)
    setShowSuggested(false)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: t('ai.error'), isError: true },
      ])
    } finally {
      setIsLoading(false)
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [input, messages, isLoading, t])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function handleSuggested(prompt) {
    sendMessage(prompt)
  }

  const canSend = input.trim().length > 0 && !isLoading

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3" ref={inputRef}>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="ai-panel w-[350px] sm:w-[390px] flex flex-col overflow-hidden border border-white/10 shadow-2xl"
            style={{
              borderRadius: '16px',
              background: 'linear-gradient(160deg, rgba(20,10,14,0.98) 0%, rgba(12,12,12,0.99) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              maxHeight: 'min(560px, calc(100vh - 140px))',
            }}
          >
            {/* Header */}
            <div
              className="relative flex items-center justify-between px-4 py-3.5 shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(91,14,45,0.35) 0%, rgba(91,14,45,0.08) 100%)',
                borderBottom: '1px solid rgba(200,169,106,0.12)',
              }}
            >
              {/* Decorative corner glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(200,169,106,0.07), transparent 70%)',
                }}
              />

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-secondary shrink-0"
                  style={{
                    background: 'rgba(91,14,45,0.4)',
                    border: '1px solid rgba(200,169,106,0.35)',
                    boxShadow: '0 0 16px rgba(200,169,106,0.12)',
                  }}
                >
                  <SparkleIcon size={15} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-light leading-tight tracking-wide">
                    {t('ai.title')}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs text-light/40">{t('ai.subtitle')}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimise"
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-light/35 hover:text-light/70 hover:bg-white/6 transition-all duration-200"
                >
                  <MinimiseIcon />
                </button>
                <button
                  onClick={() => { setIsOpen(false); setMessages([]); setShowSuggested(true) }}
                  aria-label={t('ai.close')}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-light/35 hover:text-secondary hover:bg-white/6 transition-all duration-200"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {msg.role === 'assistant' && (
                    <div
                      className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-secondary mb-0.5"
                      style={{
                        background: 'rgba(91,14,45,0.35)',
                        border: '1px solid rgba(200,169,106,0.25)',
                      }}
                    >
                      <SparkleIcon size={10} />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'px-4 py-2.5 text-light'
                        : msg.isError
                        ? 'px-4 py-2.5 text-red-400/80'
                        : 'px-4 py-2.5 text-light/80'
                    }`}
                    style={{
                      borderRadius: msg.role === 'user'
                        ? '14px 14px 4px 14px'
                        : '14px 14px 14px 4px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #5B0E2D 0%, #7a1240 100%)'
                        : msg.isError
                        ? 'rgba(239,68,68,0.08)'
                        : 'rgba(255,255,255,0.055)',
                      border: msg.role === 'user'
                        ? '1px solid rgba(200,169,106,0.2)'
                        : msg.isError
                        ? '1px solid rgba(239,68,68,0.15)'
                        : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div
                    className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-secondary"
                    style={{
                      background: 'rgba(91,14,45,0.35)',
                      border: '1px solid rgba(200,169,106,0.25)',
                    }}
                  >
                    <SparkleIcon size={10} />
                  </div>
                  <div
                    className="px-3 py-2"
                    style={{
                      borderRadius: '14px 14px 14px 4px',
                      background: 'rgba(255,255,255,0.055)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {/* Suggested prompts */}
              {showSuggested && messages.length <= 1 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {suggestedPrompts.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggested(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full text-secondary/80 hover:text-secondary transition-all duration-200"
                      style={{
                        background: 'rgba(200,169,106,0.07)',
                        border: '1px solid rgba(200,169,106,0.2)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(200,169,106,0.14)'
                        e.currentTarget.style.borderColor = 'rgba(200,169,106,0.4)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(200,169,106,0.07)'
                        e.currentTarget.style.borderColor = 'rgba(200,169,106,0.2)'
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="flex items-end gap-2 px-3.5 py-2.5 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                }}
                onFocusCapture={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,169,106,0.35)'
                }}
                onBlurCapture={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('ai.placeholder')}
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-light placeholder-light/25 resize-none outline-none leading-relaxed"
                  style={{ maxHeight: '100px' }}
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!canSend}
                  whileHover={canSend ? { scale: 1.08 } : {}}
                  whileTap={canSend ? { scale: 0.9 } : {}}
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: canSend
                      ? 'linear-gradient(135deg, #5B0E2D 0%, #7a1240 100%)'
                      : 'rgba(255,255,255,0.06)',
                    border: canSend
                      ? '1px solid rgba(200,169,106,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                    color: canSend ? '#C8A96A' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  <SendIcon />
                </motion.button>
              </div>

              <p className="mt-2 text-center text-light/15" style={{ fontSize: '10px', letterSpacing: '0.04em' }}>
                Powered by Groq · llama-3.3-70b
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB toggle button ── */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        aria-label={t('ai.buttonLabel')}
        className="flex items-center gap-2.5 pl-4 pr-5 py-3 text-secondary font-medium tracking-wide transition-all duration-300"
        style={{
          borderRadius: '50px',
          background: 'linear-gradient(135deg, #5B0E2D 0%, #4a0b25 100%)',
          border: '1px solid rgba(200,169,106,0.35)',
          boxShadow: '0 8px 32px rgba(91,14,45,0.55), 0 0 0 1px rgba(200,169,106,0.08) inset',
          fontSize: '13px',
        }}
      >
        <motion.span
          animate={isOpen ? { rotate: 180, scale: 0.9 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SparkleIcon size={17} />
        </motion.span>
        <span className="hidden sm:block">{t('ai.buttonLabel')}</span>
      </motion.button>

    </div>
  )
}
