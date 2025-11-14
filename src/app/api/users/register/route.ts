import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";

interface RegisterData {
  username: string;
  password: string;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Проверяем наличие тела запроса
    let data: RegisterData;
    try {
      const body = await request.json();
      data = body as RegisterData;
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return NextResponse.json(
        { message: "Invalid JSON in request body. Make sure Content-Type is application/json and body is not empty." },
        { status: 400 }
      );
    }

    // Валидация
    if (!data.username || !data.password || !data.email) {
      return NextResponse.json(
        { message: "Username, password, and email are required" },
        { status: 400 }
      );
    }

    if (data.password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Проверяем, что пользователь с таким username не существует
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email || data.username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Пользователь с таким email уже существует" },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Создаем нового пользователя через Prisma
    const user = await prisma.users.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email || data.username,
        name: data.name || null,
        surname: data.surname || null,
        phone: data.phone || null,
        role: 'user',
      },
    });

    // Создание JWT токена
    const token = await new SignJWT({ 
      username: user.id.toString(),
      role: user.role || 'user' 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(Buffer.from("your_secret_key"));

    // Убираем пароль из ответа
    const { password: _, ...safeUser } = user;

    // Установка токена в cookie
    const response = NextResponse.json({ 
      message: "User registered successfully",
      user: {
        ...safeUser,
        id: safeUser.id.toString(),
        createdAt: safeUser.createdAt?.toISOString() || null,
      }
    });
    response.cookies.set("token", token, { 
      httpOnly: false, 
      path: "/",
      maxAge: 86400 // 24 часа
    });

    return response;
  } catch (error: any) {
    console.error("Error registering user:", error);
    console.error("Error details:", error?.message, error?.stack);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

