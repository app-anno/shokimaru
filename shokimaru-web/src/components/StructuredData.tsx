import Script from 'next/script'
import { SHARED_PRICE, CHARTER_PRICE, MAX_PASSENGERS, PRICE_RANGE } from '@/lib/constants/pricing'
import { FAQ_ITEMS } from '@/lib/constants/faq'

interface LocalBusinessProps {
  type?: 'LocalBusiness' | 'TouristAttraction' | 'BoatRentalService'
}

export function LocalBusinessStructuredData({ type = 'BoatRentalService' }: LocalBusinessProps = {}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': 'https://shokimaru.com/#business',
    name: '翔葵丸',
    alternateName: 'しょうきまる',
    description: '山口県萩市の玉江漁港から出港する釣り船。スーパーライトジギング（SLJ）・ナイトティップラン・イカ釣りなど季節ごとの釣りをご提供。初心者・女性大歓迎。',
    url: 'https://shokimaru.com',
    telephone: '090-7548-2904',
    priceRange: PRICE_RANGE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '玉江漁港',
      addressLocality: '萩市',
      addressRegion: '山口県',
      postalCode: '758-0011',
      addressCountry: 'JP'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.4333,
      longitude: 131.3833
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '05:30',
        closes: '24:00',
        description: 'スーパーライトジギング（朝5:30〜13:00前後）、ナイトティップラン（夕方17:30〜24:00前後）'
      }
    ],
    sameAs: [
      'https://www.instagram.com/hagishi_shokimaru/',
      'https://line.me/R/ti/p/%40shokimaru'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '翔葵丸 料金プラン',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'スーパーライトジギング（SLJ）乗り合いプラン',
          description: 'キジハタ・カサゴ・マダイ等を狙うスーパーライトジギング。朝5:30〜13:00前後。初心者・女性も大歓迎。',
          price: `${SHARED_PRICE}`,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'スーパーライトジギング乗合'
        },
        {
          '@type': 'Offer',
          name: 'スーパーライトジギング（SLJ）チャータープラン',
          description: `SLJの船貸し切りプラン。最大${MAX_PASSENGERS}名まで乗船可能。プライベート空間で釣りを楽しめます。`,
          price: `${CHARTER_PRICE}`,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'スーパーライトジギングチャーター'
        },
        {
          '@type': 'Offer',
          name: 'ナイトティップラン 乗り合いプラン',
          description: 'ケンサキイカ・アオリイカを狙うナイトティップラン。夕方17:30〜24:00前後。初心者・女性も大歓迎。',
          price: `${SHARED_PRICE}`,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'ナイトティップラン乗合'
        },
        {
          '@type': 'Offer',
          name: 'ナイトティップラン チャータープラン',
          description: `ナイトティップランの船貸し切りプラン。最大${MAX_PASSENGERS}名まで乗船可能。プライベート空間で釣りを楽しめます。`,
          price: `${CHARTER_PRICE}`,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'ナイトティップランチャーター'
        },
        {
          '@type': 'Offer',
          name: 'イカメタル・オモリグ 乗り合いプラン',
          description: 'ケンサキイカを狙うイカメタル・オモリグ。6月〜9月のケンサキイカシーズン限定。レンタルタックル利用可能。初心者・女性も大歓迎。',
          price: `${SHARED_PRICE}`,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-06-01',
          validThrough: '2024-09-30',
          category: 'イカメタル乗合'
        },
        {
          '@type': 'Offer',
          name: 'イカメタル・オモリグ チャータープラン',
          description: `イカメタル・オモリグの船貸し切りプラン。最大${MAX_PASSENGERS}名まで乗船可能。プライベート空間で釣りを楽しめます。6月〜9月限定。`,
          price: `${CHARTER_PRICE}`,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-06-01',
          validThrough: '2024-09-30',
          category: 'イカメタルチャーター'
        }
      ]
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'ライフジャケット完備',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'レンタルタックル',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: '初心者講習',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: '女性歓迎',
        value: true
      }
    ],
    image: [
      'https://shokimaru.com/hero-image.jpg',
      'https://shokimaru.com/opengraph-image'
    ]
  }

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ServiceStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://shokimaru.com/#service',
    name: '翔葵丸 釣り体験サービス',
    serviceType: '釣り船サービス（スーパーライトジギング・ナイトティップラン・イカ釣り）',
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://shokimaru.com/#business'
    },
    areaServed: {
      '@type': 'Place',
      name: '萩湾',
      address: {
        '@type': 'PostalAddress',
        addressLocality: '萩市',
        addressRegion: '山口県',
        addressCountry: 'JP'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      '@id': 'https://shokimaru.com/#offers'
    },
    description: '萩湾でのスーパーライトジギング・ナイトティップラン・イカ釣り体験。季節ごとに様々な釣りをお楽しみいただけます。初心者でも安心して楽しめるサービスです。'
  }

  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function FAQStructuredData() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

