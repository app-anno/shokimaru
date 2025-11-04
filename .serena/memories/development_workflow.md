# 開発ワークフローとベストプラクティス

## 新機能開発のワークフロー

### 1. 要件理解

1. **ユーザーの意図を正確に理解**
   - 不明点があれば質問する
   - 仕様の詳細を確認
   - エッジケースを考慮

2. **関連ドキュメントの確認**
   - requirements.md
   - tech-stack.md
   - development-tickets.md
   - CLAUDE.md

### 2. 計画

1. **タスクを小さなステップに分解**
   - TodoWriteツールで計画を作成
   - 各ステップを明確に定義
   - 依存関係を把握

2. **影響範囲の確認**
   - 変更が必要なファイルを特定
   - 関連するコンポーネントを確認
   - データベーススキーマの変更有無

### 3. 実装

#### コード検索と理解

**Serenaツールを優先使用**:

1. **ディレクトリ構造の確認**
   ```
   mcp__serena__list_dir
   ```

2. **ファイル内のシンボル概要**
   ```
   mcp__serena__get_symbols_overview
   ```

3. **特定シンボルの検索**
   ```
   mcp__serena__find_symbol
   ```

4. **パターン検索**
   ```
   mcp__serena__search_for_pattern
   ```

5. **参照の検索**
   ```
   mcp__serena__find_referencing_symbols
   ```

#### コード編集

**シンボルベースの編集を優先**:

1. **シンボル本体の置換**
   ```
   mcp__serena__replace_symbol_body
   ```

2. **シンボル後に挿入**
   ```
   mcp__serena__insert_after_symbol
   ```

3. **シンボル前に挿入**
   ```
   mcp__serena__insert_before_symbol
   ```

4. **シンボルのリネーム**
   ```
   mcp__serena__rename_symbol
   ```

### 4. テストと確認

1. **型チェック**: `npx tsc --noEmit`
2. **リンティング**: `npm run lint`
3. **ビルドテスト**: `npm run build`
4. **開発サーバーでの動作確認**: `npm run dev`

### 5. コミットとデプロイ

1. 変更内容の確認
2. ステージングとコミット
3. プッシュ（自動デプロイ）
4. 本番環境での確認

## ページ追加のワークフロー

### 新しいページを追加する手順

1. **ディレクトリ作成**
   ```
   src/app/[page-name]/
   ```

2. **page.tsx作成**
   ```typescript
   import { Metadata } from 'next';
   
   export const metadata: Metadata = {
     title: "ページタイトル | 翔葵丸",
     description: "ページの説明",
   };
   
   export default function PageName() {
     return (
       <div>
         {/* ページコンテンツ */}
       </div>
     );
   }
   ```

3. **モバイルレスポンシブ対応**
   - Tailwindのブレークポイントを使用
   - モバイルファーストで実装

4. **SEO対策**
   - metadataを適切に設定
   - 構造化データの追加（必要に応じて）
   - sitemap.tsに追加（必要に応じて）

5. **ナビゲーションに追加**
   - Header.tsxにリンクを追加

## コンポーネント追加のワークフロー

### 新しいコンポーネントを追加する手順

1. **ファイル作成**
   ```
   src/components/ComponentName.tsx
   ```

2. **TypeScriptで型定義**
   ```typescript
   interface ComponentNameProps {
     // プロパティの型定義
   }
   
   export default function ComponentName({ 
     /* props */ 
   }: ComponentNameProps) {
     // 実装
   }
   ```

3. **Tailwind CSSでスタイリング**
   - プロジェクトのカラーテーマを使用
   - レスポンシブデザインを考慮

4. **再利用性を考慮**
   - 単一責任の原則
   - プロパティで柔軟に対応
   - デフォルト値の設定

5. **適切なディレクトリに配置**
   - 汎用: `src/components/`
   - 管理画面専用: `src/components/admin/`

## Supabase操作のベストプラクティス

### クライアント選択

1. **クライアントコンポーネント**
   ```typescript
   import { createClientComponentClient } from '@/lib/supabase/client';
   ```

2. **サーバーコンポーネント**
   ```typescript
   import { createServerComponentClient } from '@/lib/supabase/server';
   ```

