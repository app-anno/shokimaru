export default function WaveAnimation() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64 overflow-hidden">
      <div className="relative w-full h-full">
        {/* 複数の波レイヤー */}
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(74, 141, 181, 0.1)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ animationDelay: '-5s', animationDuration: '25s' }}
        >
          <path
            fill="rgba(100, 172, 200, 0.15)"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,128C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        <svg
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ animationDelay: '-10s', animationDuration: '30s' }}
        >
          <path
            fill="rgba(46, 95, 122, 0.1)"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
}