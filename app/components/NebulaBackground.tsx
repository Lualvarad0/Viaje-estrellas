'use client'

import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'planet-1', 'planet-2', 'planet-3', 'planet-4', 'planet-5', 'stars-reasons', 'sun']

type NebulaState = 'cool' | 'purple' | 'warm'

function sectionToNebula(id: string): NebulaState {
  if (id === 'sun') return 'warm'
  if (id === 'planet-2' || id === 'planet-4' || id === 'stars-reasons') return 'purple'
  return 'cool'
}

export default function NebulaBackground() {
  const [nebula, setNebula] = useState<NebulaState>('cool')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setNebula(sectionToNebula(e.target.id))
        })
      },
      { threshold: 0.38 },
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  const cool   = nebula === 'cool'
  const purple = nebula === 'purple'
  const warm   = nebula === 'warm'

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* Cool – blue/violet */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(ellipse 55% 45% at 15% 18%, rgba(59,130,246,0.22), transparent 65%)',
          'radial-gradient(ellipse 48% 55% at 82% 55%, rgba(139,92,246,0.18), transparent 65%)',
        ].join(','),
        opacity: cool ? 1 : 0,
        transition: 'opacity 1.6s ease',
      }} />

      {/* Purple – violet/pink */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(ellipse 60% 48% at 28% 38%, rgba(167,139,250,0.26), transparent 65%)',
          'radial-gradient(ellipse 52% 65% at 72% 65%, rgba(244,114,182,0.18), transparent 65%)',
        ].join(','),
        opacity: purple ? 1 : 0,
        transition: 'opacity 1.6s ease',
      }} />

      {/* Warm – gold/orange */}
      <div style={{
        position: 'absolute', inset: 0,
        background: [
          'radial-gradient(ellipse 75% 60% at 50% 30%, rgba(251,191,36,0.24), transparent 68%)',
          'radial-gradient(ellipse 55% 75% at 18% 72%, rgba(249,115,22,0.16), transparent 65%)',
        ].join(','),
        opacity: warm ? 1 : 0,
        transition: 'opacity 1.6s ease',
      }} />

      {/* Subtle Milky Way band */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(108deg, transparent 36%, rgba(248,250,252,0.03) 48%, rgba(167,139,250,0.05) 52%, transparent 64%)',
      }} />
    </div>
  )
}
