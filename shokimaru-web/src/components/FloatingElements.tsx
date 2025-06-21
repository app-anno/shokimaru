'use client';

import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingElements() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newBubbles: Bubble[] = [];
    
    for (let i = 0; i < 20; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: 100 + Math.random() * 50,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 20,
      });
    }
    
    setBubbles(newBubbles);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* 浮かぶ泡 */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(74, 141, 181, 0.1))`,
            boxShadow: '0 0 10px rgba(74, 141, 181, 0.2)',
            animation: `float ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
          }}
        >
          <div 
            className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white/30 rounded-full blur-sm"
            style={{
              animation: `pulse-slow 3s ease-in-out ${bubble.delay}s infinite`,
            }}
          />
        </div>
      ))}

      {/* 浮遊する魚のシルエット */}
      <div className="absolute top-1/4 left-10 opacity-10">
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          className="animate-swim"
          style={{ animationDuration: '30s' }}
        >
          <path
            d="M10 20 Q 20 10, 30 20 T 50 20 L 45 15 L 45 25 Z"
            fill="currentColor"
            className="text-primary-600"
          />
        </svg>
      </div>

      <div className="absolute top-3/4 right-20 opacity-10">
        <svg
          width="80"
          height="50"
          viewBox="0 0 80 50"
          className="animate-swim-reverse"
          style={{ animationDuration: '25s' }}
        >
          <path
            d="M10 25 Q 25 15, 40 25 T 70 25 L 65 20 L 65 30 Z"
            fill="currentColor"
            className="text-secondary-600"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes swim {
          0% {
            transform: translateX(-100px) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(calc(100vw + 100px)) translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateX(calc(100vw + 100px)) translateY(20px) rotate(-5deg);
          }
          75% {
            transform: translateX(-100px) translateY(-10px) rotate(3deg);
          }
          100% {
            transform: translateX(-100px) translateY(0) rotate(0deg);
          }
        }

        @keyframes swim-reverse {
          0% {
            transform: translateX(100px) translateY(0) rotate(0deg) scaleX(-1);
          }
          25% {
            transform: translateX(calc(-100vw - 100px)) translateY(30px) rotate(-5deg) scaleX(-1);
          }
          50% {
            transform: translateX(calc(-100vw - 100px)) translateY(-30px) rotate(5deg) scaleX(-1);
          }
          75% {
            transform: translateX(100px) translateY(10px) rotate(-3deg) scaleX(-1);
          }
          100% {
            transform: translateX(100px) translateY(0) rotate(0deg) scaleX(-1);
          }
        }

        .animate-swim {
          animation: swim linear infinite;
        }

        .animate-swim-reverse {
          animation: swim-reverse linear infinite;
        }
      `}</style>
    </div>
  );
}