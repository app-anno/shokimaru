-- 開発環境用: RLSポリシーを一時的に緩和
-- 本番環境では適切な認証システムに合わせて調整が必要

-- fishing_plansテーブルのポリシーを削除して再作成
DROP POLICY IF EXISTS "誰でもプランを読み取り可能" ON fishing_plans;
DROP POLICY IF EXISTS "管理者のみプランを作成可能" ON fishing_plans;
DROP POLICY IF EXISTS "管理者のみプランを更新可能" ON fishing_plans;
DROP POLICY IF EXISTS "管理者のみプランを削除可能" ON fishing_plans;

-- 一時的に全操作を許可（開発用）
CREATE POLICY "開発用_全操作許可" ON fishing_plans
FOR ALL USING (true) WITH CHECK (true);

-- reservation_slotsテーブルも同様に
DROP POLICY IF EXISTS "誰でも予約枠を読み取り可能" ON reservation_slots;
DROP POLICY IF EXISTS "管理者のみ予約枠を作成可能" ON reservation_slots;
DROP POLICY IF EXISTS "管理者のみ予約枠を更新可能" ON reservation_slots;
DROP POLICY IF EXISTS "管理者のみ予約枠を削除可能" ON reservation_slots;

CREATE POLICY "開発用_全操作許可" ON reservation_slots
FOR ALL USING (true) WITH CHECK (true);

-- rental_itemsテーブルも同様に
DROP POLICY IF EXISTS "誰でもレンタル機材を読み取り可能" ON rental_items;
DROP POLICY IF EXISTS "管理者のみレンタル機材を管理可能" ON rental_items;

CREATE POLICY "開発用_全操作許可" ON rental_items
FOR ALL USING (true) WITH CHECK (true);

-- plan_rental_itemsテーブルも同様に
DROP POLICY IF EXISTS "誰でもプランレンタル機材を読み取り可能" ON plan_rental_items;
DROP POLICY IF EXISTS "管理者のみプランレンタル機材を管理可能" ON plan_rental_items;

CREATE POLICY "開発用_全操作許可" ON plan_rental_items
FOR ALL USING (true) WITH CHECK (true);

-- 注意: 本番環境では以下のような適切なRLSポリシーに置き換える必要があります
-- 1. Supabase Authを使用する場合: auth.uid()を使用
-- 2. カスタム認証を使用する場合: JWTクレームまたはセッション管理
-- 3. サービスロールキーを使用する場合: 管理画面のAPIルートで処理