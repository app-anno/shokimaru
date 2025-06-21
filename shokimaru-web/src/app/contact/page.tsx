import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

export const metadata = {
  title: "予約・お問い合わせ | 翔葵丸",
  description: "翔葵丸へのご予約・お問い合わせはLINE、Instagram、お電話から。萩湾でのイカ釣り体験をお待ちしています。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-b from-background to-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-4">
            予約・お問い合わせ
          </h1>
          <p className="text-center text-lg text-gray-600">
            ご予約やお問い合わせは、以下の方法でお気軽にご連絡ください
          </p>
        </div>
      </section>

      {/* 連絡方法セクション */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* LINE */}
            <Card className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">LINE</h3>
                <p className="text-gray-600 mb-4">
                  一番スムーズにご予約いただけます
                </p>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600">
                  友だち追加後、メッセージをお送りください
                </p>
                <p className="font-bold">@shokimaru</p>
              </div>
              <Link
                href="https://line.me/ti/p/XXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                LINEで予約
              </Link>
            </Card>

            {/* Instagram */}
            <Card className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">📸</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Instagram</h3>
                <p className="text-gray-600 mb-4">
                  DMでお問い合わせください
                </p>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600">
                  最新の釣果情報も配信中！
                </p>
                <p className="font-bold">@shokimaru_hagi</p>
              </div>
              <Link
                href="https://instagram.com/shokimaru_hagi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Instagramへ
              </Link>
            </Card>

            {/* 電話 */}
            <Card className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">📞</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">お電話</h3>
                <p className="text-gray-600 mb-4">
                  お急ぎの方はお電話でどうぞ
                </p>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600">
                  受付時間：8:00〜20:00
                </p>
                <p className="font-bold text-xl">090-XXXX-XXXX</p>
              </div>
              <Link
                href="tel:090XXXXXXXX"
                className="btn-primary inline-block"
              >
                電話をかける
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* 予約の流れセクション */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            ご予約の流れ
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="font-bold mb-1">お問い合わせ</h3>
                  <p className="text-gray-700">
                    ご希望の日程、人数、プラン（乗り合い/チャーター）をお知らせください
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="font-bold mb-1">空き状況の確認</h3>
                  <p className="text-gray-700">
                    空き状況を確認し、ご予約可能な日時をご連絡します
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="font-bold mb-1">予約確定</h3>
                  <p className="text-gray-700">
                    集合場所・時間などの詳細をお伝えして予約完了です
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ内容の例 */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            お問い合わせ例
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <h3 className="font-bold text-lg mb-4">
                ご予約のお問い合わせ例
              </h3>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm leading-relaxed">
                  はじめまして。○月○日に大人3名でイカ釣りを体験したいと思っています。
                  全員初心者なのですが、乗り合いプランで参加可能でしょうか？
                  また、レンタル竿を3セットお借りしたいです。
                  よろしくお願いします。
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-lg mb-4">
                その他のお問い合わせ例
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>・団体（10名以上）での利用について</li>
                <li>・悪天候時の対応について</li>
                <li>・釣り方のレクチャーについて</li>
                <li>・アクセス方法について</li>
                <li>・その他、ご不明な点</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              ご予約・お問い合わせの際のお願い
            </h2>
            <Card>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">・</span>
                  <span>
                    ご予約は先着順となります。人気の日程は早めにお問い合わせください。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">・</span>
                  <span>
                    天候や海況により出船できない場合があります。前日に最終確認のご連絡をいたします。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">・</span>
                  <span>
                    キャンセルされる場合は、できるだけ早めにご連絡をお願いします。
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">・</span>
                  <span>
                    ご不明な点がございましたら、お気軽にお問い合わせください。
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}