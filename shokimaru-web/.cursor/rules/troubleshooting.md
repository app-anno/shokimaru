# トラブルシューティングガイド

## 概要
このドキュメントは、開発中に遭遇したエラーとその解決策を記録します。

## Next.js関連

### 1. "Module not found" エラー
**症状**: インポートパスが見つからない
**原因**: 相対パスまたはエイリアスの設定ミス
**解決策**: 
- `@/`エイリアスを使用（tsconfig.jsonで設定済み）
- パスの大文字小文字を確認

### 2. Hydration エラー
**症状**: "Hydration failed because the initial UI does not match"
**原因**: サーバーとクライアントでレンダリング結果が異なる
**解決策**:
- 条件付きレンダリングを`useEffect`内で行う
- クライアント専用コンポーネントに`"use client"`を追加

## Supabase関連

### 1. RLSポリシーエラー
**症状**: "new row violates row-level security policy"
**原因**: Row Level Securityが有効でポリシーが制限的
**解決策**:
- 開発時は一時的にRLSを無効化
- 本番環境では適切なポリシーを設定

### 2. 環境変数が読み込まれない
**症状**: Supabase URLやキーがundefined
**原因**: .env.localファイルの設定ミス
**解決策**:
- ファイル名が`.env.local`であることを確認
- 環境変数名が`NEXT_PUBLIC_`で始まることを確認（クライアント用）
- 開発サーバーを再起動

## TypeScript関連

### 1. 型エラー
**症状**: "Type 'X' is not assignable to type 'Y'"
**原因**: 型定義の不一致
**解決策**:
- `types/database.ts`の型定義を確認
- Supabaseの型生成コマンドを実行

## 更新履歴
- 2024-01-20: 初回作成