export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

interface ResultAltInput {
  date: string
  catch_count: number
  weather?: string | null
  tide_type?: string | null
  size?: string | null
}

export function buildResultAlt(result: ResultAltInput): string {
  const parts: string[] = []
  if (result.weather) parts.push(`天候${result.weather}`)
  if (result.tide_type) parts.push(`潮${result.tide_type}`)
  if (result.size) parts.push(`サイズ${result.size}`)
  const meta = parts.length > 0 ? `（${parts.join('・')}）` : ''
  return `${formatDate(result.date)}の翔葵丸 萩湾ケンサキイカ釣果 ${result.catch_count}杯${meta}`
}