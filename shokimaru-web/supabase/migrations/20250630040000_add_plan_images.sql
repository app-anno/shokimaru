-- プランテーブルに画像URLカラムを追加
ALTER TABLE fishing_plans
ADD COLUMN image_url TEXT;

-- 既存のプランにデフォルト画像を設定（オプション）
UPDATE fishing_plans
SET image_url = '/api/placeholder/400/300'
WHERE image_url IS NULL;