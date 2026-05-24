import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocalBusinessStructuredData, WebSiteStructuredData } from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shokimaru.com'),
  title: {
    default: "翔葵丸 - 萩湾で最高の釣り体験を！ | 山口県萩市の釣り船",
    template: "%s | 翔葵丸"
  },
  description: "山口県萩市・玉江漁港から出港する釣り船「翔葵丸」。スーパーライトジギング（SLJ）・ナイトティップラン・イカメタルで萩湾のケンサキイカや根魚を狙えます。初心者・女性大歓迎、レンタルタックル完備。",
  keywords: ["萩 釣り船", "萩 イカ釣り", "ケンサキイカ", "翔葵丸", "ナイトティップラン", "スーパーライトジギング", "玉江港"],
  authors: [{ name: "翔葵丸" }],
  creator: "翔葵丸",
  publisher: "翔葵丸",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
  },
  openGraph: {
    title: "翔葵丸 - 萩湾で最高の釣り体験を！",
    description: "山口県萩市・玉江漁港から出港する釣り船。SLJ・ナイトティップラン・イカメタルで萩湾の釣りを楽しめます。初心者・女性も大歓迎！",
    type: "website",
    locale: "ja_JP",
    siteName: "翔葵丸",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "翔葵丸 - 萩湾で最高の釣り体験を！",
    description: "山口県萩市の釣り船。SLJ・ナイトティップラン・イカ釣り。初心者・女性も大歓迎！",
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="antialiased">
        <GoogleTagManagerNoscript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <Layout>{children}</Layout>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <LocalBusinessStructuredData />
        <WebSiteStructuredData />
      </body>
    </html>
  );
}