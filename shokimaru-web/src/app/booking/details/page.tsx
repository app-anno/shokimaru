'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AnimatedSection from '@/components/AnimatedSection'
import LoadingSpinner from '@/components/LoadingSpinner'
import LoadingButton from '@/components/LoadingButton'
import { Toast } from '@/components/Toast'
import Link from 'next/link'

interface ReservationSlot {
  id: string
  plan_id: string
  date: string
  start_time: string
  available_capacity: number
  special_price: number | null
}

interface FishingPlan {
  id: string
  name: string
  base_price: number
  duration_hours: number
  min_capacity: number
  max_capacity: number
  charter_type: string
  rental_available: boolean
  rental_details: string | null
}

interface ReservationOption {
  id: string
  name: string
  price: number
  description: string
}

interface RentalItem {
  id: string
  name: string
  price: number
  description: string
}

interface PlanRentalItem {
  rental_item_id: string
  is_included: boolean
  rental_items: RentalItem
}

interface Participant {
  name: string
  age: string
  experience_level: string
}

export default function BookingDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const slotId = searchParams.get('slot')
  const planId = searchParams.get('plan')

  const [slot, setSlot] = useState<ReservationSlot | null>(null)
  const [plan, setPlan] = useState<FishingPlan | null>(null)
  const [options, setOptions] = useState<ReservationOption[]>([])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({})
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([])
  const [planRentalItems, setPlanRentalItems] = useState<PlanRentalItem[]>([])
  const [selectedRentals, setSelectedRentals] = useState<Record<string, number>>({})
  
  // フォームデータ
  const [customerName, setCustomerName] = useState('')
  const [customerKana, setCustomerKana] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [participantsCount, setParticipantsCount] = useState(1)
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', age: '', experience_level: 'beginner' }
  ])
  const [specialRequests, setSpecialRequests] = useState('')
  const [charterType, setCharterType] = useState<string>('shared')
  
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (!slotId || !planId) {
      router.push('/booking')
      return
    }
    fetchData()
  }, [slotId, planId])

  const fetchData = async () => {
    try {
      // スロット情報を取得
      const supabase = createClient()
      const { data: slotData, error: slotError } = await supabase
        .from('reservation_slots')
        .select('*')
        .eq('id', slotId)
        .single()

      if (slotError) throw slotError
      setSlot(slotData)

      // プラン情報を取得
      const { data: planData, error: planError } = await supabase
        .from('fishing_plans')
        .select('*')
        .eq('id', planId)
        .single()

      if (planError) throw planError
      setPlan(planData)

      // プランに応じて仕立て/乗り合いのデフォルト値を設定
      if (planData.charter_type === 'charter') {
        setCharterType('charter')
      } else {
        setCharterType('shared')
      }

      // オプションを取得
      const { data: optionsData, error: optionsError } = await supabase
        .from('reservation_options')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (optionsError) throw optionsError
      setOptions(optionsData || [])

      // このプランで利用可能なレンタル機材を取得
      const { data: availableRentals, error: availableRentalsError } = await supabase
        .from('plan_rental_items')
        .select(`
          rental_item_id,
          is_included,
          custom_price,
          custom_description,
          display_order,
          rental_items!inner(*)
        `)
        .eq('plan_id', planId)
        .eq('is_active', true)
        .order('display_order')

      if (availableRentalsError) throw availableRentalsError
      
      // レンタル機材の情報を整形
      const rentals = (availableRentals || []).map(item => ({
        id: item.rental_items.id,
        name: item.rental_items.name,
        price: item.custom_price ?? item.rental_items.price,
        description: item.custom_description ?? item.rental_items.description
      }))
      
      setRentalItems(rentals)

      // プランに含まれるレンタル機材を取得
      const { data: planRentalData, error: planRentalError } = await supabase
        .from('plan_rental_items')
        .select(`
          rental_item_id,
          is_included,
          rental_items!inner(*)
        `)
        .eq('plan_id', planId)

      if (planRentalError) throw planRentalError
      setPlanRentalItems(planRentalData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setToast({ message: 'データの取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleParticipantsCountChange = (count: number) => {
    if (!plan) return
    
    const newCount = Math.max(plan.min_capacity, Math.min(count, plan.max_capacity))
    setParticipantsCount(newCount)
    
    // 参加者配列を調整
    const newParticipants = [...participants]
    while (newParticipants.length < newCount) {
      newParticipants.push({ name: '', age: '', experience_level: 'beginner' })
    }
    while (newParticipants.length > newCount) {
      newParticipants.pop()
    }
    setParticipants(newParticipants)
  }

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const newParticipants = [...participants]
    newParticipants[index] = { ...newParticipants[index], [field]: value }
    setParticipants(newParticipants)
  }

  const handleOptionChange = (optionId: string, quantity: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: quantity
    }))
  }

  const handleRentalChange = (rentalId: string, quantity: number) => {
    setSelectedRentals(prev => ({
      ...prev,
      [rentalId]: quantity
    }))
  }

  const calculateTotal = () => {
    if (!plan || !slot) return 0
    
    const basePrice = (slot.special_price || plan.base_price) * participantsCount
    const optionsPrice = Object.entries(selectedOptions).reduce((total, [optionId, quantity]) => {
      const option = options.find(o => o.id === optionId)
      return total + (option ? option.price * quantity : 0)
    }, 0)
    
    const rentalsPrice = Object.entries(selectedRentals).reduce((total, [rentalId, quantity]) => {
      const rental = rentalItems.find(r => r.id === rentalId)
      if (!rental) return total
      
      // プランに含まれている（無料）の場合は0円
      const isIncluded = planRentalItems.some(pr => 
        pr.rental_item_id === rentalId && pr.is_included
      )
      return total + (isIncluded ? 0 : rental.price * quantity)
    }, 0)
    
    return basePrice + optionsPrice + rentalsPrice
  }

  const generateReservationNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `R${year}${month}${day}${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!slot || !plan) return

    setSubmitting(true)
    
    try {
      // 予約を作成
      const supabase = createClient()
      const reservationData = {
        reservation_number: generateReservationNumber(),
        slot_id: slot.id,
        plan_id: plan.id,
        customer_name: customerName,
        customer_kana: customerKana,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        participants_count: participantsCount,
        total_price: calculateTotal(),
        participants_detail: participants,
        special_requests: specialRequests,
        charter_type: charterType,
        status: 'pending'
      }

      const { data: reservation, error: reservationError } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select()
        .single()

      if (reservationError) throw reservationError

      // オプションを保存
      const optionItems = Object.entries(selectedOptions)
        .filter(([_, quantity]) => quantity > 0)
        .map(([optionId, quantity]) => ({
          reservation_id: reservation.id,
          option_id: optionId,
          quantity
        }))

      if (optionItems.length > 0) {
        const { error: optionsError } = await supabase
          .from('reservation_option_items')
          .insert(optionItems)

        if (optionsError) throw optionsError
      }

      // レンタル機材を保存
      const rentalItemsToSave = Object.entries(selectedRentals)
        .filter(([_, quantity]) => quantity > 0)
        .map(([rentalId, quantity]) => {
          const rental = rentalItems.find(r => r.id === rentalId)
          return {
            reservation_id: reservation.id,
            rental_item_id: rentalId,
            quantity,
            price_per_item: rental?.price || 0
          }
        })

      if (rentalItemsToSave.length > 0) {
        const { error: rentalsError } = await supabase
          .from('reservation_rental_items')
          .insert(rentalItemsToSave)

        if (rentalsError) throw rentalsError
      }

      // 予約枠の残り容量を更新
      const { error: updateError } = await supabase
        .from('reservation_slots')
        .update({ 
          available_capacity: slot.available_capacity - participantsCount,
          status: slot.available_capacity - participantsCount <= 0 ? 'full' : 'available'
        })
        .eq('id', slot.id)

      if (updateError) throw updateError

      setToast({ message: '予約が完了しました', type: 'success' })
      
      // 完了画面へ遷移
      setTimeout(() => {
        router.push(`/booking/complete?reservation=${reservation.reservation_number}`)
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

  if (!slot || !plan) {
    return <div>予約情報が見つかりません</div>
  }

  const price = slot.special_price || plan.base_price

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <div className="mb-8">
            <Link
              href={`/booking/calendar?plan=${planId}`}
              className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
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
              日程選択に戻る
            </Link>
            <h1 className="text-4xl font-bold text-center mb-2">
              予約情報を入力
            </h1>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">選択したプラン</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">プラン</p>
                  <p className="font-semibold">{plan.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">日時</p>
                  <p className="font-semibold">
                    {new Date(slot.date).toLocaleDateString('ja-JP')} {slot.start_time.slice(0, 5)}〜
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">所要時間</p>
                  <p className="font-semibold">{plan.duration_hours}時間</p>
                </div>
                <div>
                  <p className="text-gray-600">料金</p>
                  <p className="font-semibold">¥{price.toLocaleString()}/人</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <form onSubmit={handleSubmit}>
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">代表者情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      フリガナ
                    </label>
                    <input
                      type="text"
                      value={customerKana}
                      onChange={(e) => setCustomerKana(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {plan.charter_type !== 'shared' && (
              <AnimatedSection>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">予約タイプ</h2>
                  <div className="space-y-3">
                    {(plan.charter_type === 'both' || plan.charter_type === 'shared') && (
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="charterType"
                          value="shared"
                          checked={charterType === 'shared'}
                          onChange={(e) => setCharterType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-semibold">乗り合い</p>
                          <p className="text-sm text-gray-600">他のお客様と一緒に乗船します</p>
                        </div>
                      </label>
                    )}
                    {(plan.charter_type === 'both' || plan.charter_type === 'charter') && (
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="charterType"
                          value="charter"
                          checked={charterType === 'charter'}
                          onChange={(e) => setCharterType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <p className="font-semibold">仕立て（貸切）</p>
                          <p className="text-sm text-gray-600">お客様グループのみで貸切利用</p>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {plan.rental_available && plan.rental_details && (
              <AnimatedSection>
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-2 text-blue-800">レンタル機材について</h2>
                  <p className="text-blue-700">{plan.rental_details}</p>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">参加人数</h2>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleParticipantsCountChange(participantsCount - 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    disabled={participantsCount <= plan.min_capacity}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-2xl font-semibold w-16 text-center">{participantsCount}</span>
                  <button
                    type="button"
                    onClick={() => handleParticipantsCountChange(participantsCount + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    disabled={participantsCount >= Math.min(plan.max_capacity, slot.available_capacity)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {plan.min_capacity}〜{Math.min(plan.max_capacity, slot.available_capacity)}名
                </p>
              </div>
            </AnimatedSection>

            {options.length > 0 && (
              <AnimatedSection>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">オプション</h2>
                  <div className="space-y-4">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                          <p className="text-sm font-semibold">¥{option.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOptionChange(option.id, Math.max(0, (selectedOptions[option.id] || 0) - 1))}
                            className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center">{selectedOptions[option.id] || 0}</span>
                          <button
                            type="button"
                            onClick={() => handleOptionChange(option.id, (selectedOptions[option.id] || 0) + 1)}
                            className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {rentalItems.length > 0 && (
              <AnimatedSection>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">レンタル機材</h2>
                  <div className="space-y-4">
                    {rentalItems.map((rental) => {
                      const planRental = planRentalItems.find(pr => pr.rental_item_id === rental.id)
                      const isIncluded = planRental?.is_included || false
                      
                      return (
                        <div key={rental.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{rental.name}</p>
                            <p className="text-sm text-gray-600">{rental.description}</p>
                            <p className="text-sm font-semibold">
                              {isIncluded ? (
                                <span className="text-green-600">プランに含まれています（無料）</span>
                              ) : (
                                <span>¥{rental.price.toLocaleString()}</span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleRentalChange(rental.id, Math.max(0, (selectedRentals[rental.id] || 0) - 1))}
                              className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center">{selectedRentals[rental.id] || 0}</span>
                            <button
                              type="button"
                              onClick={() => handleRentalChange(rental.id, (selectedRentals[rental.id] || 0) + 1)}
                              className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">特別な要望</h2>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="その他ご要望があればご記入ください"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">合計金額</h2>
                  <p className="text-3xl font-bold text-blue-600">
                    ¥{calculateTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="text-center">
                <LoadingButton
                  type="submit"
                  isLoading={submitting}
                  className="px-8 py-3 text-lg"
                >
                  予約を確定する
                </LoadingButton>
              </div>
            </AnimatedSection>
          </form>
        </div>
      </div>

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