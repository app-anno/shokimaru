# 推奨コマンド

## プロジェクトディレクトリ

すべてのコマンドは `shokimaru-web/` ディレクトリから実行してください。

```bash
cd /Users/anno/Downloads/shokimaru/shokimaru-web
```

## 開発コマンド

### 開発サーバー
```bash
npm run dev
# または
pnpm dev

# アクセス: http://localhost:3000
```

### プロダクションビルド
```bash
npm run build

# ビルド成功を確認してから本番デプロイ
```

### プロダクションサーバー（ローカル）
```bash
npm run start

# 本番環境のローカルテスト用
```

### リンティング
```bash
npm run lint

# ESLintによるコードチェック
# 警告とエラーを修正してからコミット
```

### 環境変数セットアップ
```bash
npm run setup

# .env.local ファイルをインタラクティブに作成
```

## TypeScript

### 型チェック
```bash
npx tsc --noEmit

# 型エラーをすべて表示（ビルドファイルは生成しない）
# コミット前に実行を推奨
```

## Supabase（ローカル開発の場合）

### Supabase起動
```bash
npx supabase start
```

### Supabase停止
```bash
npx supabase stop
```

### 新しいマイグレーション作成
```bash
npx supabase migration new <migration_name>

# 例: npx supabase migration new add_weather_column
```

### マイグレーション適用
```bash
npx supabase db push
```

### TypeScript型生成
```bash
npx supabase gen types typescript --local > src/types/database.types.ts

# Supabaseスキーマから型定義を生成
# スキーマ変更後は必ず実行
```

## Git コマンド

### 状態確認
```bash
git status

# 変更ファイルとブランチを確認
```

### 変更をステージング
```bash
git add .

# すべての変更をステージング
```

### コミット
```bash
git commit -m "commit message"

# 変更をコミット
# メッセージは日本語または英語で明確に
```

### プッシュ
```bash
git push origin main

# メインブランチにプッシュ
# Vercelで自動デプロイがトリガーされる
```

### ブランチ作成
```bash
git checkout -b feature/feature-name

# 新機能開発用ブランチ作成
```

## Vercel CLI（オプション）

### Vercel CLI インストール
```bash
npm i -g vercel
```

### ローカルでVercel環境実行
```bash
vercel dev
```

### プロダクションデプロイ
```bash
vercel --prod
```

## macOS (Darwin) システムコマンド

### ファイル一覧
```bash
ls -la

# 隠しファイルを含むすべてのファイルを表示
```

### ディレクトリ移動
```bash
cd <directory>
```

### ファイル検索
```bash
find . -name "*.tsx"

# 現在のディレクトリ以下のすべての.tsxファイルを検索
```

### テキスト検索
```bash
grep -r "search_term" .

# 現在のディレクトリ以下で再帰的にテキスト検索
```

### プロセス確認
```bash
ps aux | grep node

# 実行中のNodeプロセスを確認
```

### ポート使用確認
```bash
lsof -i :3000

# ポート3000を使用しているプロセスを確認
```

## タスク完了時の推奨フロー

1. **型チェック**: `npx tsc --noEmit`
2. **リンティング**: `npm run lint`
3. **ビルドテスト**: `npm run build`
4. **変更確認**: `git status`
5. **ステージング**: `git add .`
6. **コミット**: `git commit -m "説明"`
7. **プッシュ**: `git push`（自動デプロイがトリガーされる）

## トラブルシューティング

### ポートが既に使用中
```bash
# ポート3000を使用しているプロセスを終了
lsof -i :3000
kill -9 <PID>
```

### node_modules のクリーンインストール
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Next.jsキャッシュクリア
```bash
rm -rf .next
npm run dev
```

## 注意事項

- **Serenaツールを優先**: コード検索・編集にはSerena MCPツールを優先的に使用
- **ファイル全体を読まない**: 必要な部分のみを読み取る
- **macOS特有のコマンド**: Darwinシステムのため、Linuxとは一部コマンドが異なる場合がある
