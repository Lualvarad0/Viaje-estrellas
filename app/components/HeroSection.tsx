'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NasaBgLayer from './NasaBgLayer'

const TITLE = "Hoy quiero llevarte a un viaje especial, Daniela..."

export default function HeroSection({ imageUrl }: { imageUrl?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(TITLE.slice(0, i))
      if (i === TITLE.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 65)
    return () => clearInterval(id)
  }, [])

  function scrollToJourney() {
    document.getElementById('planet-1')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <NasaBgLayer imageUrl={imageUrl} />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="max-w-xl"
      >
        <h1 className="font-display text-snow text-3xl sm:text-4xl md:text-5xl leading-snug min-h-[8rem] sm:min-h-[7rem]">
          {displayed}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block ml-1 w-0.5 h-8 bg-snow/80 align-middle"
            />
          )}
        </h1>
      </motion.div>

      {done && (
        <>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-6 font-body text-rose-soft text-lg sm:text-xl tracking-wide"
          >
            {/* 3 años y 2 meses de nuestro universo */}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6, type: 'spring', stiffness: 130 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            onClick={scrollToJourney}
            className="mt-12 px-10 py-4 bg-gold text-space font-body font-semibold rounded-full text-lg shadow-xl shadow-gold/30 tracking-wide"
          >
            Iniciar viaje 🚀
          </motion.button>
        </>
      )}

      {/* Scroll hint */}
      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0] }}
          transition={{ delay: 2.5, duration: 2.2, repeat: Infinity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-px h-8 bg-snow/30" />
          <span className="text-snow/35 text-xs font-body tracking-widest uppercase">scroll</span>
        </motion.div>
      )}
    </section>
  )
}
