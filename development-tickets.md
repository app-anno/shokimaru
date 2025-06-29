# 翔葵丸 開発チケット一覧

## フェーズ1: 基盤構築（1-2日）

### 🎫 Ticket #1: プロジェクト初期設定
- Next.js 14 (App Router) のセットアップ
- TypeScript設定
- Tailwind CSS設定
- ESLint/Prettier設定
- 基本的なディレクトリ構造作成

### 🎫 Ticket #2: Supabase環境構築
- Supabaseプロジェクト作成
- データベーステーブル作成（fishing_results）
- Row Level Security (RLS) 設定
- Storage バケット作成（釣果画像用）
- 環境変数設定

### 🎫 Ticket #3: 共通コンポーネント作成
- ヘッダーコンポーネント（ナビゲーション）
- フッターコンポーネント
- レイアウトコンポーネント
- ボタンコンポーネント
- カードコンポーネント

## フェーズ2: 公開ページ開発（3-4日）

### 🎫 Ticket #4: トップページ実装
- ヒーローセクション（キャッチコピー、画像）
- 最新釣果表示セクション（3件）
- サービス紹介セクション
- 予約CTAセクション
- レスポンシブ対応

### 🎫 Ticket #5: 釣果一覧・詳細ページ
- 釣果一覧ページ（/results）
- ページネーション機能
- 釣果詳細ページ（/results/[id]）
- 画像表示の最適化
- Supabaseからのデータ取得

### 🎫 Ticket #6: 料金・サービスページ
- 料金表の実装
- レンタル品情報
- ご利用の流れ（ステップ表示）
- モバイル最適化

### 🎫 Ticket #7: アクセスページ
- Google Maps埋め込み
- 住所・連絡先情報
- アクセス方法の説明
- 駐車場情報（後日追加用のプレースホルダー）

### 🎫 Ticket #8: FAQ・お問い合わせページ
- FAQページ（アコーディオン形式）
- 初心者向けコンテンツ
- 予約・お問い合わせページ
- LINE/Instagram/電話のリンク設定

## フェーズ3: 管理機能開発（2-3日）

### 🎫 Ticket #9: 認証システム実装
- ベーシック認証のミドルウェア作成
- 管理画面レイアウト
- 認証エラーハンドリング
- セッション管理

### 🎫 Ticket #10: 釣果管理機能（一覧・削除）
- 管理画面の釣果一覧（/admin/results）
- 公開/非公開の切り替え機能
- 削除機能（確認ダイアログ付き）
- ソート・フィルター機能

### 🎫 Ticket #11: 釣果登録・編集機能
- 釣果登録フォーム（/admin/results/new）
- 画像アップロード機能
- バリデーション実装
- 釣果編集機能（/admin/results/[id]/edit）
- 成功/エラーメッセージ表示

## フェーズ4: 品質向上・最適化（1-2日）

### 🎫 Ticket #12: SEO・パフォーマンス最適化
- メタタグ設定（各ページ）
- OGP画像設定
- sitemap.xml生成
- 画像の遅延読み込み
- Lighthouse対応

### 🎫 Ticket #13: エラーハンドリング・UX改善
- 404ページ作成
- エラーページ作成
- ローディング状態の実装
- トースト通知の実装
- フォームのUX改善

### 🎫 Ticket #14: テスト・デバッグ
- 各種ブラウザでの動作確認
- モバイル実機テスト
- 画像アップロードのエッジケース対応
- データベースのバックアップ設定

## フェーズ5: デプロイ・運用準備（1日）

### 🎫 Ticket #15: 本番環境構築・デプロイ
- Vercelプロジェクト設定
- 環境変数の本番設定
- カスタムドメイン設定（あれば）
- デプロイ自動化設定
- 運用マニュアル作成

## 並行開発の推奨事項

### 2人で開発する場合の分担例

**開発者A（フロントエンド寄り）:**
- Ticket #1, #3, #4, #6, #7, #8, #12, #13

**開発者B（バックエンド寄り）:**
- Ticket #2, #5, #9, #10, #11, #14, #15

### 依存関係
```
#1 → #3 → #4～#8（並行可能）
#2 → #5, #9
#9 → #10, #11（並行可能）
#12～#14（最後に並行可能）
```

## 各チケットの見積もり時間
- 🔵 小（2-4時間）: #3, #6, #7, #8, #13
- 🟡 中（4-8時間）: #1, #2, #4, #5, #9, #12, #14
- 🔴 大（8時間以上）: #10, #11, #15

## 優先度
- **必須**: #1～#11, #15
- **推奨**: #12, #13, #14
- **オプション**: 将来的な機能拡張