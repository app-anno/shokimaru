import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-b from-background to-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            萩湾でイカ釣り体験
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 仮の釣果データ */}
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div className="aspect-video bg-gray-200 rounded mb-4"></div>
                <h3 className="font-bold text-lg mb-2">2024年6月{20 + i}日</h3>
                <p className="text-gray-600">天気：晴れ</p>
                <p className="text-primary font-bold">{10 + i}杯釣れました！</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/results">もっと見る</Button>
          </div>
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