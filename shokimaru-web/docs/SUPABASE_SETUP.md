# Supabase セットアップガイド

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン
4. 「New project」をクリック
5. 以下の情報を入力：
   - Project name: `shokimaru`
   - Database Password: 強力なパスワードを生成cdsadjksandkjasndk
   - Region: `Northeast Asia (Tokyo)`を選択
6. 「Create new project」をクリック

## 2. データベースのセットアップ

プロジェクトが作成されたら、SQL Editorで以下を実行：

1. 左メニューから「SQL Editor」を選択
2. 「New query」をクリック
3. `supabase/schema.sql`の内容を全てコピー＆ペースト
4. 「Run」をクリック

### 実行するSQL:

```sql
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
```

## 3. Storageの設定

1. 左メニューから「Storage」を選択
2. 「New bucket」をクリック
3. 以下の設定で作成：
   - Name: `fishing-images`
   - Public bucket: ONにする（チェック）
4. 「Create bucket」をクリック

### CORS設定（必要に応じて）

Storage > Configuration > CORS configurationで以下を設定：

```json
[
  {
    "origin": ["*"],
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "headers": ["*"],
    "maxAge": 3600
  }
]
```

## 4. 環境変数の取得

1. 左メニューから「Settings」→「API」を選択
2. 以下の値をコピー：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

3. `.env.local`ファイルに貼り付け

## 5. 動作確認

### テストデータの投入（オプション）

SQL Editorで以下を実行してテストデータを作成：

```sql
INSERT INTO fishing_results (date, weather, moon_age, tide_type, catch_count, size, is_public)
VALUES 
  ('2024-06-20', '晴れ', 15, '大潮', 12, '20-30cm', true),
  ('2024-06-21', '曇り', 16, '大潮', 15, '25-35cm', true),
  ('2024-06-22', '晴れ', 17, '中潮', 8, '20-25cm', true);
```

### データベースの確認

1. 左メニューから「Table Editor」を選択
2. `fishing_results`テーブルを選択
3. データが表示されることを確認

## トラブルシューティング

### RLSエラーが出る場合

```sql
-- 一時的にRLSを無効化（開発時のみ）
ALTER TABLE fishing_results DISABLE ROW LEVEL SECURITY;
```

### 画像アップロードができない場合

1. Storage → Policies でポリシーを確認
2. 必要に応じて以下のポリシーを追加：

```sql
-- Storage オブジェクトポリシー
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'fishing-images');

CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'fishing-images');
```