'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'

interface RentalItem {
  id: string
  name: string
  price: number
  description: string | null
  is_active: boolean
  display_order: number
  created_at: string
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<RentalItem[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingRental, setEditingRental] = useState<RentalItem | null>(null)
  
  // フォームデータ
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [displayOrder, setDisplayOrder] = useState('0')

  useEffect(() => {
    fetchRentals()
  }, [])

  const fetchRentals = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('rental_items')
        .select('*')
        .order('display_order')

      if (error) throw error
      setRentals(data || [])
    } catch (error) {
      console.error('Error fetching rentals:', error)
      setToast({ message: 'レンタル機材の取得に失敗しました', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const toggleRentalStatus = async (rentalId: string, currentStatus: boolean) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('rental_items')
        .update({ is_active: !currentStatus })
        .eq('id', rentalId)

      if (error) throw error

      setToast({ 
        message: `レンタル機材を${!currentStatus ? '有効' : '無効'}にしました`, 
        type: 'success' 
      })
      fetchRentals()
    } catch (error) {
      console.error('Error updating rental:', error)
      setToast({ message: 'レンタル機材の更新に失敗しました', type: 'error' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const supabase = createClient()
      const rentalData = {
        name,
        price: parseInt(price),
        description: description || null,
        display_order: parseInt(displayOrder),
        is_active: true
      }

      if (editingRental) {
        const { error } = await supabase
          .from('rental_items')
          .update(rentalData)
          .eq('id', editingRental.id)

        if (error) throw error
        setToast({ message: 'レンタル機材を更新しました', type: 'success' })
      } else {
        const { error } = await supabase
          .from('rental_items')
          .insert(rentalData)

        if (error) throw error
        setToast({ message: 'レンタル機材を追加しました', type: 'success' })
      }

      resetForm()
      fetchRentals()
    } catch (error) {
      console.error('Error saving rental:', error)
      setToast({ message: 'レンタル機材の保存に失敗しました', type: 'error' })
    }
  }

  const startEdit = (rental: RentalItem) => {
    setEditingRental(rental)
    setName(rental.name)
    setPrice(rental.price.toString())
    setDescription(rental.description || '')
    setDisplayOrder(rental.display_order.toString())
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingRental(null)
    setName('')
    setPrice('')
    setDescription('')
    setDisplayOrder('0')
    setShowForm(false)
  }

  const deleteRental = async (rentalId: string) => {
    if (!confirm('このレンタル機材を削除してもよろしいですか？')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('rental_items')
        .delete()
        .eq('id', rentalId)

      if (error) throw error

      setToast({ message: 'レンタル機材を削除しました', type: 'success' })
      fetchRentals()
    } catch (error) {
      console.error('Error deleting rental:', error)
      setToast({ message: 'レンタル機材の削除に失敗しました', type: 'error' })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">レンタル機材管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            レンタル機材と料金の一覧と管理
          </p>
          <div className="mt-2 rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  レンタル機材は各プランごとに設定できます。プラン管理画面から各プランの「レンタル」ボタンをクリックして、プラン別のレンタル機材を設定してください。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            新規追加
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <form onSubmit={handleSubmit} className="px-4 py-6 sm:p-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingRental ? 'レンタル機材を編集' : '新規レンタル機材'}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  機材名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  料金（円） <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  説明
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                {editingRental ? '更新' : '追加'}
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
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {rental.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥{rental.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {rental.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {rental.display_order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleRentalStatus(rental.id, rental.is_active)}
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
                    onClick={() => deleteRental(rental.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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