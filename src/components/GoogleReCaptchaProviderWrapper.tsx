// src/components/GoogleReCaptchaProviderWrapper.tsx
"use client"; // Указывает, что компонент должен рендериться только на клиенте

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

const GoogleReCaptchaProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}>
            {children}
        </GoogleReCaptchaProvider>
    );
};

export default GoogleReCaptchaProviderWrapper;
