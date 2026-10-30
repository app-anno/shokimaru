// === 数値（構造化データ・計算用） ===
export const SHARED_PRICE = 9000;
export const CHARTER_PRICE = 60000;
export const RENTAL_TACKLE_PRICE = 1000;
export const MAX_PASSENGERS = 8;
export const SLJ_CHARTER_PRICE = 50000;
export const SLJ_MAX_PASSENGERS = 6;
export const DAY_TIP_RUN_CHARTER_PRICE = 50000;
export const DAY_TIP_RUN_MAX_PASSENGERS = 6;

// === 表示用フォーマット済み文字列 ===
export const SHARED_PRICE_DISPLAY = '¥9,000';
export const CHARTER_PRICE_DISPLAY = '¥60,000';
export const RENTAL_TACKLE_PRICE_DISPLAY = '¥1,000';
export const MAX_PASSENGERS_DISPLAY = `${MAX_PASSENGERS}名`;
export const SLJ_CHARTER_PRICE_DISPLAY = `¥${SLJ_CHARTER_PRICE.toLocaleString()}`;
export const SLJ_MAX_PASSENGERS_DISPLAY = `${SLJ_MAX_PASSENGERS}名`;
export const DAY_TIP_RUN_CHARTER_PRICE_DISPLAY = `¥${DAY_TIP_RUN_CHARTER_PRICE.toLocaleString()}`;
export const DAY_TIP_RUN_MAX_PASSENGERS_DISPLAY = `${DAY_TIP_RUN_MAX_PASSENGERS}名`;

// === 構造化データ用 ===
export const PRICE_RANGE = `${SHARED_PRICE_DISPLAY}-${CHARTER_PRICE_DISPLAY}`;

// === 半額料金（高校生以下） ===
export const STUDENT_PRICE = SHARED_PRICE / 2;
export const STUDENT_PRICE_DISPLAY = `¥${STUDENT_PRICE.toLocaleString()}`;

// === metadata用 ===
export const PRICING_SUMMARY = `乗り合い${SHARED_PRICE_DISPLAY}/人、チャーター${SLJ_CHARTER_PRICE_DISPLAY}〜${CHARTER_PRICE_DISPLAY}/艇`;
