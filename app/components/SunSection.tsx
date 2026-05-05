'use client'

import { motion } from 'framer-motion'
import NasaBgLayer from './NasaBgLayer'

const RAYS_1 = [0, 45, 90, 135, 180, 225, 270, 315]
const RAYS_2 = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

const FLARES = [
  { deg: 28,  delay: '-1.2s' },
  { deg: -18, delay: '-2.4s' },
  { deg: 73,  delay: '-0.6s' },
]

const PARTICLES: { x: string; dur: number; delay: number; size: number }[] = [
  { x: '8%',  dur: 4.2, delay: 0,    size: 6 },
  { x: '18%', dur: 5.1, delay: 0.7,  size: 4 },
  { x: '29%', dur: 3.8, delay: 1.4,  size: 7 },
  { x: '40%', dur: 4.7, delay: 0.3,  size: 5 },
  { x: '50%', dur: 5.3, delay: 1.1,  size: 8 },
  { x: '60%', dur: 4.0, delay: 0.5,  size: 4 },
  { x: '70%', dur: 3.6, delay: 1.8,  size: 6 },
  { x: '80%', dur: 4.9, delay: 0.9,  size: 5 },
  { x: '90%', dur: 4.4, delay: 1.6,  size: 7 },
]

// Overlay más suave cuando hay foto local (Daniela), más cálido para NASA solar
const SUN_OVERLAY =
  'linear-gradient(to top, rgba(10,10,15,0.72) 0%, rgba(124,45,18,0.55) 30%, rgba(0,0,0,0.45) 65%)'

export default function SunSection({ imageUrl }: { imageUrl?: string }) {
  return (
    <section
      id="sun"
      className="relative z-10 min-h-screen overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(to top, #d97706 0%, #7c2d12 28%, #1c0a00 50%, #0a0a0f 70%)' }}
    >
      <NasaBgLayer imageUrl={imageUrl} overlay={SUN_OVERLAY} bgPosition="50% 20%" />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold pointer-events-none"
          style={{ left: p.x, bottom: '22%', width: p.size, height: p.size }}
          animate={{ y: [0, -(180 + i * 18)], opacity: [0, 0.9, 0.85, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Global warm glow */}
      <div style={{
        position: 'absolute',
        inset: -20,
        background: 'radial-gradient(ellipse 90% 80% at 50% 38%, rgba(251,191,36,0.09), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Text */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="font-display text-snow text-4xl sm:text-5xl md:text-6xl leading-tight max-w-lg"
        >
          Eres mi sol,<br />mi centro, mi todo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.55, ease: 'easeOut' }}
          className="mt-6 font-body text-gold text-xl sm:text-2xl tracking-wide"
          style={{ textShadow: '0 0 22px rgba(251,191,36,0.5)' }}
        >
          Feliz aniversario mi vida ❤️
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
          className="mt-4 font-body text-snow/70 text-base sm:text-lg max-w-sm leading-relaxed text-center"
        >
          Como el Sol ilumina cada rincón del universo,<br />
          tú iluminas cada rincón de mi vida.<br />
          <span className="text-gold">Te amo infinitamente. ✦</span>
        </motion.p>
      </div>

      {/* CSS-based animated Sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="flex justify-center pointer-events-none"
        style={{ marginBottom: '-28%' }}
      >
        <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto' }}>
          {/* Glow wrapper */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(ellipse 90% 80% at 50% 38%, rgba(251,191,36,0.09), transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Prominence 1 */}
          <div style={{
            position: 'absolute', inset: '13px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'rgba(249,115,22,0.6)',
            animation: 'sun-prominence 5s ease-in-out infinite',
            animationDelay: '-1.8s',
          }} />

          {/* Prominence 2 */}
          <div style={{
            position: 'absolute', inset: '7px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderBottomColor: 'rgba(251,191,36,0.54)',
            animation: 'sun-prominence 6.5s ease-in-out infinite',
            animationDelay: '-3.2s',
          }} />

          {/* Corona ring 1 – clockwise */}
          <div style={{
            position: 'absolute', inset: '14px',
            borderRadius: '50%',
            animation: 'sun-spin 20s linear infinite',
          }}>
            {RAYS_1.map((deg) => (
              <div key={deg} style={{
                position: 'absolute',
                top: '50%', left: '50%',
                height: '1.5px', width: 102,
                transformOrigin: 'left center',
                transform: `rotate(${deg}deg)`,
                background: 'linear-gradient(to right, rgba(251,191,36,0.64), transparent 62%)',
              }} />
            ))}
          </div>

          {/* Corona ring 2 – counter-clockwise */}
          <div style={{
            position: 'absolute', inset: '4px',
            borderRadius: '50%',
            animation: 'sun-spin-rev 28s linear infinite',
          }}>
            {RAYS_2.map((deg) => (
              <div key={deg} style={{
                position: 'absolute',
                top: '50%', left: '50%',
                height: '1.5px', width: 94,
                transformOrigin: 'left center',
                transform: `rotate(${deg}deg)`,
                background: 'linear-gradient(to right, rgba(251,191,36,0.64), transparent 62%)',
                opacity: 0.46,
              }} />
            ))}
          </div>

          {/* Sun body */}
          <div style={{
            position: 'absolute', inset: '46px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #fffbeb, #fbbf24 38%, #f97316 66%, #dc2626)',
            boxShadow: '0 0 40px 18px rgba(251,191,36,0.62), 0 0 80px 40px rgba(249,115,22,0.35), 0 0 120px 58px rgba(220,38,38,0.16)',
            animation: 'sun-pulse-glow 3s ease-in-out infinite',
          }} />

          {/* Solar flares */}
          {FLARES.map(({ deg, delay }) => (
            <div key={deg} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255,255,200,0.84), transparent)',
              transformOrigin: 'left center',
              transform: `rotate(${deg}deg)`,
              animation: 'sun-flare 3.8s ease-in-out infinite',
              animationDelay: delay,
            }} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
