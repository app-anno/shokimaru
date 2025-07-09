# Supabase Storage Setup for Plan Images

## 画像アップロード機能のセットアップ

プラン画像は既存の `fishing-images` バケットを使用します。

### 既存の設定

すでに釣果投稿で使用している `fishing-images` バケットがあるため、新しいバケットを作成する必要はありません。プラン画像も同じバケットにアップロードされます。

### 確認手順

1. **Supabaseダッシュボードにアクセス**
   - プロジェクトのダッシュボードを開く
   - 左側のメニューから「Storage」を選択

2. **既存のバケットを確認**
   - `fishing-images` バケットが存在することを確認
   - Public bucket: ON になっていることを確認
   - File size limit: 適切に設定されていることを確認

3. **RLSポリシーの設定**
   バケット作成後、以下のポリシーを設定：
   
   - **Select (読み取り)**: 全員に許可
   - **Insert (アップロード)**: 全員に許可
   - **Update (更新)**: 全員に許可
   - **Delete (削除)**: 認証済みユーザーのみ

### 代替方法: SQLでの設定

Supabaseのダッシュボードで「SQL Editor」を開き、以下のSQLを実行：

```sql
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the images bucket
CREATE POLICY "Images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images' AND auth.role() = 'authenticated');
```

### トラブルシューティング

- **400エラーが出る場合**: バケットが存在しない可能性があります。上記の手順でバケットを作成してください。
- **Permission deniedエラー**: RLSポリシーが正しく設定されていない可能性があります。ポリシーを確認してください。
- **File too largeエラー**: ファイルサイズが10MBを超えています。画像を圧縮してください。

## 注意事項

- 本番環境では、適切な認証とアクセス制御を設定することを推奨します
- 画像は自動的に最適化されません。必要に応じてクライアント側で圧縮してください
- バケット名は変更できないため、慎重に選択してください