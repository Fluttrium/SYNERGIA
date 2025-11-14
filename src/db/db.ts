import { prisma } from "@/lib/prisma";

interface User {
  id?: string;
  username: string;
  password: string;
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  role?: 'admin' | 'user';
  createdAt?: string;
}

export interface News {
  id: number;
  title: string;
  description: string;
  image: Buffer;
  link: string;
  body?: string; // Markdown контент
}

export interface NewsNew {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  body?: string; // Markdown контент
}

//открытие базы данных (заглушка для совместимости)
export async function initDatabase() {
  // Prisma не требует явной инициализации
  // Проверяем подключение при инициализации
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }
    await prisma.$connect();
    console.log("Prisma database connection ready.");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
}

//закрытие базы данных (заглушка для совместимости)
export async function closeDatabase() {
  // Prisma управляет соединениями автоматически
  await prisma.$disconnect();
}

//Добавление новости
export async function addItem(news: Omit<News, "id">): Promise<number> {
  const item = await prisma.items.create({
    data: {
      title: news.title,
      description: news.description,
      image: news.image,
      link: news.link,
      body: news.body || null
    }
  });
  return item.id;
}

//Загрузка всех новостей
export async function fetchNewsFromDatabase(): Promise<NewsNew[]> {
  const items = await prisma.items.findMany({
    orderBy: { id: 'desc' }
  });

  return items.map((row) => ({
    id: row.id.toString(),
    title: row.title || '',
    description: row.description || '',
    image: row.image
      ? `data:image/jpeg;base64,${Buffer.from(row.image).toString("base64")}`
      : "",
    link: row.link || '',
    body: row.body || '',
  }));
}

//Получение новости по ID
export async function getNewsById(id: string): Promise<NewsNew | null> {
  const item = await prisma.items.findUnique({
    where: { id: Number(id) }
  });

  if (!item) {
    return null;
  }

  return {
    id: item.id.toString(),
    title: item.title || '',
    description: item.description || '',
    image: item.image
      ? `data:image/jpeg;base64,${Buffer.from(item.image).toString("base64")}`
      : "",
    link: item.link || '',
    body: item.body || '',
  };
}

//Обновление новости
export async function updateNews(id: string, updates: Partial<NewsNew>): Promise<void> {
  const updateData: any = {};
  
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.link !== undefined) updateData.link = updates.link;
  if (updates.body !== undefined) updateData.body = updates.body;

  if (Object.keys(updateData).length === 0) {
    return;
  }

  await prisma.items.update({
    where: { id: Number(id) },
    data: updateData
  });
}

//Удаление новости по ID
export async function deleteNews(id: string): Promise<void> {
  await prisma.items.delete({
    where: { id: Number(id) }
  });
}

// Загрузка юзера по username
export async function giveUser(username: string): Promise<User | null> {
  const user = await prisma.users.findFirst({
    where: { username }
  });

  if (!user) return null;

  return {
    id: user.id.toString(),
    username: user.username,
    password: user.password,
    email: user.email || undefined,
    name: user.name || undefined,
    surname: undefined, // не в схеме
    phone: user.phone || undefined,
    role: (user.role as 'admin' | 'user') || 'user',
    createdAt: user.createdAt?.toISOString()
  };
}

// Загрузка юзера по email или username
export async function getUserByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
  const user = await prisma.users.findFirst({
    where: {
      OR: [
        { username: emailOrUsername },
        { email: emailOrUsername }
      ]
    }
  });

  if (!user) return null;

  return {
    id: user.id.toString(),
    username: user.username,
    password: user.password,
    email: user.email || undefined,
    name: user.name || undefined,
    surname: undefined,
    phone: user.phone || undefined,
    role: (user.role as 'admin' | 'user') || 'user',
    createdAt: user.createdAt?.toISOString()
  };
}

// Загрузка юзера по ID
export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.users.findUnique({
    where: { id: Number(id) }
  });

  if (!user) return null;

  return {
    id: user.id.toString(),
    username: user.username,
    password: user.password,
    email: user.email || undefined,
    name: user.name || undefined,
    surname: undefined,
    phone: user.phone || undefined,
    role: (user.role as 'admin' | 'user') || 'user',
    createdAt: user.createdAt?.toISOString()
  };
}

// Получение всех пользователей (для админки)
export async function getAllUsers(): Promise<User[]> {
  const users = await prisma.users.findMany();

  return users.map(user => ({
    id: user.id.toString(),
    username: user.username,
    password: user.password,
    email: user.email || undefined,
    name: user.name || undefined,
    surname: undefined,
    phone: user.phone || undefined,
    role: (user.role as 'admin' | 'user') || 'user',
    createdAt: user.createdAt?.toISOString()
  }));
}

