# リモートリポジトリ連携

## 概要
このドキュメントは、Git操作のベストプラクティス、ブランチ戦略、PR/MRテンプレート、CI/CD設定等を記録します。

## Git操作のベストプラクティス

### コミットメッセージ
```
<type>: <subject>

<body>

<footer>
```

**Type**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイルの変更
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: ビルドプロセスやツールの変更

### 例
```
feat: 釣果情報に月齢と潮の状態を追加

- fishing_resultsテーブルにmoon_ageとtide_typeカラムを追加
- 月齢表示用のMoonPhaseコンポーネントを実装
- 定数ファイルに潮の種類を定義
```

## ブランチ戦略

### ブランチ名規則
- `main`: 本番環境
- `develop`: 開発環境
- `feature/<feature-name>`: 新機能開発
- `fix/<bug-description>`: バグ修正
- `hotfix/<issue>`: 緊急修正

### 例
```bash
git checkout -b feature/fishing-result-filters
git checkout -b fix/image-upload-error
```

## PR/MRテンプレート

### Pull Request Template
```markdown
## 概要
<!-- 変更の概要を記載 -->

## 変更内容
- [ ] 変更点1
- [ ] 変更点2

## テスト
- [ ] ローカルでの動作確認
- [ ] モバイル表示の確認
- [ ] エラーハンドリングの確認

## スクリーンショット
<!-- 必要に応じてUIの変更を添付 -->

## 関連Issue
<!-- #123 のような形式で記載 -->
```

## Vercelデプロイ設定

### 環境変数
Vercelダッシュボードで以下を設定：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASSWORD`

### ビルド設定
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### プレビューデプロイ
- PRを作成すると自動的にプレビュー環境が作成される
- プレビューURLでテスト可能

## GitHub Actions（将来的な実装）

### 基本的なワークフロー例
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## セキュリティ考慮事項

### 機密情報の管理
- 環境変数は絶対にコミットしない
- `.env.local`は`.gitignore`に含める
- パスワードやAPIキーはGitHub Secretsで管理

### 依存関係の更新
```bash
# 脆弱性チェック
npm audit

# 修正
npm audit fix
```

## 更新履歴
- 2024-01-20: 初回作成