'use client'

import React from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import Card from '@/components/Card'

interface SeasonData {
  months: string
  name: string
  color: string
  bgColor: string
  icon: string
}

const seasons: SeasonData[] = [
  {
    months: '6月〜9月',
    name: 'ケンサキイカ',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
    icon: '🦑'
  },
  {
    months: '10月〜12月',
    name: 'SLJ・ナイトティップラン',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
    icon: '🎣'
  },
  {
    months: '1月',
    name: '休業期間',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: '🌊'
  },
  {
    months: '2月〜5月',
    name: 'SLJ（3月頃から本格化）',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
    icon: '🐟'
  }
]

export default function SeasonalCalendar() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <AnimatedSection animation="slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 title-decorated">
            年間釣りカレンダー
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            季節ごとに様々な釣り物をお楽しみいただけます
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {seasons.map((season, index) => (
            <AnimatedSection
              key={index}
              animation="fade"
              delay={index * 100}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="mb-4">
                  <div className={`w-16 h-16 mx-auto ${season.bgColor} rounded-full flex items-center justify-center mb-3 text-3xl group-hover:animate-wiggle`}>
                    {season.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    {season.months}
                  </p>
                  <h3 className={`text-lg font-bold ${season.color} leading-tight`}>
                    {season.name}
                  </h3>
                </div>
                {season.name === '休業期間' && (
                  <p className="text-xs text-gray-500 mt-2">
                    冬季は日本海の荒波のためお休みをいただきます
                  </p>
                )}
                {season.months === '2月〜5月' && (
                  <p className="text-xs text-gray-500 mt-2">
                    水温の上昇とともに魚の活性が上がります
                  </p>
                )}
                {season.months === '6月〜9月' && (
                  <p className="text-xs text-gray-500 mt-2">
                    旬のイカ釣りシーズン
                  </p>
                )}
                {season.months === '10月〜12月' && (
                  <p className="text-xs text-gray-500 mt-2">
                    多彩な魚種との出会い
                  </p>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade" delay={400}>
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              ※時期は気候や海況により変動する場合がございます<br />
              ※詳細な出船スケジュールは予約カレンダーをご確認ください
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
