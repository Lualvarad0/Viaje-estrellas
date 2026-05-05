'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/audio/eres-mi-sol.mp3" loop preload="none" />

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        animate={playing
          ? { boxShadow: ['0 0 0 0px rgba(251,191,36,0.5)', '0 0 0 12px rgba(251,191,36,0)'] }
          : { boxShadow: '0 0 0 0px rgba(251,191,36,0)' }
        }
        transition={playing
          ? { duration: 1.6, repeat: Infinity, ease: 'easeOut' }
          : { duration: 0 }
        }
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 20,
          width: 48,
          height: 48,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          cursor: 'pointer',
          background: 'rgba(10,10,15,0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(251,191,36,0.3)',
          color: '#fbbf24',
        }}
        aria-label={playing ? 'Pausar música' : 'Reproducir Eres mi sol — Alex Campos'}
      >
        {playing ? '⏸' : '♫'}
      </motion.button>
    </>
  )
}
