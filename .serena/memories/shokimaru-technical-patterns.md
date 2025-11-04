# 翔葵丸プロジェクト - 技術パターンとベストプラクティス

## Next.js 14 App Router パターン

### メタデータ定義
```typescript
export const metadata: Metadata = {
  title: "ページタイトル | 翔葵丸",
  description: "詳細な説明文（150-160文字目安）",
  keywords: ["キーワード1", "キーワード2", ...],
  openGraph: {
    title: "OGタイトル",
    description: "OG説明文",
    type: "website",
    locale: "ja_JP",
  },
  alternates: {
    canonical: '/page-path',
  },
};
```

### Structured Data (Schema.org)
**LocalBusiness**:
```typescript
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "翔葵丸",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", ... },
  "offers": { "@type": "AggregateOffer", "offers": [...] }
}
```

**Offer配列パターン**:
```typescript
{
  "@type": "Offer",
  "name": "プラン名 プラン種別",
  "description": "詳細説明（対象魚、シーズン、特徴）",
  "price": "9000",
  "priceCurrency": "JPY",
  "availability": "https://schema.org/InStock",
  "validFrom": "2024-06-01",  // 季節限定の場合
  "validThrough": "2024-09-30",
  "category": "カテゴリ名"
}
```

## Tailwind CSS カスタマイズ

### カスタムカラー定義（tailwind.config.ts）
```typescript
colors: {
  primary: { 50: '#f0f8fb', ... 600: '#4a8db5', ... },
  secondary: { 50: '#f0f9fc', ... 600: '#64acc8', ... },
  accent: { 50: '#fff5ed', ... 600: '#ff8c42', ... },
  ocean: { light: '#5a9bbd', dark: '#2e5f7a' }
}
```

### カスタムアニメーション
```typescript
animation: {
  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'bounce-slow': 'bounce 2s infinite',
  'wiggle': 'wiggle 0.5s ease-in-out',
  'morph': 'morph 8s ease-in-out infinite',
  'float': 'float 6s ease-in-out infinite',
}
```

### グラデーション統一パターン
- **プライマリグラデーション**: `bg-gradient-to-r from-primary-600 to-secondary-600`
- **テキストグラデーション**: `text-gradient` (カスタムクラス)
- **背景グラデーション**: `bg-gradient-to-b from-primary-50 to-white`

## コンポーネントパターン

### AnimatedSection使用法
```tsx
<AnimatedSection animation="fade|slide-up|slide-down|slide-left|slide-right|zoom|flip" delay={0-1000}>
  {children}
</AnimatedSection>
```
- `delay`: ミリ秒単位（インデックス × 100-200が一般的）
- 複数要素の場合: `delay={index * 100}`でずらしアニメーション

### Card統一デザイン
```tsx
<Card className="hover:shadow-xl transition-all duration-300">
  {/* カード内容 */}
</Card>
```
- 基本的にhover効果とtransition追加
- h-fullで高さ統一（グリッドレイアウト時）

### レスポンシブグリッド
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* グリッドアイテム */}
</div>
```
- モバイル: 1列
- タブレット: 2列
- デスクトップ: 3列

## セクション構成パターン

### 標準ページ構造
```tsx
<div className="min-h-screen relative">
  <FloatingElements />
  
  {/* 1. ヘッダーセクション */}
  <section className="bg-gradient-to-b from-primary-50 to-white py-16">
    <h1>ページタイトル</h1>
    <p>説明文</p>
  </section>
  
  {/* 2. メインコンテンツセクション */}
  <section className="py-16">
    {/* コンテンツ */}
  </section>
  
  {/* 3. CTAセクション */}
  <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
    <h2>行動を促すタイトル</h2>
    <Button href="/contact">予約する</Button>
  </section>
</div>
```

### 背景装飾パターン
```tsx
<div className="absolute inset-0 opacity-30">
  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full blur-3xl animate-morph" />
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200 to-primary-200/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
</div>
```

## データ構造パターン

### プラン情報配列
```typescript
const plans = [
  {
    id: 'slj-shared',
    title: 'スーパーライトジギング',
    label: 'SLJ',
    season: '通年',
    targets: 'アジ、サバ、イサキ、カサゴ、メバル等',
    price: { shared: 9000, charter: 45000 },
    gradient: 'from-primary-600 to-secondary-600',
    rentalAvailable: false,
  },
  // ...
];
```

### FAQ構造
```typescript
interface FAQItem {
  question: string;
  answer: string;
  category: "beginner" | "equipment" | "reservation" | "other";
}
```

## 文言パターン

### SEOに強いタイトル構成
```
[サービス名] - [地域] + [価値提案] | [会社名]
例: "翔葵丸 - 萩湾で最高の釣り体験を！ | 山口県萩市の釣り船"
```

### Description構成（150-160文字）
```
[地域][主要サービス]ができる[業態]、[会社名]。[ターゲット層]も大歓迎！[具体的な価値][行動喚起]。
例: "山口県萩市でスーパーライトジギング・ナイトティップラン・イカメタル等の釣り体験ができる釣り船、翔葵丸（しょうきまる）。初心者・女性も大歓迎！萩湾の豊かな漁場で、思い出に残る釣り体験を。"
```

### CTA文言
- 強い行動喚起: "今すぐ予約する"
- ソフトな案内: "詳しく見る", "お問い合わせはこちら"
- 情報取得: "よくある質問を見る"

## パフォーマンス最適化

### 画像最適化
```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="説明文"
  width={1200}
  height={630}
  priority={true}  // Above the fold画像の場合
/>
```

### 動的インポート
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

## エラーハンドリング

### File Write Pattern（Read → Write）
```typescript
// 必ずReadしてからWrite
const content = await Read(filePath);
await Write(filePath, newContent);
```

### String Replace Pattern
```typescript
// 完全一致を確保
const oldString = `exact multiline
string to replace`;
const newString = `new multiline
replacement`;
```

## ビルド・テストフロー

### 推奨テスト順序
1. `npx tsc --noEmit` - 型チェック
2. `npm run lint` - Lint確認
3. `npm run build` - プロダクションビルド
4. 目視確認: `npm run dev`

### デプロイ前チェックリスト
- [ ] TypeScript型エラーなし
- [ ] Lintエラーなし
- [ ] ビルド成功
- [ ] 環境変数設定（.env.local）
- [ ] Supabase接続確認

## Git Commit Message Pattern
```
feat(pricing): イカメタル・オモリグプラン追加

- 乗合・チャータープラン実装
- レンタルタックル案内追加
- Structured Data更新（6 offers）

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## 参考リンク
- Next.js 14 Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Schema.org: https://schema.org/
- Vercel Deployment: https://vercel.com/docs
