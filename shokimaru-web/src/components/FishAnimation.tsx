'use client'

interface FishAnimationProps {
  className?: string
  height?: string
}

export default function FishAnimation({ className = "", height = "h-16 sm:h-20 md:h-32" }: FishAnimationProps) {
  return (
    <div className={`w-full ${height} ${className}`}>
      <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
        {/* 波のグラデーション */}
        <defs>
          <linearGradient id="waveGradientFish" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f0f9ff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* 波の形 */}
        <path fill="url(#waveGradientFish)" d="M0,50 C240,35 360,65 480,50 C600,35 720,60 840,45 C960,30 1080,55 1200,40 C1320,25 1380,45 1440,30 L1440,120 L0,120 Z">
          <animate attributeName="d"
            values="M0,50 C240,35 360,65 480,50 C600,35 720,60 840,45 C960,30 1080,55 1200,40 C1320,25 1380,45 1440,30 L1440,120 L0,120 Z;
                    M0,45 C240,60 360,40 480,55 C600,70 720,45 840,60 C960,75 1080,40 1200,55 C1320,70 1380,35 1440,50 L1440,120 L0,120 Z;
                    M0,50 C240,35 360,65 480,50 C600,35 720,60 840,45 C960,30 1080,55 1200,40 C1320,25 1380,45 1440,30 L1440,120 L0,120 Z"
            dur="10s" repeatCount="indefinite" />
        </path>

        {/* 泳ぐ魚たち - 滑らかな動き */}
        <g>
          <image href="/fish.svg" x="-15" y="-15" width="30" height="30">
            {/* 横方向の移動 - 滑らかな泳ぎ */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="150,45; 350,43; 500,42; 700,40; 900,39; 1100,38; 1300,37; 150,45"
              dur="24s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.75; 0.9; 1"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1" />
            {/* 上下のふわふわ運動 - 優雅な動き */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-4; 0,-6; 0,-4; 0,0; 0,4; 0,6; 0,4; 0,0"
              dur="4s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 緩やかな方向転換 */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 15 15; -8 15 15; -8 15 15; 0 15 15; 8 15 15; 8 15 15; 0 15 15"
              dur="5s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>

        <g>
          <image href="/fish.svg" x="-12.5" y="-12.5" width="25" height="25">
            {/* 横方向の移動 - 滑らかな泳ぎ（逆方向） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="700,38; 550,39; 400,40; 250,42; 100,43; -50,45; 700,38"
              dur="28s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1" />
            {/* 上下のふわふわ運動（位相ずらし） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,3; 0,5; 0,3; 0,0; 0,-3; 0,-5; 0,-3; 0,0"
              dur="3.5s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 優雅な転換 */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 12.5 12.5; 12 12.5 12.5; 12 12.5 12.5; 0 12.5 12.5; -12 12.5 12.5; -12 12.5 12.5; 0 12.5 12.5"
              dur="4.5s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>

        <g>
          <image href="/fish.svg" x="-10" y="-10" width="20" height="20">
            {/* 横方向の移動 - S字カーブを描く泳ぎ */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="1100,50; 950,46; 800,44; 650,40; 500,38; 350,42; 200,44; 1100,50"
              dur="22s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.12; 0.25; 0.4; 0.55; 0.7; 0.85; 1"
              keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1" />
            {/* 上下のふわふわ運動 */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-5; 0,-7; 0,-5; 0,0; 0,5; 0,7; 0,5; 0,0"
              dur="3s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 滑らかな転換 */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 10 10; -15 10 10; -15 10 10; 0 10 10; 15 10 10; 15 10 10; 0 10 10"
              dur="3.5s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>

        {/* 小さい魚の群れ - より軽快な動き */}
        <g opacity="0.6">
          <image href="/fish.svg" x="-7.5" y="-7.5" width="15" height="15">
            {/* 横方向の移動 - 群れの動き */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="300,55; 450,53; 600,52; 750,50; 900,49; 1050,48; 1200,50; 300,55"
              dur="18s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.12; 0.25; 0.4; 0.55; 0.7; 0.85; 1"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1" />
            {/* 上下の小刻みなふわふわ動き */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,-2; 0,-3; 0,-2; 0,0; 0,2; 0,3; 0,2; 0,0"
              dur="2s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 軽快な動き */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 7.5 7.5; -5 7.5 7.5; -5 7.5 7.5; 0 7.5 7.5; 5 7.5 7.5; 5 7.5 7.5; 0 7.5 7.5"
              dur="2.5s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
          <image href="/fish.svg" x="-6" y="-6" width="12" height="12">
            {/* 横方向の移動 - 群れの動き（逆方向） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="900,52; 750,53; 600,54; 450,55; 300,56; 150,57; 900,52"
              dur="20s"
              repeatCount="indefinite"
              additive="sum"
              keyTimes="0; 0.15; 0.3; 0.5; 0.7; 0.85; 1"
              keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1" />
            {/* 上下の小刻みな動き（位相ずらし） */}
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,1.5; 0,2.5; 0,1.5; 0,0; 0,-1.5; 0,-2.5; 0,-1.5; 0,0"
              dur="1.8s"
              repeatCount="indefinite"
              additive="sum" />
            {/* 回転運動 - 同調した動き */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 6 6; 8 6 6; 8 6 6; 0 6 6; -8 6 6; -8 6 6; 0 6 6"
              dur="2.2s"
              repeatCount="indefinite"
              additive="sum" />
          </image>
        </g>
      </svg>
    </div>
  )
}
