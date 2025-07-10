import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElements from "@/components/FloatingElements";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "予約・お問い合わせ",
  description: "翔葵丸へのご予約・お問い合わせはLINE、Instagram、お電話から。萩湾でのイカ釣り体験をお待ちしています。",
  openGraph: {
    title: "予約・お問い合わせ | 翔葵丸",
    description: "翔葵丸へのご予約・お問い合わせはLINE、Instagram、お電話から。",
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white relative">
      <FloatingElements />
      
      {/* ヘッダーセクション */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient ">
              予約・お問い合わせ
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={300}>
            <p className="text-center text-lg text-gray-600">
              ご予約やお問い合わせは、以下の方法でお気軽にご連絡ください
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 連絡方法セクション */}
      <section className="py-16">
        <div className="container-custom">
          {/* ネット予約 */}
          <div className="max-w-3xl mx-auto mb-16">
            <AnimatedSection animation="slide-up">
              <div className="relative group">
                
                <Card className="relative bg-gradient-to-br from-white via-white to-blue-50/30 text-center hover:scale-[1.02] transition-all duration-500 group hover:shadow-2xl overflow-hidden">
                  {/* 装飾的な背景要素 */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-cyan-300/20 to-blue-200/20 rounded-full blur-3xl"></div>
                  
                  {/* 24時間対応バッジ */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    24時間受付
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">ネット予約</h3>
                      <p className="text-gray-700 mb-2 font-medium">
                        24時間いつでも予約可能
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span>3分で簡単予約完了</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-100/50 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                      <p className="text-sm text-gray-700 mb-2">
                        必要事項を入力するだけ
                      </p>
                      <p className="font-bold text-blue-700 text-lg animate-pulse-slow">かんたんWeb予約</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">24時間対応</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">簡単入力</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600">即時確認</p>
                      </div>
                    </div>
                    
                    <Link
                      href="https://docs.google.com/forms/d/e/1FAIpQLSc9Q2MFPL5ZZNJW0yJv-J_L8ais90jmVKnl28unn-paoSCErg/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <div className="relative w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                        <span className="flex items-center justify-center gap-2">
                          <span>予約フォームへ</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          </div>

          {/* ネット予約以外からのお問い合わせ */}
          <div className="mt-16">
            <AnimatedSection animation="slide-down">
              <h3 className="text-2xl font-bold text-center mb-8">
                ネット予約以外からのお問い合わせ
              </h3>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* LINE */}
              <AnimatedSection animation="slide-left" delay={100}>
                <div className="relative group">
                  
                  <Card className="relative bg-gradient-to-br from-white via-white to-green-50/30 text-center hover:scale-[1.02] transition-all duration-500 group hover:shadow-2xl overflow-hidden">
                    {/* 装飾的な背景要素 */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200/20 to-green-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/20 to-green-200/20 rounded-full blur-3xl"></div>
                    
                    {/* おすすめバッジ */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-slow">
                      おすすめ
                    </div>
                    
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center shadow-2xl">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">LINE</h3>
                        <p className="text-gray-700 mb-2 font-medium">
                          一番スムーズにご予約いただけます
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          <span>返信率100%・平均返信時間30分</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                        <p className="text-sm text-gray-700 mb-2">
                          友だち追加後、メッセージをお送りください
                        </p>
                        <p className="font-bold text-green-700 text-lg animate-pulse-slow">QRコードを読み取って友だち追加</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="relative w-48 h-48 mx-auto group">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                          <div className="relative w-full h-full bg-white p-2 rounded-2xl shadow-xl">
                            <div className="relative w-full h-full">
                              <Image
                                src="/line.jpg"
                                alt="LINE QRコード"
                                fill
                                className="object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur opacity-50"></div>
                        <button className="relative w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed" disabled>
                          <span className="flex items-center justify-center gap-2">
                            <span>上記QRコードから友だち追加</span>
                            <svg className="w-5 h-5 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>

              {/* Instagram */}
              <AnimatedSection animation="slide-up" delay={200}>
                <div className="relative group">
                  
                  <Card className="relative bg-gradient-to-br from-white via-white to-purple-50/30 text-center hover:scale-[1.02] transition-all duration-500 group hover:shadow-2xl overflow-hidden">
                    {/* 装飾的な背景要素 */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-pink-300/20 to-purple-200/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-pink-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-600 to-pink-700 rounded-3xl flex items-center justify-center shadow-2xl">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-pink-700 bg-clip-text text-transparent">Instagram</h3>
                        <p className="text-gray-700 mb-2 font-medium">
                          DMでお問い合わせください
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
                          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                          <span>最新釣果を毎日更新中</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-pink-100/50 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                        <p className="text-sm text-gray-700 mb-2">
                          最新の釣果情報も配信中！
                        </p>
                        <p className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-slow">@shokimaru1</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="relative w-48 h-48 mx-auto group">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                          <div className="relative w-full h-full bg-white p-2 rounded-2xl shadow-xl">
                            <div className="relative w-full h-full">
                              <Image
                                src="/insta.jpg"
                                alt="Instagram QRコード"
                                fill
                                className="object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        href="https://instagram.com/shokimaru1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-pink-600 rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                        <div className="relative w-full bg-gradient-to-r from-purple-500 via-pink-600 to-pink-700 text-white font-bold py-4 px-6 rounded-xl transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                          <span className="flex items-center justify-center gap-2">
                            <span>Instagramへ</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>

              {/* 電話 */}
              <AnimatedSection animation="slide-right" delay={300}>
                <div className="relative group">
                  
                  <Card className="relative bg-gradient-to-br from-white via-white to-primary-50/30 text-center hover:scale-[1.02] transition-all duration-500 group hover:shadow-2xl overflow-hidden">
                    {/* 装飾的な背景要素 */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-secondary-300/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary-300/20 to-primary-200/20 rounded-full blur-3xl"></div>
                    
                    {/* 営業中インジケーター */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs font-medium text-gray-700">営業時間内</span>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center shadow-2xl">
                            <svg className="w-12 h-12 text-white animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">お電話</h3>
                        <p className="text-gray-700 mb-2 font-medium">
                          お急ぎの方はお電話でどうぞ
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-primary-600">
                          <span className="inline-block w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                          <span>船長直通・即対応</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-primary-50 to-secondary-100/50 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                        <p className="text-sm text-gray-700 mb-2">
                          受付時間：8:00〜20:00
                        </p>
                        <p className="font-bold text-3xl text-primary-700 animate-pulse-slow tracking-wider">090-2053-9539</p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>即対応</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>船長直通</span>
                        </div>
                      </div>
                      
                      <Link
                        href="tel:090-2053-9539"
                        className="relative block group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                        <div className="relative w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-6 rounded-xl transform group-hover:scale-105 transition-all duration-300 shadow-lg">
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>電話をかける</span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* 予約の流れセクション */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full blur-3xl animate-float" />
        </div>
        
        <div className="container-custom relative">
          <AnimatedSection animation="slide-down">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              ご予約の流れ
            </h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: "お問い合わせ", desc: "ご希望の日程、人数、プラン（乗り合い/チャーター）をお知らせください" },
                { step: 2, title: "空き状況の確認", desc: "空き状況を確認し、ご予約可能な日時をご連絡します" },
                { step: 3, title: "予約確定", desc: "集合場所・時間などの詳細をお伝えして予約完了です" }
              ].map((item, index) => (
                <AnimatedSection key={index} animation="slide-left" delay={index * 200}>
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 animate-bounce-slow group-hover:animate-spin" style={{ animationDelay: `${index * 300}ms` }}>
                      {item.step}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold mb-1 text-lg">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                      {index < 2 && (
                        <div className="w-0.5 h-12 bg-gray-300 ml-5 mt-4 animate-slide-in-down" style={{ animationDelay: `${(index + 1) * 400}ms` }} />
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ内容の例 */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatedSection animation="zoom">
            <h2 className="text-3xl font-bold text-center mb-12 title-decorated">
              お問い合わせ例
            </h2>
          </AnimatedSection>
          
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slide-up" delay={200}>
              <Card className="mb-8 hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                <h3 className="font-bold text-lg mb-4 text-primary-600">
                  ご予約のお問い合わせ例
                </h3>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg animate-fade-in">
                  <p className="text-sm leading-relaxed text-gray-700">
                    はじめまして。○月○日に大人3名でイカ釣りを体験したいと思っています。
                    全員初心者なのですが、乗り合いプランで参加可能でしょうか？
                    また、レンタル竿を3セットお借りしたいです。
                    よろしくお願いします。
                  </p>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={400}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:animate-pulse-slow">
                <h3 className="font-bold text-lg mb-4 text-primary-600">
                  その他のお問い合わせ例
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "悪天候時の対応について",
                    "釣り方のレクチャーについて",
                    "アクセス方法について",
                    "その他、ご不明な点"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-right" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                      <span className="text-primary mr-2 animate-bounce-slow" style={{ animationDelay: `${index * 200}ms` }}>・</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 80 + 40}px`,
                height: `${Math.random() * 80 + 40}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection animation="slide-down">
              <h2 className="text-3xl font-bold text-center mb-8 text-white ">
                ご予約・お問い合わせの際のお願い
              </h2>
            </AnimatedSection>
            
            <AnimatedSection animation="zoom" delay={300}>
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl animate-pulse-slow">
                <ul className="space-y-4">
                  {[
                    "出航又は欠航の判断は、前日に天候の状況を見極めて船長の判断で決定し、ご連絡します。",
                    "予約をキャンセルされる場合は早めにご連絡ください。",
                    "危険を伴う恐れがある無理な出船は致しておりません。",
                    "出船時間の10分前には必ず玉江漁港にお越しください。"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start animate-slide-in-left" style={{ animationDelay: `${(index + 1) * 150}ms` }}>
                      <span className="text-primary-500 mr-3 text-xl animate-wiggle" style={{ animationDelay: `${index * 300}ms` }}>✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}