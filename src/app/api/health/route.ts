import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Проверяем наличие DATABASE_URL
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'DATABASE_URL is not configured',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

    // Проверяем подключение к базе данных через Prisma
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'synergia-app',
        database: 'connected'
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Database health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Database connection failed',
        error: error?.message || 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
