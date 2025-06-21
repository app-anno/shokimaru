'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TIDE_TYPES, WEATHER_TYPES } from '@/lib/constants/fishing'
import { uploadImage } from '@/lib/supabase/storage-client'
import { Database } from '@/types/database'
import { useToast } from '@/lib/hooks/useToast'
import Image from 'next/image'

type FishingResult = Database['public']['Tables']['fishing_results']['Row']
type FishingResultInsert = Database['public']['Tables']['fishing_results']['Insert']

interface FishingResultFormProps {
  defaultValues?: FishingResult
  isEdit?: boolean
}

export function FishingResultForm({ defaultValues, isEdit = false }: FishingResultFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.image_url || null
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('画像サイズは5MB以下にしてください')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      
      // 画像のアップロード
      let imageUrl = defaultValues?.image_url || null
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile)
        if (!uploadedUrl) {
          throw new Error('画像のアップロードに失敗しました')
        }
        imageUrl = uploadedUrl
      }

      const data: FishingResultInsert = {
        date: formData.get('date') as string,
        weather: formData.get('weather') as string || null,
        moon_age: formData.get('moon_age') ? parseInt(formData.get('moon_age') as string) : null,
        tide_type: formData.get('tide_type') as string || null,
        catch_count: parseInt(formData.get('catch_count') as string),
        size: formData.get('size') as string || null,
        participants_count: formData.get('participants_count') ? parseInt(formData.get('participants_count') as string) : null,
        image_url: imageUrl,
        is_public: formData.get('is_public') === 'true',
      }

      if (isEdit && defaultValues) {
        const { error } = await supabase
          .from('fishing_results')
          .update(data)
          .eq('id', defaultValues.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('fishing_results')
          .insert(data)

        if (error) throw error
      }

      showToast(isEdit ? '釣果を更新しました' : '釣果を登録しました', 'success')
      router.push('/admin/results')
      router.refresh()
    } catch (err) {
      console.error('エラー:', err)
      setError(err instanceof Error ? err.message : '保存に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-lg p-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">エラー</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            日付 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            defaultValue={defaultValues?.date || new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="catch_count" className="block text-sm font-medium text-gray-700">
            釣果数 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="catch_count"
            id="catch_count"
            required
            min="0"
            defaultValue={defaultValues?.catch_count || 0}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="participants_count" className="block text-sm font-medium text-gray-700">
            釣行人数
          </label>
          <input
            type="number"
            name="participants_count"
            id="participants_count"
            min="1"
            max="6"
            placeholder="例: 3"
            defaultValue={defaultValues?.participants_count || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="weather" className="block text-sm font-medium text-gray-700">
            天候
          </label>
          <select
            name="weather"
            id="weather"
            defaultValue={defaultValues?.weather || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            {WEATHER_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tide_type" className="block text-sm font-medium text-gray-700">
            潮
          </label>
          <select
            name="tide_type"
            id="tide_type"
            defaultValue={defaultValues?.tide_type || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            {TIDE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="moon_age" className="block text-sm font-medium text-gray-700">
            月齢（0-29）
          </label>
          <input
            type="number"
            name="moon_age"
            id="moon_age"
            min="0"
            max="29"
            defaultValue={defaultValues?.moon_age || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            サイズ
          </label>
          <input
            type="text"
            name="size"
            id="size"
            placeholder="例: 20-30cm"
            defaultValue={defaultValues?.size || ''}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          画像
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-sky-50 file:text-sky-700
            hover:file:bg-sky-100"
        />
        <p className="mt-1 text-sm text-gray-500">最大5MBまでの画像ファイル</p>
        {imagePreview && (
          <div className="mt-4 relative h-48 w-96">
            <Image
              src={imagePreview}
              alt="プレビュー"
              fill
              className="object-contain rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_public"
          id="is_public"
          value="true"
          defaultChecked={defaultValues?.is_public ?? true}
          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
        />
        <label htmlFor="is_public" className="ml-2 block text-sm text-gray-900">
          公開する
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin/results')}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : isEdit ? '更新' : '登録'}
        </button>
      </div>
    </form>
  )
}