// Создание нового пользователя
export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<string> {
  const newUser = await prisma.users.create({
    data: {
      username: user.username,
      password: user.password,
      email: user.email || null,
      name: user.name || null,
      phone: user.phone || null,
      role: user.role || 'user'
    }
  });

  return newUser.id.toString();
}

// Обновление данных пользователя
export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
  const updateData: any = {};

  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.surname !== undefined) {
    // surname не в схеме, пропускаем
  }
  if (updates.phone !== undefined) updateData.phone = updates.phone;
  if (updates.email !== undefined) updateData.email = updates.email;
  if (updates.role !== undefined) updateData.role = updates.role;

  if (Object.keys(updateData).length === 0) {
    return;
  }

  await prisma.users.update({
    where: { id: Number(id) },
    data: updateData
  });
}

//Добавление проекта
export async function addProject(news: Omit<News, "id">): Promise<number> {
  const project = await prisma.project.create({
    data: {
      title: news.title,
      description: news.description,
      image: news.image,
      link: news.link
    }
  });
  return project.id;
}

//Получение всех проектов из бд
export async function fetchProjectsFromDatabase(): Promise<any[]> {
  const projects = await prisma.project.findMany();

  return projects.map((row) => ({
    id: row.id,
    title: row.title || '',
    description: row.description || '',
    image: row.image
      ? `data:image/jpeg;base64,${Buffer.from(row.image).toString("base64")}`
      : "",
    link: row.link || '',
  }));
}

//Удаление проекта по ID
export async function deletProject(id: string) {
  await prisma.project.delete({
    where: { id: Number(id) }
  });
}

//добавление буклета (устаревшая функция, используется новая система с группами)
export async function addBukletPage(
  name: string,
  images: Buffer[],
  pdfs: Buffer[]
): Promise<number> {
  // Эта функция устарела, используется новая система с группами файлов
  // Оставляем для совместимости, но лучше использовать API routes
  const buklet = await prisma.buklets.create({
    data: { name }
  });
  return buklet.id;
}

//получение всех буклетов (устаревшая функция)
export async function fetchBukletsFromDatabase(): Promise<any[]> {
  const buklets = await prisma.buklets.findMany();
  
  return buklets.map((row) => ({
    id: row.id,
    name: row.name,
    images: [],
    pdfs: [],
  }));
}

//Получение проекта по ID (устаревшая функция)
export async function fetchBukletsFromDatabaseById(id: number): Promise<any> {
  const buklet = await prisma.buklets.findUnique({
    where: { id }
  });
  return buklet;
}

//Удаление буклета
export async function deletBuklet(id: string) {
  await prisma.buklets.delete({
    where: { id: Number(id) }
  });
}

//Добавление брошюры (устаревшая функция, используется новая система с группами)
export async function addBrochure(
  name: string,
  language: string,
  description: string,
  images: Buffer[],
  pdfs: Buffer[]
): Promise<number> {
  // Эта функция устарела, используется новая система с группами файлов
  const brochure = await prisma.brochures.create({
    data: {
      name,
      language,
      description
    }
  });
  return brochure.id;
}

//Получение всех брошюр (устаревшая функция)
export async function fetchBrochuresFromDatabase(): Promise<any[]> {
  const brochures = await prisma.brochures.findMany({
    orderBy: [
      { language: 'asc' },
      { name: 'asc' }
    ]
  });

  return brochures.map(row => ({
    id: row.id,
    name: row.name,
    language: row.language,
    description: row.description
  }));
}

//Получение брошюры по ID (устаревшая функция)
export async function fetchBrochureFromDatabaseById(id: number): Promise<any> {
  const brochure = await prisma.brochures.findUnique({
    where: { id }
  });

  if (!brochure) return null;

  return {
    id: brochure.id,
    name: brochure.name,
    language: brochure.language,
    description: brochure.description,
    images: [],
    pdfs: []
  };
}

//Удаление брошюры
export async function deleteBrochure(id: string) {
  // Удаляем связанные файлы
  await prisma.brochure_images.deleteMany({
    where: { brochure_id: Number(id) }
  });
  await prisma.brochure_pdfs.deleteMany({
    where: { brochure_id: Number(id) }
  });
  await prisma.brochure_file_groups.deleteMany({
    where: { brochure_id: Number(id) }
  });
  
  // Удаляем основную запись
  await prisma.brochures.delete({
    where: { id: Number(id) }
  });
}
