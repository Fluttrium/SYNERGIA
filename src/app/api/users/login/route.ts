import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";

interface LoginRequest {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = (await request.json()) as LoginRequest;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Получаем пользователя из PostgreSQL через Prisma
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }
        ]
      }
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Неверный email или пароль" },
        { status: 401 }
      );
    }

    // Проверяем пароль (поддерживаем как хешированные, так и plain-text для обратной совместимости)
    let isPasswordValid = false;
    
    if (user.password.startsWith('$2')) {
      // Хешированный пароль (bcrypt)
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Plain text пароль (для старых пользователей)
      isPasswordValid = user.password === password;
      
      // Если пароль верный, обновляем его на хешированный в PostgreSQL
      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.update({
          where: { id: user.id },
          data: { password: hashedPassword }
        });
        console.log('✅ Пароль обновлен на хешированный для пользователя:', user.id);
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Неверный email или пароль" },
        { status: 401 }
      );
    }

    // Создание JWT токена с ID пользователя из PostgreSQL
    const secret = new TextEncoder().encode('your_secret_key');
    const token = await new SignJWT({ 
      username: user.id.toString(), // Используем числовой ID как строку
      role: user.role || 'user' 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // Убираем пароль из ответа и форматируем данные для ответа
    const { password: _, ...safeUser } = user;
    
    // Форматируем ответ для совместимости
    const userResponse = {
      ...safeUser,
      id: safeUser.id.toString(),
      createdAt: safeUser.createdAt?.toISOString() || null,
    };

    // Установка токена в cookie
    const response = NextResponse.json({ 
      message: "Login successful",
      user: userResponse 
    });
    response.cookies.set("token", token, { 
      httpOnly: false, 
      path: "/",
      maxAge: 86400 // 24 часа
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
