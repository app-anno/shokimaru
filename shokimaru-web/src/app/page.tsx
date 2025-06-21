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
          
          <AnimatedSection animation="zoom" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" variant="primary" className="animate-pulse-slow">
                今すぐ予約する
              </Button>
              <Button href="/results" variant="outline" size="lg" className="!text-white !border-white hover:!bg-white/20 animate-slide-in-right stagger-3">
                釣果を見る
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 最新釣果セクション */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <ParallaxSection speed={0.3} className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100/30 to-secondary-100/30 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-100/30 to-primary-100/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
        </ParallaxSection>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 title-decorated animate-slide-in-up">最新の釣果</h2>
              <p className="text-gray-600 animate-fade-in stagger-2">お客様の素晴らしい釣果をご紹介します</p>
            </div>
          </AnimatedSection>
          
          {latestResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestResults.map((result, index) => (
                  <AnimatedSection key={result.id} animation="zoom" delay={index * 200}>
                    <Link href={`/results/${result.id}`}>
                      <Card hover className="h-full group relative overflow-hidden bg-gradient-to-br from-white via-white to-primary-50/30 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                      {/* 装飾的な背景要素 */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-secondary-200/20 to-ocean-light/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {(result.image_url || result.images?.length > 0) ? (
                        <div className="aspect-square relative overflow-hidden rounded-2xl shadow-inner">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                          
                          {/* カルーセルまたは単一画像 */}
                          {result.images && result.images.length > 0 ? (
                            <ImageCarousel
                              images={result.images.map(img => img.image_url).filter(Boolean) as string[]}
                              alt={`${result.date}の釣果`}
                              className="absolute inset-0 group-hover:scale-125 transition-transform duration-700 ease-out"
                              showBadge={true}
                              showIndicators={true}
                            />
                          ) : result.image_url ? (
                            <div className="absolute inset-0">
                              <OptimizedImage
                                src={result.image_url}
                                alt={`${result.date}の釣果`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                              />
                            </div>
                          ) : null}
                          
                          {/* ホバー時のオーバーレイ */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                          
                          {/* 釣果数バッジ */}
                          <div className="absolute top-4 right-4 z-30">
                            <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              <p className="text-2xl font-bold text-gradient">{result.catch_count}杯</p>
                            </div>
                          </div>
                          
                          {/* 日付ラベル */}
                          <div className="absolute top-4 left-4 z-30">
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1 shadow-lg">
                              <p className="text-sm font-medium text-gray-800">
                                {new Date(result.date).toLocaleDateString('ja-JP', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          {/* 釣果詳細（画像上に配置） */}
                          <div className="absolute bottom-0 left-0 right-0 z-30 p-4">
                            <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl">
                              <div className="grid grid-cols-3 gap-2 text-center">
                                {result.participants_count && (
                                  <>
                                    <div>
                                      <p className="text-[10px] text-gray-600">参加</p>
                                      <p className="text-sm font-bold text-gray-800">{result.participants_count}名</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-gray-600">平均</p>
                                      <p className="text-sm font-bold text-primary-600">{Math.round(result.catch_count / result.participants_count)}杯</p>
                                    </div>
                                  </>
                                )}
                                {result.size && (
                                  <div className={result.participants_count ? '' : 'col-span-3'}>
                                    <p className="text-[10px] text-gray-600">サイズ</p>
                                    <p className="text-sm font-bold text-gray-800">{result.size}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-primary-50 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 animate-pulse" />
                          <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      <div className="relative z-10 p-4 space-y-3">
                        {/* 条件カード */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {result.weather && (
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                                  {result.weather === '晴れ' && (
                                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 100-2H2a1 1 0 100 2zm18 0h2a1 1 0 100-2h-2a1 1 0 100 2zM11 2v2a1 1 0 102 0V2a1 1 0 10-2 0zm0 18v2a1 1 0 102 0v-2a1 1 0 10-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 10-1.41 1.41l1.06 1.06a1 1 0 101.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 10-1.41-1.41l-1.06 1.06a1 1 0 101.41 1.41l1.06-1.06z"/>
                                    </svg>
                                  )}
                                  {result.weather === '曇り' && (
                                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4c.34 0 .67.04 1 .13C7.1 7.13 9.4 5 12.5 5c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
                                    </svg>
                                  )}
                                  {result.weather === '雨' && (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-3 6m0 0l-3-6m3 6v-6m-3-2l-3 6m0 0l-3-6m3 6v-6M7 10V7a5 5 0 0110 0v3"/>
                                    </svg>
                                  )}
                                  {!['晴れ', '曇り', '雨'].includes(result.weather) && (
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">天候</p>
                                  <p className="text-sm font-bold text-gray-800">{result.weather}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          {result.tide_type && (
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-3 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                                  {result.tide_type === '大潮' && (
                                    <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.2-.7 1.5l3.2 3.2c.3-.2.7-.3 1.1-.3.3 0 .6.1.9.2l2.3-2.3c-.1-.3-.2-.6-.2-.9 0-1.1.9-2 2-2s2 .9 2 2c0 .6-.3 1.2-.7 1.5l3.2 3.2c.3-.2.7-.3 1.1-.3 1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2c0-.4.1-.8.3-1.1l-3.2-3.2c-.3.4-.9.7-1.5.7-.4 0-.8-.1-1.1-.3l-2.3 2.3c.1.3.2.6.2.9 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6.3-1.2.7-1.5l-3.2-3.2c-.3.2-.7.3-1.1.3C3.9 14 3 13.1 3 12z"/>
                                    </svg>
                                  )}
                                  {result.tide_type === '中潮' && (
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M3 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
                                    </svg>
                                  )}
                                  {result.tide_type === '小潮' && (
                                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                                    </svg>
                                  )}
                                  {!['大潮', '中潮', '小潮'].includes(result.tide_type) && (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">潮</p>
                                  <p className="text-sm font-bold text-gray-800">{result.tide_type}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* 月齢 */}
                        {result.moon_age !== null && (
                          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 shadow-md border border-indigo-100">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 relative flex-shrink-0">
                                {result.moon_age <= 1 && (
                                  <div className="w-full h-full rounded-full bg-gray-900 border border-gray-600" />
                                )}
                                {result.moon_age > 1 && result.moon_age <= 6 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-l from-gray-900 to-yellow-100 border border-yellow-300" />
                                )}
                                {result.moon_age > 6 && result.moon_age <= 8 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-100 to-gray-900 border border-yellow-300" />
                                )}
                                {result.moon_age > 8 && result.moon_age <= 13 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-l from-gray-900 via-yellow-100 to-yellow-100 border border-yellow-300" />
                                )}
                                {result.moon_age > 13 && result.moon_age <= 16 && (
                                  <div className="w-full h-full rounded-full bg-yellow-100 border border-yellow-400" />
                                )}
                                {result.moon_age > 16 && result.moon_age <= 21 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-100 via-yellow-100 to-gray-900 border border-yellow-300" />
                                )}
                                {result.moon_age > 21 && result.moon_age <= 23 && (
                                  <div className="w-full h-full rounded-full bg-gradient-to-l from-yellow-100 to-gray-900 border border-gray-500" />
                                )}
                                {result.moon_age > 23 && (
                                  <div className="w-full h-full rounded-full bg-gray-900 border border-gray-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-gray-600">月齢</p>
                                  <p className="text-sm font-bold text-gray-800">{result.moon_age}日</p>
                                </div>
                                <p className="text-xs text-gray-600">
                                  {result.moon_age <= 1 && '新月'}
                                  {result.moon_age > 1 && result.moon_age <= 6 && '三日月'}
                                  {result.moon_age > 6 && result.moon_age <= 8 && '上弦'}
                                  {result.moon_age > 8 && result.moon_age <= 13 && '十日月'}
                                  {result.moon_age > 13 && result.moon_age <= 16 && '満月'}
                                  {result.moon_age > 16 && result.moon_age <= 21 && '下弦'}
                                  {result.moon_age > 21 && result.moon_age <= 23 && '二十三夜'}
                                  {result.moon_age > 23 && '晦日月'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        
                        {/* ホバーアクション */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center py-3 rounded-xl text-sm font-medium shadow-lg">
                            詳細を見る →
                          </div>
                        </div>
                      </div>
                      </Card>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
              
              <AnimatedSection animation="fade" delay={600}>
                <div className="text-center mt-12">
                  <Button href="/results" variant="primary" size="lg" className="animate-wiggle">
                    もっと釣果を見る
                  </Button>
                </div>
              </AnimatedSection>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-6">まだ釣果が登録されていません</p>
              <Button href="/contact">予約して最初の釣果を登録しましょう！</Button>
            </div>
          )}
        </div>
      </section>

      {/* 玉江港紹介セクション */}
      <section className="section-padding bg-gradient-to-b from-ocean-light/10 to-white relative overflow-hidden">
        <div className="container-custom relative">
          <AnimatedSection animation="zoom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ocean-dark">
                山陰屈指の人気釣りスポット
                <br />
                <span className="text-primary-600 text-5xl md:text-6xl">玉江港</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                山口県萩市山田玉江港は、毎日多くの釣り人で賑わう山陰屈指の人気スポット。
                <br />
                この恵まれた漁場から出船する翔葵丸は、
                <br />
                陸からでは味わえない海の上での釣りの醍醐味を
                <br />
                皆様にお届けしています。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* サービス紹介セクション */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 title-decorated animate-slide-in-down">翔葵丸の特徴</h2>
              <p className="text-gray-600 animate-fade-in-slow">安心・安全・楽しいイカ釣り体験をお約束します</p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="slide-left" delay={0}>
              <Card gradient="primary" className="text-center group hover:animate-wiggle">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow">
                    <svg className="w-10 h-10 text-white animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">初心者歓迎</h3>
                <p className="text-white/90">
                  道具の使い方から釣り方まで、船長が丁寧にサポートいたします
                </p>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={200}>
              <Card gradient="secondary" className="text-center group hover:animate-wiggle">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">安全第一</h3>
                <p className="text-white/90">
                  最新の安全設備を完備。女性やお子様も安心してご乗船いただけます
                </p>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-right" delay={400}>
              <Card gradient="ocean" className="text-center group hover:animate-wiggle">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow">
                    <svg className="w-10 h-10 text-white animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">楽しい体験</h3>
                <p className="text-white/90">
                  萩湾の美しい海で、思い出に残るイカ釣り体験をご提供します
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
        <ParallaxSection speed={0.5} className="absolute inset-0">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
          </div>
        </ParallaxSection>
        
        <div className="container-custom text-center relative">
          <AnimatedSection animation="zoom">
            <h2 className="text-4xl font-bold text-white mb-6 ">
              海の上から楽しむ特別な釣り体験
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              玉江港から出船し、陸からでは味わえない釣りの醍醐味を。<br />
              初心者の方も道具レンタル完備で安心です。
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg" className="animate-pulse-slow ">
                予約・お問い合わせ
              </Button>
              <Button href="/pricing" variant="outline" size="lg" className="!text-white !border-white hover:!bg-white/20 animate-slide-in-right stagger-3">
                料金を確認する
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}