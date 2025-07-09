-- RLSポリシーの追加（予約関連テーブル）

-- 1. fishing_plansテーブルのRLS有効化とポリシー設定
ALTER TABLE fishing_plans ENABLE ROW LEVEL SECURITY;

-- 読み取りは全ユーザーに許可（公開情報）
CREATE POLICY "誰でもプランを読み取り可能" ON fishing_plans
FOR SELECT USING (true);

-- 作成・更新・削除は管理者のみ
CREATE POLICY "管理者のみプランを作成可能" ON fishing_plans
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみプランを更新可能" ON fishing_plans
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみプランを削除可能" ON fishing_plans
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 2. reservation_slotsテーブルのRLS有効化とポリシー設定
ALTER TABLE reservation_slots ENABLE ROW LEVEL SECURITY;

-- 読み取りは全ユーザーに許可
CREATE POLICY "誰でも予約枠を読み取り可能" ON reservation_slots
FOR SELECT USING (true);

-- 作成・更新・削除は管理者のみ
CREATE POLICY "管理者のみ予約枠を作成可能" ON reservation_slots
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみ予約枠を更新可能" ON reservation_slots
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみ予約枠を削除可能" ON reservation_slots
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 3. reservationsテーブルのRLS有効化とポリシー設定
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- 誰でも予約を作成可能
CREATE POLICY "誰でも予約を作成可能" ON reservations
FOR INSERT WITH CHECK (true);

-- 読み取りは管理者のみ（個人情報保護）
CREATE POLICY "管理者のみ予約を読み取り可能" ON reservations
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 更新・削除は管理者のみ
CREATE POLICY "管理者のみ予約を更新可能" ON reservations
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみ予約を削除可能" ON reservations
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 4. reservation_optionsテーブルのRLS有効化とポリシー設定
ALTER TABLE reservation_options ENABLE ROW LEVEL SECURITY;

-- 読み取りは全ユーザーに許可
CREATE POLICY "誰でもオプションを読み取り可能" ON reservation_options
FOR SELECT USING (true);

-- 作成・更新・削除は管理者のみ
CREATE POLICY "管理者のみオプションを管理可能" ON reservation_options
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 5. reservation_option_itemsテーブルのRLS有効化とポリシー設定
ALTER TABLE reservation_option_items ENABLE ROW LEVEL SECURITY;

-- 誰でも作成可能（予約時に必要）
CREATE POLICY "誰でもオプションアイテムを作成可能" ON reservation_option_items
FOR INSERT WITH CHECK (true);

-- 読み取り・更新・削除は管理者のみ
CREATE POLICY "管理者のみオプションアイテムを管理可能" ON reservation_option_items
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみオプションアイテムを更新可能" ON reservation_option_items
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみオプションアイテムを削除可能" ON reservation_option_items
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 6. rental_itemsテーブルのRLS有効化とポリシー設定
ALTER TABLE rental_items ENABLE ROW LEVEL SECURITY;

-- 読み取りは全ユーザーに許可
CREATE POLICY "誰でもレンタル機材を読み取り可能" ON rental_items
FOR SELECT USING (true);

-- 作成・更新・削除は管理者のみ
CREATE POLICY "管理者のみレンタル機材を管理可能" ON rental_items
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 7. plan_rental_itemsテーブルのRLS有効化とポリシー設定
ALTER TABLE plan_rental_items ENABLE ROW LEVEL SECURITY;

-- 既存のポリシーを削除（重複を避けるため）
DROP POLICY IF EXISTS "plan_rental_items読み取り許可" ON plan_rental_items;
DROP POLICY IF EXISTS "plan_rental_items更新許可" ON plan_rental_items;

-- 読み取りは全ユーザーに許可
CREATE POLICY "誰でもプランレンタル機材を読み取り可能" ON plan_rental_items
FOR SELECT USING (true);

-- 作成・更新・削除は管理者のみ
CREATE POLICY "管理者のみプランレンタル機材を管理可能" ON plan_rental_items
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

-- 8. reservation_rental_itemsテーブルのRLS有効化とポリシー設定
ALTER TABLE reservation_rental_items ENABLE ROW LEVEL SECURITY;

-- 誰でも作成可能（予約時に必要）
CREATE POLICY "誰でも予約レンタル機材を作成可能" ON reservation_rental_items
FOR INSERT WITH CHECK (true);

-- 読み取り・更新・削除は管理者のみ
CREATE POLICY "管理者のみ予約レンタル機材を管理可能" ON reservation_rental_items
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみ予約レンタル機材を更新可能" ON reservation_rental_items
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);

CREATE POLICY "管理者のみ予約レンタル機材を削除可能" ON reservation_rental_items
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM admins
        WHERE admins.username = current_setting('request.jwt.claims', true)::json->>'email'
    )
);