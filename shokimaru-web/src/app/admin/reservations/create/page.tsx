'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import LoadingButton from '@/components/LoadingButton'
import { Toast } from '@/components/Toast'

interface FishingPlan {
  id: string
  name: string
  description: string
  duration_hours: number
  base_price: number
  max_capacity: number
  min_capacity: number
  includes: string[]
  target_fish: string[]
  skill_level: string
  charter_type: string
  rental_available: boolean
  rental_details: string | null
}

interface ReservationSlot {
  id: string
  plan_id: string
  date: string
  start_time: string
  available_capacity: number
  special_price: number | null
  status: string
  fishing_plans: {
    name: string
    base_price: number
    max_capacity: number
  }
}

export default function AdminReservationCreatePage() {
  const router = useRouter()
  const [plans, setPlans] = useState<FishingPlan[]>([])
  const [slots, setSlots] = useState<ReservationSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // フォームデータ
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerKana, setCustomerKana] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [participants, setParticipants] = useState('1')
  const [charterType, setCharterType] = useState<'shared' | 'charter'>('shared')
  const [specialRequests, setSpecialRequests] = useState('')
  const [internalNotes, setInternalNotes] = useState('')
  const [reservationSource, setReservationSource] = useState<'phone' | 'line' | 'instagram' | 'other'>('phone')
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetchPlans()
  }, [])

  useEffect(() => {
    if (selectedPlan) {
      fetchAvailableSlots()
    }
  }, [selectedPlan])

  useEffect(() => {
    calculatePrice()
  }, [selectedSlot, participants])

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

  const fetchAvailableSlots = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('reservation_slots')
        .select(`
          *,
          fishing_plans!inner(name, base_price, max_capacity)
        `)
        .eq('plan_id', selectedPlan)
        .gte('date', new Date().toISOString().split('T')[0])
        .gt('available_capacity', 0)
        .order('date')
        .order('start_time')

      if (error) throw error
      setSlots(data || [])
    } catch (error) {
      console.error('Error fetching slots:', error)
      setToast({ message: '予約枠の取得に失敗しました', type: 'error' })
    }
  }

  const calculatePrice = () => {
    if (!selectedSlot || !participants) return

    const slot = slots.find(s => s.id === selectedSlot)
    if (slot) {
      const pricePerPerson = slot.special_price || slot.fishing_plans.base_price
      setTotalPrice(pricePerPerson * parseInt(participants))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot || !selectedPlan) {
      setToast({ message: '予約日時とプランを選択してください', type: 'error' })
      return
    }

    setSubmitting(true)

    try {
      const supabase = createClient()
      const slot = slots.find(s => s.id === selectedSlot)
      if (!slot) throw new Error('予約枠が見つかりません')

      const reservationData = {
        reservation_number: `R${Date.now()}`,
        slot_id: selectedSlot,
        plan_id: selectedPlan,
        customer_name: customerName,
        customer_kana: customerKana,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        participants_count: parseInt(participants),
        total_price: totalPrice,
        participants_detail: [{
          name: customerName,
          age: '',
          experience_level: 'unknown'
        }],
        special_requests: specialRequests,
        internal_notes: `予約経路: ${reservationSource}\n${internalNotes}`,
        charter_type: charterType,
        status: 'confirmed' // 管理画面からの予約は確定済みとする
      }

      const { data: reservation, error } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select()
        .single()

      if (error) throw error

      // 予約枠の残り容量を更新
      const { error: updateError } = await supabase
        .from('reservation_slots')
        .update({ 
          available_capacity: slot.available_capacity - parseInt(participants),
          status: slot.available_capacity - parseInt(participants) <= 0 ? 'full' : 'available'
        })
        .eq('id', slot.id)

      if (updateError) throw updateError

      setToast({ message: '予約を作成しました', type: 'success' })
      
      setTimeout(() => {
        router.push('/admin/reservations')
      }, 1500)
    } catch (error) {
      console.error('Error creating reservation:', error)
      setToast({ message: '予約の作成に失敗しました', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">予約作成</h1>
          <p className="mt-2 text-sm text-gray-700">
            電話・LINE・Instagram等で受けた予約を手動で登録できます
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
        {/* 予約経路 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            予約経路 <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={reservationSource}
            onChange={(e) => setReservationSource(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="phone">電話</option>
            <option value="line">LINE</option>
            <option value="instagram">Instagram</option>
            <option value="other">その他</option>
          </select>
        </div>

        {/* 顧客情報 */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">顧客情報</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お名前（漢字） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="山田 太郎"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お名前（カタカナ） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerKana}
                onChange={(e) => setCustomerKana(e.target.value)}
                placeholder="ヤマダ タロウ"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="090-1234-5678"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="任意"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 予約内容 */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">予約内容</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                プラン <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={selectedPlan}
                onChange={(e) => {
                  setSelectedPlan(e.target.value)
                  setSelectedSlot('')
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">プランを選択してください</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} (¥{plan.base_price.toLocaleString()}/人)
                  </option>
                ))}
              </select>
            </div>

            {selectedPlan && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  予約日時 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">日時を選択してください</option>
                  {slots.map(slot => (
                    <option key={slot.id} value={slot.id}>
                      {new Date(slot.date).toLocaleDateString('ja-JP')} {slot.start_time.slice(0, 5)} 
                      (残り{slot.available_capacity}名)
                      {slot.special_price && ` - 特別料金 ¥${slot.special_price.toLocaleString()}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  参加人数 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}名</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  利用形態 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={charterType}
                  onChange={(e) => setCharterType(e.target.value as 'shared' | 'charter')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="shared">乗り合い</option>
                  <option value="charter">仕立て（貸切）</option>
                </select>
              </div>
            </div>

            {totalPrice > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-blue-900">
                  合計金額: ¥{totalPrice.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 備考 */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">備考</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お客様からの要望
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                placeholder="レンタル希望など"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                内部メモ
              </label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={3}
                placeholder="スタッフ間の申し送り事項など"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="border-t pt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/reservations')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            キャンセル
          </button>
          <LoadingButton
            type="submit"
            isLoading={submitting}
            disabled={!selectedSlot}
            className="px-4 py-2 text-sm font-medium"
          >
            予約を作成
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