export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 動く泡 */}
      <div className="absolute bottom-0 left-0 w-full h-full">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white/10 rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* 波のパターン */}
      <div className="absolute bottom-0 left-0 w-[200%] h-64">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full animate-wave"
        >
          <path
            fill="rgba(74, 141, 181, 0.1)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full animate-wave"
          style={{ animationDelay: '5s' }}
        >
          <path
            fill="rgba(100, 172, 200, 0.1)"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* 光のグラデーション */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%]">
        <div className="absolute inset-0 bg-gradient-radial from-primary-200/20 via-transparent to-transparent animate-pulse-slow" />
      </div>

      {/* 装飾的な円 */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-300/10 to-secondary-300/10 rounded-full animate-morph blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-secondary-300/10 to-accent/10 rounded-full animate-morph blur-3xl" style={{ animationDelay: '4s' }} />
    </div>
  );
}