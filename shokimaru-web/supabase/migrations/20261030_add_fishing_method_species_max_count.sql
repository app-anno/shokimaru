-- 釣果に釣法・魚種・最大枚数を追加
ALTER TABLE fishing_results
  ADD COLUMN fishing_method VARCHAR(50),
  ADD COLUMN fish_species VARCHAR(100),
  ADD COLUMN max_count INTEGER;
