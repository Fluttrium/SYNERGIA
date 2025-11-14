import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.YANDEX_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    process.env.YANDEX_REDIRECT_URI || 'http://localhost:3001/api/auth/yandex/callback'
  );

  if (!clientId) {
    return NextResponse.json(
      { message: "Yandex OAuth не настроен" },
      { status: 500 }
    );
  }

  const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(yandexAuthUrl);
}

