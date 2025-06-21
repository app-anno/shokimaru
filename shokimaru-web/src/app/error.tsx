'use client'

import { useEffect } from 'react'
import Button from '@/components/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-white">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-gray-600 mb-8">
            申し訳ございません。予期しないエラーが発生しました。
            <br />
            時間をおいて再度お試しください。
          </p>
        </div>
        
        <div className="space-x-4">
          <Button
            onClick={() => reset()}
            variant="primary"
          >
            もう一度試す
          </Button>
          <Button href="/" variant="secondary">
            トップページに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}