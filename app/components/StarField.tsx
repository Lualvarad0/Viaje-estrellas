'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  speed: number
  phase: number
}

interface StarFieldProps {
  count?: number
  className?: string
}

export default function StarField({ count = 200, className }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []

    function initStars() {
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        radius: Math.random() * 1.4 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.0008 + 0.0002,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      initStars()
    }

    function draw(timestamp: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (const star of stars) {
        const opacity =
          star.baseOpacity +
          (1 - star.baseOpacity) * 0.5 * (1 + Math.sin(timestamp * star.speed + star.phase))

        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(248, 250, 252, ${opacity.toFixed(3)})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? 'fixed inset-0 pointer-events-none z-0'}
    />
  )
}
