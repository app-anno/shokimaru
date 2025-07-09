'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Toast } from '@/components/Toast'

interface FishingPlan {
  id: string
  name: string
  description: string
  duration_hours: number
  base_price: number
  max_capacity: number
  min_capacity: number
  skill_level: string
  is_active: boolean
  display_order: number
  created_at: string
}

const skillLevelLabels: Record<string, string> = {
  beginner: '初心者向け',
  intermediate: '中級者向け',
  advanced: '上級者向け',
  all: '全レベル対応'
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<FishingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('fishing_plans')
        .select('*')
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

  const togglePlanStatus = async (planId: string, currentStatus: boolean) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('fishing_plans')
        .update({ is_active: !currentStatus })
        .eq('id', planId)

      if (error) throw error

      setToast({ 
        message: `プランを${!currentStatus ? '有効' : '無効'}にしました`, 
        type: 'success' 
      })
      fetchPlans()
    } catch (error) {
      console.error('Error updating plan:', error)
      setToast({ message: 'プランの更新に失敗しました', type: 'error' })
    }
  }

  const deletePlan = async (planId: string) => {
    if (!confirm('このプランを削除してもよろしいですか？')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('fishing_plans')
        .delete()
        .eq('id', planId)

      if (error) throw error

      setToast({ message: 'プランを削除しました', type: 'success' })
      fetchPlans()
    } catch (error) {
      console.error('Error deleting plan:', error)
      setToast({ message: 'プランの削除に失敗しました', type: 'error' })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">プラン管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            釣りプランの一覧と管理
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/plans/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            新規プラン追加
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                プラン名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                レベル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                料金
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                定員
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                時間
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
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {plan.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.description.slice(0, 50)}...
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {skillLevelLabels[plan.skill_level]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥{plan.base_price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {plan.min_capacity}〜{plan.max_capacity}名
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {plan.duration_hours}時間
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => togglePlanStatus(plan.id, plan.is_active)}
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      plan.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {plan.is_active ? '有効' : '無効'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/plans/${plan.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    編集
                  </Link>
                  <Link
                    href={`/admin/plans/${plan.id}/rentals`}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    レンタル
                  </Link>
                  <button
                    onClick={() => deletePlan(plan.id)}
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