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
              山陰屈指の人気スポット・玉江港から出船。
              <br />
              海の上から楽しむ釣りのひとときに
              <br />
              華を添える釣り船として、
              <br />
              皆様の釣り体験をサポートします。
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://instagram.com/shokimaru1"
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
              <a
                href="https://line.me/R/ti/p/@540qrucx"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-white/10 p-3 rounded-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-green-400 group-hover:to-green-600 group-hover:shadow-lg group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065l-.001-.001-.002-.002-.001-.001-.003-.003c-.04-.042-.065-.099-.065-.161v-5.229c0-.129.105-.234.234-.234h.841zm14.992 0c.129 0 .234.105.234.234v.842c0 .13-.105.234-.234.234h-2.287v.883h2.287c.129 0 .234.105.234.234v.842c0 .129-.105.234-.234.234h-2.287v.884h2.287c.129 0 .234.105.234.233v.842c0 .13-.105.234-.234.234h-3.363c-.063 0-.12-.025-.162-.065l-.001-.001-.002-.002-.001-.001-.003-.002c-.04-.042-.065-.099-.065-.161v-5.229c0-.063.025-.119.065-.161l.004-.004.001-.002.001-.001.001-.001c.042-.04.099-.065.161-.065h3.363zm-10.443.001c.129 0 .234.105.234.234v5.228c0 .128-.105.233-.234.233h-.842c-.129 0-.234-.105-.234-.233v-5.228c0-.129.105-.234.234-.234h.842zm2.127 0h.008l.012.001.013.001.013.001.013.002.013.003.012.002.013.004.012.004.012.004.011.004.012.006.011.005.011.006.011.007.011.006.01.008.01.007.009.008.01.008.008.008.008.009.008.008.007.01.007.009.006.01.006.009.005.011.005.01.004.011.004.011.003.011.002.011.002.012.001.011v.012l.001.012v.001l1.139 3.439v-3.451c0-.129.105-.234.234-.234h.841c.13 0 .234.105.234.234v5.228c0 .128-.104.233-.234.233h-.841l-.005-.001-.016-.002-.004-.001-.012-.002-.013-.003-.012-.003-.014-.004-.011-.005-.011-.004-.011-.005-.011-.006-.012-.006-.009-.007-.011-.007-.009-.008-.008-.007-.008-.008-.009-.009-.007-.009-.007-.009-.007-.009-.006-.01-.005-.01-.006-.012-.004-.011-.004-.011-.004-.013-.002-.012-.002-.012-.002-.014-.001-.013v-.013l-.001-.012v-.002l-1.137-3.443v3.451c0 .128-.105.233-.234.233h-.841c-.129 0-.234-.105-.234-.233v-5.228c0-.129.105-.234.234-.234h.841z"/>
                  </svg>
                </div>
              </a>
              <a
                href="tel:090-2053-9539"
                className="group"
              >
                <div className="bg-white/10 p-3 rounded-xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600 group-hover:shadow-lg group-hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
              <li>
                <Link href="/guide" className="text-gray-300 hover:text-secondary-400 transition-colors flex items-center group">
                  <span className="text-secondary-400 mr-2 transform group-hover:translate-x-1 transition-transform">▶</span>
                  釣り方ガイド
                </Link>
              </li>
              <li>
                <Link href="/sightseeing" className="text-gray-300 hover:text-secondary-400 transition-colors flex items-center group">
                  <span className="text-secondary-400 mr-2 transform group-hover:translate-x-1 transition-transform">▶</span>
                  観光情報
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
                <li className="flex items-center">
                  <span className="text-secondary-400 mr-2">•</span>
                  ネット予約フォーム
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
              &copy; 2024 株式会社しづき丸定置. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-secondary-400 transition-colors">
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}