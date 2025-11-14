import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Проверяем наличие DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
} else {
  // Маскируем пароль в логах для безопасности
  const maskedUrl = process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@');
  console.log('✅ DATABASE_URL is set:', maskedUrl);
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Обработка отключения при завершении процесса
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

// Функция для проверки подключения
export async function checkDatabaseConnection() {
  try {
    // Пытаемся подключиться с таймаутом
    await Promise.race([
      prisma.$connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      )
    ]);
    
    // Проверяем запросом
    await prisma.$queryRaw`SELECT 1`;
    
    return { connected: true, error: null };
  } catch (error: any) {
    // Определяем тип ошибки
    let errorMessage = error?.message || 'Unknown error';
    let errorCode = error?.code;
    
    if (errorMessage.includes('timeout')) {
      errorMessage = 'Connection timeout - database server may be unreachable';
    } else if (errorCode === 'P1001') {
      errorMessage = 'Cannot reach database server - check host and port';
    } else if (errorCode === 'P1000') {
      errorMessage = 'Authentication failed - check username and password';
    } else if (errorCode === 'P1003') {
      errorMessage = 'Database does not exist - check database name';
    }
    
    return { 
      connected: false, 
      error: errorMessage,
      code: errorCode,
      meta: error?.meta
    };
  }
}

