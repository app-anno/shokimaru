import Card from "@/components/Card";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "イカ釣りガイド | 初心者向け釣り方講座",
  description: "山口県萩市の翔葵丸で楽しむイカ釣りの基本ガイド。道具の使い方、釣り方のコツ、ケンサキイカ・スルメイカの釣り分け方まで、初心者にもわかりやすく解説します。",
  keywords: ["イカ釣り", "釣り方", "初心者", "ガイド", "萩市", "山口県", "翔葵丸", "ケンサキイカ", "スルメイカ", "エギング", "イカメタル"],
  openGraph: {
    title: "イカ釣りガイド - 翔葵丸",
    description: "初心者でも安心！イカ釣りの基本から応用まで詳しく解説",
  },
  alternates: {
    canonical: '/guide',
  },
};

export default function GuidePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">イカ釣りガイド</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
              山口県萩市・玉江港から出船する翔葵丸で楽しむイカ釣りの完全ガイド。<br />
              初めての方でも安心して楽しめるよう、基本から丁寧に解説します。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* イカの種類セクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="slide-up">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">萩湾で釣れるイカの種類</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* ケンサキイカ */}
            <AnimatedSection animation="slide-left" delay={200}>
              <Card className="hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-primary-600">ケンサキイカ（アカイカ）</h3>
                <div className="space-y-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2">特徴</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• 胴長：20〜40cm</li>
                      <li>• 赤褐色の体色</li>
                      <li>• 身が柔らかく甘みが強い</li>
                      <li>• 高級イカとして人気</li>
                    </ul>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2">シーズン</p>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">最盛期：6月〜9月</span><br />
                      萩湾では夏が最も釣りやすい時期。夜釣りがメインです。
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700 mb-2">釣り方のポイント</p>
                    <p className="text-sm text-gray-600">
                      エギやスッテを使用。潮の流れに合わせてゆっくりとしゃくります。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* スルメイカ */}
            <AnimatedSection animation="slide-right" delay={400}>
              <Card className="hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-primary-600">スルメイカ</h3>
                <div className="space-y-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2">特徴</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• 胴長：15〜30cm</li>
                      <li>• 透明感のある白っぽい体色</li>
                      <li>• 身が締まっていて歯ごたえがある</li>
                      <li>• 加工品にも適している</li>
                    </ul>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2">シーズン</p>
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">最盛期：10月〜12月</span><br />
                      秋から冬にかけてが狙い目。群れで回遊します。
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700 mb-2">釣り方のポイント</p>
                    <p className="text-sm text-gray-600">
                      群れを見つけたら手返し良く釣ることが大切。活性が高い時は入れ食いも。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 基本の釣り方セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">イカ釣りの基本</h2>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* ステップ1: 道具の準備 */}
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="bg-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3">道具の準備</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-primary-600 mb-2">必要な道具</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• 竿（レンタル可：¥1,000）</li>
                          <li>• リール（電動リール推奨）</li>
                          <li>• エギ or スッテ（仕掛け）</li>
                          <li>• ライフジャケット（無料貸出）</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-primary-600 mb-2">翔葵丸の特典</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>✓ 初心者用セット完備</li>
                          <li>✓ 仕掛けの結び方指導</li>
                          <li>✓ 予備の仕掛けも用意</li>
                          <li>✓ 氷・クーラーボックス無料</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* ステップ2: 仕掛けのセット */}
            <AnimatedSection animation="slide-up" delay={300}>
              <Card className="bg-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3">仕掛けのセット</h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        山口県萩市の海域に最適な仕掛けをご用意。船長が丁寧にセッティングをお手伝いします。
                      </p>
                      <div className="bg-primary-50 p-4 rounded-lg">
                        <p className="font-semibold text-primary-700 mb-2">エギ（餌木）</p>
                        <p className="text-sm text-gray-700">
                          主にケンサキイカ狙いで使用。2.5〜3.5号がおすすめ。
                          カラーは夜光系やピンク系が萩湾では実績あり。
                        </p>
                      </div>
                      <div className="bg-secondary-50 p-4 rounded-lg">
                        <p className="font-semibold text-secondary-700 mb-2">スッテ（イカ角）</p>
                        <p className="text-sm text-gray-700">
                          複数のイカを同時に狙える仕掛け。
                          玉江港沖では5〜10本仕掛けが標準です。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* ステップ3: 釣り方 */}
            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="bg-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3">実際の釣り方</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary-500 pl-4">
                        <p className="font-semibold text-primary-700 mb-2">基本動作「しゃくり」</p>
                        <ol className="space-y-2 text-sm text-gray-700">
                          <li>1. 仕掛けを海底まで沈める</li>
                          <li>2. 竿を大きく上にあおる（しゃくる）</li>
                          <li>3. ゆっくりと竿を下ろす</li>
                          <li>4. この動作を繰り返す</li>
                        </ol>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-gray-700 mb-2">💡 船長からのアドバイス</p>
                        <p className="text-sm text-gray-600">
                          「萩湾では潮の流れが速い時があります。仕掛けが流されないよう、
                          オモリの重さを調整することが大切です。わからないことは遠慮なく聞いてください！」
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* ステップ4: 取り込み */}
            <AnimatedSection animation="slide-up" delay={500}>
              <Card className="bg-white shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3">イカの取り込み</h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        イカがかかったら慌てずゆっくりと巻き上げます。水面近くで暴れることがあるので注意が必要です。
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="font-semibold text-red-700 mb-1 text-sm">⚠️ 注意点</p>
                          <ul className="space-y-1 text-xs text-gray-700">
                            <li>• イカスミに注意</li>
                            <li>• 素手で触らない</li>
                            <li>• 網やギャフを使用</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="font-semibold text-green-700 mb-1 text-sm">✅ コツ</p>
                          <ul className="space-y-1 text-xs text-gray-700">
                            <li>• 一定速度で巻く</li>
                            <li>• 水面で一呼吸置く</li>
                            <li>• 船長がサポート</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 上級テクニックセクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">もっと釣るためのテクニック</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "潮の読み方",
                icon: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
                content: "大潮の日は活性が高い！萩湾では満潮前後2時間が狙い目。月齢カレンダーをチェックしましょう。",
                color: "from-blue-400 to-cyan-600"
              },
              {
                title: "エギのカラー選択",
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                content: "日中は自然色、夜は夜光系が基本。玉江港沖ではピンク・オレンジ系が年間通して好調です。",
                color: "from-pink-400 to-rose-600"
              },
              {
                title: "誘いのパターン",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                content: "2段しゃくり、スローしゃくり、高速しゃくりなど、その日の活性に合わせて変化をつけることが大切。",
                color: "from-amber-400 to-orange-600"
              }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="flip" delay={index * 200}>
                <Card className={`h-full text-center group hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${item.color} text-white`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:animate-bounce">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{item.content}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 初心者応援セクション */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container-custom text-center">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold mb-6">初心者の方も安心！</h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              山口県萩市の翔葵丸では、初めてイカ釣りに挑戦される方を全力でサポート。<br />
              玉江港から出船し、萩湾の豊かな漁場でプロの船長が丁寧に指導します。
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "500名", label: "以上の初心者指導実績" },
                { number: "95%", label: "の方が釣果あり" },
                { number: "1対1", label: "の個別レクチャー" },
                { number: "0円", label: "追加の指導料" }
              ].map((stat, index) => (
                <div key={index} className="text-center animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>
                  <p className="text-4xl font-bold mb-2">{stat.number}</p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16">
        <div className="container-custom text-center">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold mb-6">準備はできましたか？</h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl text-gray-600 mb-8">
              このガイドを読んだら、あとは実践あるのみ！<br />
              翔葵丸で最高のイカ釣り体験をお楽しみください。
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-lg">
                今すぐ予約する
              </a>
              <a href="/faq" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary-600 bg-white border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                よくある質問を見る
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}