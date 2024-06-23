import About1 from "@/components/about1";
import About2 from "@/components/about2";
import Anket from "@/components/anket";
import Faq from "@/components/faq";
import Form from "@/components/form";
import Hero from "@/components/hero";
import News from "@/components/news";
import QrBlock from "@/components/qrblock";

import Footer from "@/components/ui/footer";

export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};
export default function Home() {
  return (
    <>
      <Hero />
      <About2 />
      <About1 />
      <Faq />
      <Anket />
      <Form />
      <News />
    </>
  );
}
