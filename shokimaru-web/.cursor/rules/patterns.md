# 実装パターンとベストプラクティス

## 概要
このドキュメントは、翔葵丸プロジェクトで使用される効率的なコードパターンとベストプラクティスを記録します。

## コンポーネント設計パターン

### 1. コンポーネントの基本構造
```typescript
interface ComponentProps {
  // Props定義
}

export default function ComponentName({ props }: ComponentProps) {
  // コンポーネントロジック
  return (
    // JSX
  );
}
```

### 2. クライアントコンポーネントの使用
- インタラクティブな要素（useState、useEffect、イベントハンドラ）が必要な場合のみ使用
- ファイルの先頭に `"use client"` を記述

## Supabaseパターン

### 1. データ取得パターン
```typescript
// サーバーコンポーネントでの使用
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data, error } = await supabase
  .from("table_name")
  .select("*");
```

### 2. エラーハンドリング
```typescript
if (error) {
  console.error("Error description:", error);
  return defaultValue;
}
```

## スタイリングパターン

### 1. Tailwind CSSクラスの組織化
- 基本クラス → レイアウト → スペーシング → 色 → その他の順序で記述
- 条件付きクラスは別変数で管理

### 2. カスタムコンポーネントクラス
- `globals.css`の`@layer components`内で定義
- 再利用性の高いスタイルのみ定義

## 更新履歴
- 2024-01-20: 初回作成