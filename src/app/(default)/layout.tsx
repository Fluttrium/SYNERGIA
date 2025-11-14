import "./globals.css"
import Footer from "@/components/ui/footer";
import Header2 from "@/components/ui/header2";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header2 />
        <div className="flex-1 pb-96 md:pb-80">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}