import type { Metadata, Viewport } from "next";
import "./globals.css";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LocalBusinessStructuredData, WebSiteStructuredData } from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shokimaru.com'),
  title: {
    default: "翔葵丸 - 旬のイカで最高の1日を！ | 山口県萩市の釣り船",
    template: "%s | 翔葵丸"
  },
  description: "山口県萩市でイカ釣りを楽しめる釣り船、翔葵丸（しょうきまる）。初心者・女性も大歓迎！レンタル竿もご用意。萩湾の豊かな漁場で、思い出に残る釣り体験を。",
  keywords: ["萩市", "釣り船", "イカ釣り", "翔葵丸", "しょうきまる", "山口県", "釣り体験", "初心者歓迎", "女性歓迎", "レンタル竿", "萩湾", "ケンサキイカ"],
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
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "翔葵丸 - 旬のイカで最高の1日を！",
    description: "山口県萩市でイカ釣りを楽しめる釣り船、翔葵丸（しょうきまる）。初心者・女性も大歓迎！",
    type: "website",
    locale: "ja_JP",
    siteName: "翔葵丸",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "翔葵丸 - 旬のイカで最高の1日を！"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "翔葵丸 - 旬のイカで最高の1日を！",
    description: "山口県萩市でイカ釣りを楽しめる釣り船。初心者・女性も大歓迎！",
    images: ["/og-image.jpg"]
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
    <html lang="ja">
      <body className="antialiased">
        <Layout>{children}</Layout>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <LocalBusinessStructuredData />
        <WebSiteStructuredData />
      </body>
    </html>
  );
}