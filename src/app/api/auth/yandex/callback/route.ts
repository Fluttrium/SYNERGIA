import { NextResponse, NextRequest } from "next/server";
import { createUser, giveUser, initDatabase } from "@/db/db";
import { SignJWT } from "jose";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=no_code", request.url));
    }

    const clientId = process.env.YANDEX_CLIENT_ID;
    const clientSecret = process.env.YANDEX_CLIENT_SECRET;
    const redirectUri = process.env.YANDEX_REDIRECT_URI || 'http://localhost:3001/api/auth/yandex/callback';

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL("/login?error=config_error", request.url));
    }

    // Обмен кода на токен
    const tokenResponse = await fetch("https://oauth.yandex.ru/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Yandex token exchange failed:", await tokenResponse.text());
      return NextResponse.redirect(new URL("/login?error=token_exchange", request.url));
    }

    const { access_token } = await tokenResponse.json();

    // Получение данных пользователя от Яндекс
    const userResponse = await fetch("https://login.yandex.ru/info?format=json", {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error("Failed to get Yandex user info");
      return NextResponse.redirect(new URL("/login?error=user_info", request.url));
    }

    const yandexUser = await userResponse.json();
    const email = yandexUser.default_email || yandexUser.login + "@yandex.ru";

    // Подключение к БД
    await initDatabase();

    // Проверяем, существует ли пользователь
    let user = await giveUser(email);

    if (!user) {
      // Создаем нового пользователя
      const userId = await createUser({
        username: email,
        email,
        password: Math.random().toString(36).slice(-8), // Случайный пароль (не будет использоваться)
        name: yandexUser.first_name || "Пользователь",
        surname: yandexUser.last_name || "",
        phone: yandexUser.default_phone?.number || "",
        role: "user",
      });

      // Получаем созданного пользователя
      user = await giveUser(email);
    }

    if (!user) {
      return NextResponse.redirect(new URL("/login?error=create_user", request.url));
    }

    // Создание JWT токена
    const secret = new TextEncoder().encode('your_secret_key');
    const token = await new SignJWT({
      username: user.id || user.username,
      role: user.role || "user",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // Редирект на главную с установкой cookie
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    console.error("Yandex OAuth error:", error);
    return NextResponse.redirect(new URL("/login?error=server_error", request.url));
  }
}

