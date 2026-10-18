import React from 'react'

export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-l from-gold/70 to-transparent" />
      <span className="h-[3px] w-[3px] rounded-full bg-gold/70" />
      <span className="h-2 w-2 rotate-45 border border-gold bg-paper" />
      <span className="h-[3px] w-[3px] rounded-full bg-gold/70" />
      <span className="h-px w-16 bg-gradient-to-r from-gold/70 to-transparent" />
    </div>
  )
}

export function SmallDiamond() {
  return (
    <div className="mx-auto flex items-center justify-center gap-2" aria-hidden>
      <span className="h-px w-10 bg-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
      <span className="h-px w-10 bg-gold/50" />
    </div>
  )
}

// وردة مرسومة SVG للزينة
export function Flower({ size = 120, tone = 'warm', className = '', style }) {
  const c = tone === 'warm' ? ['#f4e2c4', '#e3c79c', '#c9a374'] : ['#fff6e6', '#f0dcb8', '#d8bb8a']
  const petals = Array.from({ length: 8 })
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id={`pg-${tone}`} cx="50%" cy="70%" r="70%">
          <stop offset="0" stopColor={c[2]} /><stop offset=".55" stopColor={c[1]} /><stop offset="1" stopColor={c[0]} />
        </radialGradient>
      </defs>
      {petals.map((_, i) => (
        <ellipse key={i} cx="0" cy="-22" rx="13" ry="23" fill={`url(#pg-${tone})`} stroke="#b8935c" strokeOpacity=".5" strokeWidth=".6" transform={`rotate(${i * 45})`} />
      ))}
      {petals.map((_, i) => (
        <ellipse key={'b' + i} cx="0" cy="-13" rx="8" ry="14" fill={c[0]} stroke="#b8935c" strokeOpacity=".4" strokeWidth=".5" transform={`rotate(${i * 45 + 22})`} />
      ))}
      <circle r="6" fill="#d9b56a" /><circle r="3" fill="#b88a3e" />
    </svg>
  )
}

export function Sprig({ className = '', style, flip }) {
  return (
    <svg viewBox="0 0 120 220" className={className} style={{ ...style, transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden>
      <path d="M60 215 C 58 150 70 90 62 10" fill="none" stroke="#b8935c" strokeWidth="1.4" strokeOpacity=".7" />
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 200 - i * 20, s = i % 2 ? 1 : -1
        return <ellipse key={i} cx={60 + s * 14} cy={y} rx="13" ry="5" fill="#e6cfa4" stroke="#b8935c" strokeOpacity=".55" strokeWidth=".6" transform={`rotate(${s * -30} ${60 + s * 14} ${y})`} />
      })}
      {[40, 90, 140].map((y, i) => <circle key={i} cx={60 + (i % 2 ? 12 : -12)} cy={y} r="5" fill="#f6e8cf" stroke="#c9a374" strokeWidth=".7" />)}
    </svg>
  )
}

const G = ({ id }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#e5c47c" /><stop offset=".5" stopColor="#b98a35" /><stop offset="1" stopColor="#8e6522" />
    </linearGradient>
  </defs>
)

export function TimelineIcon({ name }) {
  const id = 'g-' + name
  const s = { stroke: `url(#${id})`, strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
  const f = 'rgba(233,203,140,.28)'
  const flowers = (cx, cy) => (
    <g>
      <circle cx={cx} cy={cy} r="5" fill={f} {...s} /><circle cx={cx} cy={cy} r="1.6" fill={`url(#${id})`} />
    </g>
  )
  const icons = {
    arch: (
      <g {...s}>
        <path d="M22 92 V48 Q22 24 50 8 Q78 24 78 48 V92" fill={f} />
        <path d="M32 92 V50 Q32 33 50 22 Q68 33 68 50 V92" />
        <path d="M14 92 H86" />
        {flowers(20, 86)}{flowers(80, 86)}{flowers(30, 78)}{flowers(70, 78)}
        <path d="M50 6 V0" />
      </g>
    ),
    bride: (
      <g {...s}>
        <circle cx="50" cy="20" r="8" fill={f} />
        <path d="M42 16 Q50 6 58 16 Q64 30 58 44" />
        <path d="M44 30 Q50 40 56 30 L60 52 Q74 70 84 92 H16 Q26 70 40 52 Z" fill={f} />
        <path d="M30 80 Q50 74 70 80" />
        {flowers(44, 52)}{flowers(52, 56)}{flowers(48, 62)}
      </g>
    ),
    moon: (
      <g {...s}>
        <path d="M58 14 A26 26 0 1 0 74 58 A20 20 0 1 1 58 14 Z" fill={f} />
        <path d="M30 70 H70 L66 92 H34 Z" fill={f} /><path d="M50 60 V70 M44 60 H56" />
        <path d="M82 22 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" />
        {flowers(24, 88)}{flowers(76, 88)}
      </g>
    ),
    cloche: (
      <g {...s}>
        <path d="M16 70 Q16 28 50 28 Q84 28 84 70 Z" fill={f} />
        <circle cx="50" cy="22" r="5" /><path d="M10 74 H90 M14 82 H86" />
        <path d="M30 60 Q36 42 50 40" />
        {flowers(18, 84)}{flowers(82, 84)}{flowers(50, 90)}
      </g>
    ),
    drum: (
      <g {...s}>
        <ellipse cx="50" cy="52" rx="28" ry="9" fill={f} />
        <path d="M22 52 V76 Q50 90 78 76 V52" fill={f} />
        <path d="M30 58 L40 80 M50 62 V84 M70 58 L60 80" />
        <path d="M40 14 V36 M40 14 L58 10 V32" /><circle cx="36" cy="38" r="4" /><circle cx="54" cy="34" r="4" />
        {flowers(18, 86)}{flowers(82, 86)}
      </g>
    ),
  }
  return (
    <svg viewBox="0 0 100 100" className="h-[78px] w-[78px]" aria-hidden>
      <G id={id} />
      {icons[name]}
    </svg>
  )
}