interface FishingResultForJsonLd {
  id: string
  date: string
  weather: string | null
  moon_age: number | null
  tide_type: string | null
  catch_count: number
  size: string | null
  image_url: string | null
  participants_count: number | null
  created_at: string
  updated_at: string
  images?: { image_url: string }[]
}

export function FishingResultStructuredData({ result }: { result: FishingResultForJsonLd }) {
  const baseUrl = 'https://shokimaru.com'
  const url = `${baseUrl}/results/${result.id}`
  const dateLabel = new Date(result.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })

  const allImages = [
    ...(result.images?.map(img => img.image_url) ?? []),
    ...(result.image_url ? [result.image_url] : []),
  ].filter((src, idx, arr) => Boolean(src) && arr.indexOf(src) === idx)

  const headline = `${dateLabel}の萩湾イカ釣り釣果 ${result.catch_count}杯`
  const descParts: string[] = []
  if (result.weather) descParts.push(`天候: ${result.weather}`)
  if (result.tide_type) descParts.push(`潮: ${result.tide_type}`)
  if (result.moon_age !== null) descParts.push(`月齢: ${result.moon_age}日`)
  if (result.size) descParts.push(`サイズ: ${result.size}`)
  if (result.participants_count) descParts.push(`釣行人数: ${result.participants_count}名`)
  const description = `翔葵丸（山口県萩市・玉江漁港）の${dateLabel}の釣果。${descParts.join(' / ')}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: allImages.length > 0 ? allImages : [`${baseUrl}/opengraph-image`],
    datePublished: result.created_at,
    dateModified: result.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#business`,
      name: '翔葵丸',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}/#business`,
      name: '翔葵丸',
    },
    url,
  }

  return (
    <Script
      id={`fishing-result-structured-data-${result.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url?: string }[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {})
    }))
  }

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function FishingResultsItemListStructuredData({
  results,
}: {
  results: Array<{ id: string; date: string; catch_count: number }>
}) {
  const baseUrl = 'https://shokimaru.com'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '翔葵丸 萩湾イカ釣り釣果一覧',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: results.length,
    itemListElement: results.map((r, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${baseUrl}/results/${r.id}`,
      name: `${new Date(r.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}の釣果 ${r.catch_count}杯`,
    })),
  }

  return (
    <Script
      id="fishing-results-itemlist-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebPageStructuredData({
  title, 
  description,
  url,
  type = 'WebPage'
}: { 
  title: string
  description: string
  url: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage'
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://shokimaru.com/#website'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`
    }
  }

  return (
    <Script
      id="webpage-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebSiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://shokimaru.com/#website',
    url: 'https://shokimaru.com',
    name: '翔葵丸 - 萩市の釣り船 | SLJ・ナイトティップラン・イカ釣り',
    description: '山口県萩市でスーパーライトジギング・ナイトティップラン・イカ釣り体験。初心者・女性大歓迎の釣り船',
    publisher: {
      '@type': 'LocalBusiness',
      '@id': 'https://shokimaru.com/#business'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://shokimaru.com/results?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}