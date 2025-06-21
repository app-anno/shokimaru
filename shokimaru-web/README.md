# 翔葵丸（しょうきまる）ホームページ

萩湾でイカ釣り体験ができる釣り船「翔葵丸」のホームページです。

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **バックエンド**: Supabase (PostgreSQL, Storage)
- **ホスティング**: Vercel

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` を `.env.local` にコピーして、必要な値を設定してください。

```bash
cp .env.local.example .env.local
```

必要な環境変数：
- `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
- `SUPABASE_SERVICE_ROLE_KEY`: Supabaseのサービスロールキー
- `BASIC_AUTH_USER`: 管理画面のユーザー名
- `BASIC_AUTH_PASSWORD`: 管理画面のパスワード
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps APIキー

### 3. Supabaseのセットアップ

1. [Supabase](https://supabase.com) でプロジェクトを作成
2. SQL Editorで `supabase/schema.sql` の内容を実行
3. Storageで `fishing-images` バケットを作成（公開設定）

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## ディレクトリ構造

```
shokimaru-web/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # 共通コンポーネント
│   ├── lib/             # ユーティリティ
│   │   └── supabase/    # Supabaseクライアント
│   └── types/           # TypeScript型定義
├── public/              # 静的ファイル
└── supabase/           # データベーススキーマ
```

## 主な機能

- 釣果情報の表示・管理
- レスポンシブデザイン（スマホ対応）
- 管理画面（ベーシック認証）
- 画像アップロード機能

## デプロイ

Vercelにデプロイする場合：

1. GitHubにリポジトリをプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定
4. デプロイ