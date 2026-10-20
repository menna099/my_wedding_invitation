import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import envelope from './envelope.jpg'

const RATIO = 966 / 1848
const FLAP = 'polygon(0 0,100% 0,100% 7%,50% 41%,0 7%)'
const BEAM_DOWN = 'polygon(50% 41%,86% 100%,14% 100%)'
const ease = [0.65, 0, 0.35, 1]

function Seal({ open }) {
  return (
    <motion.button
      type="button"
      aria-label="فتح الدعوة"
      className="absolute left-1/2 z-30 outline-none"
      style={{ top: '50%', x: '-50%', y: '-50%', width: '27%', aspectRatio: '1' }}
      initial={false}
      animate={open ? { top: ['50%', '49%', '12%'], scale: [1, 0.92, 0.78], rotateX: [0, 0, 200], opacity: [1, 1, 0] } : { top: '50%', scale: 1 }}
      transition={open ? { duration: 1.9, times: [0, 0.12, 1], ease } : {}}
    >
      <span className="absolute inset-0 block" style={{ animation: open ? 'none' : 'sealpulse 2.6s ease-in-out infinite' }}>
        <span className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%, #c9bfae 0%, #a89d8b 55%, #8c8271 100%)', boxShadow: '0 10px 22px rgba(40,32,20,.45), inset 0 2px 3px rgba(255,255,255,.35), inset 0 -4px 8px rgba(60,48,30,.35)', clipPath: 'polygon(50% 0,60% 3%,72% 1%,80% 9%,92% 14%,97% 26%,100% 38%,98% 52%,100% 64%,93% 76%,87% 88%,74% 94%,62% 99%,50% 97%,38% 100%,26% 95%,14% 90%,7% 78%,0 66%,2% 52%,0 40%,5% 27%,10% 15%,22% 8%,32% 2%)' }} />
        <span className="absolute inset-[13%] rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, #b4a998, #9a8f7d)', boxShadow: 'inset 0 3px 6px rgba(50,40,25,.45), inset 0 -2px 3px rgba(255,255,255,.25)' }} />
        <span className="absolute inset-0 flex items-center justify-center text-center font-cal leading-[1.15]" style={{ fontSize: 'clamp(11px,2.2svh,17px)', background: 'linear-gradient(180deg,#f3d58a,#c4932f 55%,#a2741f)', WebkitBackgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 1px 0 rgba(60,40,10,.55))' }}>
          بسم الله<br />الرحمن<br />الرحيم
        </span>
      </span>
    </motion.button>
  )
}

export default function Envelope({ open, onOpen }) {
  const sparks = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ x: 8 + ((i * 53) % 84), y: 6 + ((i * 37) % 88), d: (i * 0.37) % 3, s: 3 + (i % 3) * 2 })), [])
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden"
      style={{ background: '#706c66', pointerEvents: open ? 'none' : 'auto' }}
      initial={{ opacity: 1 }}
      animate={open ? { opacity: [1, 1, 0], scale: [1, 1, 1.18] } : { opacity: 1, scale: 1 }}
      transition={open ? { duration: 2.9, times: [0, 0.62, 1], ease: 'easeInOut' } : {}}
      onClick={!open ? onOpen : undefined}
    >
      <div className="relative shrink-0 overflow-hidden" style={{ height: '100svh', width: `calc(100svh * ${RATIO})`, perspective: 1100 }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${envelope})`, backgroundSize: '100% 100%' }} />
        <motion.div className="absolute inset-0" style={{ clipPath: FLAP, background: 'radial-gradient(ellipse at 50% 100%, #fff1c2 0%, #c5932f 28%, #a98240 62%, #7d6a4b 100%)' }} initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.9, delay: 0.25 }} />
        <motion.div className="absolute inset-0" style={{ clipPath: BEAM_DOWN, background: 'linear-gradient(180deg, rgba(255,236,170,.95), rgba(214,170,90,.25) 55%, transparent)', mixBlendMode: 'screen' }} initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 0.9, delay: 0.35 }} />
        <motion.div className="absolute left-1/2 top-[41%] h-[34%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,240,190,.95), rgba(255,220,130,.35) 45%, transparent 70%)', filter: 'blur(6px)', mixBlendMode: 'screen' }} initial={false} animate={open ? { opacity: [0, 1, 1], scale: [0.4, 1.1, 1.6] } : { opacity: 0 }} transition={{ duration: 1.8, delay: 0.3 }} />
        <motion.div
          className="absolute inset-0"
          style={{ clipPath: FLAP, backgroundImage: `url(${envelope})`, backgroundSize: '100% 100%', transformOrigin: '50% 0' }}
          initial={false}
          animate={{ rotateX: open ? -178 : 0 }}
          transition={{ duration: 1.4, delay: 0.25, ease }}
        />
        {sparks.map((p, i) => (
          <span key={i} className="pointer-events-none absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: 'radial-gradient(circle,#fff6d6,#e8c06a 60%,transparent 72%)', animation: `sparkle ${2.2 + (i % 4) * 0.5}s ease-in-out ${p.d}s infinite` }} />
        ))}
        <Seal open={open} />
        {!open && (
          <motion.p className="absolute inset-x-0 bottom-[11%] text-center font-cairo text-[13px] tracking-[0.18em] text-[#f4ead6]" style={{ textShadow: '0 1px 6px rgba(40,30,15,.6)' }} animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }}>
            اضغط لفتح الدعوة
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
