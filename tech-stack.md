# 翔葵丸 技術スタック設計書

## 1. アーキテクチャ概要

```
┌─────────────────┐     ┌─────────────────┐
│   クライアント   │     │    管理画面     │
│   (Next.js)     │     │   (Next.js)     │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                ┌────┴────┐
                │ Vercel  │
                └────┬────┘
                     │
              ┌──────┴──────┐
              │  Supabase   │
              │  - Database │
              │  - Auth     │
              │  - Storage  │
              └─────────────┘
```

## 2. フロントエンド

### 2.1 フレームワーク
- **Next.js 14** (App Router)
  - React Server Components対応
  - SEO最適化
  - 画像最適化（next/image）

### 2.2 UIライブラリ
- **Tailwind CSS**: スタイリング
- **shadcn/ui**: UIコンポーネント
- **Lucide React**: アイコン

### 2.3 状態管理
- **TanStack Query**: サーバー状態管理
- **Zustand**: クライアント状態管理（必要に応じて）

## 3. バックエンド

### 3.1 Supabase構成
- **PostgreSQL Database**: データ永続化
- **Row Level Security (RLS)**: データアクセス制御
- **Storage**: 画像ファイル管理
- **Realtime**: リアルタイム更新（将来的な拡張用）

### 3.2 データベース設計

```sql
-- 釣果情報テーブル
CREATE TABLE fishing_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  weather VARCHAR(50),
  catch_count INTEGER NOT NULL,
  size VARCHAR(100),
  image_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 管理者テーブル（将来的な拡張用）
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. 認証・セキュリティ

### 4.1 管理画面認証
- **ベーシック認証**: 環境変数で管理
  ```
  BASIC_AUTH_USER=admin
  BASIC_AUTH_PASSWORD=secure_password
  ```

### 4.2 セキュリティ対策
- **CORS設定**: Vercel環境変数で制御
- **Rate Limiting**: Vercel Edge Functions
- **画像アップロード制限**: 
  - 最大ファイルサイズ: 5MB
  - 許可形式: JPEG, PNG, WebP

## 5. 開発環境

### 5.1 開発ツール
- **TypeScript**: 型安全性
- **ESLint**: コード品質管理
- **Prettier**: コードフォーマット
- **Husky**: Git hooks

### 5.2 パッケージマネージャー
- **pnpm**: 高速で効率的な依存関係管理

## 6. デプロイ・インフラ

### 6.1 ホスティング
- **Vercel**: 
  - 自動デプロイ（GitHub連携）
  - プレビュー環境
  - エッジ関数

### 6.2 環境変数
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Basic Auth
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=secure_password

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

## 7. パフォーマンス最適化

### 7.1 画像最適化
- Next.js Image Componentの使用
- WebP自動変換
- 遅延読み込み

### 7.2 キャッシュ戦略
- 静的ページのISR（Incremental Static Regeneration）
- 釣果データの適切なキャッシュ設定

## 8. 開発フロー

```bash
# 環境構築
pnpm create next-app@latest shokimaru-web --typescript --tailwind --app

# Supabaseクライアント
pnpm add @supabase/supabase-js

# UI関連
pnpm add @tanstack/react-query lucide-react

# 開発ツール
pnpm add -D @types/node eslint prettier
```

## 9. ディレクトリ構造

```
shokimaru-web/
├── app/
│   ├── (public)/          # 公開ページ
│   │   ├── page.tsx       # トップページ
│   │   ├── results/       # 釣果一覧
│   │   ├── pricing/       # 料金
│   │   ├── access/        # アクセス
│   │   └── faq/           # FAQ
│   ├── admin/             # 管理画面
│   │   └── results/       # 釣果管理
│   └── api/               # APIルート
├── components/            # 共通コンポーネント
├── lib/                   # ユーティリティ
│   ├── supabase/         # Supabaseクライアント
│   └── utils/            # ヘルパー関数
├── public/               # 静的ファイル
└── types/                # 型定義
```

## 10. 今後の技術的拡張

- **予約システム**: Stripe決済連携
- **LINE連携**: LINE Messaging API
- **プッシュ通知**: Web Push API
- **多言語対応**: next-i18next