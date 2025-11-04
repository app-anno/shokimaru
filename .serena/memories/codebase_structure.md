# コードベース構造

## プロジェクトルート

```
/Users/anno/Downloads/shokimaru/
├── shokimaru-web/          # メインWebアプリケーション
├── app/                    # 別のアプリケーション（未使用？）
├── .serena/                # Serena MCPデータ
├── .claude/                # Claude Code設定
├── requirements.md         # 要件定義書
├── tech-stack.md          # 技術スタック文書
├── development-tickets.md # 開発タスク
├── sitemap.md             # サイト構造
└── CLAUDE.md              # プロジェクト全体のガイド
```

## メインアプリケーション構造 (shokimaru-web/)

### トップレベル

```
shokimaru-web/
├── src/                   # ソースコード（メイン）
├── public/                # 静的アセット（画像、アイコン）
├── docs/                  # ドキュメント
├── scripts/               # ユーティリティスクリプト
├── supabase/              # Supabase設定
│   └── migrations/        # データベースマイグレーション
├── next.config.mjs        # Next.js設定
├── tailwind.config.ts     # Tailwind CSS設定
├── tsconfig.json          # TypeScript設定
├── vercel.json            # Vercelデプロイ設定
├── package.json           # 依存関係とスクリプト
├── .eslintrc.json         # ESLint設定
├── .prettierrc            # Prettier設定
└── .env.local             # 環境変数（gitignore）
```

## srcディレクトリ構造

### app/ - Next.js App Router

```
src/app/
├── page.tsx               # ホームページ
├── layout.tsx             # ルートレイアウト
├── globals.css            # グローバルスタイル
├── loading.tsx            # ローディング状態
├── error.tsx              # エラーページ
├── not-found.tsx          # 404ページ
├── sitemap.ts             # 動的サイトマップ生成
├── robots.ts              # robots.txt設定
│
├── admin/                 # 管理画面（ベーシック認証保護）
│   ├── page.tsx          # 管理ダッシュボード
│   ├── layout.tsx        # 管理レイアウト
│   ├── error.tsx         # 管理エラーページ
│   └── results/          # 釣果管理
│       ├── page.tsx      # 釣果一覧
│       ├── new/          # 新規釣果作成
│       ├── [id]/         # 釣果詳細
│       │   └── edit/     # 釣果編集
│       ├── FishingResultForm.tsx      # 釣果フォーム
│       ├── DeleteButton.tsx           # 削除ボタン
│       └── TogglePublicButton.tsx     # 公開/非公開トグル
│
├── results/               # 公開釣果ページ
│   ├── page.tsx          # 釣果一覧
│   └── [id]/             # 釣果詳細
│       ├── page.tsx
│       └── not-found.tsx
│
├── guide/                 # 初心者ガイド
│   └── page.tsx
├── pricing/               # 料金プラン
│   └── page.tsx
├── access/                # アクセス情報
│   └── page.tsx
├── sightseeing/           # 周辺観光情報
│   └── page.tsx
├── faq/                   # よくある質問
│   ├── page.tsx
│   └── layout.tsx
├── contact/               # お問い合わせ
│   └── page.tsx
├── privacy/               # プライバシーポリシー
│   └── page.tsx
│
└── api/                   # APIルート
    └── upload/            # 画像アップロードAPI
        └── route.ts
```

### components/ - 再利用可能なコンポーネント

```
src/components/
├── Layout.tsx                  # ページレイアウト
├── Header.tsx                  # ヘッダーナビゲーション
├── Footer.tsx                  # フッター
├── MobileBottomBar.tsx         # モバイル固定ボトムバー
│
├── AnimatedSection.tsx         # スクロールアニメーション
├── AnimatedBackground.tsx      # 背景アニメーション
├── AnimatedButton.tsx          # ボタンアニメーション
├── FloatingElements.tsx        # 浮遊要素
├── WaveAnimation.tsx           # 波アニメーション
├── SquidAnimation.tsx          # イカアニメーション
├── ParallaxSection.tsx         # パララックス効果
│
├── MoonPhase.tsx               # 月齢表示
├── ImageCarousel.tsx           # 画像カルーセル
├── StructuredData.tsx          # JSON-LD構造化データ
├── GoogleTagManager.tsx        # GTM統合
├── GoogleAnalytics.tsx         # GA4統合
│
├── Button.tsx                  # ボタンコンポーネント
├── Card.tsx                    # カードコンテナ
├── LoadingButton.tsx           # ローディング付きボタン
├── LoadingSpinner.tsx          # ローディングインジケータ
├── Toast.tsx                   # トースト通知
├── OptimizedImage.tsx          # 最適化画像コンポーネント
│
└── admin/                      # 管理画面専用
    └── MultiImageUpload.tsx    # 複数画像アップロード
```

### lib/ - ユーティリティとヘルパー

```
src/lib/
├── utils.ts                    # 汎用ユーティリティ関数
├── auth.ts                     # 認証ヘルパー
│
├── supabase/                   # Supabase関連
│   ├── client.ts              # クライアント側Supabase
│   ├── server.ts              # サーバー側Supabase
│   ├── admin-client.ts        # 管理者用クライアント
│   ├── storage.ts             # ストレージ操作
│   ├── storage-client.ts      # ストレージクライアント
│   └── fishing-results.ts     # 釣果データ操作
│
├── constants/                  # 定数定義
│   └── fishing.ts             # 釣り関連定数
│
└── hooks/                      # カスタムフック
    └── useToast.tsx           # トースト通知フック
```

### types/ - TypeScript型定義

```
src/types/
└── database.ts                 # Supabase生成型定義
```

### middleware.ts

```
src/middleware.ts               # Next.jsミドルウェア（認証など）
```

## 主要な設定ファイル

### Next.js設定 (next.config.mjs)
- 画像最適化設定
- Supabaseドメイン許可
- ビルド設定

### Tailwind設定 (tailwind.config.ts)
- カスタムカラーテーマ
- カスタムアニメーション
- フォント設定

### TypeScript設定 (tsconfig.json)
- strictモード有効
- パスエイリアス: @/* = ./src/*
- Next.js統合

### Vercel設定 (vercel.json)
- 東京リージョン（hnd1）
- API関数の最大実行時間: 30秒
- ビルド設定

## データベーススキーマ

### fishing_results テーブル
```sql
- id: UUID (Primary Key)
- date: DATE (釣果日)
- weather: VARCHAR(50) (天候)
- catch_count: INTEGER (釣果数)
- size: VARCHAR(100) (サイズ情報)
- image_url: TEXT (画像URL)
- is_public: BOOLEAN (公開状態)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### result-images ストレージバケット
- 公開読み取り
- 管理者書き込み
- 対応形式: JPEG, PNG, WebP
- 最大サイズ: 5MB

## 重要なディレクトリの役割

### 公開ページ (src/app/)
- ユーザー向けのすべてのページ
- SEO最適化済み
- レスポンシブデザイン

### 管理画面 (src/app/admin/)
- ベーシック認証で保護
- 釣果情報のCRUD操作
- 画像アップロード機能

### コンポーネント (src/components/)
- 再利用可能なUIコンポーネント
- アニメーション効果
- レイアウト要素

### ライブラリ (src/lib/)
- ビジネスロジック
- データアクセス層
- ユーティリティ関数

## エントリーポイント

### 開発サーバー
- `npm run dev` → Next.js開発サーバー起動
- ポート: 3000
- ホットリロード有効

### プロダクション
- `npm run build` → 最適化ビルド
- `npm run start` → プロダクションサーバー起動
- Vercel自動デプロイ（mainブランチpush時）
