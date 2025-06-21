import { FishingResultForm } from '../FishingResultForm'

export default function NewResultPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900">新規釣果登録</h1>
        <p className="mt-2 text-sm text-gray-700">
          新しい釣果情報を登録します
        </p>
      </div>
      <FishingResultForm />
    </div>
  )
}