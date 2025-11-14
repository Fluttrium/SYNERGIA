import Header2 from "@/components/ui/header2";
import Footer from "@/components/ui/footer";

export default function NewsArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header2 />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
