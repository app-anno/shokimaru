'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

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

interface CalendarEvent {
  id: string
  title: string
  start: string
  backgroundColor: string
  textColor: string
  extendedProps: {
    slotId: string
    planName: string
    availableCapacity: number
    maxCapacity: number
    specialPrice: number | null
    basePrice: number
  }
}

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState<ReservationSlot[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState<ReservationSlot | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [specialPrice, setSpecialPrice] = useState<string>('')
  const [availableCapacity, setAvailableCapacity] = useState<string>('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchSlots()
  }, [])

  const fetchSlots = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('reservation_slots')
        .select(`
          *,
          fishing_plans!inner(name, base_price, max_capacity)
        `)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date')
        .order('start_time')

      if (error) throw error
      setSlots(data || [])

      // カレンダーイベントに変換
      const calendarEvents = (data || []).map((slot) => {
        const date = new Date(slot.date)
        const [hours, minutes] = slot.start_time.split(':')
        date.setHours(parseInt(hours), parseInt(minutes))

        let backgroundColor = '#10b981' // 空きあり（緑）
        if (slot.status === 'full' || slot.available_capacity === 0) {
          backgroundColor = '#ef4444' // 満席（赤）
        } else if (slot.available_capacity <= 3) {
          backgroundColor = '#f59e0b' // 残りわずか（黄）
        }

        return {
          id: slot.id,
          title: `${slot.fishing_plans.name} (${slot.available_capacity}/${slot.fishing_plans.max_capacity})`,
          start: date.toISOString(),
          backgroundColor,
          textColor: 'white',
          extendedProps: {
            slotId: slot.id,
            planName: slot.fishing_plans.name,
            availableCapacity: slot.available_capacity,
            maxCapacity: slot.fishing_plans.max_capacity,
            specialPrice: slot.special_price,
            basePrice: slot.fishing_plans.base_price
          }
        }
      })

      setEvents(calendarEvents)
    } catch (error) {
      console.error('Error fetching slots:', error)
      setToast({ message: '予約枠の取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleEventClick = (info: any) => {
    const slot = slots.find(s => s.id === info.event.id)
    if (slot) {
      setSelectedSlot(slot)
      setSpecialPrice(slot.special_price?.toString() || '')
      setAvailableCapacity(slot.available_capacity.toString())
      setShowModal(true)
    }
  }

  const updateSlot = async () => {
    if (!selectedSlot) return

    try {
      const supabase = createClient()
      const updateData: any = {
        available_capacity: parseInt(availableCapacity),
        status: parseInt(availableCapacity) <= 0 ? 'full' : 'available'
      }

      if (specialPrice) {
        updateData.special_price = parseInt(specialPrice)
      } else {
        updateData.special_price = null
      }

      const { error } = await supabase
        .from('reservation_slots')
        .update(updateData)
        .eq('id', selectedSlot.id)

      if (error) throw error

      setToast({ message: '予約枠を更新しました', type: 'success' })
      setShowModal(false)
      fetchSlots()
    } catch (error) {
      console.error('Error updating slot:', error)
      setToast({ message: '予約枠の更新に失敗しました', type: 'error' })
    }
  }

  const deleteSlot = async () => {
    if (!selectedSlot) return

    if (!confirm('この予約枠を削除しますか？\n\n※ すでに予約がある場合は削除できません')) {
      return
    }

    try {
      const supabase = createClient()
      
      // まずこの枠に予約があるか確認
      const { data: reservations, error: checkError } = await supabase
        .from('reservations')
        .select('id')
        .eq('slot_id', selectedSlot.id)
        .limit(1)

      if (checkError) throw checkError

      if (reservations && reservations.length > 0) {
        setToast({ message: 'この予約枠にはすでに予約があるため削除できません', type: 'error' })
        return
      }

      // 予約がなければ削除
      const { error: deleteError } = await supabase
        .from('reservation_slots')
        .delete()
        .eq('id', selectedSlot.id)

      if (deleteError) throw deleteError

      setToast({ message: '予約枠を削除しました', type: 'success' })
      setShowModal(false)
      fetchSlots()
    } catch (error) {
      console.error('Error deleting slot:', error)
      setToast({ message: '予約枠の削除に失敗しました', type: 'error' })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">予約枠管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            カレンダーから予約枠をクリックして、特別料金や定員を設定できます
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/slots/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            予約枠を作成
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ja"
          events={events}
          eventClick={handleEventClick}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          buttonText={{
            today: '今日'
          }}
          eventDisplay="block"
          dayMaxEvents={3}
        />
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">凡例</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>空きあり</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span>残りわずか（3名以下）</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>満席</span>
          </div>
        </div>
      </div>

      {/* 編集モーダル */}
      {showModal && selectedSlot && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">予約枠の編集</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">プラン</p>
                <p className="font-semibold">{selectedSlot.fishing_plans.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">日時</p>
                <p className="font-semibold">
                  {new Date(selectedSlot.date).toLocaleDateString('ja-JP')} {selectedSlot.start_time.slice(0, 5)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  利用可能人数（最大: {selectedSlot.fishing_plans.max_capacity}名）
                </label>
                <input
                  type="number"
                  min="0"
                  max={selectedSlot.fishing_plans.max_capacity}
                  value={availableCapacity}
                  onChange={(e) => setAvailableCapacity(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  特別料金（通常: ¥{selectedSlot.fishing_plans.base_price.toLocaleString()}）
                </label>
                <input
                  type="number"
                  min="0"
                  value={specialPrice}
                  onChange={(e) => setSpecialPrice(e.target.value)}
                  placeholder="空欄の場合は通常料金"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={deleteSlot}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                削除
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={updateSlot}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  更新
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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