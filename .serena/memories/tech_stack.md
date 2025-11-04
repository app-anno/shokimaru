# 技術スタック

## フロントエンド

### コアフレームワーク
- **Next.js 14.2.3** 
  - App Router使用
  - React Server Components有効
  - 自動コード分割
  - 組み込み画像最適化

- **React 18**
  - UIライブラリ
  - React DOMと組み合わせて使用

- **TypeScript 5**
  - strictモード有効
  - 型安全なJavaScript
  - パスエイリアス: @/* = ./src/*

### スタイリング
- **Tailwind CSS 3.4.1**
  - ユーティリティファーストCSS
  - カスタムカラーテーマ:
    - Primary: #4a8db5（落ち着いた青緑）
    - Secondary: #64acc8（明るい青緑）
    - Accent: #ff8c42（夕焼けオレンジ）
    - Ocean: #2e5f7a（深海ブルー）
  - カスタムアニメーション定義

## バックエンド & データベース

### Supabase
- **PostgreSQL データベース**
  - fishing_results テーブル（釣果情報）
  - Row Level Security (RLS)

- **Supabase Storage**
  - result-images バケット（釣果画像）
  - 公開読み取り、管理者書き込み
  - 最大ファイルサイズ: 5MB
  - 対応形式: JPEG, PNG, WebP

- **関連パッケージ**
  - @supabase/supabase-js 2.50.0（JavaScriptクライアント）
  - @supabase/ssr 0.6.1（SSRサポート）

## ホスティング & 分析

### Vercel
- **ホスティングプラットフォーム**
  - Tokyo リージョン (hnd1)
  - 自動デプロイ（GitHub連携）
  - サーバーレス関数対応

### 分析ツール
- **@vercel/analytics 1.5.0** - Web解析
- **@vercel/speed-insights 1.2.0** - パフォーマンス監視
- **Google Tag Manager** - GTM-54ND4J7C
- **Google Analytics 4** - 統合済み

## 開発ツール

### リンティング & フォーマット
- **ESLint 8**
  - next/core-web-vitals 設定使用
  - コード品質チェック

- **Prettier**
  - セミコロン: あり
  - シングルクォート: なし（ダブルクォート使用）
  - トレイリングコンマ: ES5
  - 1行の文字数: 80
  - タブ幅: 2スペース

### TypeScript コンパイラ
- **TypeScript 5**
  - 型チェック
  - strictモード
  - noEmit（ビルドはNext.jsが担当）

## 外部サービス

### 認証
- **ベーシック認証**（管理画面用）
  - ADMIN_PASSWORD環境変数で管理
  - middleware.tsで実装

## システム要件

- **Node.js**: 20+
- **npm**: 最新版（または pnpm）
- **OS**: macOS (Darwin 24.5.0)
- **Git**: バージョン管理
