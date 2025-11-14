import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Hero from "@/components/hero";
import About2 from "@/components/about2";
import About1 from "@/components/about1";
import Faq from "@/components/faq";
import Anket from "@/components/anket";
import Form from "@/components/form";

import Footer from "@/components/ui/footer";
import NewsSectionWrapper from "./news-section-wrapper";
import BrochuresSection from "@/components/brochures-section";

export const revalidate = 0; // отключение кэширования

const GoogleReCaptchaProviderWrapper = dynamic(
    () => import('@/components/GoogleReCaptchaProviderWrapper'),
    { ssr: false }
);

export default function Home() {
    return (
        <>
            <GoogleReCaptchaProviderWrapper>
                {/* Главный баннер */}
                <Hero />
                
                {/* О фонде - краткая информация */}
                <About2 />
                
                {/* Брошюры для мигрантов - новая секция */}
                <div id="Брошюры">
                    <BrochuresSection />
                </div>
                
                {/* Подробная информация о фонде */}
                <About1 />
                
                {/* FAQ - часто задаваемые вопросы */}
                <Faq />
                
                {/* Новости - актуальная информация */}
                <div id="Новости">
                    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="text-gray-500">Загрузка новостей...</div></div>}>
                        <NewsSectionWrapper />
                    </Suspense>
                </div>
                
                {/* Анкета для обратной связи */}
                <Anket />
                
                {/* Форма обратной связи */}
                <Form />
                
                {/*<Footer />*/}
            </GoogleReCaptchaProviderWrapper>
        </>
    );
}