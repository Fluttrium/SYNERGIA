import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Проверка авторизации админа
    const tokenCookie = req.cookies.get("token");
    if (!tokenCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode('your_secret_key');
    const { payload } = await jwtVerify(tokenCookie.value, secret);
    
    if ((payload as any).role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const listingId = parseInt(params.id);
    const body = await req.json();
    const { action, status } = body;

    if (action === 'approve') {
      await prisma.housing_listings.update({
        where: { id: listingId },
        data: { status: 'approved' },
      });
      return NextResponse.json({ message: "Объявление одобрено" });
    }

    if (action === 'reject') {
      await prisma.housing_listings.update({
        where: { id: listingId },
        data: { status: 'rejected' },
      });
      return NextResponse.json({ message: "Объявление отклонено" });
    }

    if (action === 'feature') {
      await prisma.housing_listings.update({
        where: { id: listingId },
        data: { is_featured: true },
      });
      return NextResponse.json({ message: "Объявление выделено" });
    }

    if (action === 'archive') {
      await prisma.housing_listings.update({
        where: { id: listingId },
        data: { status: 'archived' },
      });
      return NextResponse.json({ message: "Объявление отправлено в архив" });
    }

    if (action === 'unarchive' || action === 'restore') {
      await prisma.housing_listings.update({
        where: { id: listingId },
        data: { status: 'approved' },
      });
      return NextResponse.json({ message: "Объявление возвращено из архива" });
    }

    if (status) {
      await prisma.housing_listings.update({
        where: { id: listingId },
        data: { status },
      });
      return NextResponse.json({ message: "Статус обновлен" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Проверка авторизации админа
    const tokenCookie = req.cookies.get("token");
    if (!tokenCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode('your_secret_key');
    const { payload } = await jwtVerify(tokenCookie.value, secret);
    
    if ((payload as any).role !== 'admin') {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const listingId = parseInt(params.id);

    await prisma.housing_listings.delete({
      where: { id: listingId },
    });

    return NextResponse.json({ message: "Объявление удалено" });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

