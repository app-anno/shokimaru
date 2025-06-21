import Card from "@/components/Card";
import Button from "@/components/Button";

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
    <div className="min-h-screen">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-b from-background to-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-4">料金・サービス</h1>
          <p className="text-center text-lg text-gray-600">
            翔葵丸のご利用料金とサービス内容をご案内します
          </p>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">料金プラン</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 乗り合いプラン */}
            <Card className="text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">乗り合いプラン</h3>
                <p className="text-gray-600">他のお客様と一緒に出船</p>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary">
                  ¥9,000
                  <span className="text-lg text-gray-600 font-normal">/人</span>
                </p>
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>1名様から参加可能</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>最大6名まで</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>初心者歓迎</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>船長のサポート付き</span>
                </li>
              </ul>
              <Button href="/contact" className="w-full">
                予約する
              </Button>
            </Card>

            {/* チャータープラン */}
            <Card className="text-center border-2 border-primary">
              <div className="mb-6">
                <div className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full mb-2">
                  人気プラン
                </div>
                <h3 className="text-2xl font-bold mb-2">チャータープラン</h3>
                <p className="text-gray-600">船を貸し切りでゆったり</p>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary">
                  ¥45,000
                  <span className="text-lg text-gray-600 font-normal">/1艇</span>
                </p>
              </div>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>最大6名まで乗船可能</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>プライベート空間</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>時間の融通が利く</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>グループ・家族におすすめ</span>
                </li>
              </ul>
              <Button href="/contact" className="w-full">
                予約する
              </Button>
            </Card>
          </div>

          {/* レンタル料金 */}
          <div className="mt-12 text-center">
            <Card className="inline-block">
              <h4 className="font-bold mb-2">レンタルタックル</h4>
              <p className="text-2xl font-bold text-primary">
                ¥1,000
                <span className="text-sm text-gray-600 font-normal">/1セット</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                竿・リール・仕掛けのセット
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* サービス内容セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">サービス内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-4">🎣 イカ釣り専門</h3>
              <p className="text-gray-700">
                萩湾の豊かな海でイカ釣りを楽しめます。季節や潮の状態に合わせて、
                最適なポイントへご案内します。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">👨‍🏫 初心者サポート</h3>
              <p className="text-gray-700">
                釣り方から仕掛けの使い方まで、船長が丁寧にレクチャー。
                初めての方でも安心して楽しめます。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">🛡️ 安全装備完備</h3>
              <p className="text-gray-700">
                ライフジャケットは無料でご用意。安全を最優先に、
                楽しい釣り体験をサポートします。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">📍 好アクセス</h3>
              <p className="text-gray-700">
                山口県萩市の港から出船。詳しい場所は予約時にご案内します。
                駐車場情報もお問い合わせください。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">📱 SNS連携</h3>
              <p className="text-gray-700">
                LINE・Instagramでの予約受付に対応。釣果情報も随時更新しています。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">🌊 少人数制</h3>
              <p className="text-gray-700">
                最大6名までの少人数制で、ゆったりと釣りを楽しめます。
                密を避けた快適な環境です。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ご利用の流れセクション */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">ご利用の流れ</h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                step: "1",
                title: "ご予約",
                description: "LINE、Instagram、お電話でご予約ください。日程や人数をお伝えください。",
              },
              {
                step: "2",
                title: "前日確認",
                description: "天候や海況を確認し、出船可否をご連絡します。集合場所の詳細もお伝えします。",
              },
              {
                step: "3",
                title: "当日集合",
                description: "指定の時間に港へお越しください。レンタル希望の方は受付時にお申し出ください。",
              },
              {
                step: "4",
                title: "出船・釣り体験",
                description: "安全説明の後、ポイントへ移動。船長がサポートしながら釣りを楽しんでいただきます。",
              },
              {
                step: "5",
                title: "帰港",
                description: "釣果を確認して帰港。思い出の写真撮影もお忘れなく！",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div className="ml-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            萩湾でイカ釣りを体験しよう
          </h2>
          <p className="text-xl mb-8">
            初心者の方も大歓迎！お気軽にお問い合わせください
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            予約・お問い合わせはこちら
          </Button>
        </div>
      </section>
    </div>
  );
}