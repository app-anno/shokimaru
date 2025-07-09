# マイグレーション実行手順

## image_urlカラム追加のマイグレーション

プラン画像機能を使用するには、以下のマイグレーションを実行する必要があります。

### 方法1: Supabaseダッシュボードから実行

1. Supabaseダッシュボードにログイン
2. 左側メニューから「SQL Editor」を選択
3. 以下のSQLを実行：

```sql
-- プランテーブルに画像URLカラムを追加
ALTER TABLE fishing_plans
ADD COLUMN image_url TEXT;

-- 既存のプランにデフォルト画像を設定（オプション）
UPDATE fishing_plans
SET image_url = '/api/placeholder/400/300'
WHERE image_url IS NULL;
```

### 方法2: Supabase CLIを使用（ローカル開発環境）

```bash
# Supabaseプロジェクトのディレクトリで実行
cd shokimaru-web

# マイグレーションを実行
supabase db push
```

### 確認方法

マイグレーション実行後、以下を確認してください：

1. Supabaseダッシュボードの「Table Editor」で`fishing_plans`テーブルを開く
2. `image_url`カラムが追加されていることを確認
3. 管理画面から画像アップロードが正常に動作することを確認

### トラブルシューティング

- **400エラーが継続する場合**: 
  - ブラウザのキャッシュをクリア
  - Supabaseのスキーマキャッシュをリフレッシュ（数分待つ）
  - アプリケーションを再起動

- **権限エラーが発生する場合**:
  - RLSポリシーが正しく設定されているか確認
  - `fishing-images`バケットのアクセス権限を確認