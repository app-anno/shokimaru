'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingButton from '@/components/LoadingButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'
import Image from 'next/image'

interface FishingPlan {
  id: string
  name: string
  description: string
  duration_hours: number
  base_price: number
  min_capacity: number
  max_capacity: number
  skill_level: string
  includes: string[]
  target_fish: string[]
  display_order: number
  charter_type: string
  rental_available: boolean
  rental_details: string | null
  is_active: boolean
  image_url: string | null
}

export default function AdminPlansEditPage() {
  const router = useRouter()
  const params = useParams()
  const planId = params.id as string

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // フォームデータ
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [durationHours, setDurationHours] = useState(4)
  const [basePrice, setBasePrice] = useState(10000)
  const [minCapacity, setMinCapacity] = useState(1)
  const [maxCapacity, setMaxCapacity] = useState(10)
  const [skillLevel, setSkillLevel] = useState('beginner')
  const [includes, setIncludes] = useState<string[]>([''])
  const [targetFish, setTargetFish] = useState<string[]>([''])
  const [displayOrder, setDisplayOrder] = useState(0)
  const [charterType, setCharterType] = useState('both')
  const [rentalAvailable, setRentalAvailable] = useState(true)
  const [rentalDetails, setRentalDetails] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchPlan()
  }, [planId])

  const fetchPlan = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('fishing_plans')
        .select('*')
        .eq('id', planId)
        .single()

      if (error) throw error

      if (data) {
        setName(data.name)
        setDescription(data.description)
        setDurationHours(data.duration_hours)
        setBasePrice(data.base_price)
        setMinCapacity(data.min_capacity)
        setMaxCapacity(data.max_capacity)
        setSkillLevel(data.skill_level)
        setIncludes(data.includes.length > 0 ? data.includes : [''])
        setTargetFish(data.target_fish.length > 0 ? data.target_fish : [''])
        setDisplayOrder(data.display_order)
        setCharterType(data.charter_type)
        setRentalAvailable(data.rental_available)
        setRentalDetails(data.rental_details || '')
        setIsActive(data.is_active)
        setImageUrl(data.image_url || null)
      }
    } catch (error) {
      console.error('Error fetching plan:', error)
      setToast({ message: 'プランの取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleIncludeChange = (index: number, value: string) => {
    const newIncludes = [...includes]
    newIncludes[index] = value
    setIncludes(newIncludes)
  }

  const addInclude = () => {
    setIncludes([...includes, ''])
  }

  const removeInclude = (index: number) => {
    setIncludes(includes.filter((_, i) => i !== index))
  }

  const handleTargetFishChange = (index: number, value: string) => {
    const newTargetFish = [...targetFish]
    newTargetFish[index] = value
    setTargetFish(newTargetFish)
  }

  const addTargetFish = () => {
    setTargetFish([...targetFish, ''])
  }

  const removeTargetFish = (index: number) => {
    setTargetFish(targetFish.filter((_, i) => i !== index))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // プレビュー用のURL生成
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return imageUrl

    setUploadingImage(true)
    try {
      const supabase = createClient()
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${planId}-${Date.now()}.${fileExt}`
      const filePath = `plans/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('fishing-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('fishing-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const supabase = createClient()
      
      // 画像アップロード
      let finalImageUrl = imageUrl
      if (imageFile) {
        finalImageUrl = await uploadImage()
      }

      const { error } = await supabase
        .from('fishing_plans')
        .update({
          name,
          description,
          duration_hours: durationHours,
          base_price: basePrice,
          min_capacity: minCapacity,
          max_capacity: maxCapacity,
          skill_level: skillLevel,
          includes: includes.filter(item => item.trim() !== ''),
          target_fish: targetFish.filter(fish => fish.trim() !== ''),
          display_order: displayOrder,
          charter_type: charterType,
          rental_available: rentalAvailable,
          rental_details: rentalDetails || null,
          is_active: isActive,
          image_url: finalImageUrl
        })
        .eq('id', planId)

      if (error) throw error

      setToast({ message: 'プランを更新しました', type: 'success' })
      setTimeout(() => {
        router.push('/admin/plans')
      }, 1500)
    } catch (error) {
      console.error('Error updating plan:', error)
      setToast({ message: 'プランの更新に失敗しました', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/plans"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          プラン一覧に戻る
        </Link>
      </div>

      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">プラン編集</h1>
          <p className="mt-2 text-sm text-gray-700">
            釣りプランの情報を編集します
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-600 mr-2"
                />
                <span className="text-sm font-medium text-gray-700">有効</span>
              </label>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                プラン名 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                説明 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                プラン画像
              </label>
              <div className="mt-2 space-y-4">
                {imageUrl && (
                  <div className="relative w-full max-w-md">
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div>
                  <label className="block">
                    <span className="sr-only">プラン画像を選択</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG, GIF 最大 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                所要時間（時間）
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  min="1"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseInt(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                基本料金（円）
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  value={basePrice}
                  onChange={(e) => setBasePrice(parseInt(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="skill" className="block text-sm font-medium leading-6 text-gray-900">
                対象レベル
              </label>
              <div className="mt-2">
                <select
                  id="skill"
                  name="skill"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="beginner">初心者向け</option>
                  <option value="intermediate">中級者向け</option>
                  <option value="advanced">上級者向け</option>
                  <option value="all">全レベル対応</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="min-capacity" className="block text-sm font-medium leading-6 text-gray-900">
                最小催行人数
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="min-capacity"
                  id="min-capacity"
                  min="1"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(parseInt(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="max-capacity" className="block text-sm font-medium leading-6 text-gray-900">
                最大定員
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="max-capacity"
                  id="max-capacity"
                  min="1"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="display-order" className="block text-sm font-medium leading-6 text-gray-900">
                表示順
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="display-order"
                  id="display-order"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="charter-type" className="block text-sm font-medium leading-6 text-gray-900">
                予約タイプ
              </label>
              <div className="mt-2">
                <select
                  id="charter-type"
                  name="charter-type"
                  value={charterType}
                  onChange={(e) => setCharterType(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="shared">乗り合いのみ</option>
                  <option value="charter">仕立て（貸切）のみ</option>
                  <option value="both">両方可能</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                レンタル機材
              </label>
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rentalAvailable}
                    onChange={(e) => setRentalAvailable(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-600 mr-2"
                  />
                  <span>レンタル機材あり</span>
                </label>
              </div>
            </div>

            {rentalAvailable && (
              <div className="sm:col-span-6">
                <label htmlFor="rental-details" className="block text-sm font-medium leading-6 text-gray-900">
                  レンタル機材の詳細
                </label>
                <div className="mt-2">
                  <textarea
                    id="rental-details"
                    name="rental-details"
                    rows={2}
                    value={rentalDetails}
                    onChange={(e) => setRentalDetails(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="例: 釣り竿、リール、仕掛け、ライフジャケットの無料レンタルあり"
                  />
                </div>
              </div>
            )}

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                含まれるもの
              </label>
              <div className="mt-2 space-y-2">
                {includes.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleIncludeChange(index, e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      placeholder="例: 釣り竿レンタル"
                    />
                    {includes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInclude(index)}
                        className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                      >
                        削除
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInclude}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  追加
                </button>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                対象魚
              </label>
              <div className="mt-2 space-y-2">
                {targetFish.map((fish, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={fish}
                      onChange={(e) => handleTargetFishChange(index, e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      placeholder="例: アジ"
                    />
                    {targetFish.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTargetFish(index)}
                        className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                      >
                        削除
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTargetFish}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  追加
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Link
            href="/admin/plans"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            キャンセル
          </Link>
          <LoadingButton
            type="submit"
            isLoading={submitting}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            更新
          </LoadingButton>
        </div>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}