import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          釣果情報が見つかりません
        </h2>
        <p className="text-gray-600 mb-8">
          お探しの釣果情報は存在しないか、非公開に設定されています。
        </p>
        <Link
          href="/results"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          釣果一覧に戻る
        </Link>
      </div>
    </div>
  )
}