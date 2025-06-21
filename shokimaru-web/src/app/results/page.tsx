import { getFishingResults } from '@/lib/supabase/fishing-results'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

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
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">釣果情報</h1>
          <p className="text-lg text-gray-600">
            翔葵丸での最新の釣果をご紹介します
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">現在、表示できる釣果情報はありません。</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/results/${result.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {result.image_url ? (
                    <div className="aspect-w-16 aspect-h-9 relative h-48">
                      <Image
                        src={result.image_url}
                        alt={`${formatDate(result.date)}の釣果`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">画像なし</span>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-2">
                      {formatDate(result.date)}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-sky-600">
                        {result.catch_count}匹
                      </span>
                      {result.size && (
                        <span className="text-sm text-gray-500">
                          サイズ: {result.size}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {result.weather && (
                        <p>天候: {result.weather}</p>
                      )}
                      {result.moon_age !== null && (
                        <p>月齢: {result.moon_age}日</p>
                      )}
                      {result.tide_type && (
                        <p>潮: {result.tide_type}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  {page > 1 && (
                    <Link
                      href={`?page=${page - 1}`}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">前へ</span>
                      ←
                    </Link>
                  )}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = page - 2 + i
                    if (pageNum < 1 || pageNum > totalPages) return null
                    return (
                      <Link
                        key={pageNum}
                        href={`?page=${pageNum}`}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          pageNum === page
                            ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  }).filter(Boolean)}
                  {page < totalPages && (
                    <Link
                      href={`?page=${page + 1}`}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">次へ</span>
                      →
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}