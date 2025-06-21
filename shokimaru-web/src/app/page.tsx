import Button from "@/components/Button";
import Card from "@/components/Card";
import MoonPhase from "@/components/MoonPhase";
import OptimizedImage from "@/components/OptimizedImage";
import AnimatedSection from "@/components/AnimatedSection";
import ParallaxSection from "@/components/ParallaxSection";
import AnimatedBackground from "@/components/AnimatedBackground";
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
        
        {/* 装飾的な波 */}
        <div className="absolute -bottom-[2px] left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-16 sm:h-20 md:h-32">
            <path fill="#f8fafb" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
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
                      <Card hover className="h-full group ">
                      {result.image_url ? (
                        <div className="aspect-video relative overflow-hidden rounded-xl mb-4">
                          <div className="absolute inset-0">
                            <OptimizedImage
                              src={result.image_url}
                              alt={`${result.date}の釣果`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                          <p className="text-gray-400">画像なし</p>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <h3 className="font-bold text-xl text-gray-800">
                          {new Date(result.date).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2">
                          {result.weather && (
                            <span className="badge badge-secondary">
                              {result.weather}
                            </span>
                          )}
                          {result.tide_type && (
                            <span className="badge badge-primary">
                              {result.tide_type}
                            </span>
                          )}
                        </div>
                        
                        {result.moon_age !== null && (
                          <div className="mt-2">
                            <MoonPhase moonAge={result.moon_age} />
                          </div>
                        )}
                        
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-primary-600 font-bold text-2xl">
                            {result.catch_count}杯
                          </p>
                          {result.size && (
                            <p className="text-gray-600 text-sm mt-1">サイズ：{result.size}</p>
                          )}
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