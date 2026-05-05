import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #0a0a1f 0%, #1c0a3a 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          {/* 4-pointed star */}
          <polygon
            points="10,1 11.8,8.2 19,10 11.8,11.8 10,19 8.2,11.8 1,10 8.2,8.2"
            fill="#fbbf24"
          />
          {/* Center glow dot */}
          <circle cx="10" cy="10" r="2" fill="#fffbeb" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
