# コーディングスタイルと規約

## TypeScript

### 基本設定
- **strictモード有効**: すべてのTypeScript厳格チェックがオン
- **No implicit any**: 常に型を明示的に指定
- **型定義**: 共有型は `src/types/` に保存
- **パスエイリアス**: `@/*` を使用（例: `import { Button } from '@/components/Button'`）

### ファイル命名規則
- **コンポーネント**: PascalCase（例: `Button.tsx`, `MoonPhase.tsx`）
- **ユーティリティ**: kebab-case（例: `date-utils.ts`）
- **ルート**: Next.js規約（`page.tsx`, `layout.tsx`, `route.ts`）

## React & Next.js

### コンポーネント
- **デフォルトはServer Components**: インタラクティビティが必要な場合のみClient Components
- **Client Components**: 必要な場合のみ `'use client'` ディレクティブを追加
- **非同期処理**: Server Componentsでのデータフェッチには async/await を使用
- **エラー処理**: error.tsx でエラー境界を実装
- **ローディング状態**: loading.tsx でローディング状態を実装

### コンポーネント構造
```typescript
// インポート
import { ReactNode } from 'react';

// 型定義
interface ComponentProps {
  children?: ReactNode;
  className?: string;
}

// コンポーネント本体（export default function を使用）
export default function Component({ 
  children, 
  className = "" 
}: ComponentProps) {
  // 実装
}
```

### デフォルトパラメータ
- デフォルト値を持つプロパティには、関数パラメータで直接デフォルト値を指定

## スタイリング

### Tailwind CSS のみ使用
- **カスタムCSS禁止**: globals.css 以外でカスタムCSSは使用しない
- **カラーテーマ**: tailwind.config.ts で定義された色を使用
  - primary: 青緑系
  - secondary: 明るい青緑
  - accent: オレンジ系
  - ocean: 深海ブルー

### レスポンシブデザイン
- **モバイルファースト**: モバイル向けにデザインし、ブレークポイントを追加
- **全画面サイズでテスト**: すべてのデバイスサイズでテスト必須

### クラス名の組み立て
```typescript
const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
```

## コード組織

### コンポーネントサイズ
- **小さなコンポーネント**: コンポーネントは単一責任で焦点を絞る
- **カスタムフック**: 再利用可能なロジックは `lib/hooks/` に抽出
- **定数**: `lib/constants/` に保存
- **ユーティリティ関数**: `lib/` に適切な名前で配置

### ディレクトリ構造
```
src/
├── app/              # Next.js App Router（ページ & ルート）
├── components/       # 再利用可能なコンポーネント
│   └── admin/       # 管理画面専用コンポーネント
├── lib/             # ユーティリティとヘルパー
│   ├── constants/   # 定数定義
│   ├── hooks/       # カスタムフック
│   └── supabase/    # Supabase関連
└── types/           # TypeScript型定義
```

## Prettier 設定

```json
{
  "semi": true,                    // セミコロン必須
  "trailingComma": "es5",         // ES5スタイルのトレイリングコンマ
  "singleQuote": false,           // ダブルクォート使用
  "printWidth": 80,               // 1行80文字
  "tabWidth": 2                   // 2スペースインデント
}
```

## ESLint 設定

- **next/core-web-vitals**: Next.jsの標準設定を使用
- パフォーマンスとアクセシビリティのベストプラクティスを強制

## 言語とコンテンツ

### ユーザー向けコンテンツ
- **すべて日本語**: ユーザー向けコンテンツは必ず日本語
- **自然な日本語**: 初心者にも分かりやすい自然な日本語を使用
- **技術用語を避ける**: 過度に専門的な釣り用語は避ける

### コード内コメント
- **英語または日本語**: コメントは英語または日本語で記述可能
- **明確で簡潔**: 必要な場合のみコメントを追加

## ベストプラクティス

1. **ファイルを読まない**: 必要がない限り、ファイル全体を読まない
2. **シンボルツールを使用**: コード理解には概要ツールとシンボル検索ツールを優先
3. **小さな変更**: 大きな変更は小さなステップに分解
4. **後方互換性**: 既存のコードを変更する際は、後方互換性を保つか、すべての参照を更新
5. **セキュリティ**: XSS、SQLインジェクション、コマンドインジェクションなどの脆弱性に注意
