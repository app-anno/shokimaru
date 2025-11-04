import Script from 'next/script'

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
    priceRange: '¥9,000-¥45,000',
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
          price: '9000',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'スーパーライトジギング乗合'
        },
        {
          '@type': 'Offer',
          name: 'スーパーライトジギング（SLJ）チャータープラン',
          description: 'SLJの船貸し切りプラン。最大6名まで乗船可能。プライベート空間で釣りを楽しめます。',
          price: '45000',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'スーパーライトジギングチャーター'
        },
        {
          '@type': 'Offer',
          name: 'ナイトティップラン 乗り合いプラン',
          description: 'ケンサキイカ・アオリイカを狙うナイトティップラン。夕方17:30〜24:00前後。初心者・女性も大歓迎。',
          price: '9000',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'ナイトティップラン乗合'
        },
        {
          '@type': 'Offer',
          name: 'ナイトティップラン チャータープラン',
          description: 'ナイトティップランの船貸し切りプラン。最大6名まで乗船可能。プライベート空間で釣りを楽しめます。',
          price: '45000',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-10-01',
          category: 'ナイトティップランチャーター'
        },
        {
          '@type': 'Offer',
          name: 'イカメタル・オモリグ 乗り合いプラン',
          description: 'ケンサキイカを狙うイカメタル・オモリグ。6月〜9月のケンサキイカシーズン限定。レンタルタックル利用可能。初心者・女性も大歓迎。',
          price: '9000',
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
          validFrom: '2024-06-01',
          validThrough: '2024-09-30',
          category: 'イカメタル乗合'
        },
        {
          '@type': 'Offer',
          name: 'イカメタル・オモリグ チャータープラン',
          description: 'イカメタル・オモリグの船貸し切りプラン。最大6名まで乗船可能。プライベート空間で釣りを楽しめます。6月〜9月限定。',
          price: '45000',
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
      'https://shokimaru.com/boat-image1.jpg',
      'https://shokimaru.com/boat-image2.jpg',
      'https://shokimaru.com/fishing-result.jpg'
    ],
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: '釣り初心者'
      },
      reviewBody: '初めてのイカ釣りでしたが、船長さんが丁寧に教えてくれて、たくさん釣れました！'
    }
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
    mainEntity: [
      {
        '@type': 'Question',
        name: '初心者でも大丈夫ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、大丈夫です！初心者の方大歓迎です。道具の使い方から釣り方まで、船長が丁寧にご指導いたします。'
        }
      },
      {
        '@type': 'Question',
        name: '何を持っていけばいいですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '基本的に手ぶらでOKです！釣り道具はレンタル（¥1,000）できます。防寒着、タオル、飲み物があると便利です。'
        }
      },
      {
        '@type': 'Question',
        name: '支払い方法は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '現金でのお支払いをお願いしています。当日、乗船前にお支払いください。領収証が必要な場合は事前にお伝えください。'
        }
      },
      {
        '@type': 'Question',
        name: '予約はいつまでにすればいいですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '前日までにご予約いただければ大丈夫です。ただし、満員になることもありますので、お早めのご予約をおすすめします。'
        }
      },
      {
        '@type': 'Question',
        name: '天候が悪い場合は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '安全を最優先に、天候や海況により出船を中止する場合があります。中止の場合は前日または当日にご連絡し、料金は全額返金いたします。'
        }
      }
    ]
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
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