import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "翔葵丸 - 萩湾でイカ釣り体験",
  description: "山口県萩市でイカ釣りを楽しめる釣り船、翔葵丸（しょうきまる）。初心者・女性大歓迎！レンタル竿もご用意しています。",
  keywords: "萩市,釣り船,イカ釣り,翔葵丸,しょうきまる,山口県,釣り体験,初心者歓迎",
  openGraph: {
    title: "翔葵丸 - 萩湾でイカ釣り体験",
    description: "山口県萩市でイカ釣りを楽しめる釣り船、翔葵丸（しょうきまる）。初心者・女性大歓迎！",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}