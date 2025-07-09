'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createClient } from '@/lib/supabase/client'
import AnimatedSection from '@/components/AnimatedSection'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'

interface FishingPlan {
  id: string
  name: string
  base_price: number
  duration_hours: number
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

interface CalendarEvent {
  id: string
  title: string
  start: string
  backgroundColor: string
  textColor: string
  extendedProps: {
    slotId: string
    startTime: string
    availableCapacity: number
    price: number
  }
}

export default function BookingCalendarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('plan')
  
  const [plan, setPlan] = useState<FishingPlan | null>(null)
  const [slots, setSlots] = useState<ReservationSlot[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [dateSlots, setDateSlots] = useState<ReservationSlot[]>([])

  useEffect(() => {
    if (!planId) {
      router.push('/booking')
      return
    }
    fetchPlanAndSlots()
  }, [planId])

  const fetchPlanAndSlots = async () => {
    try {
      // プラン情報を取得
      const supabase = createClient()
      const { data: planData, error: planError } = await supabase
        .from('fishing_plans')
        .select('*')
        .eq('id', planId)
        .single()

      if (planError) throw planError
      setPlan(planData)

      // 予約枠を取得
      const { data: slotsData, error: slotsError } = await supabase
        .from('reservation_slots')
        .select('*')
        .eq('plan_id', planId)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date')
        .order('start_time')

      if (slotsError) throw slotsError
      setSlots(slotsData || [])

      // カレンダーイベントに変換
      const calendarEvents = (slotsData || []).map((slot) => {
        const date = new Date(slot.date)
        const [hours, minutes] = slot.start_time.split(':')
        date.setHours(parseInt(hours), parseInt(minutes))

        let backgroundColor = '#10b981' // 空きあり（緑）
        let title = '空きあり'
        
        if (slot.status === 'full' || slot.available_capacity === 0) {
          backgroundColor = '#ef4444' // 満席（赤）
          title = '満席'
        } else if (slot.available_capacity <= 3) {
          backgroundColor = '#f59e0b' // 残りわずか（黄）
          title = '残りわずか'
        }

        return {
          id: slot.id,
          title,
          start: date.toISOString(),
          backgroundColor,
          textColor: 'white',
          extendedProps: {
            slotId: slot.id,
            startTime: slot.start_time,
            availableCapacity: slot.available_capacity,
            price: slot.special_price || planData.base_price
          }
        }
      })

      setEvents(calendarEvents)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateClick = useCallback((info: any) => {
    const clickedDate = info.dateStr
    setSelectedDate(clickedDate)
    
    // その日の予約枠を抽出
    const daySlots = slots.filter(slot => slot.date === clickedDate)
    setDateSlots(daySlots)
  }, [slots])

  const handleSlotSelect = (slotId: string) => {
    router.push(`/booking/details?slot=${slotId}&plan=${planId}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!plan) {
    return <div>プランが見つかりません</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <div className="mb-8">
            <Link
              href="/booking"
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
              プラン一覧に戻る
            </Link>
            <h1 className="text-4xl font-bold text-center mb-2">
              日程を選ぶ
            </h1>
            <p className="text-center text-gray-600">
              {plan.name}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale="ja"
                  events={events}
                  dateClick={handleDateClick}
                  height="auto"
                  headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'today'
                  }}
                  buttonText={{
                    today: '今日'
                  }}
                  dayMaxEvents={2}
                  eventDisplay="block"
                />
              </div>
            </AnimatedSection>
          </div>

          <div>
            <AnimatedSection>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  {selectedDate ? '時間帯を選択' : 'カレンダーから日付を選択してください'}
                </h2>
                
                {selectedDate && dateSlots.length > 0 ? (
                  <div className="space-y-3">
                    {dateSlots.map((slot) => {
                      const isAvailable = slot.status === 'available' && slot.available_capacity > 0
                      const price = slot.special_price || plan.base_price
                      
                      return (
                        <button
                          key={slot.id}
                          onClick={() => isAvailable && handleSlotSelect(slot.id)}
                          disabled={!isAvailable}
                          className={`w-full p-4 rounded-lg border-2 transition-all ${
                            isAvailable
                              ? 'border-blue-200 hover:border-blue-400 hover:shadow-md cursor-pointer'
                              : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-left">
                              <p className="font-semibold">
                                {slot.start_time.slice(0, 5)} 開始
                              </p>
                              <p className={`text-sm ${isAvailable ? 'text-gray-600' : 'text-gray-400'}`}>
                                {plan.duration_hours}時間コース
                              </p>
                            </div>
                            <div className="text-right">
                              {isAvailable ? (
                                <>
                                  <p className="font-bold text-blue-600">
                                    ¥{price.toLocaleString()}/人
                                  </p>
                                  <p className="text-sm text-green-600">
                                    残り{slot.available_capacity}名
                                  </p>
                                </>
                              ) : (
                                <p className="text-red-600 font-semibold">
                                  満席
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : selectedDate ? (
                  <p className="text-gray-600">
                    この日は予約可能な時間帯がありません
                  </p>
                ) : null}

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">凡例</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                      <span>空きあり</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                      <span>残りわずか</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                      <span>満席</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}