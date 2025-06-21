import { notFound } from 'next/navigation'
import { getFishingResultById } from '@/lib/supabase/fishing-results'
import { FishingResultForm } from '../../FishingResultForm'

export default async function EditResultPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getFishingResultById(id)

  if (!result) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">釣果編集</h1>
        <p className="mt-2 text-sm text-gray-700">
          釣果情報を編集します
        </p>
      </div>
      <FishingResultForm defaultValues={result} isEdit />
    </div>
  )
}