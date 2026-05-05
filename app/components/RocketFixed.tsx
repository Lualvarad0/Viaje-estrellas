'use client'

import { useEffect, useState } from 'react'

const TRAIL = [
  { left: 37, bg: '#fbbf24', size: 7, delay: '0s' },
  { left: 47, bg: '#f97316', size: 5, delay: '0.14s' },
  { left: 53, bg: '#fde68a', size: 7, delay: '0.07s' },
  { left: 31, bg: '#ef4444', size: 5, delay: '0.22s' },
  { left: 43, bg: '#fb923c', size: 6, delay: '0.3s' },
  { left: 49, bg: '#fbbf24', size: 4, delay: '0.1s' },
]

export default function RocketFixed() {
  const [topVh, setTopVh] = useState(8)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const sunEl = document.getElementById('sun')

    function onScroll() {
      const scrollY = window.scrollY
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      const pct = scrollY / maxScroll
      setTopVh(8 + pct * 74)
      if (sunEl) {
        const { top } = sunEl.getBoundingClientRect()
        setVisible(top >= window.innerHeight * 0.55)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: '50%',
        top: `${topVh}vh`,
        transform: 'translateX(-50%)',
        zIndex: 6,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.35))',
        willChange: 'top',
      }}
    >
      <div style={{ position: 'relative', width: 88 }}>
        <svg
          viewBox="0 0 120 215"
          width={88}
          height={167}
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'scaleY(-1)', display: 'block' }}
        >
          <defs>
            <linearGradient id="rkt-bg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#94a3b8" />
              <stop offset="42%"  stopColor="#f8fafc" />
              <stop offset="68%"  stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="rkt-ng" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#64748b" />
              <stop offset="50%"  stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <radialGradient id="rkt-wg" cx="38%" cy="33%">
              <stop offset="0%"   stopColor="#bae6fd" />
              <stop offset="55%"  stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </radialGradient>
            <linearGradient id="rkt-fla" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#fef9c3" />
              <stop offset="22%"  stopColor="#fbbf24" />
              <stop offset="52%"  stopColor="#f97316" />
              <stop offset="80%"  stopColor="#dc2626" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="rkt-fl2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.85)" />
              <stop offset="45%"  stopColor="#fde68a" />
              <stop offset="75%"  stopColor="#f97316" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="rkt-fin" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#334155" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <clipPath id="rkt-bc">
              <rect x="35" y="60" width="50" height="100" rx="6" />
            </clipPath>
          </defs>
          {/* Fins */}
          <path d="M35 132L8 168L35 152Z" fill="url(#rkt-fin)" />
          <path d="M85 132L112 168L85 152Z" fill="url(#rkt-fin)" />
          {/* Body */}
          <rect x="35" y="60" width="50" height="100" rx="6" fill="url(#rkt-bg)" />
          <line x1="60" y1="60" x2="60" y2="160" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
          <ellipse cx="47" cy="122" rx="5" ry="8" fill="rgba(148,163,184,0.18)" clipPath="url(#rkt-bc)" />
          <ellipse cx="73" cy="117" rx="5" ry="8" fill="rgba(148,163,184,0.18)" clipPath="url(#rkt-bc)" />
          {/* Nose cone */}
          <path d="M35 60 Q35 18 60 8 Q85 18 85 60Z" fill="url(#rkt-ng)" />
          {/* Window */}
          <circle
            cx="60" cy="96" r="15"
            fill="url(#rkt-wg)"
            stroke="#60a5fa"
            strokeWidth="1.5"
            style={{ animation: 'rkt-win-glow 2s ease-in-out infinite' }}
          />
          <circle cx="55" cy="91" r="4" fill="rgba(255,255,255,0.28)" />
          {/* Engine base */}
          <path d="M40 160L34 176L86 176L80 160Z" fill="#475569" />
          <path d="M42 160L78 160L75 170L45 170Z" fill="#334155" />
          {/* Flame */}
          <g style={{
            animation: 'rkt-flicker 0.28s ease-in-out infinite',
            transformBox: 'fill-box',
            transformOrigin: 'center',
          }}>
            <ellipse cx="60" cy="180" rx="17" ry="27" fill="url(#rkt-fla)" opacity="0.96" />
            <ellipse cx="60" cy="180" rx="9"  ry="17" fill="url(#rkt-fl2)" opacity="0.92" />
          </g>
        </svg>

        {/* Trail particles */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 0 }}>
          {TRAIL.map((p, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: p.left,
                top: 0,
                width:  p.size,
                height: p.size,
                background: p.bg,
                borderRadius: '50%',
                animation: 'rkt-trail 0.75s ease-out infinite',
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
