import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from './Envelope'
import Hero from './Hero'
import { DateSection, TimelineSection, Countdown, Venue, Rsvp, Thanks } from './Sections'
import { INVITE } from './data'

const Glass = ({ children, onClick, label }) => (
  <button type="button" aria-label={label} onClick={onClick} className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/75 text-[#8a6a2e] backdrop-blur" style={{ boxShadow: '0 4px 12px rgba(0,0,0,.18)' }}>{children}</button>
)

export default function App() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [auto, setAuto] = useState(false)
  const audio = useRef(null)

  useEffect(() => { document.body.style.overflow = shown ? '' : 'hidden' }, [shown])
  const doOpen = () => {
    setOpen(true)
    setTimeout(() => setShown(true), 1700)
    if (INVITE.audio && audio.current) audio.current.play().then(() => setPlaying(true)).catch(() => {})
  }
  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => window.scrollBy({ top: 1.4 }), 16)
    const stop = () => setAuto(false)
    window.addEventListener('touchstart', stop, { once: true }); window.addEventListener('wheel', stop, { once: true })
    return () => clearInterval(t)
  }, [auto])
  const toggleMusic = () => { const a = audio.current; if (!a || !INVITE.audio) return; if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) } }

  return (
    <div dir="rtl" className="min-h-svh">
      {INVITE.audio && <audio ref={audio} src={INVITE.audio} loop preload="auto" />}
      <main className="relative mx-auto w-full max-w-[430px] overflow-hidden bg-cream" style={{ boxShadow: '0 0 60px rgba(0,0,0,.5)', minHeight: '100svh' }}>
        <Hero show={open} />
        <div style={{ background: 'radial-gradient(circle at 50% 0%, #fff7e2 0%, #fdf1d7 60%)' }}>
          <DateSection />
          <TimelineSection />
          <Countdown />
          <Venue />
          <Rsvp />
        </div>
        <Thanks />
      </main>
      <AnimatePresence>
        {shown && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
            <div className="mx-auto flex max-w-[430px] items-center justify-between px-3 pb-[max(12px,calc(8.5svh-20px))]">
              <Glass label="تمرير تلقائي" onClick={() => setAuto((a) => !a)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: auto ? 1 : 0.7 }}><path d="M6 6l6 6 6-6M6 13l6 6 6-6" /></svg>
              </Glass>
              <Glass label="الموسيقى" onClick={toggleMusic}>
                {playing ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
              </Glass>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Envelope open={open} onOpen={doOpen} />
    </div>
  )
}
