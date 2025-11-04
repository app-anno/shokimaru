import Card from "@/components/Card";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "初心者向け釣りガイド | 翔葵丸の釣り方講座",
  description: "山口県萩市の翔葵丸で楽しむ釣りの基本ガイド。スーパーライトジギング（SLJ）、ナイトティップラン、イカメタル・オモリグの釣り方を初心者にもわかりやすく解説します。",
  keywords: ["釣りガイド", "初心者", "SLJ", "スーパーライトジギング", "ナイトティップラン", "イカメタル", "オモリグ", "萩市", "山口県", "翔葵丸"],
  openGraph: {
    title: "初心者向け釣りガイド - 翔葵丸",
    description: "初心者でも安心！SLJ、ナイトティップラン、イカメタルの基本から応用まで詳しく解説",
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
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">初心者向け釣りガイド</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
              山口県萩市・玉江港から出船する翔葵丸で楽しむ釣りの完全ガイド。<br />
              SLJ・ナイトティップラン・イカメタル、初めての方でも安心して楽しめるよう基本から丁寧に解説します。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 釣法紹介セクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="slide-up">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">翔葵丸で楽しめる釣りの種類</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* SLJ */}
            <AnimatedSection animation="slide-left" delay={200}>
              <Card className="hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full font-bold text-lg mb-3">
                    SLJ
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary-600">スーパーライトジギング</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    軽量なメタルジグを使った釣り方。多彩な魚種が狙えるエキサイティングな釣りです。
                  </p>
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2 text-sm">対象魚</p>
                    <p className="text-xs text-gray-700">
                      アジ、サバ、イサキ、カサゴ、メバル、ハマチ、根魚など
                    </p>
                  </div>
                  <div className="bg-secondary-50 p-3 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2 text-sm">シーズン</p>
                    <p className="text-xs text-gray-700">
                      通年（魚種により最盛期が異なります）
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* ナイトティップラン */}
            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full font-bold text-lg mb-3">
                    ティップラン
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary-600">ナイトティップラン</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    夜の海でエギを使ってイカを狙う釣り方。竿先（ティップ）の動きでアタリを取ります。
                  </p>
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2 text-sm">対象魚</p>
                    <p className="text-xs text-gray-700">
                      ケンサキイカ、スルメイカ
                    </p>
                  </div>
                  <div className="bg-secondary-50 p-3 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2 text-sm">シーズン</p>
                    <p className="text-xs text-gray-700">
                      6月〜12月（ケンサキイカ：6-9月、スルメイカ：10-12月）
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* イカメタル・オモリグ */}
            <AnimatedSection animation="slide-right" delay={600}>
              <Card className="hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full font-bold text-lg mb-3">
                    イカメタル
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary-600">イカメタル・オモリグ</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 text-sm">
                    メタルスッテやオモリグを使ったケンサキイカ専門の釣り方。レンタルタックル利用可能。
                  </p>
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2 text-sm">対象魚</p>
                    <p className="text-xs text-gray-700">
                      ケンサキイカ（アカイカ）
                    </p>
                  </div>
                  <div className="bg-secondary-50 p-3 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2 text-sm">シーズン</p>
                    <p className="text-xs text-gray-700">
                      6月〜9月（ケンサキイカシーズン）
                    </p>
                  </div>
                  <div className="bg-accent-50 p-3 rounded-lg">
                    <p className="font-semibold text-accent-700 mb-2 text-sm">レンタル</p>
                    <p className="text-xs text-gray-700">
                      タックルレンタル可能（+1,000円）
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SLJ詳細ガイド */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full inline-block">
                スーパーライトジギング（SLJ）
              </span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* SLJとは */}
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">SLJとは？</h3>
                <p className="text-gray-700 mb-4">
                  スーパーライトジギングは、軽量（20〜60g程度）のメタルジグを使った比較的新しい釣り方です。
                  軽いルアーを使うことで、様々なサイズ・種類の魚を狙うことができ、初心者でも気軽に楽しめます。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold text-green-700 mb-2">✅ メリット</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• ライトタックルで手軽</li>
                      <li>• 多彩な魚種が狙える</li>
                      <li>• 初心者でも扱いやすい</li>
                      <li>• 年間通して楽しめる</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-700 mb-2">🎯 狙える魚</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• アジ、サバ（回遊魚）</li>
                      <li>• イサキ、カサゴ（根魚）</li>
                      <li>• メバル、ハタ類</li>
                      <li>• ハマチ、青物（回遊時）</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* SLJの基本 */}
            <AnimatedSection animation="slide-up" delay={300}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">基本の釣り方</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="font-semibold text-primary-700 mb-2">ステップ1: ジグを落とす</p>
                    <p className="text-sm text-gray-700">
                      メタルジグを海底まで沈めます。着底したら糸ふけを取り、海底から1〜2m上げた位置から開始します。
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary-500 pl-4">
                    <p className="font-semibold text-secondary-700 mb-2">ステップ2: ジャーク（しゃくり）</p>
                    <p className="text-sm text-gray-700">
                      竿を上に素早く振り上げます（ジャーク）。この動きでジグが跳ね上がり、魚にアピールします。
                    </p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <p className="font-semibold text-accent-700 mb-2">ステップ3: フォール</p>
                    <p className="text-sm text-gray-700">
                      竿を下ろしながらジグを落とします。多くの魚はこのフォール中にヒットします。
                    </p>
                  </div>
                  <div className="border-l-4 border-ocean-light pl-4">
                    <p className="font-semibold text-ocean-dark mb-2">ステップ4: 繰り返し</p>
                    <p className="text-sm text-gray-700">
                      ステップ2〜3を繰り返しながら、徐々に上の層を探ります。海面近くまで来たらまた落とし直します。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* SLJのコツ */}
            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">釣果を上げるコツ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2">ジグの選び方</p>
                    <p className="text-sm text-gray-700">
                      水深や潮の速さで重さを調整。萩湾では30〜40gが基本です。カラーは青系・ピンク系が実績あり。
                    </p>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2">アクションの変化</p>
                    <p className="text-sm text-gray-700">
                      ワンピッチ、ハイピッチ、スローピッチなど、その日の状況に合わせてアクションを変えてみましょう。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ナイトティップラン詳細ガイド */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full inline-block">
                ナイトティップラン
              </span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* ティップランとは */}
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">ティップランとは？</h3>
                <p className="text-gray-700 mb-4">
                  ティップランエギングは、ボートからエギ（イカ用のルアー）を使ってイカを狙う釣り方です。
                  竿先（ティップ）の動きでイカのアタリを感じ取ることから「ティップラン」と呼ばれます。
                  翔葵丸では夜間に行う「ナイトティップラン」でケンサキイカ・スルメイカを狙います。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-2">💡 夜釣りの魅力</p>
                  <p className="text-sm text-gray-600">
                    夜の海は昼とは違った雰囲気。静かな海で竿先に集中する時間は、昼間の釣りとはまた違った楽しさがあります。
                    船長が夜間の安全対策もしっかりサポートします。
                  </p>
                </div>
              </Card>
            </AnimatedSection>

            {/* ティップランの基本 */}
            <AnimatedSection animation="slide-up" delay={300}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">基本の釣り方</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="font-semibold text-primary-700 mb-2">ステップ1: エギを沈める</p>
                    <p className="text-sm text-gray-700">
                      専用のティップランエギ（重いエギ）を海底まで沈めます。着底を確認したら糸ふけを取ります。
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary-500 pl-4">
                    <p className="font-semibold text-secondary-700 mb-2">ステップ2: しゃくり上げ</p>
                    <p className="text-sm text-gray-700">
                      竿を大きく上にあおって（しゃくって）、エギを跳ね上げます。1〜2回のしゃくりが基本です。
                    </p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <p className="font-semibold text-accent-700 mb-2">ステップ3: フォール（竿先に集中）</p>
                    <p className="text-sm text-gray-700">
                      エギを沈めながら竿先（ティップ）の動きを注視します。竿先が引き込まれたり、重くなったらアタリです。
                    </p>
                  </div>
                  <div className="border-l-4 border-ocean-light pl-4">
                    <p className="font-semibold text-ocean-dark mb-2">ステップ4: 合わせ</p>
                    <p className="text-sm text-gray-700">
                      アタリを感じたら、竿を大きく上にあおってフッキングさせます。イカが乗ったら一定速度で巻き上げます。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* ティップランのコツ */}
            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">釣果を上げるコツ</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <p className="font-semibold text-primary-700 mb-2">エギの選び方</p>
                      <p className="text-sm text-gray-700">
                        ティップラン専用エギ（20〜40g）を使用。カラーは夜光系、ピンク系、オレンジ系が萩湾では実績あり。
                      </p>
                    </div>
                    <div className="bg-secondary-50 p-4 rounded-lg">
                      <p className="font-semibold text-secondary-700 mb-2">竿先の見方</p>
                      <p className="text-sm text-gray-700">
                        竿先に鈴やケミホタルを付けると、暗闇でもアタリがわかりやすくなります。小さな変化も見逃さないように。
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-semibold text-red-700 mb-2">⚠️ 夜釣りの注意点</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• ライフジャケットは必ず着用</li>
                      <li>• ヘッドライトや懐中電灯を準備</li>
                      <li>• 船内の移動は慎重に</li>
                      <li>• 船長の指示に必ず従う</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* イカメタル・オモリグ詳細ガイド */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full inline-block">
                イカメタル・オモリグ
              </span>
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* イカメタルとは */}
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">イカメタル・オモリグとは？</h3>
                <p className="text-gray-700 mb-4">
                  イカメタルは、メタルスッテ（金属製のイカ釣り仕掛け）を使った釣り方。
                  オモリグは、重りとエギを組み合わせた仕掛けです。
                  どちらもケンサキイカを効率的に狙える人気の釣法で、レンタルタックルも利用できるので初心者の方にもおすすめです。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="font-semibold text-primary-700 mb-2">イカメタル</p>
                    <p className="text-sm text-gray-700">
                      メタルスッテを使用。複数のスッテを付けた仕掛けで効率良くイカを狙います。光る素材が効果的。
                    </p>
                  </div>
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <p className="font-semibold text-secondary-700 mb-2">オモリグ</p>
                    <p className="text-sm text-gray-700">
                      重りとエギの組み合わせ。深場を攻めやすく、潮が速い状況でも使いやすい仕掛けです。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* レンタルタックル案内 */}
            <AnimatedSection animation="slide-up" delay={300}>
              <Card className="bg-white shadow-lg border-2 border-accent-200">
                <h3 className="text-xl font-bold mb-4 text-accent-600">🎣 レンタルタックルについて</h3>
                <div className="space-y-3">
                  <div className="bg-accent-50 p-4 rounded-lg">
                    <p className="font-semibold text-accent-700 mb-2">初心者の方に最適！</p>
                    <p className="text-sm text-gray-700 mb-3">
                      イカメタル・オモリグ専用のレンタルタックルをご用意しています。
                      道具を持っていない方でも、手ぶらで気軽にケンサキイカ釣りが楽しめます。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">料金</p>
                        <p className="text-lg font-bold text-accent-600">+1,000円</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">利用期間</p>
                        <p className="text-lg font-bold text-primary-600">6月〜9月のみ</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700 mb-2">セット内容</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• イカメタル専用ロッド</li>
                      <li>• 電動リール（または手巻きリール）</li>
                      <li>• 基本の仕掛け一式</li>
                      <li>• 使い方の丁寧なレクチャー付き</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* イカメタルの基本 */}
            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">基本の釣り方</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="font-semibold text-primary-700 mb-2">ステップ1: 仕掛けを落とす</p>
                    <p className="text-sm text-gray-700">
                      メタルスッテまたはオモリグを海底まで沈めます。電動リールの場合はカウンターで水深を確認できます。
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary-500 pl-4">
                    <p className="font-semibold text-secondary-700 mb-2">ステップ2: 誘い</p>
                    <p className="text-sm text-gray-700">
                      竿を軽くしゃくって仕掛けを動かします。ケンサキイカは繊細なので、優しい誘いが効果的です。
                    </p>
                  </div>
                  <div className="border-l-4 border-accent-500 pl-4">
                    <p className="font-semibold text-accent-700 mb-2">ステップ3: 待ち</p>
                    <p className="text-sm text-gray-700">
                      誘った後、数秒〜数十秒待ちます。この「待ち」の時間にイカが抱いてくることが多いです。
                    </p>
                  </div>
                  <div className="border-l-4 border-ocean-light pl-4">
                    <p className="font-semibold text-ocean-dark mb-2">ステップ4: 巻き上げ</p>
                    <p className="text-sm text-gray-700">
                      重みを感じたらゆっくり一定速度で巻き上げます。急に引くとイカが離れてしまうので注意。
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* イカメタルのコツ */}
            <AnimatedSection animation="slide-up" delay={500}>
              <Card className="bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-primary-600">釣果を上げるコツ</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <p className="font-semibold text-primary-700 mb-2">仕掛けの選び方</p>
                      <p className="text-sm text-gray-700">
                        夜光系のメタルスッテが基本。サイズは15〜25号。萩湾ではピンク・オレンジ系が好調です。
                      </p>
                    </div>
                    <div className="bg-secondary-50 p-4 rounded-lg">
                      <p className="font-semibold text-secondary-700 mb-2">誘いのリズム</p>
                      <p className="text-sm text-gray-700">
                        「しゃくり→待ち→しゃくり→待ち」のリズムが大切。焦らず、イカに抱かせる時間を作りましょう。
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700 mb-2">💡 船長からのアドバイス</p>
                    <p className="text-sm text-gray-600">
                      「ケンサキイカは繊細な生き物です。強い誘いよりも、優しくゆっくりとした誘いが効果的。
                      アタリがなくても焦らず、同じパターンを繰り返すことが大切です。
                      レンタルタックルをご利用の方には、その日のベストな釣り方を丁寧にお教えします！」
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 共通のアドバイスセクション */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">初心者の方へ - 共通のアドバイス</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* 持ち物 */}
            <AnimatedSection animation="slide-left" delay={200}>
              <Card className="h-full bg-gradient-to-br from-blue-400 to-cyan-600 text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">基本の持ち物</h3>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• 動きやすく濡れても良い服装</li>
                  <li>• 帽子（日除け・防寒）</li>
                  <li>• タオル</li>
                  <li>• 飲み物・軽食</li>
                  <li>• 酔い止め（必要な方）</li>
                  <li>• クーラーボックス（釣果持ち帰り用）</li>
                  <li>• 防寒着（季節に応じて）</li>
                </ul>
              </Card>
            </AnimatedSection>

            {/* 船酔い対策 */}
            <AnimatedSection animation="slide-right" delay={400}>
              <Card className="h-full bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">船酔い対策</h3>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• 前日はしっかり睡眠を取る</li>
                  <li>• 酔い止め薬は出航30分前に服用</li>
                  <li>• 空腹・満腹は避ける</li>
                  <li>• 遠くの景色を見る</li>
                  <li>• スマホを見続けない</li>
                  <li>• 船の中央付近が揺れにくい</li>
                  <li>• 気分が悪くなったら早めに船長に相談</li>
                </ul>
              </Card>
            </AnimatedSection>

            {/* 安全に楽しむために */}
            <AnimatedSection animation="slide-left" delay={600}>
              <Card className="h-full bg-gradient-to-br from-red-400 to-rose-600 text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">安全に楽しむために</h3>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• ライフジャケットは必ず着用</li>
                  <li>• 船べり（手すり）に座らない</li>
                  <li>• 船長の指示に必ず従う</li>
                  <li>• 滑りにくい靴を履く</li>
                  <li>• 釣り針の取り扱いに注意</li>
                  <li>• 他の釣り人との距離を保つ</li>
                  <li>• 体調不良は早めに申告</li>
                </ul>
              </Card>
            </AnimatedSection>

            {/* マナー */}
            <AnimatedSection animation="slide-right" delay={800}>
              <Card className="h-full bg-gradient-to-br from-amber-400 to-orange-600 text-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">船上のマナー</h3>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li>• タバコは指定場所で</li>
                  <li>• ゴミは各自で持ち帰る</li>
                  <li>• 魚の血は洗い流す</li>
                  <li>• 大声で騒がない</li>
                  <li>• 船内での移動は慎重に</li>
                  <li>• 飲酒は船長の指示に従う</li>
                  <li>• 他の釣り人への配慮を忘れずに</li>
                </ul>
              </Card>
            </AnimatedSection>
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
              山口県萩市の翔葵丸では、初めて釣りに挑戦される方を全力でサポート。<br />
              玉江港から出船し、萩湾の豊かな漁場でプロの船長が丁寧に指導します。
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={600}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "800名", label: "以上の初心者指導実績" },
                { number: "90%", label: "以上の方が釣果あり" },
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
              翔葵丸で最高の釣り体験をお楽しみください。
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
