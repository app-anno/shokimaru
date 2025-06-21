# 翔葵丸 - デプロイメントガイド

このドキュメントでは、翔葵丸のWebサイトを本番環境（Vercel）にデプロイする手順を説明します。

## 前提条件

- Vercelアカウント
- Supabaseプロジェクト（セットアップ済み）
- Google Maps APIキー（オプション）

## デプロイ手順

### 1. Vercelにプロジェクトをインポート

1. [Vercel](https://vercel.com)にログイン
2. 「New Project」をクリック
3. GitHubリポジトリを選択（または「Import Git Repository」）
4. 「shokimaru」リポジトリを選択

### 2. 環境変数の設定

Vercelのプロジェクト設定画面で以下の環境変数を設定します：

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `NEXT_PUBLIC_SITE_URL` | サイトのURL | `https://shokimaru.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトのURL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabaseの匿名キー | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabaseのサービスロールキー | `eyJhbGci...` |
| `BASIC_AUTH_USER` | 管理画面のユーザー名 | `admin` |
| `BASIC_AUTH_PASSWORD` | 管理画面のパスワード | `強力なパスワード` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps APIキー（オプション） | `AIza...` |

### 3. ビルド設定

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. デプロイ

1. 「Deploy」ボタンをクリック
2. ビルドログを確認
3. デプロイが完了したらURLにアクセスして動作確認

## デプロイ後の確認事項

### 必須確認項目

1. **トップページの表示**
   - ヒーローセクション
   - 最新釣果（Supabaseからのデータ取得）
   - レスポンシブデザイン

2. **管理画面のアクセス**
   - `/admin`にアクセス
   - Basic認証の動作確認
   - 釣果の追加・編集・削除

3. **画像アップロード**
   - 管理画面から画像をアップロード
   - Supabase Storageへの保存確認
   - 公開ページでの表示確認

4. **SEO設定**
   - `/sitemap.xml`の生成確認
   - `/robots.txt`の生成確認
   - メタタグの確認

### パフォーマンス確認

1. [PageSpeed Insights](https://pagespeed.web.dev/)でスコアを確認
2. 画像の遅延読み込みが機能しているか確認
3. モバイル表示の確認

## カスタムドメインの設定（オプション）

1. Vercelプロジェクトの「Settings」→「Domains」
2. 「Add」をクリックしてドメインを追加
3. DNSレコードの設定
   - Aレコード: `76.76.21.21`
   - CNAMEレコード: `cname.vercel-dns.com`

## トラブルシューティング

### ビルドエラーが発生する場合

1. 環境変数がすべて設定されているか確認
2. `npm install`と`npm run build`をローカルで実行して確認
3. Node.jsのバージョンを確認（18.x以上推奨）

### Supabaseの接続エラー

1. Supabaseプロジェクトが稼働中か確認
2. APIキーが正しく設定されているか確認
3. RLS（Row Level Security）の設定を確認

### 管理画面にアクセスできない

1. Basic認証の環境変数が設定されているか確認
2. ブラウザのキャッシュをクリア
3. プライベートブラウジングモードで試す

## 継続的デプロイ

GitHubのmainブランチにプッシュすると自動的にデプロイされます。

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境（Preview Deployment）
- `feature/*`: 機能開発（Preview Deployment）

## セキュリティに関する注意事項

1. **環境変数の管理**
   - 本番環境の環境変数は厳重に管理
   - サービスロールキーは絶対に公開しない

2. **Basic認証**
   - 強力なパスワードを使用
   - 定期的にパスワードを変更

3. **Supabase RLS**
   - Row Level Securityが有効になっていることを確認
   - 適切なポリシーが設定されていることを確認

## 運用開始後の作業

1. **Google Analytics/Tag Managerの設定**（必要に応じて）
2. **定期的なバックアップの設定**
3. **モニタリングの設定**（Vercel Analytics等）
4. **SSL証明書の確認**（Vercelが自動的に設定）

---

最終更新: 2025-06-21