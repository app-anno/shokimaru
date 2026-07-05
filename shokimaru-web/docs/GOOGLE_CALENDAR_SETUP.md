# 予約状況カレンダー（Google Calendar API）セットアップ

トップページの出船スケジュールは、`GOOGLE_CALENDAR_API_KEY` が設定されていると自作カレンダー表示（満席=赤・空き数表示・日タップで詳細）になる。
未設定・取得失敗時は従来のGoogleカレンダー埋め込み（iframe）に自動フォールバックする。

## APIキーの発行手順（5〜10分）

1. https://console.cloud.google.com/ にログイン
   （カレンダーは公開設定のため、どのGoogleアカウントでもよい）
2. 画面上部のプロジェクト選択 →「新しいプロジェクト」→ 名前 `shokimaru-web` で作成
3. 「APIとサービス」→「ライブラリ」→ `Google Calendar API` を検索 →「有効にする」
4. 「APIとサービス」→「認証情報」→「認証情報を作成」→「APIキー」
5. 作成したキーの編集画面で制限を設定：
   - アプリケーションの制限: **なし**（サーバーサイドから呼ぶため）
   - APIの制限: **Google Calendar API のみ許可**（漏洩時の被害を限定する）
6. キーをコピー

## 設定場所

- ローカル: `shokimaru-web/.env.local` に追記
  ```
  GOOGLE_CALENDAR_API_KEY=コピーしたキー
  ```
- 本番: Vercelダッシュボード → Project Settings → Environment Variables に同名で追加 → Redeploy

## 動作確認

トップページの「出船スケジュール」が月グリッドの自作カレンダーになっていればOK。
従来のGoogle埋め込みのままの場合はキー未設定か取得失敗（サーバーログに `Google Calendar API error` が出る）。

## 補足

- 対象カレンダー: `shokimaru.schedule@gmail.com`（`src/lib/google-calendar.ts` に定数で定義）
- 反映頻度: 約5分キャッシュ（`revalidate: 300`）
- イベントタイトルの解釈ルール: 空きN名・残りN枠 / 満席・満船 / 休み・欠航 / それ以外はお客様予約として表示。詳細は `src/lib/google-calendar.test.ts` を参照
