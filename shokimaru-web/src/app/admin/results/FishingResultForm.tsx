'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TIDE_TYPES, WEATHER_TYPES } from '@/lib/constants/fishing'
import { uploadImage } from '@/lib/supabase/storage-client'
import { Database } from '@/types/database'
import { useToast } from '@/lib/hooks/useToast'
import Image from 'next/image'
import MultiImageUpload from '@/components/admin/MultiImageUpload'

type FishingResult = Database['public']['Tables']['fishing_results']['Row']
type FishingResultInsert = Database['public']['Tables']['fishing_results']['Insert']
type FishingResultImage = Database['public']['Tables']['fishing_result_images']['Row']

interface FishingResultWithImages extends FishingResult {
  images?: FishingResultImage[]
}

interface FishingResultFormProps {
  defaultValues?: FishingResultWithImages
  isEdit?: boolean
}

export function FishingResultForm({ defaultValues, isEdit = false }: FishingResultFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedImages, setSelectedImages] = useState<any[]>([])

  const handleImagesChange = (images: any[]) => {
    setSelectedImages(images)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      
      // メイン画像のアップロード（最初の画像）
      let mainImageUrl = defaultValues?.image_url || null
      const additionalImages: Array<{ url: string; order: number }> = []
      
      // 新しい画像をアップロード
      for (let i = 0; i < selectedImages.length; i++) {
        const img = selectedImages[i]
        if (img.file) {
          const uploadedUrl = await uploadImage(img.file)
          if (!uploadedUrl) {
            throw new Error(`画像${i + 1}のアップロードに失敗しました`)
          }
          if (i === 0) {
            mainImageUrl = uploadedUrl
          } else {
            additionalImages.push({ url: uploadedUrl, order: i })
          }
        } else if (img.isExisting) {
          if (i === 0) {
            mainImageUrl = img.url
          } else {
            additionalImages.push({ url: img.url, order: i })
          }
        }
      }

      const data: FishingResultInsert = {
        date: formData.get('date') as string,
        weather: formData.get('weather') as string || null,
        moon_age: formData.get('moon_age') ? parseInt(formData.get('moon_age') as string) : null,
        tide_type: formData.get('tide_type') as string || null,
        catch_count: parseInt(formData.get('catch_count') as string),
        size: formData.get('size') as string || null,
        participants_count: formData.get('participants_count') ? parseInt(formData.get('participants_count') as string) : null,
        image_url: mainImageUrl,
        is_public: formData.get('is_public') === 'true',
      }

      let resultId: string
      
      if (isEdit && defaultValues) {
        const { error } = await supabase
          .from('fishing_results')
          .update(data)
          .eq('id', defaultValues.id)

        if (error) throw error
        resultId = defaultValues.id
        
        // 既存の追加画像を削除
        await supabase
          .from('fishing_result_images')
          .delete()
          .eq('fishing_result_id', resultId)
      } else {
        const { data: newResult, error } = await supabase
          .from('fishing_results')
          .insert(data)
          .select()
          .single()

        if (error || !newResult) throw error
        resultId = newResult.id
      }
      
      // 追加画像を保存
      if (additionalImages.length > 0) {
        const imagesToInsert = additionalImages.map(img => ({
          fishing_result_id: resultId,
          image_url: img.url,
          display_order: img.order
        }))
        
        const { error: imageError } = await supabase
          .from('fishing_result_images')
          .insert(imagesToInsert)
          
        if (imageError) throw imageError
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          画像（最大3枚）
        </label>
        <MultiImageUpload
          existingImages={defaultValues?.images || []}
          onImagesChange={handleImagesChange}
          maxImages={3}
        />
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