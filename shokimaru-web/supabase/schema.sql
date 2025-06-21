-- 釣果情報テーブル
CREATE TABLE fishing_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  weather VARCHAR(50),
  moon_age INTEGER, -- 月齢（0-29）
  tide_type VARCHAR(20), -- 潮の種類（大潮、中潮、小潮、長潮、若潮）
  catch_count INTEGER NOT NULL,
  size VARCHAR(100),
  image_url TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 管理者テーブル（将来的な拡張用）
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) を有効化
ALTER TABLE fishing_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 釣果情報の公開データは誰でも閲覧可能
CREATE POLICY "Public fishing results are viewable by everyone"
  ON fishing_results FOR SELECT
  USING (is_public = true);

-- 釣果情報の作成・更新・削除は認証不要（ベーシック認証で制御）
CREATE POLICY "Anyone can insert fishing results"
  ON fishing_results FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update fishing results"
  ON fishing_results FOR UPDATE
  WITH CHECK (true);

CREATE POLICY "Anyone can delete fishing results"
  ON fishing_results FOR DELETE
  USING (true);

-- 更新日時を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_fishing_results_updated_at BEFORE UPDATE
  ON fishing_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();