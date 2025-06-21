"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/results", label: "釣果情報" },
    { href: "/pricing", label: "料金・サービス" },
    { href: "/access", label: "アクセス" },
    { href: "/faq", label: "よくある質問" },
    { href: "/contact", label: "予約・お問い合わせ" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">翔葵丸</h1>
            <span className="ml-2 text-sm text-gray-600">しょうきまる</span>
          </Link>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          >
            <span
              className={`bg-foreground h-0.5 w-6 rounded transition-all ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`bg-foreground h-0.5 w-6 rounded transition-all my-1 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`bg-foreground h-0.5 w-6 rounded transition-all ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 px-4 text-foreground hover:bg-background rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}