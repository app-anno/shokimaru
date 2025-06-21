'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/lib/hooks/useToast'

export function TogglePublicButton({
  resultId,
  isPublic,
}: {
  resultId: string
  isPublic: boolean
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { showToast } = useToast()

  const handleToggle = async () => {
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from('fishing_results')
        .update({ is_public: !isPublic })
        .eq('id', resultId)

      if (error) throw error

      showToast(`釣果を${!isPublic ? '公開' : '非公開'}にしました`, 'success')
      router.refresh()
    } catch (error) {
      console.error('更新エラー:', error)
      showToast('更新に失敗しました', 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isUpdating}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isPublic
          ? 'bg-green-100 text-green-800 hover:bg-green-200'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      } disabled:opacity-50`}
    >
      {isUpdating ? '更新中...' : isPublic ? '公開' : '非公開'}
    </button>
  )
}