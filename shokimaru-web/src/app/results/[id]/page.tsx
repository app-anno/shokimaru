import { getFishingResultById } from '@/lib/supabase/fishing-results'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMoonPhaseEmoji } from '@/lib/constants/fishing'
import ImageCarousel from '@/components/ImageCarousel'

export default async function ResultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getFishingResultById(id)

  if (!result || !result.is_public) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/results"
          className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8"
        >
          ← 釣果一覧に戻る
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {(result.image_url || result.images?.length > 0) && (
            <div className="relative h-96 md:h-[500px]">
              {result.images && result.images.length > 0 ? (
                <ImageCarousel
                  images={result.images.map(img => img.image_url).filter(Boolean) as string[]}
                  alt={`${formatDate(result.date)}の釣果`}
                  className="absolute inset-0"
                  showBadge={false}
                  showIndicators={true}
                  autoPlayInterval={4000}
                />
              ) : result.image_url ? (
                <Image
                  src={result.image_url}
                  alt={`${formatDate(result.date)}の釣果`}
                  fill
                  className="object-contain bg-gray-100"
                  priority
                />
              ) : null}
            </div>
          )}

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {formatDate(result.date)}の釣果
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-sky-600">
                  {result.catch_count}匹
                </span>
                {result.participants_count && (
                  <span className="text-xl text-gray-700">
                    （1人平均: {Math.round(result.catch_count / result.participants_count)}匹）
                  </span>
                )}
                {result.size && (
                  <span className="text-lg text-gray-600">
                    サイズ: {result.size}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">釣果条件</h2>
                <dl className="space-y-2">
                  {result.weather && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">天候</dt>
                      <dd className="font-medium text-gray-900">{result.weather}</dd>
                    </div>
                  )}
                  {result.moon_age !== null && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">月齢</dt>
                      <dd className="font-medium text-gray-900">
                        {getMoonPhaseEmoji(result.moon_age)} {result.moon_age}日
                      </dd>
                    </div>
                  )}
                  {result.tide_type && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">潮</dt>
                      <dd className="font-medium text-gray-900">{result.tide_type}</dd>
                    </div>
                  )}
                  {result.participants_count && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">釣行人数</dt>
                      <dd className="font-medium text-gray-900">{result.participants_count}名</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">釣果のポイント</h2>
                <div className="bg-sky-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    {result.moon_age !== null && result.moon_age <= 3 && '新月前後は活性が高まりやすい時期です。'}
                    {result.moon_age !== null && result.moon_age >= 13 && result.moon_age <= 17 && '満月前後は大型が釣れやすい時期です。'}
                    {result.tide_type === '大潮' && '大潮は潮の動きが大きく、釣果が期待できます。'}
                    {result.tide_type === '中潮' && '中潮は安定した釣果が期待できます。'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  翔葵丸で、あなたも大漁の思い出を作りませんか？
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  予約・お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}