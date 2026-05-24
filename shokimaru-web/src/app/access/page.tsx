import { Metadata } from 'next'
import Card from '@/components/Card'
import Button from '@/components/Button'
import AnimatedSection from '@/components/AnimatedSection'
import FloatingElements from '@/components/FloatingElements'
import { BreadcrumbStructuredData } from '@/components/StructuredData'
import { breadcrumbs } from '@/lib/breadcrumbs'

export const metadata: Metadata = {
  title: 'アクセス・玉江漁港の駐車場案内',
  description: '翔葵丸（山口県萩市・玉江漁港）へのアクセス方法と駐車場情報。萩IC・JR東萩駅からの所要時間、長門市・山口市・防府市・宇部市・下関市・福岡市・広島市など各地域からのアクセスをご案内します。',
  keywords: ['玉江港 駐車場', '萩 釣り船 アクセス', '玉江漁港', '萩IC', '東萩駅'],
  openGraph: {
    title: 'アクセス・玉江漁港の駐車場案内 | 翔葵丸',
    description: '玉江漁港の駐車場情報と各地域からのアクセス。萩IC・JR東萩駅からの所要時間。',
  },
  alternates: {
    canonical: '/access',
  },
}

export default function AccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      <BreadcrumbStructuredData items={[...breadcrumbs.access]} />
      <FloatingElements />
      
      {/* ヘッダーセクション */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-ocean-light/30 to-primary-200/30 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient ">アクセス</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600">
              翔葵丸へのアクセス方法をご案内します
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 地図セクション */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="zoom">
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:animate-pulse-slow">
                {/* Google Maps埋め込み */}
                <div className="aspect-video bg-gray-200 relative overflow-hidden group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26424.97509451494!2d131.3826!3d34.4083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzI5LjkiTiAxMzHCsDIyJzU3LjQiRQ!5e0!3m2!1sja!2sjp!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    title="翔葵丸の位置"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gradient animate-fade-in">出船場所</h2>
                  <div className="space-y-4">
                    <div className="animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                      <h3 className="font-semibold mb-1 text-primary-600">住所</h3>
                      <p className="text-gray-700">
                        山口県萩市山田 玉江港
                        <br />
                        <span className="text-sm text-gray-600">
                          山陰屈指の人気釣りスポット
                        </span>
                        <br />
                        <span className="text-sm text-gray-600">
                          ※詳しい場所は、ご予約確定後にお知らせいたします
                        </span>
                      </p>
                    </div>
                    
                    <div className="animate-slide-in-left" style={{ animationDelay: '400ms' }}>
                      <h3 className="font-semibold mb-1 text-primary-600">連絡先</h3>
                      <p className="text-gray-700">
                        電話：<a href="tel:090-2053-9539" className="text-primary hover:underline hover:animate-wiggle inline-block">090-2053-9539</a>
                        <br />
                        Instagram：<a href="https://instagram.com/shokimaru1" className="text-primary hover:underline hover:animate-wiggle inline-block">@shokimaru1</a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* アクセス方法 */}
            <div className="mt-12 space-y-8">
              <AnimatedSection animation="slide-left" delay={200}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                  <h2 className="text-2xl font-bold mb-6 text-gradient">アクセス方法</h2>
                  
                  <div className="space-y-6">
                    <div className="animate-slide-in-right" style={{ animationDelay: '400ms' }}>
                      <h3 className="font-semibold text-lg mb-3 flex items-center group">
                        <span className="text-2xl mr-2 animate-bounce-slow">🚗</span>
                        <span className="group-hover:text-primary-600 transition-colors">お車でお越しの方</span>
                      </h3>
                      <ul className="space-y-2 text-gray-700 ml-8">
                        {[
                          "山陰自動車道「萩IC」より約15分",
                          "国道191号線経由で萩市街地へ",
                          "詳しい道順は予約時にご案内します"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                            <span className="text-primary mr-2">・</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="animate-slide-in-right" style={{ animationDelay: '600ms' }}>
                      <h3 className="font-semibold text-lg mb-3 flex items-center group">
                        <span className="text-2xl mr-2 animate-bounce-slow" style={{ animationDelay: '200ms' }}>🚃</span>
                        <span className="group-hover:text-primary-600 transition-colors">公共交通機関でお越しの方</span>
                      </h3>
                      <ul className="space-y-2 text-gray-700 ml-8">
                        {[
                          "JR山陰本線「東萩駅」からタクシーで約10分",
                          "萩バスセンターからタクシーで約15分",
                          "送迎についてはご相談ください"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${(index + 8) * 100}ms` }}>
                            <span className="text-primary mr-2">・</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              {/* 駐車場情報 */}
              <AnimatedSection animation="slide-right" delay={400}>
                <div id="parking" className="scroll-mt-20">
                <Card className="hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">玉江漁港の駐車場について</h2>
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-l-4 border-primary-400 p-6 rounded-lg animate-fade-in">
                    <div className="flex items-start">
                      <span className="text-3xl mr-4 animate-wiggle">🅿️</span>
                      <p className="text-gray-700">
                        玉江漁港周辺に無料駐車場をご用意しております。
                        <br />
                        台数や具体的な場所の詳細は、ご予約時にお伝えいたします。
                        <br />
                        早朝・深夜の出船時もご利用いただけるよう、安全な場所をご案内します。
                      </p>
                    </div>
                  </div>
                </Card>
                </div>
              </AnimatedSection>

              {/* 各地域からのアクセス */}
              <AnimatedSection animation="slide-left" delay={500}>
                <Card className="hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">各地域から玉江漁港へのアクセス目安</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    山口県内・近隣県の主要エリアから玉江漁港までのおおよその所要時間です。実際の時間は交通状況により変動します。
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-primary-50 text-primary-700">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold">出発エリア</th>
                          <th className="px-4 py-3 text-left font-bold">車（高速道含む）</th>
                          <th className="px-4 py-3 text-left font-bold">公共交通機関</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-semibold">萩市内</td>
                          <td className="px-4 py-3">約5〜15分</td>
                          <td className="px-4 py-3">JR玉江駅から徒歩圏／タクシー数分</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/40">
                          <td className="px-4 py-3 font-semibold">長門市</td>
                          <td className="px-4 py-3">約40〜50分</td>
                          <td className="px-4 py-3">JR山陰本線で東萩駅経由</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-semibold">山口市</td>
                          <td className="px-4 py-3">約1時間〜1時間20分</td>
                          <td className="px-4 py-3">バス・JR乗継ぎ約2時間</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/40">
                          <td className="px-4 py-3 font-semibold">防府市</td>
                          <td className="px-4 py-3">約1時間20分〜1時間40分</td>
                          <td className="px-4 py-3">JR・バス乗継ぎ約2.5時間</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-semibold">宇部市</td>
                          <td className="px-4 py-3">約1時間30分〜1時間50分</td>
                          <td className="px-4 py-3">JR・バス乗継ぎ約3時間</td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/40">
                          <td className="px-4 py-3 font-semibold">下関市</td>
                          <td className="px-4 py-3">約2時間〜2時間30分</td>
                          <td className="px-4 py-3">JR新山口駅経由で約3〜3.5時間</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="px-4 py-3 font-semibold">福岡市</td>
                          <td className="px-4 py-3">約2時間30分〜3時間（高速利用）</td>
                          <td className="px-4 py-3">新幹線＋在来線で約3.5時間</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold">広島市</td>
                          <td className="px-4 py-3">約3時間〜3時間30分（高速利用）</td>
                          <td className="px-4 py-3">新幹線＋在来線で約3〜3.5時間</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    ※ 所要時間は目安です。高速道路の渋滞・公共交通機関のダイヤ改正・天候等により変動します。
                  </p>
                </Card>
              </AnimatedSection>

              {/* 注意事項 */}
              <AnimatedSection animation="slide-left" delay={600}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                  <h2 className="text-2xl font-bold mb-4 text-gradient">ご来場時の注意事項</h2>
                  <ul className="space-y-3 text-gray-700">
                    {[
                      "出船時間の10分前には必ず玉江漁港にお越しください",
                      "天候により出船場所が変更になる場合があります",
                      "前日に天候の状況を見極めて船長が判断し、ご連絡します",
                      "不明な点はお気軽にお問い合わせください"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start animate-slide-in-right" style={{ animationDelay: `${(index + 7) * 100}ms` }}>
                        <span className="text-primary-500 mr-2 text-xl animate-wiggle" style={{ animationDelay: `${index * 300}ms` }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-wave-pattern opacity-10" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom text-center relative">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold mb-6 text-white ">
              アクセスについてのお問い合わせ
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl mb-8 text-white/90">
              場所がわからない場合は、お気軽にご連絡ください
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="tel:090-2053-9539" variant="primary" size="lg" className="animate-pulse-slow ">
                電話で問い合わせる
              </Button>
              <Button href="/contact" variant="primary" size="lg" className="animate-pulse-slow">
                お問い合わせフォーム
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}