import { FAQStructuredData } from "@/components/StructuredData";

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FAQStructuredData />
    </>
  );
}