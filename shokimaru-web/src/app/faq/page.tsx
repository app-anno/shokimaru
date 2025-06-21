"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

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
    answer: "現在、キャンセルポリシーは設定しておりませんが、キャンセルされる場合は早めにご連絡をお願いします。天候不良による中止の場合、キャンセル料はいただきません。",
  },
  {
    category: "reservation",
    question: "悪天候の場合はどうなりますか？",
    answer: "安全を最優先に、前日の夕方頃に出船可否を判断し、ご連絡いたします。波が高い、風が強いなど危険と判断した場合は中止となります。",
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
    <div className="min-h-screen">
      {/* ヘッダーセクション */}
      <section className="bg-gradient-to-b from-background to-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-4">よくある質問</h1>
          <p className="text-center text-lg text-gray-600">
            お客様からよくいただく質問をまとめました
          </p>
        </div>
      </section>

      {/* カテゴリーフィルター */}
      <section className="py-8 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ一覧 */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="cursor-pointer" onClick={() => toggleItem(index)}>
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-lg mb-2">
                        Q. {item.question}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openItems.includes(index) ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <p className="text-gray-700 pt-2">
                          A. {item.answer}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl text-gray-400">
                      {openItems.includes(index) ? "−" : "+"}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせCTA */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            ご不明な点がございましたら
          </h2>
          <p className="text-gray-600 mb-8">
            上記以外のご質問も、お気軽にお問い合わせください
          </p>
          <Button href="/contact" size="lg">
            お問い合わせはこちら
          </Button>
        </div>
      </section>
    </div>
  );
}