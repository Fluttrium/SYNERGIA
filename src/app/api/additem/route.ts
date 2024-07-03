import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, addItem, closeDatabase, fetchNewsFromDatabase } from '@/db/db';

// Инициализируем базу данных при запуске сервера
initDatabase().catch(err => {
  console.error('Не удалось инициализировать базу данных:', err);
  process.exit(1); // Завершаем процесс, если инициализация базы данных не удалась
});

export async function POST(request: NextRequest) {
  const { title, description, image, link } = await request.json();

  try {
    const itemId = await addItem(title, description, image, link);
    return NextResponse.json({ message: 'Новость добавлена', itemId });
  } catch (err) {
    console.error('Ошибка при добавлении новости:', err);
    return NextResponse.json({ error: 'Не удалось добавить новость' }, { status: 500 });
  }
}




// Убедимся, что закрываем соединение с базой данных при завершении работы сервера
process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit();
});
