import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2e5f7a 0%, #4a8db5 100%)',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            color: '#ffffff',
            fontSize: 78,
            fontWeight: 900,
            letterSpacing: '0.02em',
            textShadow: '0 3px 10px rgba(0,0,0,0.3)',
          }}
        >
          翔
        </div>
      </div>
    ),
    { ...size }
  )
}
