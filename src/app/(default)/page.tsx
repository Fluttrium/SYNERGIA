import dynamic from 'next/dynamic';
import Hero from "@/components/hero";
import About2 from "@/components/about2";
import About1 from "@/components/about1";
import Faq from "@/components/faq";
import Anket from "@/components/anket";
import Form from "@/components/form";

import Footer from "@/components/ui/footer";
import NewsSection from "../news/page";

export const revalidate = 0; // отключение кэширования

const GoogleReCaptchaProviderWrapper = dynamic(
    () => import('@/components/GoogleReCaptchaProviderWrapper'),
    { ssr: false }
);

export default function Home() {
    return (
        <>
            <GoogleReCaptchaProviderWrapper>
                <Hero />
                <About2 />
                <About1 />
                <Faq />
                <Anket />
                <Form />
                <NewsSection />
                <Footer />
            </GoogleReCaptchaProviderWrapper>
        </>
    );
}