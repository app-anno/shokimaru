'use client'

interface SquidAnimationProps {
  className?: string
  height?: string
}

export default function SquidAnimation({ className = "", height = "h-16 sm:h-20 md:h-32" }: SquidAnimationProps) {
  return (
    <div className={`w-full ${height} ${className}`}>
      <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
        {/* 波のグラデーション */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f8fafb" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {/* 波の形 */}
        <path fill="url(#waveGradient)" d="M0,40 C240,25 360,55 480,40 C600,25 720,50 840,35 C960,20 1080,45 1200,30 C1320,15 1380,35 1440,20 L1440,120 L0,120 Z">
          <animate attributeName="d" 
            values="M0,40 C240,25 360,55 480,40 C600,25 720,50 840,35 C960,20 1080,45 1200,30 C1320,15 1380,35 1440,20 L1440,120 L0,120 Z;
                    M0,35 C240,50 360,30 480,45 C600,60 720,35 840,50 C960,65 1080,30 1200,45 C1320,60 1380,25 1440,40 L1440,120 L0,120 Z;
                    M0,40 C240,25 360,55 480,40 C600,25 720,50 840,35 C960,20 1080,45 1200,30 C1320,15 1380,35 1440,20 L1440,120 L0,120 Z"
            dur="8s" repeatCount="indefinite" />
        </path>
        
        {/* 泳ぐイカたち - ゲッソー風の動き */}
        <g>
          <image href="/squid.svg" x="-15" y="-15" width="30" height="30">
            {/* 横方向の移動 - ジェット推進風 */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="200,50; 400,48; 450,47; 600,45; 650,44; 800,42; 850,41; 1000,40; 1050,39; 1240,38; 200,50"
              dur="20s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.1; 0.15; 0.3; 0.35; 0.5; 0.55; 0.7; 0.75; 0.9; 1"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1" />
            {/* 上下のふわふわ運動 */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-5; 0,-8; 0,-5; 0,0; 0,5; 0,8; 0,5; 0,0"
              dur="3s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 急激な方向転換 */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 15 15; 0 15 15; -15 15 15; -15 15 15; 0 15 15; 0 15 15; 15 15 15; 15 15 15; 0 15 15"
              dur="4s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>
        
        <g>
          <image href="/squid.svg" x="-12.5" y="-12.5" width="25" height="25">
            {/* 横方向の移動 - ジェット推進風（逆方向） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="600,35; 500,36; 450,37; 300,39; 250,40; 100,42; 50,43; -100,45; 600,35"
              dur="25s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.05; 0.1; 0.3; 0.35; 0.6; 0.65; 0.85; 1"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1" />
            {/* 上下のふわふわ運動（位相ずらし） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,4; 0,6; 0,4; 0,0; 0,-4; 0,-6; 0,-4; 0,0"
              dur="2.8s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 停止と急転換 */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12.5 12.5; 0 12.5 12.5; 20 12.5 12.5; 20 12.5 12.5; 0 12.5 12.5; 0 12.5 12.5; -20 12.5 12.5; -20 12.5 12.5; 0 12.5 12.5"
              dur="3.5s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>
        
        <g>
          <image href="/squid.svg" x="-10" y="-10" width="20" height="20">
            {/* 横方向の移動 - ジェット推進風（ジグザグ） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="1000,45; 900,40; 850,35; 700,33; 650,30; 500,32; 450,35; 300,30; 1000,45"
              dur="18s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.08; 0.12; 0.3; 0.35; 0.55; 0.6; 0.8; 1"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1" />
            {/* 上下のふわふわ運動（速め） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-7; 0,-10; 0,-7; 0,0; 0,7; 0,10; 0,7; 0,0"
              dur="2s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 素早い転換 */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 10 10; -25 10 10; -25 10 10; 0 10 10; 25 10 10; 25 10 10; 0 10 10"
              dur="2.5s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>
        
        {/* 小さいイカの群れ - より素早いゲッソー風の動き */}
        <g opacity="0.5">
          <image href="/squid.svg" x="-7.5" y="-7.5" width="15" height="15">
            {/* 横方向の移動 - 素早いジェット推進 */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="400,60; 500,59; 520,58; 700,56; 720,55; 900,54; 920,53; 1100,55; 400,60"
              dur="15s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.05; 0.08; 0.25; 0.28; 0.5; 0.53; 0.8; 1"
              keySplines="0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1" />
            {/* 上下の小刻みなふわふわ動き */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-3; 0,-4; 0,-3; 0,0; 0,3; 0,4; 0,3; 0,0"
              dur="1.5s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - クイック */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 7.5 7.5; -10 7.5 7.5; -10 7.5 7.5; 0 7.5 7.5; 10 7.5 7.5; 10 7.5 7.5; 0 7.5 7.5"
              dur="2s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
          <image href="/squid.svg" x="-6" y="-6" width="12" height="12">
            {/* 横方向の移動 - 不規則なジェット推進 */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="800,55; 700,56; 680,57; 500,58; 480,59; 200,59; 180,60; 100,60; 800,55"
              dur="22s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.03; 0.05; 0.2; 0.22; 0.5; 0.52; 0.7; 1"
              keySplines="0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1; 0.7 0 0.3 1" />
            {/* 上下の小刻みな動き（位相ずらし） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,2; 0,3; 0,2; 0,0; 0,-2; 0,-3; 0,-2; 0,0"
              dur="1.2s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 震えるような動き */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 6 6; 15 6 6; 15 6 6; 0 6 6; -15 6 6; -15 6 6; 0 6 6"
              dur="1.8s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>
      </svg>
    </div>
  )
}