'use server'

import { initDatabase, deletNews } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

interface Id {
    id: string;
}

export async function DELETE(req: NextRequest) {
    await initDatabase();

    try {
        const { id } = await req.json() as Id;
        await deletNews(id);
        return NextResponse.json({ message: "Запись успешно удалена" }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при удалении записи:', error);
        return NextResponse.json({ error: "Ошибка при удалении записи" }, { status: 500 });
    }
}
