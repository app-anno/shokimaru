import Button from "@/components/Button";
import Card from "@/components/Card";
import MoonPhase from "@/components/MoonPhase";
import OptimizedImage from "@/components/OptimizedImage";
import { getFishingResults } from "@/lib/supabase/fishing-results";
import Link from "next/link";

export default async function Home() {
  // 最新の釣果を3件取得
  const latestResults = await getFishingResults(3);

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-b from-background to-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-white/90 z-10" />
          <OptimizedImage
            src="/hero-image.jpg"
            alt="萩湾の美しい海"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="container-custom text-center relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            萩湾でイカ釣り体験
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow">
            初心者・女性大歓迎！翔葵丸で楽しい釣り体験を
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              今すぐ予約する
            </Button>
            <Button href="/results" variant="secondary" size="lg">
              釣果を見る
            </Button>
          </div>
        </div>
      </section>

      {/* 最新釣果セクション */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">最新の釣果</h2>
          {latestResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestResults.map((result) => (
                  <Link href={`/results/${result.id}`} key={result.id}>
                    <Card className="h-full hover:shadow-xl transition-shadow">
                      {result.image_url ? (
                        <div className="aspect-video relative overflow-hidden rounded mb-4">
                          <OptimizedImage
                            src={result.image_url}
                            alt={`${result.date}の釣果`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-200 rounded mb-4 flex items-center justify-center">
                          <p className="text-gray-500">画像なし</p>
                        </div>
                      )}
                      <h3 className="font-bold text-lg mb-2">
                        {new Date(result.date).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                      <div className="space-y-1 text-sm">
                        {result.weather && (
                          <p className="text-gray-600">天気：{result.weather}</p>
                        )}
                        {result.tide_type && (
                          <p className="text-gray-600">潮：{result.tide_type}</p>
                        )}
                        {result.moon_age !== null && (
                          <div className="mt-2">
                            <MoonPhase moonAge={result.moon_age} />
                          </div>
                        )}
                      </div>
                      <p className="text-primary font-bold text-lg mt-3">
                        {result.catch_count}杯釣れました！
                      </p>
                      {result.size && (
                        <p className="text-gray-600 text-sm">サイズ：{result.size}</p>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button href="/results">もっと見る</Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">まだ釣果情報がありません</p>
              <Button href="/contact">最初のお客様になる</Button>
            </div>
          )}
        </div>
      </section>

      {/* サービス紹介セクション */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            翔葵丸の特徴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <h3 className="text-xl font-bold mb-4">初心者歓迎</h3>
              <p className="text-gray-700">
                釣りが初めての方でも大丈夫！船長が丁寧にサポートします。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">レンタル竿完備</h3>
              <p className="text-gray-700">
                手ぶらでOK！釣り竿のレンタル（1,000円）もご用意しています。
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-4">少人数でゆったり</h3>
              <p className="text-gray-700">
                最大6名までの少人数制。ゆったりと釣りを楽しめます。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            萩湾でイカ釣りを楽しもう！
          </h2>
          <p className="text-xl mb-8">
            ご予約はLINE・Instagram・お電話から
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            予約・お問い合わせ
          </Button>
        </div>
      </section>
    </>
  );
}