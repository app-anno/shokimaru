'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'fade' | 'zoom' | 'flip';
  delay?: number;
  threshold?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  threshold = 0.1,
  duration = 600,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated || !once)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else if (!entry.isIntersecting && !once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold, hasAnimated, once]);

  const animationClasses = {
    'slide-up': 'animate-slide-in-up',
    'slide-down': 'animate-slide-in-down',
    'slide-left': 'animate-slide-in-left',
    'slide-right': 'animate-slide-in-right',
    'fade': 'animate-fade-in',
    'zoom': 'animate-zoom-in',
    'flip': 'animate-flip-y',
  };

  const baseClasses = 'transition-all will-change-transform';

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${className} ${
        isVisible ? animationClasses[animation] : 'opacity-0'
      }`}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}