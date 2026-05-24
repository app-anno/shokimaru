import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '翔葵丸 - 萩湾で最高の釣り体験を！'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #2e5f7a 0%, #4a8db5 55%, #64acc8 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 60,
            color: '#ffffff',
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '0.08em',
            opacity: 0.85,
          }}
        >
          山口県萩市・玉江漁港
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: '0.05em',
              lineHeight: 1,
              textShadow: '0 6px 24px rgba(0,0,0,0.35)',
            }}
          >
            翔葵丸
          </div>
          <div
            style={{
              color: '#ffffff',
              fontSize: 52,
              fontWeight: 700,
              textShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            萩湾で最高の釣り体験を！
          </div>
          <div
            style={{
              marginTop: 12,
              color: '#ffffff',
              fontSize: 30,
              fontWeight: 500,
              opacity: 0.95,
            }}
          >
            SLJ ／ ナイトティップラン ／ イカメタル
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            right: 70,
            color: '#ffffff',
            fontSize: 28,
            fontWeight: 600,
            background: 'rgba(255, 140, 66, 0.95)',
            padding: '14px 28px',
            borderRadius: 999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          初心者・女性大歓迎
        </div>
      </div>
    ),
    { ...size }
  )
}
