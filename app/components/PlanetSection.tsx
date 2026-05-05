'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import NasaBgLayer from './NasaBgLayer'

interface PlanetSectionProps {
  id?: string
  planetNumber: number
  variant?: 'blue' | 'purple'
  color: string
  title: string
  description: string
  imageSrc?: string
  imageAlt: string
  align: 'left' | 'right'
  imageUrl?: string
}

/* ─── Blue planet: rings + orbiting moon ─── */
function BluePlanet({ pfx }: { pfx: string }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 190 190" width={185} height={185} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`${pfx}-grad`} cx="34%" cy="30%">
            <stop offset="0%"   stopColor="#dbeafe" />
            <stop offset="28%"  stopColor="#3b82f6" />
            <stop offset="62%"  stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id={`${pfx}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="74%"  stopColor="transparent" />
            <stop offset="88%"  stopColor="rgba(59,130,246,0.13)" />
            <stop offset="100%" stopColor="rgba(147,197,253,0.22)" />
          </radialGradient>
          <linearGradient id={`${pfx}-ring`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="18%"  stopColor="rgba(148,163,184,0.44)" />
            <stop offset="50%"  stopColor="rgba(203,213,225,0.7)" />
            <stop offset="82%"  stopColor="rgba(148,163,184,0.44)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <radialGradient id={`${pfx}-moon`} cx="38%" cy="33%">
            <stop offset="0%"   stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>
          <clipPath id={`${pfx}-clip`}><circle cx="95" cy="95" r="68" /></clipPath>
          <clipPath id={`${pfx}-rf`}><rect x="0" y="90" width="190" height="100" /></clipPath>
        </defs>
        {/* Atmosphere glow */}
        <circle cx="95" cy="95" r="88" fill={`url(#${pfx}-glow)`} />
        {/* Ring – back half */}
        <ellipse cx="95" cy="95" rx="84" ry="14" fill="none" stroke={`url(#${pfx}-ring)`} strokeWidth="8" opacity="0.62" />
        {/* Planet body */}
        <circle cx="95" cy="95" r="68" fill={`url(#${pfx}-grad)`} />
        {/* Atmospheric bands */}
        <path d="M27 81 Q57 73 87 78 Q117 83 163 75" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="9" clipPath={`url(#${pfx}-clip)`} />
        <path d="M31 104 Q63 98 95 104 Q127 110 163 104" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" clipPath={`url(#${pfx}-clip)`} />
        {/* Ring – front half */}
        <ellipse cx="95" cy="95" rx="84" ry="14" fill="none" stroke={`url(#${pfx}-ring)`} strokeWidth="8" opacity="0.62" clipPath={`url(#${pfx}-rf)`} />
        {/* Orbiting moon */}
        <g transform="translate(95,95)">
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite" />
            <circle cx="80" cy="0" r="6" fill={`url(#${pfx}-moon)`} />
          </g>
        </g>
      </svg>
    </motion.div>
  )
}

/* ─── Purple planet: 2 moons + big spot ─── */
function PurplePlanet({ pfx }: { pfx: string }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 190 190" width={185} height={185} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`${pfx}-grad`} cx="34%" cy="30%">
            <stop offset="0%"   stopColor="#f3e8ff" />
            <stop offset="24%"  stopColor="#c084fc" />
            <stop offset="54%"  stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
          <radialGradient id={`${pfx}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="74%"  stopColor="transparent" />
            <stop offset="88%"  stopColor="rgba(167,139,250,0.13)" />
            <stop offset="100%" stopColor="rgba(196,181,253,0.24)" />
          </radialGradient>
          <linearGradient id={`${pfx}-ring`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="18%"  stopColor="rgba(167,139,250,0.44)" />
            <stop offset="50%"  stopColor="rgba(216,180,254,0.8)" />
            <stop offset="82%"  stopColor="rgba(167,139,250,0.44)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <radialGradient id={`${pfx}-moon1`} cx="38%" cy="33%">
            <stop offset="0%"   stopColor="#fde68a" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>
          <clipPath id={`${pfx}-clip`}><circle cx="95" cy="95" r="68" /></clipPath>
          <clipPath id={`${pfx}-rf`}><rect x="0" y="90" width="190" height="100" /></clipPath>
        </defs>
        <circle cx="95" cy="95" r="88" fill={`url(#${pfx}-glow)`} />
        <ellipse cx="95" cy="95" rx="84" ry="17" fill="none" stroke={`url(#${pfx}-ring)`} strokeWidth="10" opacity="0.72" />
        <circle cx="95" cy="95" r="68" fill={`url(#${pfx}-grad)`} />
        {/* Atmospheric bands */}
        <path d="M25 81 Q55 73 87 79 Q117 85 165 77" fill="none" stroke="rgba(244,114,182,0.18)" strokeWidth="10" clipPath={`url(#${pfx}-clip)`} />
        <path d="M28 101 Q60 107 92 101 Q124 95 165 103" fill="none" stroke="rgba(244,114,182,0.13)" strokeWidth="7"  clipPath={`url(#${pfx}-clip)`} />
        {/* Great spot */}
        <ellipse cx="73" cy="90" rx="13" ry="9" fill="rgba(244,114,182,0.22)" clipPath={`url(#${pfx}-clip)`} />
        <ellipse cx="95" cy="95" rx="84" ry="17" fill="none" stroke={`url(#${pfx}-ring)`} strokeWidth="10" opacity="0.72" clipPath={`url(#${pfx}-rf)`} />
        {/* 2 moons orbiting in opposite directions */}
        <g transform="translate(95,95)">
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0"   to="360" dur="8s"  repeatCount="indefinite" />
            <circle cx="82" cy="0" r="7" fill={`url(#${pfx}-moon1)`} />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0"   to="-360" dur="12s" repeatCount="indefinite" />
            <circle cx="68" cy="0" r="4" fill="#cbd5e1" opacity="0.82" />
          </g>
        </g>
      </svg>
    </motion.div>
  )
}

/* ─── Polaroid card ─── */
function Polaroid({ imageSrc, imageAlt }: { imageSrc?: string; imageAlt: string }) {
  return (
    <motion.div
      style={{ rotate: -2.5 }}
      whileHover={{ rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="bg-white p-3 pb-10 shadow-2xl shadow-black/60 cursor-default"
    >
      {imageSrc ? (
        <div className="relative w-44 h-44 sm:w-52 sm:h-52">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="208px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex flex-col items-center justify-center gap-3">
          <span className="text-5xl opacity-20" aria-hidden>📷</span>
          <p className="text-slate-500 text-xs px-3 text-center">Tu foto aquí</p>
        </div>
      )}
      <p className="text-slate-400 text-xs text-center mt-3 italic tracking-wide">
        {imageAlt}
      </p>
    </motion.div>
  )
}

/* ─── Section ─── */
export default function PlanetSection({
  id,
  planetNumber,
  variant,
  color,
  title,
  description,
  imageSrc,
  imageAlt,
  align,
  imageUrl,
}: PlanetSectionProps) {
  const resolvedVariant = variant ?? (planetNumber % 2 === 0 ? 'purple' : 'blue')
  const pfx = `p${planetNumber}`
  const fromLeft = align === 'left'
  const slideDir = fromLeft ? -60 : 60

  return (
    <section
      id={id}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20"
    >
      <NasaBgLayer imageUrl={imageUrl} overlay="rgba(0,0,0,0.72)" />

      <div className={`flex flex-col items-center gap-10 max-w-5xl w-full lg:gap-16 lg:items-center ${fromLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        {/* Planet */}
        <motion.div
          initial={{ opacity: 0, x: -slideDir }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex-1 flex justify-center"
        >
          {resolvedVariant === 'purple'
            ? <PurplePlanet pfx={pfx} />
            : <BluePlanet   pfx={pfx} />
          }
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: slideDir }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left"
        >
          <div className="relative bg-space/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xs w-full"
            style={{ animation: 'card-glow 3.2s ease-in-out infinite' }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gold text-xs opacity-60">✦</span>
              <span className="font-body text-gold/40 text-xs tracking-widest uppercase">
                Parada {String(planetNumber).padStart(2, '0')}
              </span>
              <span className="text-gold text-xs opacity-60">✦</span>
            </div>
            <Polaroid imageSrc={imageSrc} imageAlt={imageAlt} />
            <h3 className="font-display text-snow text-xl text-center mt-5">{title}</h3>
            <p className="font-body text-snow/55 text-sm text-center mt-2 leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
