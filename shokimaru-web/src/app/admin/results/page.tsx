import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { DeleteButton } from './DeleteButton'
import { TogglePublicButton } from './TogglePublicButton'

export default async function AdminResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string; order?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const sort = params.sort || 'date'
  const order = params.order || 'desc'
  const itemsPerPage = 10

  const supabase = await createClient()
  
  const { data: results, count } = await supabase
    .from('fishing_results')
    .select('*', { count: 'exact' })
    .order(sort, { ascending: order === 'asc' })
    .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)

  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">釣果管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            釣果の一覧表示と管理を行います
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/results/new"
            className="block rounded-md bg-sky-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            新規登録
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <a
                        href={`?sort=date&order=${sort === 'date' && order === 'desc' ? 'asc' : 'desc'}`}
                        className="group inline-flex"
                      >
                        日付
                        {sort === 'date' && (
                          <span className="ml-2 flex-none rounded text-gray-400">
                            {order === 'desc' ? '↓' : '↑'}
                          </span>
                        )}
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      天候
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      月齢
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      潮
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <a
                        href={`?sort=catch_count&order=${sort === 'catch_count' && order === 'desc' ? 'asc' : 'desc'}`}
                        className="group inline-flex"
                      >
                        釣果数
                        {sort === 'catch_count' && (
                          <span className="ml-2 flex-none rounded text-gray-400">
                            {order === 'desc' ? '↓' : '↑'}
                          </span>
                        )}
                      </a>
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      人数
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      サイズ
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      公開状態
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results?.map((result) => (
                    <tr key={result.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {formatDate(result.date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.weather || '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.moon_age !== null ? `${result.moon_age}日` : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.tide_type || '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.catch_count}匹
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.participants_count ? `${result.participants_count}名` : '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {result.size || '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <TogglePublicButton
                          resultId={result.id}
                          isPublic={result.is_public}
                        />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/admin/results/${result.id}/edit`}
                          className="text-sky-600 hover:text-sky-900 mr-4"
                        >
                          編集
                        </Link>
                        <DeleteButton resultId={result.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-1 justify-between sm:hidden">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}&sort=${sort}&order=${order}`}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                前へ
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`?page=${page + 1}&sort=${sort}&order=${order}`}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                次へ
              </Link>
            )}
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                全 <span className="font-medium">{count}</span> 件中{' '}
                <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> -
                <span className="font-medium">
                  {Math.min(page * itemsPerPage, count || 0)}
                </span>{' '}
                件を表示
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {page > 1 && (
                  <Link
                    href={`?page=${page - 1}&sort=${sort}&order=${order}`}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">前へ</span>
                    ←
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`?page=${pageNum}&sort=${sort}&order=${order}`}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      pageNum === page
                        ? 'z-10 bg-sky-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link
                    href={`?page=${page + 1}&sort=${sort}&order=${order}`}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">次へ</span>
                    →
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}