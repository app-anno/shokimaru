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
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105 hover:animate-pulse-slow"
                  >
                    {result.image_url ? (
                      <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
                        <Image
                          src={result.image_url}
                          alt={`${formatDate(result.date)}の釣果`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">画像なし</span>
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-gray-600 mb-2 animate-fade-in">
                        {formatDate(result.date)}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl font-bold text-gradient animate-pulse-slow">
                          {result.catch_count}杯
                        </span>
                        {result.size && (
                          <span className="text-sm text-gray-500">
                            サイズ: {result.size}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-2">
                        {result.weather && (
                          <div className="flex items-center gap-2">
                            <span className="badge badge-secondary animate-wiggle" style={{ animationDelay: '0.5s' }}>
                              {result.weather}
                            </span>
                          </div>
                        )}
                        {result.moon_age !== null && (
                          <div className="flex items-center gap-2">
                            <span className="badge badge-primary animate-wiggle" style={{ animationDelay: '0.7s' }}>
                              月齢: {result.moon_age}日
                            </span>
                          </div>
                        )}
                        {result.tide_type && (
                          <div className="flex items-center gap-2">
                            <span className="badge badge-ocean animate-wiggle" style={{ animationDelay: '0.9s' }}>
                              {result.tide_type}
                            </span>
                          </div>
                        )}
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