const BASE_URL = 'https://shokimaru.com'

const HOME_ITEM = { name: 'ホーム', url: BASE_URL }

export const breadcrumbs = {
  pricing: [HOME_ITEM, { name: '料金・サービス' }],
  access: [HOME_ITEM, { name: 'アクセス' }],
  contact: [HOME_ITEM, { name: '予約・お問い合わせ' }],
  results: [HOME_ITEM, { name: '釣果情報' }],
  guide: [HOME_ITEM, { name: '初心者ガイド' }],
  sightseeing: [HOME_ITEM, { name: '萩市の観光情報' }],
  faq: [HOME_ITEM, { name: 'よくある質問' }],
  privacy: [HOME_ITEM, { name: 'プライバシーポリシー' }],
} as const

export type BreadcrumbKey = keyof typeof breadcrumbs
