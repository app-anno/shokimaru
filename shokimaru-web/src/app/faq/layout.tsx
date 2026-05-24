import type { Metadata } from "next";
import { BreadcrumbStructuredData, FAQStructuredData } from "@/components/StructuredData";
import { breadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "よくある質問",
  description:
    "萩のイカ釣り船・翔葵丸へよくいただく質問。持ち物、船酔い対策、子供同乗、雨天時の中止判断、料金支払い、集合時間、駐車場などをまとめています。初心者・女性大歓迎。",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "よくある質問 | 翔葵丸",
    description: "萩のイカ釣り船・翔葵丸へよくいただく質問をまとめています。",
    type: "website",
    url: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FAQStructuredData />
      <BreadcrumbStructuredData items={[...breadcrumbs.faq]} />
    </>
  );
}