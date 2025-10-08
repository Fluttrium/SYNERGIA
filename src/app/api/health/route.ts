import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Проверяем подключение к базе данных
    const { initDatabase } = await import('@/db/db');
    await initDatabase();
    
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'synergia-app'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Database connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
