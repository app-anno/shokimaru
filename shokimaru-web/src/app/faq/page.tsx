"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";

interface FAQItem {
  question: string;
  answer: string;
  category: "beginner" | "equipment" | "reservation" | "other";
}

const faqData: FAQItem[] = [
  {
    category: "beginner",
    question: "釣りが初めてでも大丈夫ですか？",
    answer: "はい、もちろん大丈夫です！船長が釣り方から仕掛けの使い方まで丁寧にレクチャーします。初心者の方でも安心してイカ釣りを楽しんでいただけます。",
  },
  {
    category: "beginner",
    question: "子供も参加できますか？",
    answer: "お子様も大歓迎です。ただし、安全のため小学生以下のお子様は保護者同伴でお願いします。ライフジャケットは子供用もご用意しています。",
  },
  {
    category: "beginner",
    question: "船酔いが心配です。",
    answer: "船酔いが心配な方は、事前に酔い止め薬の服用をおすすめします。また、体調が優れない場合は無理をせず、早めに船長にお知らせください。",
  },
  {
    category: "equipment",
    question: "何を持っていけばいいですか？",
    answer: "基本的な持ち物：タオル、飲み物、軽食、日焼け止め、帽子、酔い止め（必要な方）。釣り道具はレンタル可能ですが、お持ちの方はご持参いただいても構いません。",
  },
  {
    category: "equipment",
    question: "服装はどうすればいいですか？",
    answer: "動きやすく、濡れても良い服装でお越しください。季節に応じて防寒着もご用意ください。滑りにくい靴（スニーカーなど）がおすすめです。",
  },
  {
    category: "equipment",
    question: "釣った魚の処理はしてもらえますか？",
    answer: "申し訳ございませんが、現在は魚の処理サービスは行っておりません。クーラーボックスをご持参いただければ、氷はご用意できます。",
  },
  {
    category: "reservation",
    question: "予約はいつまでにすればいいですか？",
    answer: "できるだけ早めのご予約をおすすめしますが、空きがあれば前日でも承ります。人気の日程は早めに埋まることがありますので、お早めにご連絡ください。",
  },
  {
    category: "reservation",
    question: "キャンセル料はかかりますか？",
    answer: "現在、キャンセルポリシーは設定しておりませんが、予約をキャンセルされる場合は早めにご連絡ください。天候不良による中止の場合、キャンセル料はいただきません。",
  },
  {
    category: "reservation",
    question: "悪天候の場合はどうなりますか？",
    answer: "出航又は欠航の判断は、前日に天候の状況を見極めて船長の判断で決定し、ご連絡します。危険を伴う恐れがある無理な出船は致しておりません。",
  },
  {
    category: "other",
    question: "駐車場はありますか？",
    answer: "駐車場の詳細については、予約時にご案内いたします。港周辺の駐車可能な場所をお伝えしますので、お問い合わせください。",
  },
  {
    category: "other",
    question: "トイレはありますか？",
    answer: "船にはトイレが設置されています。また、出船前に港のトイレもご利用いただけます。",
  },
  {
    category: "other",
    question: "支払い方法は？",
    answer: "現金でのお支払いをお願いしています。当日、乗船前にお支払いください。",
  },
  {
    category: "other",
    question: "集合時間は？",
    answer: "出船時間の10分前には必ず玉江漁港にお越しください。",
  },
  {
    category: "beginner",
    question: "安全面での注意事項は？",
    answer: "ライフジャケットは必ず着用をお願いします。また、船べり（船の外板のてすり上）に座らないでください。遊漁船の運行に関しては船長の判断に従ってください。",
  },
  {
    category: "other",
    question: "船内でのマナーは？",
    answer: "タバコを海上や船のデッキに捨てないでください。ゴミは各自お持ち帰りください。魚の血でデッキが汚れましたら洗い流してください。船内での移動、喫煙、飲食、飲酒等は船長の指示に従ってください。",
  },
  {
    category: "other",
    question: "乗船をお断りする場合はありますか？",
    answer: "泥酔状態での乗船、乗船中の危険行為は禁止します。体調不良の方は、乗船をお断りする場合があります。",
  },
];

const categories = [
  { id: "all", label: "すべて" },
  { id: "beginner", label: "初心者向け" },
  { id: "equipment", label: "持ち物・装備" },
  { id: "reservation", label: "予約・キャンセル" },
  { id: "other", label: "その他" },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQ = selectedCategory === "all" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      <FloatingElements />
      
      {/* ヘッダーセクション */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-secondary-200/30 to-ocean-light/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient ">よくある質問</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600">
              お客様からよくいただく質問をまとめました
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* カテゴリーフィルター */}
      <section className="py-8 bg-white/80 backdrop-blur-sm sticky top-16 z-30 shadow-lg">
        <div className="container-custom">
          <AnimatedSection animation="fade">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium animate-slide-in-down ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg animate-pulse-slow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md hover:animate-wiggle"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ一覧 */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFAQ.map((item, index) => (
              <AnimatedSection key={index} animation="slide-left" delay={index * 100}>
                <div className="cursor-pointer group" onClick={() => toggleItem(index)}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:animate-pulse-slow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                          <span className="text-primary-500 animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>Q.</span>
                          <span className="group-hover:text-primary-600 transition-colors">{item.question}</span>
                        </h3>
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="pt-4 pl-6 border-l-2 border-primary-200 animate-fade-in">
                            <p className="text-gray-700 flex items-start gap-2">
                              <span className="text-secondary-500 font-bold">A.</span>
                              <span>{item.answer}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`text-2xl transition-all duration-300 ${
                        openItems.includes(index) 
                          ? "text-primary-500 rotate-180" 
                          : "text-gray-400 group-hover:text-primary-400"
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせCTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 60 + 40}px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 8 + 8}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom text-center relative">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold mb-4 text-white ">
              ご不明な点がございましたら
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-white/90 mb-8 text-lg">
              上記以外のご質問も、お気軽にお問い合わせください
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="slide-up" delay={600}>
            <Button href="/contact" variant="primary" size="lg" className="animate-pulse-slow ">
              お問い合わせはこちら
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}