# 依存関係とAPI使用例

## 概要
このドキュメントは、プロジェクトで使用する外部ライブラリとAPIの使用方法を記録します。

## 主要な依存関係

### Next.js 14
- **バージョン**: 14.2.3
- **App Router**を使用
- **Server Components**がデフォルト

### Supabase
- **@supabase/supabase-js**: ^2.50.0
- **@supabase/ssr**: ^0.6.1

#### 基本的な使用方法
```typescript
// クライアントサイド
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// サーバーサイド
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();
```

### Tailwind CSS
- **バージョン**: ^3.4.1
- **設定ファイル**: `tailwind.config.ts`
- **カスタムカラー**: primary, secondary, background, foreground

### TypeScript
- **バージョン**: ^5
- **設定**: strictモード有効
- **パスエイリアス**: `@/*` → `./src/*`

## API使用例

### Supabase Database API
```typescript
// SELECT
const { data, error } = await supabase
  .from('fishing_results')
  .select('*')
  .eq('is_public', true)
  .order('date', { ascending: false });

// INSERT
const { data, error } = await supabase
  .from('fishing_results')
  .insert({
    date: '2024-01-20',
    catch_count: 10,
    weather: '晴れ'
  });

// UPDATE
const { data, error } = await supabase
  .from('fishing_results')
  .update({ catch_count: 15 })
  .eq('id', 'uuid-here');

// DELETE
const { error } = await supabase
  .from('fishing_results')
  .delete()
  .eq('id', 'uuid-here');
```

### Supabase Storage API
```typescript
// アップロード
const { data, error } = await supabase.storage
  .from('fishing-images')
  .upload('file-path', file);

// URL取得
const { data } = supabase.storage
  .from('fishing-images')
  .getPublicUrl('file-path');

// 削除
const { error } = await supabase.storage
  .from('fishing-images')
  .remove(['file-path']);
```

## パッケージ管理

### npm scripts
- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番ビルド
- `npm run start`: 本番サーバー起動
- `npm run lint`: ESLintチェック
- `npm run setup`: 環境変数セットアップ

## 更新履歴
- 2024-01-20: 初回作成