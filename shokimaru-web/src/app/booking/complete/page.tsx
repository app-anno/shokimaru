'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'

export default function BookingCompletePage() {
  const searchParams = useSearchParams()
  const reservationNumber = searchParams.get('reservation')
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // 3秒後に紙吹雪を非表示
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* 紙吹雪エフェクト */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div
                className="w-3 h-3 bg-blue-500 rounded-sm"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold mb-4">
                ご予約ありがとうございます！
              </h1>

              <p className="text-gray-600 mb-8">
                予約が正常に完了しました。<br />
                当日は安全で楽しい釣り体験をご提供いたします。
              </p>

              {reservationNumber && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <p className="text-sm text-gray-600 mb-2">予約番号</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {reservationNumber}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    ※この番号は大切に保管してください
                  </p>
                </div>
              )}

              <div className="space-y-4 text-left mb-8">
                <h2 className="text-xl font-bold">今後の流れ</h2>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      1
                    </span>
                    <div>
                      <p className="font-semibold">確認のご連絡</p>
                      <p className="text-sm text-gray-600">
                        前日までに確認のお電話をさせていただきます
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      2
                    </span>
                    <div>
                      <p className="font-semibold">当日の集合</p>
                      <p className="text-sm text-gray-600">
                        出航30分前までに港へお越しください
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      3
                    </span>
                    <div>
                      <p className="font-semibold">釣り体験</p>
                      <p className="text-sm text-gray-600">
                        安全に配慮しながら楽しい釣り体験をお楽しみください
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-yellow-800">
                  <strong>キャンセルについて：</strong><br />
                  やむを得ずキャンセルされる場合は、前日までにご連絡ください。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
                >
                  トップページへ
                </Link>
                <Link
                  href="/access"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                >
                  アクセス情報を見る
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  )
}