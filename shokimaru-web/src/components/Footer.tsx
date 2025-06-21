import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-ocean-dark to-gray-900 text-white mt-auto">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 船舶情報 */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gradient">翔葵丸（しょうきまる）</h3>
            <p className="text-gray-300 leading-relaxed">
              山口県萩市萩湾で営業する釣り船です。
              <br />
              初心者・女性大歓迎！
              <br />
              イカ釣りを楽しみましょう。
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-white/10 p-3 rounded-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-400 group-hover:to-pink-400 group-hover:shadow-lg group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162s6.162 2.759 6.162 6.162-2.759 6.162-6.162 6.162-6.162-2.759-6.162-6.162zm12 0c0-2.211-1.789-4-4-4s-4 1.789-4 4 1.789 4 4 4 4-1.789 4-4zm4.965-6.405c0 .796-.646 1.44-1.44 1.44s-1.44-.646-1.44-1.44.646-1.439 1.44-1.439 1.44.645 1.44 1.439z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-secondary-500 mr-3 rounded-full"></span>
              メニュー
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/results" className="text-gray-300 hover:text-secondary-400 transition-colors flex items-center group">
                  <span className="text-secondary-400 mr-2 transform group-hover:translate-x-1 transition-transform">▶</span>
                  釣果情報
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-secondary-400 transition-colors flex items-center group">
                  <span className="text-secondary-400 mr-2 transform group-hover:translate-x-1 transition-transform">▶</span>
                  料金・サービス
                </Link>
              </li>
              <li>
                <Link href="/access" className="text-gray-300 hover:text-secondary-400 transition-colors flex items-center group">
                  <span className="text-secondary-400 mr-2 transform group-hover:translate-x-1 transition-transform">▶</span>
                  アクセス
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-secondary-400 transition-colors flex items-center group">
                  <span className="text-secondary-400 mr-2 transform group-hover:translate-x-1 transition-transform">▶</span>
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-secondary-500 mr-3 rounded-full"></span>
              予約・お問い合わせ
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>ご予約は以下からお願いします：</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary-400 mr-2">•</span>
                  LINE
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-400 mr-2">•</span>
                  Instagram
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-400 mr-2">•</span>
                  お電話
                </li>
              </ul>
              <Link href="/contact" className="inline-flex items-center mt-4 text-secondary-400 hover:text-secondary-300 transition-colors group">
                詳しくはこちら 
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; 2024 翔葵丸. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-secondary-400 transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="hover:text-secondary-400 transition-colors">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}