# API仕様書

## 概要
このドキュメントは、翔葵丸プロジェクトで使用するAPIエンドポイントと、Supabase APIの使用方法について記載します。

## Supabase API

### 認証情報
```typescript
// 環境変数
NEXT_PUBLIC_SUPABASE_URL      // Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY // 公開用キー
SUPABASE_SERVICE_ROLE_KEY     // サーバー用キー（管理操作用）
```

## データベースAPI

### fishing_results テーブル

#### 釣果一覧取得
```typescript
// 関数
getFishingResults(limit?: number): Promise<FishingResult[]>

// 使用例
const results = await getFishingResults(10);

// レスポンス例
[
  {
    id: "uuid",
    date: "2024-01-20",
    weather: "晴れ",
    moon_age: 15,
    tide_type: "大潮",
    catch_count: 12,
    size: "20-30cm",
    image_url: "https://...",
    is_public: true,
    created_at: "2024-01-20T10:00:00Z",
    updated_at: "2024-01-20T10:00:00Z"
  }
]
```

#### 特定の釣果取得
```typescript
// 関数
getFishingResultById(id: string): Promise<FishingResult | null>

// 使用例
const result = await getFishingResultById("uuid-here");
```

#### 釣果作成
```typescript
// 関数
createFishingResult(result: FishingResultInsert): Promise<FishingResult>

// 使用例
const newResult = await createFishingResult({
  date: "2024-01-20",
  weather: "晴れ",
  moon_age: 15,
  tide_type: "大潮",
  catch_count: 12,
  size: "20-30cm",
  image_url: "https://..."
});
```

#### 釣果更新
```typescript
// 関数
updateFishingResult(id: string, result: FishingResultUpdate): Promise<FishingResult>

// 使用例
const updated = await updateFishingResult("uuid-here", {
  catch_count: 15,
  size: "25-35cm"
});
```

#### 釣果削除
```typescript
// 関数
deleteFishingResult(id: string): Promise<boolean>

// 使用例
await deleteFishingResult("uuid-here");
```

#### 全釣果取得（管理画面用）
```typescript
// 関数
getAllFishingResults(): Promise<FishingResult[]>

// 使用例（非公開データも含む）
const allResults = await getAllFishingResults();
```

## Storage API

### 画像アップロード
```typescript
// 関数
uploadImage(file: File): Promise<string | null>

// 使用例
const imageUrl = await uploadImage(file);
// 戻り値: "https://...supabase.co/storage/v1/object/public/fishing-images/..."
```

### 画像削除
```typescript
// 関数
deleteImage(imageUrl: string): Promise<boolean>

// 使用例
const success = await deleteImage("https://...");
```

## エラーハンドリング

### エラーレスポンス形式
```typescript
{
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  }
}
```

### 一般的なエラーコード
- `PGRST301`: Row Level Security違反
- `PGRST204`: データが見つからない
- `22P02`: 無効なUUID形式
- `23505`: 一意制約違反

## レート制限
- Supabase Free Tier: 
  - 500MB データベース
  - 2GB 転送量/月
  - 1GB ファイルストレージ

## セキュリティ

### Row Level Security (RLS)
- `fishing_results`テーブル:
  - SELECT: `is_public = true`の場合のみ公開
  - INSERT/UPDATE/DELETE: ベーシック認証で制御

### CORS設定
- Storage: すべてのオリジンを許可（本番環境では制限推奨）

## 更新履歴
- 2024-01-20: 初回作成