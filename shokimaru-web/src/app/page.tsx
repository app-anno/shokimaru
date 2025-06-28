import Button from "@/components/Button";
import Card from "@/components/Card";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
import ParallaxSection from "@/components/ParallaxSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import SquidAnimation from "@/components/SquidAnimation";
import ImageCarousel from "@/components/ImageCarousel";
import { getFishingResults } from "@/lib/supabase/fishing-results";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "翔葵丸 - 萩市玉江港のイカ釣り専門釣り船 | 初心者・女性大歓迎",
  description: "山口県萩市玉江港から出港するイカ釣り専門の釣り船「翔葵丸」。初心者・女性大歓迎！手ぶらでOK、レンタルタックル完備。乗り合い9,000円〜。萩湾の豊かな漁場で最高のイカ釣り体験を。LINEで簡単予約。",
  keywords: ["翔葵丸", "しょうきまる", "萩市", "釣り船", "イカ釣り", "玉江港", "山口県", "ケンサキイカ", "スルメイカ", "釣り体験", "初心者歓迎", "女性歓迎", "レンタルタックル", "釣果情報", "予約"],
  openGraph: {
    title: "翔葵丸 - 萩市玉江港のイカ釣り専門釣り船",
    description: "初心者・女性大歓迎！手ぶらでイカ釣り体験。乗り合い9,000円〜。萩湾の豊かな漁場で最高の思い出を。",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "翔葵丸でイカ釣り体験"
    }]
  },
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  // 最新の釣果を3件取得
  const latestResults = await getFishingResults(3);

  return (
    <>
      <AnimatedBackground />
      {/* ヒーローセクション */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <OptimizedImage
              src="/hero-image.jpg"
              alt="萩湾の美しい海"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        
        {/* 装飾的な波とイカ */}
        <div className="absolute -bottom-[2px] left-0 right-0 z-10">
          <SquidAnimation />
        </div>

        <div className="container-custom text-center relative z-20">
          <AnimatedSection animation="fade" delay={300}>
            <div className="animate-float">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow-lg">
                旬のイカで最高の1日を！
              </h1>
              <p className="text-xl md:text-3xl mb-6 text-white/90 text-shadow animate-slide-in-up stagger-2">
                山陰屈指の人気スポット・玉江港から出船
              </p>
              <p className="text-lg md:text-xl mb-10 text-white/80 text-shadow animate-slide-in-up stagger-3">
                海の上から楽しむ特別な釣り体験をあなたに
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button href="/contact" size="lg" className="animate-pulse-slow shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">
                今すぐ予約する
              </Button>
              <Button href="/results" variant="outline" size="lg" className="!text-white !border-white/70 hover:!bg-white/20 animate-float shadow-xl">
                釣果を見る
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 釣果速報セクション */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-200 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 title-decorated">
              最新の釣果情報
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              お客様の素晴らしい釣果をご紹介します
            </p>
          </AnimatedSection>
          
          {latestResults && latestResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestResults.map((result, index) => (
                <AnimatedSection key={result.id} animation="slide-up" delay={index * 100}>
                  <Link href={`/results/${result.id}`} className="block group">
                    <Card className="hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 overflow-hidden">
                      {result.images && result.images.length > 0 && (
                        <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                          <ImageCarousel
                            images={result.images.map(img => img.image_url).filter(Boolean) as string[]}
                            alt={`${new Date(result.date).toLocaleDateString('ja-JP')}の釣果`}
                            className="absolute inset-0"
                            showBadge={result.images.length > 1}
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">
                          {new Date(result.date).toLocaleDateString('ja-JP')}
                        </p>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-bold text-primary-600 animate-pulse-slow">
                            {result.catch_count}匹
                          </span>
                          {result.participants_count && (
                            <span className="text-sm text-gray-600">
                              {result.participants_count}名参加
                            </span>
                          )}
                        </div>
                        {result.weather && (
                          <p className="text-sm text-gray-600">
                            天気: {result.weather}
                          </p>
                        )}
                        {result.tide_type && (
                          <p className="text-sm text-gray-600">
                            潮: {result.tide_type}
                          </p>
                        )}
                        <div className="pt-2 flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                          <span className="text-sm font-medium">詳細を見る</span>
                          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fade">
              <p className="text-center text-gray-600">
                釣果情報は準備中です
              </p>
            </AnimatedSection>
          )}
          
          <AnimatedSection animation="fade" delay={400}>
            <div className="text-center mt-8">
              <Button href="/results" variant="outline" className="animate-bounce-slow">
                すべての釣果を見る →
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 特徴セクション */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-ocean-light via-white to-primary-50">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 title-decorated">
              翔葵丸が選ばれる理由
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              初心者から上級者まで、すべてのお客様に最高の釣り体験を
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                title: "初心者・女性大歓迎",
                description: "道具の使い方から釣り方まで、親切丁寧にレクチャーします。手ぶらでOK！",
                color: "from-pink-400 to-rose-600"
              },
              {
                icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                title: "手ぶらでOK",
                description: "釣り道具一式レンタル可能（¥1,000）。ライフジャケット、氷は無料でご用意。",
                color: "from-blue-400 to-cyan-600"
              },
              {
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                title: "豊富な実績",
                description: "萩湾の海を知り尽くした船長が、その日のベストポイントへご案内します。",
                color: "from-amber-400 to-orange-600"
              }
            ].map((feature, index) => (
              <AnimatedSection key={index} animation="flip" delay={index * 200}>
                <Card className={`text-center h-full group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-gradient-to-br ${feature.color} text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      <div className="relative w-full h-full bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:animate-bounce">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-white/90 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* 料金プランセクション */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary-200 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-200 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 title-decorated">
              料金プラン
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              お客様のニーズに合わせた2つのプランをご用意
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 乗り合いプラン */}
            <AnimatedSection animation="slide-left">
              <Card className="text-center hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">乗り合いプラン</h3>
                  <p className="text-gray-600">他のお客様と一緒に出船</p>
                </div>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-gradient animate-pulse-slow">
                    ¥9,000
                    <span className="text-lg text-gray-600 font-normal">/人</span>
                  </p>
                </div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center animate-slide-in-right">
                    <span className="text-primary-500 mr-2">✓</span>
                    最少催行人数：1名
                  </li>
                  <li className="flex items-center animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                    <span className="text-primary-500 mr-2">✓</span>
                    初心者講習付き
                  </li>
                  <li className="flex items-center animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                    <span className="text-primary-500 mr-2">✓</span>
                    お一人様でも安心
                  </li>
                </ul>
                <Button href="/pricing" fullWidth className="animate-bounce-slow">
                  詳細を見る
                </Button>
              </Card>
            </AnimatedSection>

            {/* チャータープラン */}
            <AnimatedSection animation="slide-right">
              <Card className="text-center border-2 border-primary-400 relative overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="absolute -top-1 -right-1">
                  <div className="bg-primary-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg animate-wiggle">
                    人気！
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">チャータープラン</h3>
                  <p className="text-gray-600">船を貸し切りでご利用</p>
                </div>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-gradient animate-pulse-slow">
                    ¥45,000
                    <span className="text-lg text-gray-600 font-normal">/艇</span>
                  </p>
                </div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center animate-slide-in-left">
                    <span className="text-primary-500 mr-2">✓</span>
                    最大6名まで乗船可能
                  </li>
                  <li className="flex items-center animate-slide-in-left" style={{ animationDelay: '100ms' }}>
                    <span className="text-primary-500 mr-2">✓</span>
                    プライベート空間
                  </li>
                  <li className="flex items-center animate-slide-in-left" style={{ animationDelay: '200ms' }}>
                    <span className="text-primary-500 mr-2">✓</span>
                    グループ・家族に最適
                  </li>
                </ul>
                <Button href="/pricing" variant="primary" fullWidth className="animate-pulse-slow">
                  詳細を見る
                </Button>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-wave-pattern opacity-10" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 150 + 100}px`,
                height: `${Math.random() * 150 + 100}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom text-center relative">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-pulse-slow">
              萩湾で最高のイカ釣り体験を
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              山口県萩市・玉江港から出船する釣り船<br />
              初めての方でも大歓迎！プロの船長が丁寧にサポートします
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/contact" 
                size="lg" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-bold animate-bounce-slow shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  今すぐ予約する
                </span>
              </Button>
              <Button 
                href="/access" 
                variant="outline" 
                size="lg" 
                className="!text-white !border-white hover:!bg-white/20"
              >
                アクセス情報を見る
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}