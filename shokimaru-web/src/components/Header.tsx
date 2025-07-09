"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "ホーム" },
    { href: "/results", label: "釣果情報" },
    { href: "/pricing", label: "料金・サービス" },
    { href: "/guide", label: "釣り方ガイド" },
    { href: "/sightseeing", label: "観光情報" },
    { href: "/access", label: "アクセス" },
    { href: "/faq", label: "よくある質問" },
    { href: "/contact", label: "お問い合わせ" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <h1 className="text-3xl font-bold text-gradient">翔葵丸</h1>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
            <span className="ml-3 text-sm text-gray-600 font-medium">しょうきまる</span>
          </Link>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="btn-primary px-4 py-2 text-sm"
            >
              予約する
            </Link>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
          >
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 rounded transition-all duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 rounded transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 rounded transition-all duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 py-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-4 px-4 py-3 text-base font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-all duration-200 text-center"
            >
              予約する
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}