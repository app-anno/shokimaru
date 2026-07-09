"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { FAQ_ITEMS, type FaqItem } from "@/lib/constants/faq";

const faqData: FaqItem[] = FAQ_ITEMS;

const categories = [
  { id: "all", label: "すべて" },
  { id: "beginner", label: "初心者向け" },
  { id: "equipment", label: "持ち物・装備" },
  { id: "reservation", label: "予約・キャンセル" },
  { id: "other", label: "その他" },
];

const sectionHeadings: Record<FaqItem["category"], string> = {
  beginner: "初心者の方からよくいただく質問",
  equipment: "持ち物・装備に関するご質問",
  reservation: "ご予約・キャンセルについて",
  other: "その他のご質問",
};

const categoryOrder: FaqItem["category"][] = ["beginner", "equipment", "reservation", "other"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const visibleCategories = selectedCategory === "all"
    ? categoryOrder
    : (categoryOrder.includes(selectedCategory as FaqItem["category"])
        ? [selectedCategory as FaqItem["category"]]
        : []);

  const groupedFAQ = visibleCategories.map((category) => ({
    category,
    items: faqData
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => item.category === category),
  }));

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
          <div className="max-w-3xl mx-auto space-y-12">
            {groupedFAQ.map(({ category, items }) => (
              <div key={category}>
                <AnimatedSection animation="slide-down">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
                    {sectionHeadings[category]}
                  </h2>
                </AnimatedSection>
                <div className="space-y-4">
                  {items.map(({ item, idx }, position) => (
                    <AnimatedSection key={idx} animation="slide-left" delay={position * 100}>
                      <div className="cursor-pointer group" onClick={() => toggleItem(idx)}>
                        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:animate-pulse-slow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 pr-4">
                              <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
                                <span className="text-primary-500 animate-bounce-slow" style={{ animationDelay: `${position * 200}ms` }}>Q.</span>
                                <span className="group-hover:text-primary-600 transition-colors">{item.question}</span>
                              </h3>
                              <div
                                className={`overflow-hidden transition-all duration-500 ${
                                  openItems.includes(idx) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
                              openItems.includes(idx)
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