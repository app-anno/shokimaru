import { Metadata } from 'next'
import Card from '@/components/Card'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'アクセス',
  description: '翔葵丸へのアクセス方法。山口県萩市の港から出船します。詳しい場所は予約時にご案内いたします。',
  openGraph: {
    title: 'アクセス | 翔葵丸',
    description: '山口県萩市の港から出船。詳しい場所は予約時にご案内します。',
  },
  alternates: {
    canonical: '/access',
  },
}

export default function AccessPage() {
  return (
    <div className="min-h-screen">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-b from-background to-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-4">アクセス</h1>
          <p className="text-center text-lg text-gray-600">
            翔葵丸へのアクセス方法をご案内します
          </p>
        </div>
      </section>

      {/* 地図セクション */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              {/* Google Maps埋め込み */}
              <div className="aspect-video bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26424.97509451494!2d131.3826!3d34.4083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzI5LjkiTiAxMzHCsDIyJzU3LjQiRQ!5e0!3m2!1sja!2sjp!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="翔葵丸の位置"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">出船場所</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">住所</h3>
                    <p className="text-gray-700">
                      山口県萩市
                      <br />
                      <span className="text-sm text-gray-600">
                        ※詳しい港の場所は、ご予約確定後にお知らせいたします
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1">連絡先</h3>
                    <p className="text-gray-700">
                      電話：<a href="tel:090-1234-5678" className="text-primary hover:underline">090-1234-5678</a>
                      <br />
                      LINE：<a href="https://line.me/" className="text-primary hover:underline">@shokimaru</a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* アクセス方法 */}
            <div className="mt-12 space-y-8">
              <Card>
                <h2 className="text-2xl font-bold mb-6">アクセス方法</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <span className="text-2xl mr-2">🚗</span>
                      お車でお越しの方
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-8">
                      <li>・山陰自動車道「萩IC」より約15分</li>
                      <li>・国道191号線経由で萩市街地へ</li>
                      <li>・詳しい道順は予約時にご案内します</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <span className="text-2xl mr-2">🚃</span>
                      公共交通機関でお越しの方
                    </h3>
                    <ul className="space-y-2 text-gray-700 ml-8">
                      <li>・JR山陰本線「東萩駅」からタクシーで約10分</li>
                      <li>・萩バスセンターからタクシーで約15分</li>
                      <li>・送迎についてはご相談ください</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* 駐車場情報 */}
              <Card>
                <h2 className="text-2xl font-bold mb-4">駐車場について</h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-gray-700">
                    無料駐車場をご用意しております。
                    <br />
                    台数や場所の詳細は、ご予約時にお伝えいたします。
                  </p>
                </div>
              </Card>

              {/* 注意事項 */}
              <Card>
                <h2 className="text-2xl font-bold mb-4">ご来場時の注意事項</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>出船時刻の30分前までにお越しください</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>天候により出船場所が変更になる場合があります</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>前日に確認のご連絡をさせていただきます</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>不明な点はお気軽にお問い合わせください</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            アクセスについてのお問い合わせ
          </h2>
          <p className="text-xl mb-8">
            場所がわからない場合は、お気軽にご連絡ください
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="tel:090-1234-5678" variant="secondary" size="lg">
              電話で問い合わせる
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              お問い合わせフォーム
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}