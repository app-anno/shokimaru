import Card from "@/components/Card";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "萩市の観光情報 | 釣りと一緒に楽しむ観光スポット",
  description: "山口県萩市の観光スポット情報。翔葵丸での釣り体験と合わせて楽しめる萩の名所・グルメ・宿泊施設をご紹介。世界遺産の萩城下町、松下村塾など歴史的スポットが満載。",
  keywords: ["萩市", "観光", "山口県", "萩城下町", "松下村塾", "世界遺産", "グルメ", "宿泊", "温泉", "翔葵丸", "玉江港", "釣り観光"],
  openGraph: {
    title: "萩市の観光情報 - 翔葵丸",
    description: "釣りと一緒に楽しむ萩の観光スポット。世界遺産や温泉、グルメ情報満載",
  },
  alternates: {
    canonical: '/sightseeing',
  },
};

export default function SightseeingPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">萩市の観光情報</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
              山口県萩市は歴史と自然が調和する美しい城下町。<br />
              翔葵丸での釣り体験と合わせて、萩の魅力を満喫してください。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 観光マップセクション */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="slide-up">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">玉江港からのアクセス</h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={200}>
            <Card className="max-w-4xl mx-auto shadow-xl">
              <div className="bg-primary-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-primary-700 mb-3">🚢 玉江港（翔葵丸出港地）</h3>
                <p className="text-gray-700 mb-4">
                  山口県萩市椿東にある玉江港は、萩市街地から車で約10分。<br />
                  釣りの前後に観光を楽しむのに最適な立地です。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-semibold text-primary-600">萩城下町まで</p>
                    <p className="text-gray-600">車で約15分</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-semibold text-primary-600">松下村塾まで</p>
                    <p className="text-gray-600">車で約10分</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="font-semibold text-primary-600">萩温泉郷まで</p>
                    <p className="text-gray-600">車で約20分</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  各観光スポットへは車でのアクセスが便利です。<br />
                  レンタカーやタクシーをご利用ください。
                </p>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* 世界遺産セクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-4 title-decorated">世界遺産「明治日本の産業革命遺産」</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              萩市には5つの世界遺産構成資産があり、日本の近代化の歴史を体感できます
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "萩城下町",
                description: "江戸時代の町割りがそのまま残る、風情ある城下町。白壁の武家屋敷や商家が立ち並びます。",
                distance: "玉江港から車で15分",
                highlight: "夏みかんの香り漂う風景",
                icon: "🏯"
              },
              {
                name: "松下村塾",
                description: "吉田松陰が主宰した私塾。明治維新の志士たちを育てた歴史的な場所です。",
                distance: "玉江港から車で10分",
                highlight: "維新の志士たちの学び舎",
                icon: "📚"
              },
              {
                name: "萩反射炉",
                description: "幕末に建設された金属溶解炉。日本の産業技術発展の証です。",
                distance: "玉江港から車で20分",
                highlight: "現存する反射炉は貴重",
                icon: "🏭"
              },
              {
                name: "恵美須ヶ鼻造船所跡",
                description: "幕末に西洋式帆船を建造した造船所跡。海防の要でした。",
                distance: "玉江港から車で25分",
                highlight: "海に面した歴史遺産",
                icon: "⚓"
              },
              {
                name: "大板山たたら製鉄遺跡",
                description: "江戸時代の製鉄所跡。日本の伝統的な製鉄技術を伝えます。",
                distance: "玉江港から車で40分",
                highlight: "山間の産業遺産",
                icon: "⚒️"
              }
            ].map((spot, index) => (
              <AnimatedSection key={index} animation="slide-up" delay={index * 100}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <div className="text-center mb-4">
                    <span className="text-4xl">{spot.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary-600">{spot.name}</h3>
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">{spot.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {spot.distance}
                    </div>
                    <div className="bg-primary-50 p-2 rounded text-primary-700 font-medium">
                      {spot.highlight}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* グルメセクション */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">萩のご当地グルメ</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 海の幸 */}
            <AnimatedSection animation="slide-left" delay={200}>
              <Card className="bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">🐟 海の幸</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">萩の地魚料理</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      日本海の荒波で育った新鮮な魚介類。特に「萩の瀬つきあじ」は絶品です。
                    </p>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">おすすめ店：</span><br />
                        • 萩心海（玉江港から車で15分）<br />
                        • 浜料理がんがん（萩城下町エリア）
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">イカ料理</h4>
                    <p className="text-gray-700 text-sm">
                      透明感のある新鮮なイカ刺しは格別の美味しさ。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* 郷土料理 */}
            <AnimatedSection animation="slide-right" delay={400}>
              <Card className="bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold mb-4 text-green-700">🍱 郷土料理</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">萩の夏みかん料理</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      萩名産の夏みかんを使った料理やスイーツ。爽やかな酸味が特徴です。
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 夏みかんソフトクリーム</li>
                      <li>• 夏みかん羊羹</li>
                      <li>• 夏みかんゼリー</li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-bold text-lg text-gray-800 mb-2">見蘭牛（けんらんぎゅう）</h4>
                    <p className="text-gray-700 text-sm">
                      萩市の天然記念物「見島牛」の血統を受け継ぐ高級和牛。
                      口の中でとろける絶品の味わいです。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade" delay={600}>
            <p className="text-center text-gray-600 mt-8">
              ※釣りの後のお食事には、萩市街地の飲食店がおすすめです
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 温泉・宿泊セクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">温泉・宿泊施設</h2>
          </AnimatedSection>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {/* 温泉情報 */}
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="text-2xl font-bold mb-4 text-purple-700">♨️ 萩温泉郷</h3>
                <p className="text-gray-700 mb-4">
                  釣りの疲れを癒すなら、萩温泉郷がおすすめ。
                  山口県萩市には8つの温泉地があり、それぞれ異なる泉質を楽しめます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-purple-600 mb-2">はぎ温泉</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      玉江港から車で約20分。日本海を望む絶景露天風呂が人気。
                    </p>
                    <p className="text-xs text-gray-500">泉質：カルシウム・ナトリウム-塩化物温泉</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-purple-600 mb-2">長門峡温泉</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      玉江港から車で約30分。山間の静かな温泉地。
                    </p>
                    <p className="text-xs text-gray-500">泉質：単純弱放射能冷鉱泉</p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* 宿泊施設 */}
            <AnimatedSection animation="slide-up" delay={400}>
              <Card>
                <h3 className="text-2xl font-bold mb-4 text-primary-600">🏨 おすすめ宿泊施設</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-bold text-lg">釣り客に人気の宿</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      早朝・夜の出船に対応した宿泊施設をご紹介します。
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <div>
                          <span className="font-semibold">萩観光ホテル</span><br />
                          <span className="text-xs">玉江港まで車で15分 / 釣果調理サービスあり</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <div>
                          <span className="font-semibold">萩の宿 常茂恵</span><br />
                          <span className="text-xs">萩城下町に位置 / 朝食時間の調整可能</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <div>
                          <span className="font-semibold">ビジネスホテル長谷川</span><br />
                          <span className="text-xs">リーズナブル / 玉江港まで車で10分</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* お土産セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">萩のお土産</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "萩焼",
                description: "400年の歴史を持つ伝統工芸品。使うほどに味わいが深まる「萩の七化け」が特徴。",
                icon: "🏺",
                color: "from-amber-400 to-orange-500"
              },
              {
                name: "夏みかん菓子",
                description: "萩名産の夏みかんを使った銘菓。丸漬けや羊羹など種類豊富。",
                icon: "🍊",
                color: "from-yellow-400 to-orange-500"
              },
              {
                name: "萩の地酒",
                description: "日本海の海の幸に合う地酒。「東洋美人」「長陽福娘」が有名。",
                icon: "🍶",
                color: "from-blue-400 to-indigo-500"
              }
            ].map((item, index) => (
              <AnimatedSection key={index} animation="flip" delay={index * 200}>
                <Card className={`text-center h-full group hover:shadow-xl transition-all duration-300`}>
                  <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-3xl group-hover:animate-bounce`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* モデルコースセクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">釣りと観光のモデルコース</h2>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-primary-600">1泊2日 萩満喫プラン</h3>
                
                <div className="space-y-6">
                  {/* 1日目 */}
                  <div className="border-l-4 border-primary-500 pl-6">
                    <h4 className="text-xl font-bold mb-3 text-primary-700">1日目</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-bold mr-3">10:00</span>
                        <div>
                          <p className="font-semibold">萩市内観光</p>
                          <p className="text-sm text-gray-600">萩城下町・松下村塾を巡る（世界遺産）</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-bold mr-3">12:00</span>
                        <div>
                          <p className="font-semibold">昼食</p>
                          <p className="text-sm text-gray-600">萩の地魚料理を堪能</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-bold mr-3">15:00</span>
                        <div>
                          <p className="font-semibold">宿泊施設チェックイン</p>
                          <p className="text-sm text-gray-600">萩温泉郷でゆっくり</p>
                        </div>
                      </div>
                      <div className="flex items-start bg-yellow-50 p-3 rounded-lg -ml-6 pl-6">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">17:30</span>
                        <div>
                          <p className="font-semibold">🎣 翔葵丸で釣り体験</p>
                          <p className="text-sm text-gray-600">玉江港から出船（約4時間）</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2日目 */}
                  <div className="border-l-4 border-secondary-500 pl-6">
                    <h4 className="text-xl font-bold mb-3 text-secondary-700">2日目</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-bold mr-3">09:00</span>
                        <div>
                          <p className="font-semibold">朝食・チェックアウト</p>
                          <p className="text-sm text-gray-600">釣果を調理してもらった朝食</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-bold mr-3">10:30</span>
                        <div>
                          <p className="font-semibold">萩焼体験</p>
                          <p className="text-sm text-gray-600">萩焼の窯元で陶芸体験</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-bold mr-3">14:00</span>
                        <div>
                          <p className="font-semibold">お土産購入</p>
                          <p className="text-sm text-gray-600">道の駅「萩しーまーと」でお買い物</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-primary-50 p-4 rounded-lg text-center">
                  <p className="text-primary-700 font-semibold">
                    釣りと観光を組み合わせて、萩の魅力を満喫！
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container-custom text-center">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold mb-6">萩で特別な思い出を</h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              山口県萩市の豊かな自然と歴史、そして新鮮な海の幸。<br />
              翔葵丸の釣り体験と合わせて、忘れられない旅をお楽しみください。
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                釣り船の予約はこちら
              </a>
              <a href="/access" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors">
                アクセス情報を見る
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}