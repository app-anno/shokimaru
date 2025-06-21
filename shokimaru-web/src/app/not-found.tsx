import Link from 'next/link'
import Button from '@/components/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-white">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        
        <div className="space-y-4">
          <Button href="/" size="lg">
            トップページに戻る
          </Button>
          <div className="text-sm text-gray-500">
            <p>お探しの情報が見つからない場合は</p>
            <Link href="/contact" className="text-primary hover:underline">
              お問い合わせ
            </Link>
            <span>からご連絡ください</span>
          </div>
        </div>
      </div>
    </div>
  )
}