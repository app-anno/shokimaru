# Claude Code プロジェクトガイド - 翔葵丸

このドキュメントは、Claude Codeがこのプロジェクトで作業する際の基本原則とドキュメント管理システムについて記載しています。

<language>Japanese</language>
<every_chat>
[AI運用5原則]

[main_output]

#[n] times. # n = increment each chat, end line, etc(#1, #2...)
</every_chat>

## 🎯 ユーザーとのやり取りの基本原則

### 明確な理解
ユーザーの意図を正確に理解し、疑問点があれば具体的に質問してください。

### 詳細な説明
コードの目的、機能、使用方法など、必要な情報を詳細に説明してください。

### エラーハンドリング
エラーが発生した場合は、その原因と解決策を明確に提示してください。

### 参照すべきドキュメント

作業開始時に必ず以下のドキュメントを確認してください：

- `README.md` - プロジェクト概要とセットアップ手順
- `docs/SUPABASE_SETUP.md` - Supabaseセットアップの詳細ガイド
- `development-tickets.md` - 開発チケット一覧と進捗管理
- `requirements.md` - 要件定義書
- `tech-stack.md` - 技術スタック設計書
- `sitemap.md` - サイトマップと画面構成

### 既存ドキュメントとの連携

- 既存の記載形式やスタイルを踏襲すること
- 関連する既存内容がある場合は参照を明記すること
- 日付（YYYY-MM-DD形式）を含めて更新履歴を残すこと

### 重要な制約

1. **機密情報（APIキー、パスワード等）は記録しない**
2. **プロジェクトの慣習やスタイルガイドに従う**

## 🚢 プロジェクト固有の情報

### プロジェクト概要
- **名称**: 翔葵丸（しょうきまる）
- **内容**: 萩湾でイカ釣り体験ができる釣り船のWebサイト
- **ターゲット**: 初心者・女性を中心とした釣り客
- **バージョン**: 0.1.0
- **更新日**: 2025-08-19

### 主な機能
- 釣果情報の表示・管理（月齢・潮の状態含む）
- レスポンシブデザイン（スマホ対応）
- 管理画面（ベーシック認証）
- 画像アップロード機能

### 開発環境
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase（PostgreSQL + Storage）
- Vercel（ホスティング）

### 開発コマンド
```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLintチェック
npm run setup    # 環境変数のセットアップ
```

### 主な依存関係
- **@supabase/ssr**: ^0.6.1 - Supabase SSR対応
- **@supabase/supabase-js**: ^2.50.0 - Supabase JavaScriptクライアント
- **@vercel/analytics**: ^1.5.0 - Vercel Analytics
- **@vercel/speed-insights**: ^1.2.0 - Vercel Speed Insights
- **next**: 14.2.3 - Next.jsフレームワーク
- **react**: ^18 - Reactライブラリ
- **react-dom**: ^18 - React DOM

### プロジェクト構造
```
shokimaru-web/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── admin/         # 管理画面
│   │   ├── api/           # APIルート
│   │   └── ...            # 各ページ
│   ├── components/        # 共通コンポーネント
│   │   └── admin/         # 管理画面用コンポーネント
│   ├── lib/               # ユーティリティ
│   │   ├── supabase/      # Supabase関連
│   │   ├── constants/     # 定数定義
│   │   └── hooks/         # カスタムフック
│   └── types/             # TypeScript型定義
├── public/                # 静的ファイル
├── docs/                  # ドキュメント
├── scripts/               # スクリプト
└── supabase/              # Supabaseマイグレーション
```

### 設定ファイル
- **next.config.mjs**: Next.js設定（画像最適化設定含む）
- **tsconfig.json**: TypeScript設定（strictモード有効）
- **tailwind.config.ts**: Tailwindカスタマイズ（カラーテーマ、アニメーション定義）
- **vercel.json**: Vercelデプロイ設定（東京リージョン、API関数設定）

### カラーテーマ
- Primary: #4a8db5 (落ち着いた青緑 - メインカラー)
- Secondary: #64acc8 (明るい青緑 - サブカラー)
- Accent: #ff8c42 (夕焼けオレンジ - アクセント)
- Ocean: #2e5f7a (深海ブルー)
- Background: #f8fafb (薄いグレー)
- Text: #1e2936 (濃いグレー)

### ページ構成
- **/**：トップページ（ヒーローセクション、サービス紹介）
- **/results**：釣果情報一覧
- **/guide**：初心者ガイド
- **/pricing**：料金プラン
- **/access**：アクセス情報
- **/sightseeing**：周辺観光情報
- **/faq**：よくある質問
- **/contact**：お問い合わせ
- **/admin**：管理画面（ベーシック認証付き）
- **/privacy**：プライバシーポリシー

### 重要なコンポーネント
- **AnimatedSection**: スクロールアニメーション
- **AnimatedBackground**: 背景アニメーション
- **FloatingElements**: 浮遊要素アニメーション
- **MobileBottomBar**: モバイル用固定ボトムバー
- **MoonPhase**: 月齢表示
- **ImageCarousel**: 画像カルーセル
- **WaveAnimation**: 波アニメーション
- **SquidAnimation**: イカアニメーション

### Supabase関連
- **テーブル**: fishing_results（釣果情報）
- **ストレージ**: result-images（釣果画像）
- **認証**: 管理画面用のベーシック認証

### 環境変数
```
NEXT_PUBLIC_SUPABASE_URL=<Supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase Anonymous Key>
ADMIN_PASSWORD=<管理画面パスワード>
```

### デプロイ情報
- **ホスティング**: Vercel
- **リージョン**: 東京（hnd1）
- **ビルドコマンド**: npm run build
- **API関数の最大実行時間**: 30秒