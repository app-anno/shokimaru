-- プラン別レンタル機材システムへの移行

-- 1. plan_rental_itemsテーブルに追加カラムを作成
ALTER TABLE plan_rental_items
ADD COLUMN IF NOT EXISTS custom_price INTEGER,
ADD COLUMN IF NOT EXISTS custom_description TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- コメント追加
COMMENT ON COLUMN plan_rental_items.custom_price IS 'プラン別のカスタム価格（NULLの場合はrental_itemsの価格を使用）';
COMMENT ON COLUMN plan_rental_items.custom_description IS 'プラン別のカスタム説明（NULLの場合はrental_itemsの説明を使用）';
COMMENT ON COLUMN plan_rental_items.is_active IS 'このプランでこのレンタル機材が利用可能かどうか';
COMMENT ON COLUMN plan_rental_items.display_order IS 'プラン内での表示順序';

-- 2. 既存のrental_itemsデータを各プランに紐付ける
-- （現在のプランに対して全てのレンタル機材を利用可能にする）
INSERT INTO plan_rental_items (plan_id, rental_item_id, is_included, is_active, display_order)
SELECT 
    p.id AS plan_id,
    r.id AS rental_item_id,
    false AS is_included,
    true AS is_active,
    r.display_order
FROM fishing_plans p
CROSS JOIN rental_items r
WHERE r.is_active = true
ON CONFLICT (plan_id, rental_item_id) DO UPDATE
SET 
    is_active = EXCLUDED.is_active,
    display_order = EXCLUDED.display_order;

-- 3. インデックスの追加
CREATE INDEX IF NOT EXISTS idx_plan_rental_items_active ON plan_rental_items(plan_id, is_active);
CREATE INDEX IF NOT EXISTS idx_plan_rental_items_display_order ON plan_rental_items(plan_id, display_order);

-- 4. RLSポリシーの追加
-- plan_rental_itemsの読み取りは全ユーザーに許可
CREATE POLICY "plan_rental_items読み取り許可" ON plan_rental_items
FOR SELECT USING (true);

-- plan_rental_itemsの更新は管理者のみ
CREATE POLICY "plan_rental_items更新許可" ON plan_rental_items
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);