3. **管理者操作**
   ```typescript
   import { createAdminClient } from '@/lib/supabase/admin-client';
   ```

### データ取得パターン

```typescript
const supabase = createServerComponentClient();
const { data, error } = await supabase
  .from('fishing_results')
  .select('*')
  .order('date', { ascending: false });

if (error) {
  console.error('Error fetching data:', error);
  return [];
}

return data;
```

### エラーハンドリング

- 必ずエラーをチェック
- ユーザーフレンドリーなエラーメッセージ
- 適切なロギング

## デザインパターン

### Server Components vs Client Components

**Server Componentsを使用する場合**:
- データフェッチのみ
- 静的コンテンツ
- SEOが重要な部分

**Client Componentsを使用する場合**:
- ユーザーインタラクション
- useState、useEffectなどのフック使用
- ブラウザAPIの使用

### アニメーション実装

プロジェクトには多くのアニメーションコンポーネントがあります:
- AnimatedSection
- AnimatedBackground
- FloatingElements
- WaveAnimation
- SquidAnimation

新しいアニメーションを追加する場合:
1. Tailwind CSSのアニメーション機能を使用
2. 既存のアニメーションパターンに従う
3. パフォーマンスを考慮（CSS transformを優先）

## セキュリティのベストプラクティス

### 必ず避けるべき脆弱性

1. **XSS（クロスサイトスクリプティング）**
   - ユーザー入力を直接レンダリングしない
   - dangerouslySetInnerHTMLは避ける
   - サニタイゼーション処理

2. **SQLインジェクション**
   - Supabaseクライアントを使用（生SQLは避ける）
   - パラメータ化クエリを使用

3. **コマンドインジェクション**
   - ユーザー入力をシステムコマンドに使用しない

4. **認証・認可**
   - 管理画面は必ずベーシック認証で保護
   - 環境変数でシークレットを管理
   - .env.localをgitignore

## パフォーマンス最適化

### 画像最適化

1. **Next.js Imageコンポーネントを使用**
   ```typescript
   import Image from 'next/image';
   ```

2. **適切なサイズ指定**
   - width, heightを明示
   - 遅延ロード有効

3. **WebP形式を優先**
   - Next.jsが自動変換

### コード分割

- 動的インポートを活用
- Next.jsが自動的に実行
- 必要に応じて手動で最適化

## ドキュメント管理

### ドキュメント更新の提案タイミング

1. エラーや問題を解決した時
2. 効率的な実装パターンを発見した時
3. 新しいAPI/ライブラリの使用方法を確立した時
4. 既存ドキュメントの情報が古い/不正確だと判明した時
5. 頻繁に参照される情報を発見した時

### 更新時の注意点

- ユーザーの承認を得る
- 既存の形式を踏襲
- 日付を含めて更新履歴を残す
- 機密情報は記録しない

## トラブルシューティング

### よくある問題と解決策

#### 1. ポートが既に使用中

```bash
lsof -i :3000
kill -9 <PID>
```

#### 2. node_modulesの問題

```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Next.jsキャッシュの問題

```bash
rm -rf .next
npm run dev
```

#### 4. Supabase接続エラー

- 環境変数を確認
- Supabaseプロジェクトの状態を確認
- ネットワーク接続を確認

#### 5. 型エラー

- `npx tsc --noEmit` で詳細確認
- Supabase型定義を再生成
- インポートパスを確認

## 継続的改善

### 定期的に行うべきこと

1. **依存関係の更新**
   - セキュリティアップデートを確認
   - 互換性を確認してから更新

2. **パフォーマンス監視**
   - Vercel Speed Insightsを確認
   - Core Web Vitalsを監視

3. **エラーログの確認**
   - Vercelダッシュボードでエラーを確認
   - 繰り返し発生するエラーを修正

4. **コードレビュー**
   - 定期的にコードを見直し
   - リファクタリングの機会を探す

## まとめ

このワークフローに従うことで:
- 効率的な開発が可能
- 高品質なコードを維持
- セキュリティリスクを最小化
- パフォーマンスを最適化
- チーム全体で一貫性を保つ

常にSerenaツールを活用し、必要最小限のコードのみを読み取り、適切な編集ツールを使用することが重要です。
