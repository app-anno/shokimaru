import Card from "@/components/Card";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingElements from "@/components/FloatingElements";

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "料金・サービス",
  description: "翔葵丸の料金プランとサービス内容をご案内します。乗り合い¥9,000/人、チャーター¥45,000/艇。イカ釣り専門の釣り船で、初心者の方も安心してご利用いただけます。",
  openGraph: {
    title: "料金・サービス | 翔葵丸",
    description: "乗り合い¥9,000/人、チャーター¥45,000/艇。イカ釣り専門の釣り船で、初心者の方も安心。",
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200 to-accent/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient ">料金・サービス</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600">
              翔葵丸のご利用料金とサービス内容をご案内します
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="slide-up">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">料金プラン</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 乗り合いプラン */}
            <AnimatedSection animation="slide-left" delay={200}>
              <Card className="text-center hover:animate-wiggle group">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4 animate-pulse-slow">
                    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">乗り合いプラン</h3>
                  <p className="text-gray-600">他のお客様と一緒に出船</p>
                </div>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-gradient animate-pulse-slow">
                    ¥9,000
                    <span className="text-lg text-gray-600 font-normal">/人</span>
                  </p>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  {[
                    "最少催行人数：2名",
                    "最大乗船人数：5名",
                    "出船時間をお選びいただけます",
                    "道具レンタル無料",
                    "初心者講習付き"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-right" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                      <span className="text-primary-500 mr-2 animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" fullWidth className="animate-pulse-slow">
                  予約する
                </Button>
              </Card>
            </AnimatedSection>

            {/* チャータープラン */}
            <AnimatedSection animation="slide-right" delay={400}>
              <Card className="text-center border-2 border-accent relative overflow-hidden hover:animate-wiggle group">
                <div className="absolute -top-1 -right-1">
                  <div className="bg-accent text-white px-4 py-1 text-sm font-bold rounded-bl-lg animate-wiggle">
                    人気！
                  </div>
                </div>
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/20 to-accent/30 rounded-full flex items-center justify-center mb-4 animate-spin-slow">
                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">チャータープラン</h3>
                  <p className="text-gray-600">船を貸し切りでご利用</p>
                </div>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-gradient ">
                    ¥45,000
                    <span className="text-lg text-gray-600 font-normal">/艇</span>
                  </p>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  {[
                    "1艇まるごと貸し切り",
                    "最大乗船人数：5名",
                    "時間を気にせず楽しめる",
                    "プライベート空間で釣り",
                    "グループ・家族におすすめ"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-left" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                      <span className="text-accent mr-2 animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant="accent" fullWidth className="">
                  予約する
                </Button>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade" delay={600}>
            <p className="text-center text-gray-600 mt-8">
              ※料金は税込価格です。天候により出船できない場合は全額返金いたします。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* レンタル品セクション */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-secondary-200 to-ocean-light/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">無料レンタル品</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
                title: "釣り竿・リール",
                description: "イカ釣り専用の竿とリールを無料でお貸しします"
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                title: "仕掛け・エギ",
                description: "必要な仕掛けやエギもすべて無料でご用意"
              },
              {
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
                title: "ライフジャケット",
                description: "安全のためのライフジャケットも完備"
              }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="flip" delay={index * 200}>
                <Card className="text-center group hover:animate-pulse-slow">
                  <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4 group-hover:animate-spin-slow">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ご利用の流れセクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">ご利用の流れ</h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                step: "1",
                title: "ご予約",
                description: "お電話、LINE、Instagramからご予約ください。ご希望の日時と人数をお伝えください。"
              },
              {
                step: "2",
                title: "当日集合",
                description: "出船時間の15分前に港へお越しください。場所が分からない場合はお気軽にご連絡ください。"
              },
              {
                step: "3",
                title: "乗船・出港",
                description: "ライフジャケットを着用し、船長から説明を受けた後、いよいよ出港です。"
              },
              {
                step: "4",
                title: "釣りを楽しむ",
                description: "ポイントに到着したら釣り開始！船長が丁寧にサポートしますので初心者の方も安心です。"
              }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="slide-left" delay={index * 150}>
                <div className="flex mb-8 group">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg animate-bounce-slow group-hover:animate-spin">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    {index < 3 && (
                      <div className="w-0.5 h-16 bg-gray-300 ml-6 mt-4 animate-slide-in-down" style={{ animationDelay: `${(index + 1) * 300}ms` }} />
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-wave-pattern opacity-10" />
          {[...Array(5)].map((_, i) => (
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
            <h2 className="text-3xl font-bold text-white mb-6 ">
              イカ釣りデビューしませんか？
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              道具は全て無料レンタル。手ぶらでOK！<br />
              初心者の方も船長が丁寧にサポートします。
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="accent" size="lg" className="animate-pulse-slow ">
                今すぐ予約する
              </Button>
              <Button href="/faq" variant="outline" size="lg" className="!text-white !border-white hover:!bg-white/20">
                よくある質問を見る
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}