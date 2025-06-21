import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 船舶情報 */}
          <div>
            <h3 className="text-xl font-bold mb-4">翔葵丸（しょうきまる）</h3>
            <p className="text-gray-300">
              山口県萩市萩湾で営業する釣り船です。
              <br />
              初心者・女性大歓迎！
              <br />
              イカ釣りを楽しみましょう。
            </p>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="text-xl font-bold mb-4">メニュー</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/results" className="text-gray-300 hover:text-white">
                  釣果情報
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white">
                  料金・サービス
                </Link>
              </li>
              <li>
                <Link href="/access" className="text-gray-300 hover:text-white">
                  アクセス
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-xl font-bold mb-4">予約・お問い合わせ</h3>
            <div className="space-y-2 text-gray-300">
              <p>ご予約は以下からお願いします：</p>
              <ul className="space-y-1">
                <li>・LINE</li>
                <li>・Instagram</li>
                <li>・お電話</li>
              </ul>
              <p className="mt-4">
                <Link href="/contact" className="text-secondary hover:text-cyan-400">
                  詳しくはこちら →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 翔葵丸. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}