import Link from 'next/link'

export default function AdminPage() {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">管理画面</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          翔葵丸の管理システムへようこそ
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/results"
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">釣果管理</h3>
            <p className="mt-2 text-sm text-gray-500">釣果の一覧表示、追加、編集、削除を行います</p>
          </div>
        </Link>
        <Link
          href="/admin/results/new"
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">新規釣果登録</h3>
            <p className="mt-2 text-sm text-gray-500">新しい釣果情報を登録します</p>
          </div>
        </Link>
      </div>
    </div>
  )
}