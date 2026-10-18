import React from 'react'
import { motion } from 'framer-motion'
import hero from './hero.jpg'
import { INVITE } from './data'

const up = (d) => ({ initial: { opacity: 0, y: 26, filter: 'blur(6px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 1.1, delay: d, ease: [0.22, 1, 0.36, 1] } })

export default function Hero({ show }) {
  const goldText = { background: 'linear-gradient(180deg,#c9a24f 0%,#9b6f26 60%,#b98d3c 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: 'drop-shadow(0 1px 0 rgba(255,246,222,.7))' }
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'max(100svh, calc(min(100vw,430px) * 1.8224))', containerType: 'inline-size' }}>
      <motion.img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover object-center" initial={{ scale: 1.14 }} animate={{ scale: show ? 1 : 1.14 }} transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }} draggable={false} />
      {/* توهج الفوانيس والشمس */}
      {[[9, 33], [91, 31.5], [4.5, 39], [96, 40]].map(([x, y], i) => (
        <span key={i} className="pointer-events-none absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: '16cqw', height: '16cqw', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(255,214,120,.55), transparent 65%)', mixBlendMode: 'screen', animation: `sparkle ${3 + i * 0.6}s ease-in-out ${i * 0.5}s infinite` }} />
      ))}
      <span className="pointer-events-none absolute rounded-full" style={{ left: '72%', top: '61%', width: '34cqw', height: '34cqw', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(255,226,150,.5), transparent 65%)', mixBlendMode: 'screen', animation: 'sparkle 5s ease-in-out infinite' }} />

      {show && (
        <>
          <motion.div {...up(0.9)} className="absolute inset-x-0 text-center font-cal" style={{ top: '22.3%', fontSize: '8.4cqw', lineHeight: 1.3, ...goldText }}>{INVITE.title}</motion.div>
          <motion.div {...up(1.3)} className="absolute inset-x-0 whitespace-nowrap text-center font-cal" style={{ top: '30.5%', fontSize: '10cqw', lineHeight: 1.35, ...goldText }}>
            {INVITE.groom} <span style={{ fontSize: '0.6em' }}>،</span> {INVITE.bride}
          </motion.div>
          <motion.div {...up(1.8)} className="absolute inset-x-0 text-center font-cairo" style={{ top: '43.2%', fontSize: '4.3cqw', color: '#8a6a3a', letterSpacing: '0.01em', textShadow: '0 1px 0 rgba(255,246,222,.55)' }}>{INVITE.dateText}</motion.div>
        </>
      )}
    </section>
  )
}
