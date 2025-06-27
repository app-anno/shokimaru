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
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200 to-primary-200/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
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
                    "最少催行人数：1名",
                    "最大乗船人数：5名",
                    "出船時間をお選びいただけます",
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
              <Card className="text-center border-2 border-primary-400 relative overflow-hidden hover:animate-wiggle group">
                <div className="absolute -top-1 -right-1">
                  <div className="bg-primary-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg animate-wiggle">
                    人気！
                  </div>
                </div>
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4 animate-spin-slow">
                    <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    "最大乗船人数：6名",
                    "※スタッフが乗る場合、最大5名になります",
                    "時間を気にせず楽しめる",
                    "プライベート空間で釣り",
                    "グループ・家族におすすめ"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-left" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                      <span className="text-primary-500 mr-2 animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant="primary" fullWidth className="">
                  予約する
                </Button>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade" delay={600}>
            <p className="text-center text-gray-600 mt-8">
              ※料金は税込価格です。天候により出船できない場合は全額返金いたします。<br />
              ※高校生以下は半額（4,500円）となります。年齢がわかる書類をお持ちください（コピー可）。<br />
              ※レンタルタックルは半額対象外です。<br />
              <span className="text-red-600 font-bold">※お支払いは現金のみとなります。</span><br />
              <span className="text-gray-700">※領収証ご利用の場合は事前にお伝えください。</span>
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
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">レンタル品</h2>
          </AnimatedSection>
          
          {/* レンタルタックル料金カード */}
          <div className="max-w-2xl mx-auto mb-12">
            <AnimatedSection animation="slide-up">
              <Card className="text-center bg-gradient-to-br from-primary-50 to-primary-100/50">
                <h3 className="text-2xl font-bold mb-4 text-primary-700">レンタルタックル</h3>
                <p className="text-4xl font-bold text-primary-600 mb-4">
                  ¥1,000
                  <span className="text-lg text-gray-600 font-normal">/1セット</span>
                </p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>※レンタルタックルの仕掛けが切れた場合、追加の仕掛けは＋1,000円いただきます</p>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade" delay={300}>
            <h3 className="text-2xl font-bold text-center mb-8">基本装備（無料）</h3>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
                title: "ライフジャケット",
                description: "安全のためのライフジャケットは無料で完備"
              },
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                title: "氷",
                description: "釣った魚の保存用の氷を無料でご用意"
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "初心者講習",
                description: "釣り方の説明・サポートは無料です"
              }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="flip" delay={index * 200 + 400}>
                <Card className="text-center group hover:animate-pulse-slow">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:animate-spin-slow">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                description: "出船時間の10分前には必ず玉江漁港にお越しください。場所が分からない場合はお気軽にご連絡ください。"
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

      {/* 重要事項セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">乗船に関する重要事項</h2>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="zoom" delay={200}>
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-primary-600">安全のためのお願い</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "ライフジャケットは必ず着用お願い致します",
                    "船べり（船の外板のてすり上）に座らないでください",
                    "遊漁船の運行に関しては船長の判断に従ってください",
                    "泥酔状態での乗船、乗船中の危険行為は禁止します",
                    "体調不良の方は、乗船をお断りする場合があります"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                      <span className="text-primary-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-bold mb-6 mt-8 text-primary-600">船内でのマナー</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "船内での移動、喫煙、飲食、飲酒等は船長の指示に従ってください",
                    "タバコを海上や船のデッキに捨てないでください",
                    "ゴミ、仕掛けや道具の入っていた包装用の袋、糸や針をデッキに捨てないでください",
                    "魚の血でデッキが汚れましたら洗い流してください",
                    "ゴミは各自お持ち帰りください"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-right" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                      <span className="text-primary-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
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
              初心者の方も船長が丁寧にサポートします。<br />
              手ぶらでお気軽にお越しください！
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg" className="animate-pulse-slow ">
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