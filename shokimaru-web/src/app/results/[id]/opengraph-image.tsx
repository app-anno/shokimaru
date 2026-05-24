import { ImageResponse } from 'next/og'
import { getFishingResultById } from '@/lib/supabase/fishing-results'

export const runtime = 'nodejs'
export const alt = '翔葵丸 釣果情報'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function ResultOGImage({ params }: { params: { id: string } }) {
  const result = await getFishingResultById(params.id)

  if (!result || !result.is_public) {
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
            color: '#ffffff',
            fontSize: 72,
            fontWeight: 800,
          }}
        >
          翔葵丸 - 釣果情報
        </div>
      ),
      { ...size }
    )
  }

  const dateLabel = new Date(result.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const meta: string[] = []
  if (result.weather) meta.push(`天候 ${result.weather}`)
  if (result.tide_type) meta.push(`潮 ${result.tide_type}`)
  if (result.moon_age !== null) meta.push(`月齢 ${result.moon_age}`)
  if (result.size) meta.push(result.size)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #2e5f7a 0%, #4a8db5 60%, #64acc8 100%)',
          padding: 70,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff',
            fontSize: 32,
            fontWeight: 700,
            opacity: 0.95,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span>翔葵丸</span>
            <span style={{ opacity: 0.7, fontSize: 26, fontWeight: 500 }}>
              萩湾のイカ釣り船
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.9 }}>
            {dateLabel}
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            color: '#ffffff',
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 700, opacity: 0.95 }}>
            {dateLabel}の萩湾釣果
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 30,
              textShadow: '0 6px 18px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ fontSize: 220, fontWeight: 900, lineHeight: 1 }}>
              {result.catch_count}
            </div>
            <div style={{ fontSize: 80, fontWeight: 700 }}>杯</div>
            {result.participants_count ? (
              <div style={{ fontSize: 32, fontWeight: 600, opacity: 0.85 }}>
                （{result.participants_count}名・平均{Math.round(result.catch_count / result.participants_count)}杯）
              </div>
            ) : null}
          </div>
        </div>

        {meta.length > 0 ? (
          <div
            style={{
              position: 'absolute',
              bottom: 70,
              left: 70,
              right: 70,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {meta.map((m) => (
              <div
                key={m}
                style={{
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.18)',
                  padding: '12px 24px',
                  borderRadius: 999,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ),
    { ...size }
  )
}
