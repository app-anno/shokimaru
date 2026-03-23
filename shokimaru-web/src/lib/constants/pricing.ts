// === 数値（構造化データ・計算用） ===
export const SHARED_PRICE = 9000;
export const CHARTER_PRICE = 60000;
export const RENTAL_TACKLE_PRICE = 1000;
export const MAX_PASSENGERS = 8;

// === 表示用フォーマット済み文字列 ===
export const SHARED_PRICE_DISPLAY = '¥9,000';
export const CHARTER_PRICE_DISPLAY = '¥60,000';
export const RENTAL_TACKLE_PRICE_DISPLAY = '¥1,000';
export const MAX_PASSENGERS_DISPLAY = `${MAX_PASSENGERS}名`;

// === 構造化データ用 ===
export const PRICE_RANGE = `${SHARED_PRICE_DISPLAY}-${CHARTER_PRICE_DISPLAY}`;

// === 半額料金（高校生以下） ===
export const STUDENT_PRICE = SHARED_PRICE / 2;
export const STUDENT_PRICE_DISPLAY = `¥${STUDENT_PRICE.toLocaleString()}`;

// === metadata用 ===
export const PRICING_SUMMARY = `乗り合い${SHARED_PRICE_DISPLAY}/人、チャーター${CHARTER_PRICE_DISPLAY}/艇`;
