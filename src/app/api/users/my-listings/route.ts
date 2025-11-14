import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { getUserById, giveUser, initDatabase } from "@/db/db";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    // Проверка авторизации
    const tokenCookie = req.cookies.get("token");
    if (!tokenCookie?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = new TextEncoder().encode('your_secret_key');
    let payload: any;
    try {
      const result = await jwtVerify(tokenCookie.value, secret);
      payload = result.payload;
    } catch (error) {
      console.error("JWT verification error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Получаем данные пользователя для получения числового ID
    const userIdFromToken = payload.username || payload.id;
    await initDatabase();
    
    let user = await getUserById(userIdFromToken as string);
    if (!user) {
      user = await giveUser(userIdFromToken as string);
    }
    
    if (!user || !user.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const userIdNumber = parseInt(user.id.toString());
    if (isNaN(userIdNumber)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 500 });
    }

    // Получаем объявления пользователя
    const listings = await prisma.housing_listings.findMany({
      where: {
        user_id: userIdNumber,
      },
      include: {
        housing_images: {
          where: {
            is_main: true,
          },
          take: 1,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Обрабатываем данные для отправки
    const processed = listings.map((listing) => {
      const result: any = {
        id: listing.id,
        title: listing.title,
        description: listing.description,
        housingType: listing.housing_type,
        district: listing.district,
        address: listing.address,
        price: listing.price,
        pricePeriod: listing.price_period,
        rooms: listing.rooms,
        area: listing.area,
        floor: listing.floor,
        totalFloors: listing.total_floors,
        status: listing.status,
        views: listing.views || 0,
        createdAt: listing.created_at?.toISOString() || new Date().toISOString(),
      };

      if (listing.housing_images && listing.housing_images.length > 0 && listing.housing_images[0].image) {
        const imageBuffer = Buffer.from(listing.housing_images[0].image);
        result.mainImage = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
        result.mainImageFilename = listing.housing_images[0].filename;
      }

      return result;
    });

    return NextResponse.json({ listings: processed, total: processed.length });
  } catch (error: any) {
    console.error("Error fetching user listings:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

