'use client';

import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const scrolled = window.pageYOffset;
      const rect = ref.current.getBoundingClientRect();
      const speed_multiplier = speed;

      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const yPos = -(scrolled * speed_multiplier);
        ref.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
}