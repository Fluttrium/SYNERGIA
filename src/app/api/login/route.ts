import { NextResponse, NextRequest } from 'next/server';
import { giveUser, initDatabase } from '@/db/db';
import { SignJWT } from 'jose';

// Определите типы для учетных данных пользователя
interface User {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json() as User;

  // соединение с базой данных
  await initDatabase();

  //  учетные данные из базы данных
  const user = await giveUser(username);

  if (user && user.password === password) {
    try {
      // Создание JWT токена
      const token = await new SignJWT({ username: user.username })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30m')
        .sign(Buffer.from('your_secret_key'));

      // Установка токена в HTTP-only cookie
      const response = NextResponse.json({ message: token });
      response.cookies.set('token', token, { httpOnly: true, path: '/' });

      return response;
    } catch (error) {
      console.error('Error signing token:', error);
      return NextResponse.json({ message: 'Error creating token' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
