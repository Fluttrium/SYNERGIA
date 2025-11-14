import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export async function GET(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = tokenCookie.value;

    // Верификация токена
    const secret = new TextEncoder().encode('your_secret_key');
    const { payload } = await jwtVerify(token, secret);

    if (!payload.username) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Получаем пользователя из PostgreSQL через Prisma по ID
    // В токене username хранится ID пользователя (из login/route.ts строка 70)
    const userId = parseInt(payload.username as string);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID in token" },
        { status: 401 }
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Возвращаем данные пользователя без пароля
    const { password, ...safeUser } = user;

    // Форматируем ответ для совместимости с фронтендом
    return NextResponse.json({
      ...safeUser,
      id: safeUser.id.toString(),
      createdAt: safeUser.createdAt?.toISOString() || null,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

