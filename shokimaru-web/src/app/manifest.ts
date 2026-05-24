import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '翔葵丸 - 萩湾のイカ釣り船',
    short_name: '翔葵丸',
    description:
      '山口県萩市・玉江漁港から出港する釣り船。SLJ・ナイトティップラン・イカメタルで萩湾のケンサキイカや根魚を狙えます。初心者・女性大歓迎。',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafb',
    theme_color: '#4a8db5',
    lang: 'ja',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
