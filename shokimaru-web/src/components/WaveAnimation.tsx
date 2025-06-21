'use client'

export default function WaveAnimation() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64 overflow-hidden">
      <div className="relative w-full h-full">
        {/* 背景の波レイヤー */}
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bgWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f8fafb" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bgWaveGradient)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate attributeName="d" 
              values="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,120L48,106C96,92,192,64,288,74C384,84,480,128,576,144C672,160,768,128,864,112C960,96,1056,96,1152,112C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                      M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              dur="10s" repeatCount="indefinite" />
          </path>
        </svg>
        
        {/* 泳ぐイカたち - 大きめのサイズで配置 */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320">
          {/* 奥のイカ群 */}
          <g opacity="0.3">
            <image href="/squid.svg" x="-20" y="-20" width="40" height="40">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="100,250; 1340,220; 100,250"
                dur="30s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,-15; 0,0; 0,15; 0,0"
                dur="3s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 20 20; -15 20 20; 0 20 20; 15 20 20; 0 20 20"
                dur="4s"
                repeatCount="indefinite"
                additive="sum" />
            </image>
          </g>
          
          {/* 中間のイカ群 */}
          <g opacity="0.5">
            <image href="/squid.svg" x="-25" y="-25" width="50" height="50">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="1300,180; -100,200; 1300,180"
                dur="25s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,20; 0,0; 0,-20; 0,0"
                dur="2.5s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 25 25; 20 25 25; 0 25 25; -20 25 25; 0 25 25"
                dur="3.5s"
                repeatCount="indefinite"
                additive="sum" />
            </image>
            
            <image href="/squid.svg" x="-18" y="-18" width="36" height="36">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="300,230; 1100,210; 300,230"
                dur="20s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,-12; 0,0; 0,12; 0,0"
                dur="2s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 18 18; -18 18 18; 0 18 18; 18 18 18; 0 18 18"
                dur="3s"
                repeatCount="indefinite"
                additive="sum" />
            </image>
          </g>
          
          {/* 手前のイカ群 */}
          <g opacity="0.7">
            <image href="/squid.svg" x="-30" y="-30" width="60" height="60">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="600,150; -200,170; 600,150"
                dur="18s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,25; 0,0; 0,-25; 0,0"
                dur="2.2s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 30 30; -25 30 30; 0 30 30; 25 30 30; 0 30 30"
                dur="3.2s"
                repeatCount="indefinite"
                additive="sum" />
            </image>
            
            <image href="/squid.svg" x="-22" y="-22" width="44" height="44">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="900,190; 1500,170; 900,190"
                dur="22s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,-18; 0,0; 0,18; 0,0"
                dur="1.8s"
                repeatCount="indefinite"
                additive="sum" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 22 22; 22 22 22; 0 22 22; -22 22 22; 0 22 22"
                dur="2.8s"
                repeatCount="indefinite"
                additive="sum" />
            </image>
          </g>
        </svg>
      </div>
    </div>
  );
}