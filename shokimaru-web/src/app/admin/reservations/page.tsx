'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'

interface Reservation {
  id: string
  reservation_number: string
  customer_name: string
  customer_phone: string
  customer_email: string
  participants_count: number
  total_price: number
  status: string
  payment_status: string
  created_at: string
  special_requests: string
  reservation_slots: {
    date: string
    start_time: string
  }
  fishing_plans: {
    name: string
  }
}

const statusLabels: Record<string, string> = {
  pending: '確認待ち',
  confirmed: '確定',
  cancelled: 'キャンセル',
  completed: '完了'
}

const paymentStatusLabels: Record<string, string> = {
  unpaid: '未払い',
  paid: '支払済み',
  refunded: '返金済み'
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchReservations()
  }, [filter])

  const fetchReservations = async () => {
    try {
      const supabase = createClient()
      let query = supabase
        .from('reservations')
        .select(`
          *,
          reservation_slots!inner(date, start_time),
          fishing_plans!inner(name)
        `)
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('status', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setReservations(data || [])
    } catch (error) {
      console.error('Error fetching reservations:', error)
      setToast({ message: '予約の取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const updateReservationStatus = async (reservationId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', reservationId)

      if (error) throw error

      setToast({ message: 'ステータスを更新しました', type: 'success' })
      fetchReservations()
    } catch (error) {
      console.error('Error updating reservation:', error)
      setToast({ message: 'ステータスの更新に失敗しました', type: 'error' })
    }
  }

  const updatePaymentStatus = async (reservationId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('reservations')
        .update({ payment_status: newStatus })
        .eq('id', reservationId)

      if (error) throw error

      setToast({ message: '支払いステータスを更新しました', type: 'success' })
      fetchReservations()
    } catch (error) {
      console.error('Error updating payment status:', error)
      setToast({ message: '支払いステータスの更新に失敗しました', type: 'error' })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">予約管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            予約の一覧とステータス管理
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4 flex items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-40 rounded-md border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="all">すべて</option>
            <option value="pending">確認待ち</option>
            <option value="confirmed">確定</option>
            <option value="cancelled">キャンセル</option>
            <option value="completed">完了</option>
          </select>
          <Link
            href="/admin/reservations/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            予約を追加
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                予約番号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                顧客情報
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                プラン・日時
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                人数・料金
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                支払い
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">操作</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {reservation.reservation_number}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reservation.created_at).toLocaleDateString('ja-JP')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.customer_name}</div>
                  <div className="text-sm text-gray-500">{reservation.customer_phone}</div>
                  {reservation.customer_email && (
                    <div className="text-sm text-gray-500">{reservation.customer_email}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.fishing_plans.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(reservation.reservation_slots.date).toLocaleDateString('ja-JP')} {reservation.reservation_slots.start_time.slice(0, 5)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{reservation.participants_count}名</div>
                  <div className="text-sm font-semibold text-gray-900">
                    ¥{reservation.total_price.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={reservation.status}
                    onChange={(e) => updateReservationStatus(reservation.id, e.target.value)}
                    className={`text-sm rounded-full px-3 py-1 font-semibold ${
                      reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="pending">確認待ち</option>
                    <option value="confirmed">確定</option>
                    <option value="cancelled">キャンセル</option>
                    <option value="completed">完了</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={reservation.payment_status}
                    onChange={(e) => updatePaymentStatus(reservation.id, e.target.value)}
                    className={`text-sm rounded-full px-3 py-1 font-semibold ${
                      reservation.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                      reservation.payment_status === 'unpaid' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="unpaid">未払い</option>
                    <option value="paid">支払済み</option>
                    <option value="refunded">返金済み</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      // 詳細モーダルを開く処理（今後実装）
                      console.log('View details:', reservation)
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    詳細
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reservations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">予約がありません</p>
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