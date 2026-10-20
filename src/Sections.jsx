import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { INVITE } from './data'
import { Divider, SmallDiamond, Flower, Sprig, TimelineIcon } from './Ornaments'

const Reveal = ({ children, delay = 0, className = '', y = 28 }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
)
const Title = ({ children, sub }) => (
  <div className="text-center">
    <h2 className="font-cal text-[40px] leading-tight text-ink">{children}</h2>
    {sub && <p className="mt-1 font-cairo text-[13px] text-[#6b5632]">{sub}</p>}
  </div>
)

/* ---------- كارت المسح ---------- */
function ScratchCard({ value, label, delay }) {
  const ref = useRef(null)
  const [done, setDone] = useState(false)
  const st = useRef({ down: false, moved: 0, n: 0 })
  useEffect(() => {
    const c = ref.current; if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = c.clientWidth, h = c.clientHeight
    c.width = w * dpr; c.height = h * dpr
    const g = c.getContext('2d'); g.scale(dpr, dpr)
    const grd = g.createLinearGradient(0, 0, w, h)
    grd.addColorStop(0, '#f1d9a0'); grd.addColorStop(.5, '#e2bd75'); grd.addColorStop(1, '#f3dfb0')
    g.fillStyle = grd; g.fillRect(0, 0, w, h)
    g.globalAlpha = .22; g.strokeStyle = '#fff'; g.lineWidth = 6
    for (let i = -h; i < w + h; i += 22) { g.beginPath(); g.moveTo(i, h); g.lineTo(i + h, 0); g.stroke() }
    g.globalAlpha = 1
  }, [])
  const pos = (e) => { const r = ref.current.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top] }
  const scratch = (e) => {
    if (!st.current.down || done) return
    const g = ref.current.getContext('2d'); const [x, y] = pos(e)
    g.globalCompositeOperation = 'destination-out'
    g.beginPath(); g.arc(x, y, 15, 0, 7); g.fill()
    st.current.moved++
    if (++st.current.n % 6 === 0) {
      const c = ref.current, d = g.getImageData(0, 0, c.width, c.height).data; let t = 0
      for (let i = 3; i < d.length; i += 64) if (d[i] < 20) t++
      if (t / (d.length / 64) > 0.4) setDone(true)
    }
  }
  return (
    <Reveal delay={delay} className="flex w-[27%] flex-col items-center">
      <div className="relative aspect-[0.96] w-full overflow-hidden rounded-[18px] border border-[#e6c98d] bg-gradient-to-br from-[#faefd3] to-[#f6e1b6]" style={{ boxShadow: '0 8px 18px rgba(168,128,50,.28), inset 0 0 0 3px rgba(255,255,255,.55)' }}>
        <div className="absolute inset-0 flex items-center justify-center font-cal text-[30px] text-ink">{value}</div>
        <canvas ref={ref} className="absolute inset-0 h-full w-full touch-none transition-opacity duration-700" style={{ opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto' }}
          onPointerDown={(e) => { st.current.down = true; st.current.moved = 0; e.currentTarget.setPointerCapture(e.pointerId); scratch(e) }}
          onPointerMove={scratch}
          onPointerUp={() => { st.current.down = false; if (st.current.moved < 3) setDone(true) }} />
        {!done && <span className="shine pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]" />}
      </div>
      <span className="mt-1.5 font-cairo text-[11px] text-[#6b5632]">{label}</span>
    </Reveal>
  )
}

export function DateSection() {
  return (
    <section className="px-6 pb-10 pt-12">
      <Reveal><Divider /></Reveal>
      <Reveal delay={0.1} className="mt-8"><Title>التاريخ</Title></Reveal>
      <Reveal delay={0.2}><p className="mt-5 text-center font-cairo text-[13px] text-[#6b5632]">✦ امسح لإظهار التاريخ ✦</p></Reveal>
      <div className="mt-6 flex justify-center gap-2.5">
        <ScratchCard value={INVITE.day} label="اليوم" delay={0.1} />
        <ScratchCard value={INVITE.month} label="الشهر" delay={0.2} />
        <ScratchCard value={INVITE.year} label="السنة" delay={0.3} />
      </div>
    </section>
  )
}

export function TimelineSection() {
  return (
    <section className="px-5 pb-10 pt-4">
      <Reveal><Divider /></Reveal>
      <Reveal delay={0.1} className="mt-7"><Title>الجدول الزمني للزفاف</Title></Reveal>
      <Reveal delay={0.15} className="mt-2"><SmallDiamond /></Reveal>
      <div className="relative mt-6">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-gold/70 via-gold/50 to-gold/70" />
        <Flower size={34} tone="light" className="absolute left-1/2 -top-3 -translate-x-1/2" />
        <span className="absolute -bottom-2 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border border-gold bg-paper" />
        <div className="space-y-6 py-5">
          {INVITE.timeline.map((it, i) => {
            const iconLeft = i % 2 === 0
            const text = (
              <div className="px-2 text-center">
                <div className="font-amiri text-[17px] font-bold text-ink">{it.t}</div>
                <div className="font-cairo text-[14px] text-[#5a4628]">{it.l}</div>
              </div>
            )
            const icon = <div className="flex justify-center"><TimelineIcon name={it.icon} /></div>
            return (
              <Reveal key={i} delay={0.05} className="grid grid-cols-2 items-center">
                {/* RTL: العمود الأول = اليمين */}
                {iconLeft ? <>{text}{icon}</> : <>{icon}{text}</>}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function useCountdown() {
  const target = new Date(INVITE.weddingDate).getTime()
  const calc = () => { const d = Math.max(0, target - Date.now()); return { d: Math.floor(d / 864e5), h: Math.floor(d / 36e5) % 24, m: Math.floor(d / 6e4) % 60, s: Math.floor(d / 1e3) % 60 } }
  const [v, set] = useState(calc)
  useEffect(() => { const t = setInterval(() => set(calc()), 1000); return () => clearInterval(t) }, [])
  return v
}
const toAr = (n) => String(n).padStart(2, '0').replace(/\d/g, (x) => '٠١٢٣٤٥٦٧٨٩'[x])

export function Countdown() {
  const v = useCountdown()
  const items = [['يوم', v.d], ['ساعة', v.h], ['دقيقة', v.m], ['ثانية', v.s]]
  return (
    <section className="px-6 pb-10 pt-2">
      <Reveal><Divider /></Reveal>
      <Reveal delay={0.1} className="mt-7"><Title sub="حتى نلتقي في يومنا المميز">العد التنازلي</Title></Reveal>
      <Reveal delay={0.15} className="mt-2"><SmallDiamond /></Reveal>
      <div className="mt-5 flex justify-center gap-2.5">
        {items.map(([l, n], i) => (
          <Reveal key={l} delay={0.1 * i}>
            <div className="flex h-[78px] w-[58px] flex-col items-center justify-center rounded-[22px] border border-[#e1c48a] bg-gradient-to-b from-[#fdf3dc] to-[#f6e3b9]" style={{ boxShadow: '0 5px 12px rgba(168,128,50,.2), inset 0 0 0 2px rgba(255,255,255,.55)' }}>
              <motion.span key={n} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-amiri text-[22px] font-bold leading-none text-ink">{toAr(n)}</motion.span>
              <span className="mt-1.5 font-cairo text-[11px] text-[#7b6339]">{l}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function MapCard() {
  return (
    <a href={INVITE.mapUrl} target="_blank" rel="noreferrer" className="relative block overflow-hidden rounded-md" style={{ boxShadow: '0 8px 20px rgba(80,60,30,.2)' }}>
      <svg viewBox="0 0 320 190" className="block w-full">
        <rect width="320" height="190" fill="#c9bfa3" />
        {Array.from({ length: 14 }).map((_, i) => <rect key={i} x={(i * 53) % 300} y={(i * 37) % 170} width="34" height="22" fill={i % 3 ? '#b7ab8a' : '#d3c8ac'} opacity=".7" />)}
        <path d="M-10 150 Q90 120 170 100 T340 40" stroke="#efe9d8" strokeWidth="14" fill="none" />
        <path d="M-10 150 Q90 120 170 100 T340 40" stroke="#8b8368" strokeWidth="1" strokeDasharray="6 6" fill="none" />
        <path d="M120 200 L160 100 L190 -10" stroke="#e4dcc4" strokeWidth="7" fill="none" />
        <g transform="translate(160 78)"><path d="M0 0 C-14-18 -14-40 0-40 C14-40 14-18 0 0Z" fill="#e0452f" stroke="#a52a18" /><circle cy="-28" r="5" fill="#7a1a0e" /></g>
      </svg>
      <span className="absolute left-2 top-2 rounded bg-white/95 px-2 py-1 font-cairo text-[10px] text-[#2a6bd1]">↗ افتح في خرائط Google</span>
    </a>
  )
}

export function Venue() {
  return (
    <section className="px-8 pb-10 pt-2">
      <Reveal><Divider /></Reveal>
      <Reveal delay={0.1} className="mt-8 text-center">
        <h2 className="font-amiri text-[26px] text-[#5a4628]">مكان الاحتفال</h2>
        <p className="mt-1 font-serifcap text-[22px] tracking-[0.06em] text-ink">{INVITE.venueEn}</p>
        <p className="font-cairo text-[13px] text-[#6b5632]">{INVITE.venueAr}</p>
      </Reveal>
      {/* <Reveal delay={0.1} className="mt-5"><div className="aspect-[4/3] w-full overflow-hidden rounded-md" style={{ background: 'linear-gradient(135deg,#ead7ab,#d9bd84)', boxShadow: '0 8px 20px rgba(80,60,30,.2)' }}><img src='./hall.jpeg' alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div></Reveal> */}
      <Reveal delay={0.1} className="mt-4"><MapCard /></Reveal>
      <Reveal delay={0.1} className="mt-6 flex justify-center">
        <a href={INVITE.mapUrl} target="_blank" rel="noreferrer" className="rounded-full px-9 py-2.5 font-cairo text-[14px] font-semibold text-[#fff7e4]" style={{ background: 'linear-gradient(180deg,#d4b074,#b88f4e)', boxShadow: '0 6px 14px rgba(150,110,40,.35)' }}>الوصول للقاعة</a>
      </Reveal>
    </section>
  )
}

export function Rsvp() {
  const [name, setName] = useState('')
  const [yes, setYes] = useState(true)
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState(false)
  const submit = () => { if (!name.trim()) { setErr(true); return } setErr(false); setSent(true) }
  const Radio = ({ on, label, onClick }) => (
    <button type="button" onClick={onClick} className={`flex flex-1 items-center justify-between rounded-full border px-4 py-2.5 font-cairo text-[13px] transition ${on ? 'border-[#d6b578] bg-[#f6e3b9] text-[#8a6a2e]' : 'border-[#e3cf9f] bg-[#fbf3de] text-[#5a4628]'}`}>
      <span>{label}</span>
      <span className={`h-3.5 w-3.5 rounded-full border ${on ? 'border-[#b8893a] bg-[radial-gradient(circle,#b8893a_38%,transparent_42%)]' : 'border-[#9b8760]'}`} />
    </button>
  )
  return (
    <section className="relative px-5 pb-12 pt-2">
      <Reveal><Divider /></Reveal>
      <Reveal delay={0.1} className="mt-8"><Title sub={INVITE.rsvpNote}>هل ستشرفوننا؟</Title></Reveal>
      <Reveal delay={0.1} className="mt-6">
        <div className="rounded-[26px] border border-[#ecd9a9] bg-[#fdf4df] p-5" style={{ boxShadow: '0 10px 26px rgba(150,110,40,.14)' }}>
          {sent ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#e3c27f] to-[#b88a3e] text-2xl text-white">✓</div>
              <p className="font-cal text-[26px] text-ink">شكراً لك {name}</p>
              <p className="mt-2 font-cairo text-[13px] text-[#6b5632]">{yes ? 'تم تأكيد حضورك، بانتظارك بكل حب' : 'نأسف لعدم حضورك، ونشكرك على ردك'}</p>
            </motion.div>
          ) : (
            <div className="space-y-4 text-right">
              <label className="block font-cairo text-[12px] text-[#6b5632]">الاسم
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسمك هنا" className={`mt-1.5 w-full rounded-2xl border-2 bg-white/70 px-4 py-3 text-[14px] text-ink outline-none transition focus:border-[#c9a45a] ${err ? 'border-red-300' : 'border-[#ecd9a9]'}`} />
              </label>
              <div>
                <p className="mb-1.5 font-cairo text-[12px] text-[#6b5632]">هل ستشرفنا بحضوركم؟</p>
                <div className="flex gap-2.5"><Radio on={yes} label="سأحضر بكل سرور" onClick={() => setYes(true)} /><Radio on={!yes} label="أعتذر عن الحضور" onClick={() => setYes(false)} /></div>
              </div>
              <label className="block font-cairo text-[12px] text-[#6b5632]">تعليق للعروسين (اختياري)
                <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="ألف مبروك..." className="mt-1.5 w-full resize-none rounded-2xl border-2 border-[#ecd9a9] bg-white/70 px-4 py-3 text-[14px] text-ink outline-none transition focus:border-[#c9a45a]" />
              </label>
              <button type="button" onClick={submit} className="shine relative w-full overflow-hidden rounded-2xl py-3 font-cairo text-[15px] font-semibold text-[#fff7e4]" style={{ background: 'linear-gradient(180deg,#c9a468,#a9823f)', boxShadow: '0 6px 14px rgba(150,110,40,.35)' }}>إرسال التأكيد</button>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}

export function Thanks() {
  return (
    <section className="relative overflow-hidden px-8 pb-6 pt-16 text-center" style={{ background: 'linear-gradient(180deg,#fdf1d7,#f8e7c3)' }}>
      <Flower size={150} className="absolute -right-10 top-24 opacity-90" />
      <Flower size={90} tone="light" className="absolute -right-4 top-52 opacity-90" />
      <Flower size={130} className="absolute -left-12 -top-6 opacity-90" />
      <Sprig className="absolute -left-2 top-16 h-40 opacity-70" />
      <Sprig className="absolute right-0 top-64 h-40 opacity-70" flip />
      <Reveal className="relative"><h2 className="font-cal text-[34px] leading-snug text-ink">شكرًا لمشاركتكم فرحتنا</h2></Reveal>
      <Reveal delay={0.15} className="relative mx-auto mt-6 max-w-[320px] font-amiri text-[16px] leading-[2] text-[#4b3a22]">
        <p>وجودكم معنا ودعواتكم الطيبة هما أجمل هدية لنا، ومشاركتكم يومنا تجعل فرحتنا أجمل وأكمل.</p>
        <p className="mt-3">نسعد بأن تجمعنا بكم هذه اللحظة الجميلة، ونرجو أن يبقى هذا اليوم ذكرى دافئة في قلوبنا جميعًا.</p>
      </Reveal>
      <Reveal delay={0.2} className="relative mt-8">
        <p className="font-cal text-[24px] text-ink">ننتظركم بكل حب</p>
        <p className="mt-2 font-cal text-[26px] text-[#8a6525]">{INVITE.signer}</p>
        <div className="mt-4"><SmallDiamond /></div>
      </Reveal>
      <div className="relative mt-12 pb-20 font-cairo text-[12px] text-[#8a7650]">{INVITE.footer}</div>
    </section>
  )
}
