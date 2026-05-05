'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'

const REASONS = [
  'Por tu risa que ilumina cualquier habitación',
  'Por cómo me miras cuando no me doy cuenta',
  'Por tu forma de abrazar como si el tiempo se detuviera',
  'Por cada aventura que vivimos juntos',
  'Por hacerme mejor persona solo con estar a mi lado',
  'Por tu corazón tan grande y tan tuyo',
  'Por los silencios que también son perfectos',
  'Por elegirme una y otra vez',
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="text-center"
      >
        <p className="text-snow/30 text-xs tracking-widest uppercase mb-2">estrellas · razones para amarte</p>
        <h2 className="font-display text-gold text-3xl sm:text-4xl" style={{ textShadow: '0 0 24px rgba(251,191,36,0.55)' }}>
          Campo de Estrellas
        </h2>
        <p className="mt-2 font-body text-snow/35 text-xs">toca cada estrella ✦</p>
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
