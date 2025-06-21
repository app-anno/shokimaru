interface MoonPhaseProps {
  moonAge: number;
  className?: string;
}

export default function MoonPhase({ moonAge, className = "" }: MoonPhaseProps) {
  // 月齢に基づいて月の見た目を計算
  const getPhaseEmoji = (age: number): string => {
    if (age === 0 || age === 29) return "🌑"; // 新月
    if (age <= 3 || age >= 27) return "🌒"; // 三日月
    if (age <= 7) return "🌓"; // 上弦前
    if (age === 8) return "🌔"; // 上弦
    if (age <= 13) return "🌔"; // 満月前
    if (age <= 15) return "🌕"; // 満月
    if (age <= 21) return "🌖"; // 下弦前
    if (age === 22) return "🌗"; // 下弦
    if (age <= 26) return "🌘"; // 新月前
    return "🌑";
  };

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="text-2xl">{getPhaseEmoji(moonAge)}</span>
      <span className="text-sm">月齢 {moonAge}</span>
    </span>
  );
}