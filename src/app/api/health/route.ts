import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/prisma';

export const runtime = "nodejs";

export async function GET() {
  try {
    // Проверяем наличие DATABASE_URL
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'DATABASE_URL is not configured',
          timestamp: new Date().toISOString(),
          details: 'Please set DATABASE_URL environment variable in Vercel settings'
        },
        { status: 500 }
      );
    }

    // Проверяем подключение к базе данных
    const connectionCheck = await checkDatabaseConnection();
    
    if (!connectionCheck.connected) {
      console.error('Database connection failed:', connectionCheck);
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection failed',
          error: connectionCheck.error,
          code: connectionCheck.code,
          timestamp: new Date().toISOString(),
          details: connectionCheck.meta || 'Check DATABASE_URL format and database server availability'
        },
        { status: 500 }
      );
    }
    
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
        code: error?.code,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
