'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'fade' | 'zoom' | 'flip';
  delay?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const animationClasses = {
    'slide-up': 'animate-slide-in-up',
    'slide-down': 'animate-slide-in-down',
    'slide-left': 'animate-slide-in-left',
    'slide-right': 'animate-slide-in-right',
    'fade': 'animate-fade-in',
    'zoom': 'animate-zoom-in',
    'flip': 'animate-flip-y',
  };

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? animationClasses[animation] : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}