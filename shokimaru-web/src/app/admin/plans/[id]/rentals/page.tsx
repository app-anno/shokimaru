'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'

interface FishingPlan {
  id: string
  name: string
}

interface RentalItem {
  id: string
  name: string
  price: number
  description: string | null
}

interface PlanRentalItem {
  rental_item_id: string
  is_included: boolean
  is_active: boolean
  custom_price: number | null
  custom_description: string | null
  display_order: number
  rental_items: RentalItem
}

export default function AdminPlanRentalsPage() {
  const params = useParams()
  const router = useRouter()
  const planId = params.id as string

  const [plan, setPlan] = useState<FishingPlan | null>(null)
  const [planRentals, setPlanRentals] = useState<PlanRentalItem[]>([])
  const [allRentals, setAllRentals] = useState<RentalItem[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRental, setEditingRental] = useState<PlanRentalItem | null>(null)
  
  // フォームデータ
  const [isIncluded, setIsIncluded] = useState(false)
  const [customPrice, setCustomPrice] = useState('')
  const [customDescription, setCustomDescription] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')

  useEffect(() => {
    fetchData()
  }, [planId])

  const fetchData = async () => {
    try {
      const supabase = createClient()
      
      // プラン情報を取得
      const { data: planData, error: planError } = await supabase
        .from('fishing_plans')
        .select('id, name')
        .eq('id', planId)
        .single()

      if (planError) throw planError
      setPlan(planData)

      // プランに紐づくレンタル機材を取得
      const { data: planRentalData, error: planRentalError } = await supabase
        .from('plan_rental_items')
        .select(`
          rental_item_id,
          is_included,
          is_active,
          custom_price,
          custom_description,
          display_order,
          rental_items!inner(*)
        `)
        .eq('plan_id', planId)
        .order('display_order')

      if (planRentalError) throw planRentalError
      setPlanRentals(planRentalData || [])

      // 全レンタル機材を取得（追加用）
      const { data: rentalData, error: rentalError } = await supabase
        .from('rental_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order')

      if (rentalError) throw rentalError
      setAllRentals(rentalData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setToast({ message: 'データの取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const toggleRentalStatus = async (rentalItemId: string, currentStatus: boolean) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('plan_rental_items')
        .update({ is_active: !currentStatus })
        .eq('plan_id', planId)
        .eq('rental_item_id', rentalItemId)

      if (error) throw error

      setToast({ 
        message: `レンタル機材を${!currentStatus ? '有効' : '無効'}にしました`, 
        type: 'success' 
      })
      fetchData()
    } catch (error) {
      console.error('Error updating rental:', error)
      setToast({ message: 'レンタル機材の更新に失敗しました', type: 'error' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const supabase = createClient()
      const updateData = {
        is_included: isIncluded,
        custom_price: customPrice ? parseInt(customPrice) : null,
        custom_description: customDescription || null,
        display_order: parseInt(displayOrder)
      }

      const { error } = await supabase
        .from('plan_rental_items')
        .update(updateData)
        .eq('plan_id', planId)
        .eq('rental_item_id', editingRental!.rental_item_id)

      if (error) throw error
      
      setToast({ message: 'レンタル機材を更新しました', type: 'success' })
      resetForm()
      fetchData()
    } catch (error) {
      console.error('Error saving rental:', error)
      setToast({ message: 'レンタル機材の保存に失敗しました', type: 'error' })
    }
  }

  const addRentalTooPlan = async (rentalItemId: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('plan_rental_items')
        .insert({
          plan_id: planId,
          rental_item_id: rentalItemId,
          is_included: false,
          is_active: true,
          display_order: 0
        })

      if (error) throw error

      setToast({ message: 'レンタル機材を追加しました', type: 'success' })
      setShowAddModal(false)
      fetchData()
    } catch (error) {
      console.error('Error adding rental:', error)
      setToast({ message: 'レンタル機材の追加に失敗しました', type: 'error' })
    }
  }

  const removeRentalFromPlan = async (rentalItemId: string) => {
    if (!confirm('このレンタル機材をプランから削除してもよろしいですか？')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('plan_rental_items')
        .delete()
        .eq('plan_id', planId)
        .eq('rental_item_id', rentalItemId)

      if (error) throw error

      setToast({ message: 'レンタル機材を削除しました', type: 'success' })
      fetchData()
    } catch (error) {
      console.error('Error deleting rental:', error)
      setToast({ message: 'レンタル機材の削除に失敗しました', type: 'error' })
    }
  }

  const startEdit = (rental: PlanRentalItem) => {
    setEditingRental(rental)
    setIsIncluded(rental.is_included)
    setCustomPrice(rental.custom_price?.toString() || '')
    setCustomDescription(rental.custom_description || '')
    setDisplayOrder(rental.display_order.toString())
  }

  const resetForm = () => {
    setEditingRental(null)
    setIsIncluded(false)
    setCustomPrice('')
    setCustomDescription('')
    setDisplayOrder('0')
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!plan) {
    return <div>プランが見つかりません</div>
  }

  // 追加可能なレンタル機材（まだプランに追加されていないもの）
  const availableRentals = allRentals.filter(
    rental => !planRentals.some(pr => pr.rental_item_id === rental.id)
  )

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

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {plan.name} - レンタル機材管理
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            このプランで利用可能なレンタル機材を管理します
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            disabled={availableRentals.length === 0}
          >
            レンタル機材を追加
          </button>
        </div>
      </div>

      {editingRental && (
        <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <form onSubmit={handleSubmit} className="px-4 py-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingRental.rental_items.name} を編集
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isIncluded}
                    onChange={(e) => setIsIncluded(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-600 mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    プランに含まれる（無料）
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カスタム価格（円）
                </label>
                <input
                  type="number"
                  min="0"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder={`デフォルト: ¥${editingRental.rental_items.price}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  表示順
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カスタム説明
                </label>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder={editingRental.rental_items.description || 'デフォルトの説明'}
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-semibold text-gray-900"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                更新
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                機材名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                料金
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                プランに含まれる
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                説明
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                表示順
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">操作</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {planRentals.map((rental) => {
              const price = rental.custom_price ?? rental.rental_items.price
              const description = rental.custom_description ?? rental.rental_items.description
              
              return (
                <tr key={rental.rental_item_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {rental.rental_items.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rental.is_included ? (
                      <span className="text-green-600">無料</span>
                    ) : (
                      <>
                        ¥{price.toLocaleString()}
                        {rental.custom_price && (
                          <span className="text-xs text-gray-500 ml-1">
                            (カスタム)
                          </span>
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rental.is_included && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        含まれる
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {description || '-'}
                    {rental.custom_description && (
                      <span className="text-xs text-gray-500 ml-1">
                        (カスタム)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rental.display_order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleRentalStatus(rental.rental_item_id, rental.is_active)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        rental.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {rental.is_active ? '有効' : '無効'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => startEdit(rental)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => removeRentalFromPlan(rental.rental_item_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* レンタル機材追加モーダル */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">レンタル機材を追加</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableRentals.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  追加可能なレンタル機材がありません。
                  先に管理画面でレンタル機材を作成してください。
                </p>
              ) : (
                availableRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{rental.name}</p>
                      <p className="text-sm text-gray-600">
                        ¥{rental.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => addRentalTooPlan(rental.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      追加
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                閉じる
              </button>
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