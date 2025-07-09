'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingButton from '@/components/LoadingButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'

interface FishingPlan {
  id: string
  name: string
  base_price: number
  max_capacity: number
  duration_hours: number
  is_active: boolean
}

export default function AdminSlotsCreatePage() {
  const router = useRouter()
  const [plans, setPlans] = useState<FishingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // フォームデータ
  const [selectedPlan, setSelectedPlan] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTimes, setStartTimes] = useState<string[]>(['08:00'])
  const [daysOfWeek, setDaysOfWeek] = useState<boolean[]>([true, true, true, true, true, true, true])
  const [specialPrice, setSpecialPrice] = useState('')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('fishing_plans')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      if (error) throw error
      setPlans(data || [])
    } catch (error) {
      console.error('Error fetching plans:', error)
      setToast({ message: 'プランの取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const addStartTime = () => {
    setStartTimes([...startTimes, '08:00'])
  }

  const removeStartTime = (index: number) => {
    setStartTimes(startTimes.filter((_, i) => i !== index))
  }

  const updateStartTime = (index: number, value: string) => {
    const newStartTimes = [...startTimes]
    newStartTimes[index] = value
    setStartTimes(newStartTimes)
  }

  const toggleDayOfWeek = (index: number) => {
    const newDaysOfWeek = [...daysOfWeek]
    newDaysOfWeek[index] = !newDaysOfWeek[index]
    setDaysOfWeek(newDaysOfWeek)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const supabase = createClient()
      const plan = plans.find(p => p.id === selectedPlan)
      if (!plan) throw new Error('プランが選択されていません')

      const slots = []
      const start = new Date(startDate)
      const end = new Date(endDate)

      // 日付をループ
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay()
        
        // 選択された曜日のみ作成
        if (daysOfWeek[dayOfWeek]) {
          // 各開始時刻でスロットを作成
          for (const startTime of startTimes) {
            slots.push({
              plan_id: selectedPlan,
              date: date.toISOString().split('T')[0],
              start_time: startTime,
              available_capacity: plan.max_capacity,
              special_price: specialPrice ? parseInt(specialPrice) : null,
              status: 'available'
            })
          }
        }
      }

      if (slots.length === 0) {
        throw new Error('作成する予約枠がありません')
      }

      // バッチ挿入
      const { error } = await supabase
        .from('reservation_slots')
        .insert(slots)

      if (error) throw error

      setToast({ message: `${slots.length}件の予約枠を作成しました`, type: 'success' })
      setTimeout(() => {
        router.push('/admin/slots')
      }, 1500)
    } catch (error) {
      console.error('Error creating slots:', error)
      setToast({ message: error instanceof Error ? error.message : '予約枠の作成に失敗しました', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const dayNames = ['日', '月', '火', '水', '木', '金', '土']

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/slots"
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
          予約枠管理に戻る
        </Link>
      </div>

      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">予約枠の一括作成</h1>
          <p className="mt-2 text-sm text-gray-700">
            期間と曜日を指定して、複数の予約枠を一括で作成します
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                プラン <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  required
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="">プランを選択してください</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} (定員: {plan.max_capacity}名, 料金: ¥{plan.base_price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                開始日 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                終了日 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                曜日選択
              </label>
              <div className="mt-2 flex flex-wrap gap-3">
                {dayNames.map((day, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={daysOfWeek[index]}
                      onChange={() => toggleDayOfWeek(index)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-600 mr-2"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                開始時刻
              </label>
              <div className="mt-2 space-y-2">
                {startTimes.map((time, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => updateStartTime(index, e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    {startTimes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStartTime(index)}
                        className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                      >
                        削除
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStartTime}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  時刻を追加
                </button>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                特別料金（オプション）
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  min="0"
                  value={specialPrice}
                  onChange={(e) => setSpecialPrice(e.target.value)}
                  placeholder="通常料金を使用"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Link
            href="/admin/slots"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            キャンセル
          </Link>
          <LoadingButton
            type="submit"
            isLoading={submitting}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            作成
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