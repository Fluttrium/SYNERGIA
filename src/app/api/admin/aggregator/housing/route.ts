import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const housingType = searchParams.get("housingType");
    const district = searchParams.get("district");

    // По умолчанию показываем ВСЕ объявления (без фильтра по статусу)
    // Админ может выбрать конкретный статус через фильтр, если нужно
    const where: any = {};
    if (status && status.trim() !== "") {
      where.status = status;
    }
    // Если не указан статус - показываем все (pending, approved, rejected, archived)
    if (housingType && housingType.trim() !== "") {
      where.housing_type = housingType;
    }
    if (district && district.trim() !== "") {
      where.district = district;
    }

    const listings = await prisma.housing_listings.findMany({
      where,
      include: {
        housing_images: {
          where: {
            is_main: true,
          },
          take: 1,
        },
      },
      orderBy: [
        { is_featured: 'desc' },
        { created_at: 'desc' },
      ],
    });

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
        status: listing.status,
        isFeatured: listing.is_featured || false,
        views: listing.views || 0,
        createdAt: listing.created_at?.toISOString() || new Date().toISOString(),
      };

      if (listing.housing_images && listing.housing_images.length > 0 && listing.housing_images[0].image) {
        const imageBuffer = Buffer.from(listing.housing_images[0].image);
        result.mainImage = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
      }

      return result;
    });

    return NextResponse.json({ listings: processed, total: processed.length });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

