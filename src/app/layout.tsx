import Footer from "@/components/ui/footer";

import Header2 from "@/components/ui/header2";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["cyrillic"],
});
export const metadata = {
  title: "Синергия",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.className}>
      <head>
        <link rel="icon" href="favicon/atom_blacck.ico" sizes="any" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header2 />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
