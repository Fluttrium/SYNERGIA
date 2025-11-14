import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

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
    // В токене username хранится ID пользователя (из login/route.ts)
    const userId = parseInt(payload.username as string);
    
    if (isNaN(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID in token" },
        { status: 401 }
      );
    }

    // Проверяем, что текущий пользователь - администратор
    const currentUser = await prisma.users.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        role: true
      }
    });

    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Получение всех пользователей из PostgreSQL через Prisma
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        surname: true,
        phone: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Форматируем ответ для совместимости с фронтендом
    const safeUsers = users.map((user) => ({
      ...user,
      id: user.id.toString(),
      createdAt: user.createdAt?.toISOString() || null,
    }));

    return NextResponse.json({ users: safeUsers, total: safeUsers.length });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

