-- 釣果の追加画像を保存するテーブル
CREATE TABLE fishing_result_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fishing_result_id UUID NOT NULL REFERENCES fishing_results(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックスを作成
CREATE INDEX idx_fishing_result_images_result_id ON fishing_result_images(fishing_result_id);
CREATE INDEX idx_fishing_result_images_order ON fishing_result_images(fishing_result_id, display_order);

-- RLSポリシーを設定
ALTER TABLE fishing_result_images ENABLE ROW LEVEL SECURITY;

-- 誰でも閲覧可能
CREATE POLICY "公開されている釣果の画像は誰でも閲覧可能"
  ON fishing_result_images
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM fishing_results
      WHERE fishing_results.id = fishing_result_images.fishing_result_id
      AND fishing_results.is_public = true
    )
  );

-- 認証されたユーザーのみ作成・更新・削除可能
CREATE POLICY "認証されたユーザーのみ画像を管理可能"
  ON fishing_result_images
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');