'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
  autoPlayInterval?: number
  showIndicators?: boolean
  showBadge?: boolean
}

export default function ImageCarousel({
  images,
  alt,
  className = '',
  autoPlayInterval = 3000,
  showIndicators = true,
  showBadge = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 自動再生
  useEffect(() => {
    if (images.length <= 1) return

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoPlayInterval)
    }

    if (!isHovered) {
      startAutoPlay()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [images.length, autoPlayInterval, isHovered])

  if (images.length === 0) return null

  const remainingCount = images.length - 1
  const currentImage = images[currentIndex] || images[0]

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* メイン画像 */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`${alt} - ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* 枚数バッジ */}
      {showBadge && images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          +{remainingCount}
        </div>
      )}

      {/* インジケーター */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`画像 ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}