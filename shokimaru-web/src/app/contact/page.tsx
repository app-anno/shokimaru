import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "予約・お問い合わせ",
  description: "翔葵丸へのご予約・お問い合わせはLINE、Instagram、お電話から。萩湾でのイカ釣り体験をお待ちしています。",
  openGraph: {
    title: "予約・お問い合わせ | 翔葵丸",
    description: "翔葵丸へのご予約・お問い合わせはLINE、Instagram、お電話から。",
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      <FloatingElements />
      
      {/* ヘッダーセクション */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-accent/20 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient ">
              予約・お問い合わせ
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600">
              ご予約やお問い合わせは、以下の方法でお気軽にご連絡ください
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 連絡方法セクション */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* LINE */}
            <AnimatedSection animation="slide-left" delay={0}>
              <Card className="text-center hover:scale-105 transition-transform duration-300 group hover:animate-pulse-slow">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow shadow-glow-green">
                    <span className="text-white text-3xl">📱</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">LINE</h3>
                  <p className="text-gray-600 mb-4">
                    一番スムーズにご予約いただけます
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">
                    友だち追加後、メッセージをお送りください
                  </p>
                  <p className="font-bold text-green-600 animate-pulse-slow">QRコードを読み取って友だち追加</p>
                </div>
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <Image
                      src="/line.jpg"
                      alt="LINE QRコード"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <Button href="#" variant="primary" className="hover:animate-wiggle" disabled>
                  上記QRコードから友だち追加
                </Button>
              </Card>
            </AnimatedSection>

            {/* Instagram */}
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="text-center hover:scale-105 transition-transform duration-300 group hover:animate-pulse-slow">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow shadow-glow-purple">
                    <span className="text-white text-3xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors">Instagram</h3>
                  <p className="text-gray-600 mb-4">
                    DMでお問い合わせください
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">
                    最新の釣果情報も配信中！
                  </p>
                  <p className="font-bold text-gradient animate-pulse-slow">@shokimaru1</p>
                </div>
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <Image
                      src="/insta.jpg"
                      alt="Instagram QRコード"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <Link
                  href="https://instagram.com/shokimaru1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block hover:animate-wiggle"
                >
                  Instagramへ
                </Link>
              </Card>
            </AnimatedSection>

            {/* 電話 */}
            <AnimatedSection animation="slide-right" delay={400}>
              <Card className="text-center hover:scale-105 transition-transform duration-300 group hover:animate-pulse-slow">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow shadow-glow">
                    <span className="text-white text-3xl">📞</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">お電話</h3>
                  <p className="text-gray-600 mb-4">
                    お急ぎの方はお電話でどうぞ
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">
                    受付時間：8:00〜20:00
                  </p>
                  <p className="font-bold text-xl text-primary-600 animate-pulse-slow">090-2053-9539</p>
                </div>
                <Link
                  href="tel:090-2053-9539"
                  className="btn-primary inline-block hover:animate-wiggle"
                >
                  電話をかける
                </Link>
              </Card>
            </AnimatedSection>

            {/* Google Form */}
            <AnimatedSection animation="slide-up" delay={600}>
              <Card className="text-center hover:scale-105 transition-transform duration-300 group hover:animate-pulse-slow">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow shadow-glow-blue">
                    <span className="text-white text-3xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">ネット予約</h3>
                  <p className="text-gray-600 mb-4">
                    24時間いつでも予約可能
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-600">
                    必要事項を入力するだけ
                  </p>
                  <p className="font-bold text-blue-600 animate-pulse-slow">かんたんWeb予約</p>
                </div>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block hover:animate-wiggle"
                >
                  予約フォームへ
                </Link>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 予約の流れセクション */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full blur-3xl animate-float" />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              ご予約の流れ
            </h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: "お問い合わせ", desc: "ご希望の日程、人数、プラン（乗り合い/チャーター）をお知らせください" },
                { step: 2, title: "空き状況の確認", desc: "空き状況を確認し、ご予約可能な日時をご連絡します" },
                { step: 3, title: "予約確定", desc: "集合場所・時間などの詳細をお伝えして予約完了です" }
              ].map((item, index) => (
                <AnimatedSection key={index} animation="slide-left" delay={index * 200}>
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 animate-bounce-slow group-hover:animate-spin" style={{ animationDelay: `${index * 300}ms` }}>
                      {item.step}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold mb-1 text-lg">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                      {index < 2 && (
                        <div className="w-0.5 h-12 bg-gray-300 ml-5 mt-4 animate-slide-in-down" style={{ animationDelay: `${(index + 1) * 400}ms` }} />
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ内容の例 */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              お問い合わせ例
            </h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                <h3 className="font-bold text-lg mb-4 text-primary-600">
                  ご予約のお問い合わせ例
                </h3>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg animate-fade-in">
                  <p className="text-sm leading-relaxed text-gray-700">
                    はじめまして。○月○日に大人3名でイカ釣りを体験したいと思っています。
                    全員初心者なのですが、乗り合いプランで参加可能でしょうか？
                    また、レンタル竿を3セットお借りしたいです。
                    よろしくお願いします。
                  </p>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                <h3 className="font-bold text-lg mb-4 text-primary-600">
                  その他のお問い合わせ例
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "団体（10名以上）での利用について",
                    "悪天候時の対応について",
                    "釣り方のレクチャーについて",
                    "アクセス方法について",
                    "その他、ご不明な点"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-right" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                      <span className="text-primary mr-2 animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>・</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 80 + 40}px`,
                height: `${Math.random() * 80 + 40}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slide-down">
              <h2 className="text-3xl font-bold text-center mb-8 text-white ">
                ご予約・お問い合わせの際のお願い
              </h2>
            </AnimatedSection>
            
            <AnimatedSection animation="zoom" delay={300}>
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl animate-pulse-slow">
                <ul className="space-y-4">
                  {[
                    "ご予約は先着順となります。人気の日程は早めにお問い合わせください。",
                    "天候や海況により出船できない場合があります。前日に最終確認のご連絡をいたします。",
                    "キャンセルされる場合は、できるだけ早めにご連絡をお願いします。",
                    "ご不明な点がございましたら、お気軽にお問い合わせください。"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-left" style={{ animationDelay: `${(index + 1) * 150}ms` }}>
                      <span className="text-primary-500 mr-3 text-xl animate-wiggle" style={{ animationDelay: `${index * 300}ms` }}>✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}