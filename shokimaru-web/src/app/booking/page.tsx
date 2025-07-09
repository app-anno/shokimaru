'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AnimatedSection from '@/components/AnimatedSection'
import LoadingSpinner from '@/components/LoadingSpinner'
import LoadingButton from '@/components/LoadingButton'
import { Toast } from '@/components/Toast'
import Image from 'next/image'

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
  image_url: string | null
}

interface ReservationSlot {
  id: string
  plan_id: string
  date: string
  start_time: string
  available_capacity: number
  special_price: number | null
  status: string
}

type AvailabilityStatus = '○' | '△' | '×'

interface DateAvailability {
  date: Date
  status: AvailabilityStatus
  slots: ReservationSlot[]
}

export default function BookingPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<FishingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // カレンダー関連
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availability, setAvailability] = useState<DateAvailability[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableSlots, setAvailableSlots] = useState<ReservationSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<ReservationSlot | null>(null)

  // フォームデータ
  const [reservationType, setReservationType] = useState<'first' | 'repeat'>('first')
  const [name, setName] = useState('')
  const [nameKana, setNameKana] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [participants, setParticipants] = useState('1')
  const [experienceLevel, setExperienceLevel] = useState<'none' | 'beginner' | 'intermediate' | 'advanced'>('none')
  const [needsRental, setNeedsRental] = useState<'yes' | 'no'>('no')
  const [rentalQuantity, setRentalQuantity] = useState('1')
  const [specialRequests, setSpecialRequests] = useState('')

  useEffect(() => {
    fetchPlans()
  }, [])

  useEffect(() => {
    if (selectedPlan) {
      fetchAvailability()
    }
  }, [selectedPlan, currentMonth])

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

  const fetchAvailability = async () => {
    if (!selectedPlan) return

    try {
      const supabase = createClient()
      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

      const { data: slots, error } = await supabase
        .from('reservation_slots')
        .select('*')
        .eq('plan_id', selectedPlan)
        .gte('date', startOfMonth.toISOString().split('T')[0])
        .lte('date', endOfMonth.toISOString().split('T')[0])
        .order('date')
        .order('start_time')

      if (error) throw error

      // 日付ごとの空き状況を集計
      const dateMap = new Map<string, DateAvailability>()

      const slotsData = slots || []
      slotsData.forEach((slot: ReservationSlot) => {
        const dateStr = slot.date
        if (!dateMap.has(dateStr)) {
          dateMap.set(dateStr, {
            date: new Date(dateStr),
            status: '×',
            slots: []
          })
        }
        
        const dateAvail = dateMap.get(dateStr)!
        dateAvail.slots.push(slot)

        // ステータスの更新
        if (slot.available_capacity > 0) {
          if (dateAvail.status === '×') {
            dateAvail.status = '△'
          }
          if (slot.available_capacity >= 5) {
            dateAvail.status = '○'
          }
        } else {
          // 満席でも日付は表示（ただしクリック不可）
          if (dateAvail.status === '×') {
            dateAvail.status = '×'
          }
        }
      })

      setAvailability(Array.from(dateMap.values()))
      console.log('Fetched slots:', slots?.length || 0, 'Available dates:', dateMap.size)
    } catch (error) {
      console.error('Error fetching availability:', error)
    }
  }


  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const dateStr = date.toISOString().split('T')[0]
    const dateAvail = availability.find(a => a.date.toISOString().split('T')[0] === dateStr)
    if (dateAvail) {
      setAvailableSlots(dateAvail.slots.filter(s => s.available_capacity > 0))
    } else {
      setAvailableSlots([])
    }
    setSelectedSlot(null)
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
      const plan = plans.find(p => p.id === selectedPlan)
      if (!plan) throw new Error('プランが見つかりません')

      const reservationData = {
        reservation_number: `R${Date.now()}`,
        slot_id: selectedSlot.id,
        plan_id: selectedPlan,
        customer_name: name,
        customer_kana: nameKana,
        customer_phone: phone,
        customer_email: email,
        participants_count: parseInt(participants),
        total_price: (selectedSlot.special_price || plan.base_price) * parseInt(participants),
        participants_detail: [{
          name: name,
          age: '',
          experience_level: experienceLevel
        }],
        special_requests: specialRequests,
        charter_type: plan.charter_type === 'both' ? 'shared' : plan.charter_type,
        status: 'pending'
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
          available_capacity: selectedSlot.available_capacity - parseInt(participants),
          status: selectedSlot.available_capacity - parseInt(participants) <= 0 ? 'full' : 'available'
        })
        .eq('id', selectedSlot.id)

      if (updateError) throw updateError

      setToast({ message: '予約が完了しました', type: 'success' })
      
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

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const days = []

    // 曜日ヘッダー
    const weekDays = ['日', '月', '火', '水', '木', '金', '土']

    // 空白セル
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // 日付セル
    for (let date = 1; date <= lastDate; date++) {
      const currentDate = new Date(year, month, date)
      const dateStr = currentDate.toISOString().split('T')[0]
      const dateAvail = availability.find(a => a.date.toISOString().split('T')[0] === dateStr)
      const isPast = currentDate < new Date(new Date().setHours(0, 0, 0, 0))
      const isSelected = selectedDate?.toISOString().split('T')[0] === dateStr

      let statusSymbol = ''
      let statusColor = 'text-gray-400'
      let bgColor = 'bg-gray-100'
      let clickable = false

      if (dateAvail && !isPast) {
        statusSymbol = dateAvail.status
        if (dateAvail.status === '○') {
          statusColor = 'text-green-600'
          bgColor = 'bg-green-50 hover:bg-green-100'
          clickable = true
        } else if (dateAvail.status === '△') {
          statusColor = 'text-yellow-600'
          bgColor = 'bg-yellow-50 hover:bg-yellow-100'
          clickable = true
        } else {
          statusColor = 'text-red-600'
          bgColor = 'bg-red-50'
        }
      }

      if (isSelected) {
        bgColor = 'bg-blue-500 text-white'
        statusColor = 'text-white'
      }

      days.push(
        <div
          key={date}
          onClick={() => clickable && handleDateSelect(currentDate)}
          className={`p-2 text-center border rounded-lg ${clickable ? 'cursor-pointer' : 'cursor-not-allowed'} ${bgColor} ${isPast ? 'opacity-50' : ''}`}
        >
          <div className={`text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>{date}</div>
          {statusSymbol && (
            <div className={`text-xs font-bold ${statusColor}`}>{statusSymbol}</div>
          )}
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(year, month - 1))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-semibold">
            {year}年{month + 1}月
          </h3>
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(year, month + 1))}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-700 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-green-600 font-bold mr-1">○</span>
              <span>:全時間帯予約できます</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-600 font-bold mr-1">△</span>
              <span>:一部予約できます</span>
            </div>
            <div className="flex items-center">
              <span className="text-red-600 font-bold mr-1">×</span>
              <span>:定員の為予約できません</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-center mb-8">
            予約ページ
          </h1>
        </AnimatedSection>

        {/* 予約フォーム */}
        <AnimatedSection>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">

            {/* お名前（漢字） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                お名前（漢字）<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田 太郎"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* お名前（カタカナ） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                お名前（カタカナ）<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nameKana}
                onChange={(e) => setNameKana(e.target.value)}
                placeholder="ヤマダ タロウ"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="例：info@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 電話番号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電話番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ハイフン抜きの電話番号"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>


            {/* 希望プラン */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                希望プラン <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                {plans.map(plan => (
                  <label key={plan.id} className="block cursor-pointer">
                    <div className="border-2 rounded-lg p-4 hover:border-blue-500 transition-colors duration-200 flex items-start space-x-4"
                         style={{ borderColor: selectedPlan === plan.id ? '#3B82F6' : '#E5E7EB' }}>
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={selectedPlan === plan.id}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-24 h-24 flex-shrink-0">
                            <Image
                              src={plan.image_url || '/api/placeholder/400/300'}
                              alt={plan.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                            <p className="text-blue-600 font-semibold mt-2">
                              ¥{plan.base_price.toLocaleString()}/人
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 参加人数 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                参加人数 <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}名</option>
                ))}
              </select>
            </div>


            {/* レンタル希望 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                釣具レンタルを希望しますか？ <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={needsRental === 'yes'}
                    onChange={(e) => setNeedsRental(e.target.value as 'yes' | 'no')}
                    className="mr-2"
                  />
                  <span>希望する</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={needsRental === 'no'}
                    onChange={(e) => setNeedsRental(e.target.value as 'yes' | 'no')}
                    className="mr-2"
                  />
                  <span>希望しない</span>
                </label>
              </div>
              
              {/* レンタル数量 */}
              {needsRental === 'yes' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    レンタル数量
                  </label>
                  <select
                    value={rentalQuantity}
                    onChange={(e) => setRentalQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}セット</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-600 mt-2">
                    ※釣り竿、リール、仕掛け、ライフジャケットのセットです
                  </p>
                </div>
              )}
            </div>

            {/* 予約希望日 */}
            {selectedPlan && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  予約希望日 <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-4">予約日を選択して下さい</p>
                {renderCalendar()}
              </div>
            )}

            {/* 予約時間帯 */}
            {selectedDate && availableSlots.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  予約希望時間帯 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={selectedSlot?.id || ''}
                  onChange={(e) => {
                    const slot = availableSlots.find(s => s.id === e.target.value)
                    setSelectedSlot(slot || null)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">時間帯を選択してください</option>
                  {availableSlots.map(slot => (
                    <option key={slot.id} value={slot.id}>
                      {slot.start_time.slice(0, 5)}〜 (残り{slot.available_capacity}名)
                      {slot.special_price && ` - 特別料金 ¥${slot.special_price.toLocaleString()}`}
                    </option>
                  ))}
                </select>
                {plans.find(p => p.id === selectedPlan) && (
                  <p className="text-sm text-gray-600 mt-2">
                    ＊釣りの所要時間は約{plans.find(p => p.id === selectedPlan)?.duration_hours}時間です。
                  </p>
                )}
              </div>
            )}

            {/* 特別な要望 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                その他ご要望
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={4}
                placeholder="その他ご要望があればご記入ください"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 注意事項 */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p>※ドメイン設定をされている方はshokimaru.comからのメールを受信許可設定していただくようお願いいたします。</p>
              <p>※天候により出船できない場合がございます。その際は前日までにご連絡いたします。</p>
              <p>※個人情報は、プライバシーポリシーに基づいて取り扱われます。</p>
            </div>

            {/* 送信ボタン */}
            <div className="text-center">
              <LoadingButton
                type="submit"
                isLoading={submitting}
                disabled={!selectedSlot}
                className="px-8 py-3 text-lg"
              >
                予約を確定する
              </LoadingButton>
            </div>
          </form>
        </AnimatedSection>

        {/* お問い合わせ情報 */}
        <AnimatedSection>
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 text-center">HP以外からのお問い合わせ</h2>
            
            {/* お問い合わせ例 */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-blue-800">
                ご予約のお問い合わせ例
              </h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm leading-relaxed text-gray-700">
                  はじめまして。○月○日に大人3名でイカ釣りを体験したいと思っています。
                  全員初心者なのですが、乗り合いプランで参加可能でしょうか？
                  また、レンタル竿を3セットお借りしたいです。
                  よろしくお願いします。
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 電話 */}
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">電話でのお問い合わせ</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">090-2053-9539</p>
                <p className="text-sm text-gray-600">受付時間：8:00 - 20:00</p>
              </div>

              {/* LINE */}
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">LINEでのお問い合わせ</h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                  <Image
                    src="/line.jpg"
                    alt="LINE QRコード"
                    width={128}
                    height={128}
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm font-bold">@shokimaru1</p>
                </div>
                <p className="text-xs text-gray-600">QRコードを読み取るか<br />ID検索してください</p>
              </div>

              {/* Instagram */}
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Instagramでのお問い合わせ</h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                  <Image
                    src="/insta.jpg"
                    alt="Instagram QRコード"
                    width={128}
                    height={128}
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm font-bold">@shokimaru1</p>
                </div>
                <p className="text-xs text-gray-600">最新の釣果情報も<br />配信中です！</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                パソコンの方は QR コードをスマートフォンなどで読み込んでご利用ください。
              </p>
            </div>
          </div>
        </AnimatedSection>
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