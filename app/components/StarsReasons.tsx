'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'

const REASONS = [
  'Por tu risa, que ilumina cualquier rincón del universo',
  'Por cómo me miras cuando no me doy cuenta',
  'Por abrazar con toda el alma, como si detuvieras el tiempo',
  'Por cada aventura que decidiste vivir conmigo',
  'Por hacerme mejor persona con solo estar a mi lado',
  'Por tu corazón enorme y completamente tuyo',
  'Por los momentos intimos que también son perfectos entre nosotros',
  'Por elegirme cada día, una y otra vez, sin dudarlo',
]

const BURST_COLORS = ['#fbbf24', '#f472b6', '#fde68a', '#a78bfa', '#fb923c']

interface Particle {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  color: string
}

export default function StarsReasons() {
  const [particles, setParticles] = useState<Particle[]>([])

  const burst = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const batch: Particle[] = Array.from({ length: 12 }, (_, j) => {
      const angle = (j / 12) * Math.PI * 2
      const dist  = 38 + Math.random() * 38
      return {
        id:    Date.now() + j,
        x:     cx,
        y:     cy,
        dx:    Math.cos(angle) * dist,
        dy:    Math.sin(angle) * dist,
        color: BURST_COLORS[j % 5],
      }
    })
    setParticles((prev) => [...prev, ...batch])
    setTimeout(() => setParticles((prev) => prev.filter((p) => !batch.some((b) => b.id === p.id))), 680)
  }, [])

  return (
    <section
      id="stars-reasons"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-8"
    >
      {/* Bridge text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1 }}
        className="text-center max-w-sm"
      >
        <p className="font-body text-snow/40 text-sm tracking-widest uppercase mb-4">· última parada ·</p>
        <h2 className="font-display text-snow text-3xl sm:text-4xl leading-snug">
          Y ahora, una parada<br />entre las estrellas...
        </h2>
        <p className="mt-4 font-body text-gold text-base sm:text-lg leading-relaxed" style={{ textShadow: '0 0 18px rgba(251,191,36,0.4)' }}>
          Cada una brilla con una razón para amarte.
        </p>
        <p className="mt-3 font-body text-snow/30 text-xs tracking-wide">toca cada estrella ✦</p>
      </motion.div>

      {/* Grid */}
      <div
        className="grid gap-4 w-full max-w-xl"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(148px, 1fr))' }}
      >
        {REASONS.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            whileHover={{ y: -4, borderColor: 'rgba(251,191,36,0.38)' }}
            onClick={burst}
            className="flex flex-col items-center gap-3 rounded-2xl p-5 cursor-pointer select-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(251,191,36,0.12)',
              transition: 'background 0.25s, border-color 0.25s, transform 0.2s',
            }}
          >
            <span
              className="text-gold text-3xl block"
              style={{
                animation: `star-pulse 3s ease-in-out infinite`,
                animationDelay: `${-(i * 0.55).toFixed(2)}s`,
              }}
            >
              ✦
            </span>
            <p className="font-body text-snow/60 text-xs text-center leading-relaxed">
              {reason}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Burst particles – rendered as fixed-position dots */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: p.x,
            top:  p.y,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: p.color,
            pointerEvents: 'none',
            zIndex: 9999,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            animation: 'burst-fly 0.55s ease-out forwards',
          } as React.CSSProperties}
        />
      ))}
    </section>
  )
}
