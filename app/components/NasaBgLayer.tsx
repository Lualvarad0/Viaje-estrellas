'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface NasaBgLayerProps {
  imageUrl?: string
  /** CSS `background` value for the overlay (color or gradient). */
  overlay?: string
  /** CSS `background-position` for the image layer. Defaults to 'center'. */
  bgPosition?: string
}

/**
 * Renders three absolutely-positioned layers as siblings inside the parent
 * section (which must have `position: relative`):
 *
 *  z-index -2 → NASA image (fades in after browser loads it)
 *  z-index -2 → pulsing skeleton (shown while image is loading)
 *  z-index -1 → dark/gradient overlay (always present when imageUrl provided)
 *
 * All layers have negative z-index so they paint below the section's
 * non-positioned content (painting step 3+) without any wrapper changes.
 */
export default function NasaBgLayer({
  imageUrl,
  overlay = 'rgba(0, 0, 0, 0.70)',
  bgPosition = 'center',
}: NasaBgLayerProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!imageUrl) return
    setLoaded(false)
    const img = new window.Image()
    img.onload = () => setLoaded(true)
    img.src = imageUrl
  }, [imageUrl])

  if (!imageUrl) return null

  return (
    <>
      {/* NASA image — starts invisible, fades in once preloaded */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
          zIndex: -2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeIn' }}
      />

      {/* Skeleton pulse — visible while image is in flight */}
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse pointer-events-none"
          style={{ zIndex: -2, background: 'rgba(20, 20, 40, 0.45)' }}
        />
      )}

      {/* Overlay — keeps text readable over any NASA image */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1, background: overlay }}
      />
    </>
  )
}
