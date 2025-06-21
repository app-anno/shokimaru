import { getFishingResults } from '@/lib/supabase/fishing-results'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import FloatingElements from '@/components/FloatingElements'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '釣果情報',
  description: '翔葵丸での最新の釣果をご紹介します。イカ釣りの実績と釣果写真をご覧ください。',
  openGraph: {
    title: '釣果情報 | 翔葵丸',
    description: '翔葵丸での最新の釣果をご紹介。イカ釣りの実績と釣果写真。',
  },
  alternates: {
    canonical: '/results',
  },
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const itemsPerPage = 12

  const allResults = await getFishingResults()
  const totalPages = Math.ceil(allResults.length / itemsPerPage)
  const results = allResults.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      <FloatingElements />
      
      {/* ヘッダーセクション */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-ocean-light/30 to-primary-200/30 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient ">釣果情報</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600">
              翔葵丸での最新の釣果をご紹介します
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">{/* ヘッダーセクションをcontainerの外に移動 */}

        {results.length === 0 ? (
          <AnimatedSection animation="fade">
            <div className="text-center py-12">
              <p className="text-gray-500">現在、表示できる釣果情報はありません。</p>
            </div>
          </AnimatedSection>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <AnimatedSection key={result.id} animation="zoom" delay={index * 100}>
                  <Link
                    href={`/results/${result.id}`}
                    className="block bg-gradient-to-br from-white via-white to-primary-50/30 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      {/* 装飾的な背景要素 */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-secondary-200/20 to-ocean-light/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
                      
                      {result.image_url ? (
                        <div className="aspect-square relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                          <Image
                            src={result.image_url}
                            alt={`${formatDate(result.date)}の釣果`}
                            fill
                            className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                          />
                          {/* ホバー時のオーバーレイ */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                          
                          {/* 釣果数バッジ */}
                          <div className="absolute top-4 right-4 z-30">
                            <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-3 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                              <p className="text-3xl font-bold text-gradient">{result.catch_count}杯</p>
                            </div>
                          </div>
                          
                          {/* 日付ラベル */}
                          <div className="absolute top-4 left-4 z-30">
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl">
                              <p className="text-lg font-medium text-gray-800">
                                {new Date(result.date).toLocaleDateString('ja-JP', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          {/* 釣果詳細（画像上に配置） */}
                          <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
                            <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl">
                              <div className="grid grid-cols-3 gap-2 text-center">
                                {result.participants_count && (
                                  <>
                                    <div>
                                      <p className="text-[10px] text-gray-600">参加</p>
                                      <p className="text-sm font-bold text-gray-800">{result.participants_count}名</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-gray-600">平均</p>
                                      <p className="text-sm font-bold text-primary-600">{Math.round(result.catch_count / result.participants_count)}杯</p>
                                    </div>
                                  </>
                                )}
                                {result.size && (
                                  <div className={result.participants_count ? '' : 'col-span-3'}>
                                    <p className="text-[10px] text-gray-600">サイズ</p>
                                    <p className="text-sm font-bold text-gray-800">{result.size}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-primary-50 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 animate-pulse" />
                          <svg className="w-32 h-32 text-gray-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6 relative z-10">
                      {/* 条件表示 */}
                      <div className="space-y-3 mb-4">
                        <div className="grid grid-cols-2 gap-3">
                          {result.weather && (
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-2.5 shadow border border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                                  {result.weather === '晴れ' && (
                                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"/>
                                    </svg>
                                  )}
                                  {result.weather === '曇り' && (
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4c.34 0 .67.04 1 .13C7.1 7.13 9.4 5 12.5 5c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
                                    </svg>
                                  )}
                                  {result.weather === '雨' && (
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-3 6m0 0l-3-6m3 6v-6m-3-2l-3 6m0 0l-3-6m3 6v-6M7 10V7a5 5 0 0110 0v3"/>
                                    </svg>
                                  )}
                                  {!['晴れ', '曇り', '雨'].includes(result.weather) && (
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="text-[10px] text-gray-500 leading-tight">天候</p>
                                  <p className="text-xs font-bold text-gray-800">{result.weather}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          {result.tide_type && (
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-2.5 shadow border border-blue-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                                  {result.tide_type === '大潮' && (
                                    <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.2-.7 1.5l3.2 3.2c.3-.2.7-.3 1.1-.3.3 0 .6.1.9.2l2.3-2.3c-.1-.3-.2-.6-.2-.9 0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.2-.7 1.5l3.2 3.2c.3-.2.7-.3 1.1-.3 1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2c0-.4.1-.8.3-1.1l-3.2-3.2c-.3.4-.9.7-1.5.7-.4 0-.8-.1-1.1-.3l-2.3 2.3c.1.3.2.6.2.9 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6.3-1.2.7-1.5l-3.2-3.2c-.3.2-.7.3-1.1.3C3.9 14 3 13.1 3 12z"/>
                                    </svg>
                                  )}
                                  {result.tide_type === '中潮' && (
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                                    </svg>
                                  )}
                                  {result.tide_type === '小潮' && (
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                                    </svg>
                                  )}
                                  {!['大潮', '中潮', '小潮'].includes(result.tide_type) && (
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="text-[10px] text-gray-500 leading-tight">潮</p>
                                  <p className="text-xs font-bold text-gray-800">{result.tide_type}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {result.moon_age !== null && (
                          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-2.5 shadow border border-indigo-100">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 relative flex-shrink-0">
                                {result.moon_age <= 1 && (
                                  <div className="w-full h-full rounded-full bg-gray-900 border border-gray-600" />
                                )}
                                {result.moon_age > 1 && result.moon_age <= 6 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-l from-gray-900 to-yellow-100 border border-yellow-300" />
                                )}
                                {result.moon_age > 6 && result.moon_age <= 8 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-100 to-gray-900 border border-yellow-300" />
                                )}
                                {result.moon_age > 8 && result.moon_age <= 13 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-l from-gray-900 via-yellow-100 to-yellow-100 border border-yellow-300" />
                                )}
                                {result.moon_age > 13 && result.moon_age <= 16 && (
                                  <div className="w-full h-full rounded-full bg-yellow-100 border border-yellow-400" />
                                )}
                                {result.moon_age > 16 && result.moon_age <= 21 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-100 via-yellow-100 to-gray-900 border border-yellow-300" />
                                )}
                                {result.moon_age > 21 && result.moon_age <= 23 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-l from-yellow-100 to-gray-900 border border-gray-500" />
                                )}
                                {result.moon_age > 23 && (
                                  <div className="w-full h-full rounded-full bg-gray-900 border border-gray-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-[10px] text-gray-500 leading-tight">月齢</p>
                                  <p className="text-xs font-bold text-gray-800">{result.moon_age}日</p>
                                </div>
                                <p className="text-[10px] text-gray-600">
                                  {result.moon_age <= 1 && '新月'}
                                  {result.moon_age > 1 && result.moon_age <= 6 && '三日月'}
                                  {result.moon_age > 6 && result.moon_age <= 8 && '上弦'}
                                  {result.moon_age > 8 && result.moon_age <= 13 && '十日月'}
                                  {result.moon_age > 13 && result.moon_age <= 16 && '満月'}
                                  {result.moon_age > 16 && result.moon_age <= 21 && '下弦'}
                                  {result.moon_age > 21 && result.moon_age <= 23 && '二十三夜'}
                                  {result.moon_age > 23 && '晦日月'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      
                      {/* ホバーアクション */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center py-3 rounded-xl text-sm font-medium shadow-lg">
                          詳細を見る →
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            {totalPages > 1 && (
              <AnimatedSection animation="fade" delay={800}>
                <div className="mt-12 flex justify-center">
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-lg animate-slide-in-up" aria-label="Pagination">
                    {page > 1 && (
                      <Link
                        href={`?page=${page - 1}`}
                        className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-primary-50 hover:text-primary-600 focus:z-20 focus:outline-offset-0 transition-all duration-300 hover:animate-wiggle"
                      >
                        <span className="sr-only">前へ</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </Link>
                    )}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = page - 2 + i
                      if (pageNum < 1 || pageNum > totalPages) return null
                      return (
                        <Link
                          key={pageNum}
                          href={`?page=${pageNum}`}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                            pageNum === page
                              ? 'z-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 animate-pulse-slow'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-primary-50 hover:text-primary-600 focus:z-20 focus:outline-offset-0 hover:animate-wiggle'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    }).filter(Boolean)}
                    {page < totalPages && (
                      <Link
                        href={`?page=${page + 1}`}
                        className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-primary-50 hover:text-primary-600 focus:z-20 focus:outline-offset-0 transition-all duration-300 hover:animate-wiggle"
                      >
                        <span className="sr-only">次へ</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </nav>
                </div>
              </AnimatedSection>
            )}
          </>
        )}
      </div>
    </div>
  )
}