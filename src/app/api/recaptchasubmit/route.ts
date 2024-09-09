import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { gRecaptchaToken } = body;

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        console.error("RECAPTCHA_SECRET_KEY is not set in environment variables.");
        return NextResponse.json({ score: 0, success: false, error: "Server configuration error" }, { status: 500 });
    }

    const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        const data = await response.json();

        if (data.success && data.score > 0.5) {
            console.log("ReCaptcha score:", data.score);
            return NextResponse.json({
                success: true,
                score: data.score,
            });
        } else {
            console.error("ReCaptcha verification failed:", data);
            return NextResponse.json({ score: 0, success: false, error: "ReCaptcha verification failed" }, { status: 403 });
        }
    } catch (error) {
        console.error("Error during ReCaptcha verification:", error);
        return NextResponse.json({ score: 0, success: false, error: "Internal server error" }, { status: 500 });
    }
}
