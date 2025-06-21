// 潮の種類
export const TIDE_TYPES = [
  { value: "大潮", label: "大潮" },
  { value: "中潮", label: "中潮" },
  { value: "小潮", label: "小潮" },
  { value: "長潮", label: "長潮" },
  { value: "若潮", label: "若潮" },
] as const;

// 天気の種類
export const WEATHER_TYPES = [
  { value: "晴れ", label: "晴れ" },
  { value: "曇り", label: "曇り" },
  { value: "雨", label: "雨" },
  { value: "風", label: "風" },
  { value: "波高", label: "波高" },
] as const;

// 月齢の説明を取得
export function getMoonPhaseDescription(moonAge: number): string {
  if (moonAge === 0 || moonAge === 29) return "新月";
  if (moonAge === 7 || moonAge === 8) return "上弦";
  if (moonAge === 14 || moonAge === 15) return "満月";
  if (moonAge === 22 || moonAge === 23) return "下弦";
  if (moonAge < 7) return "三日月〜上弦";
  if (moonAge < 14) return "上弦〜満月";
  if (moonAge < 22) return "満月〜下弦";
  return "下弦〜新月";
}

// 月齢の絵文字を取得
export function getMoonPhaseEmoji(moonAge: number): string {
  if (moonAge === 0 || moonAge === 29) return "🌑";
  if (moonAge < 7) return "🌒";
  if (moonAge === 7 || moonAge === 8) return "🌓";
  if (moonAge < 14) return "🌔";
  if (moonAge === 14 || moonAge === 15) return "🌕";
  if (moonAge < 22) return "🌖";
  if (moonAge === 22 || moonAge === 23) return "🌗";
  return "🌘";
}