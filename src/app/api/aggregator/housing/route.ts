import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const housingType = searchParams.get("housingType");
    const maxPrice = searchParams.get("maxPrice");
    const status = searchParams.get("status") || "approved";

    const where: any = {
      status,
    };

    if (district && district !== "Все районы") {
      where.district = district;
    }

    if (housingType && housingType !== "Любой тип") {
      where.housing_type = housingType;
    }

    if (maxPrice) {
      const maxPriceNum = parseInt(maxPrice);
      if (!isNaN(maxPriceNum) && maxPriceNum > 0) {
        where.price = {
          lte: maxPriceNum,
        };
      }
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
        rooms: listing.rooms,
        area: listing.area,
        floor: listing.floor,
        totalFloors: listing.total_floors,
        views: listing.views || 0,
        createdAt: listing.created_at?.toISOString() || new Date().toISOString(),
      };

      if (listing.housing_images && listing.housing_images.length > 0 && listing.housing_images[0].image) {
        try {
          const imageBuffer = Buffer.from(listing.housing_images[0].image);
          result.mainImage = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
          result.mainImageFilename = listing.housing_images[0].filename;
        } catch (imageError) {
          console.error("Error processing image for listing", listing.id, imageError);
        }
      }

      return result;
    });

    return NextResponse.json({ listings: processed, total: processed.length });
  } catch (error: any) {
    console.error("Error in GET /api/aggregator/housing:", error);
    console.error("Error stack:", error?.stack);
    return NextResponse.json(
      { 
        error: error.message || "Internal server error",
        listings: [],
        total: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
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
    
    // Ищем пользователя в PostgreSQL через Prisma
    let user = null;
    let userIdNumber: number | null = null;
    
    try {
      // Пытаемся найти пользователя по ID (если userIdFromToken - это число)
      const userIdAsNumber = parseInt(userIdFromToken as string, 10);
      if (!isNaN(userIdAsNumber)) {
        user = await prisma.users.findUnique({
          where: { id: userIdAsNumber },
        });
        if (user) {
          userIdNumber = user.id;
        }
      }
      
      // Если не нашли по ID, пробуем по username
      if (!user) {
        user = await prisma.users.findFirst({
          where: { 
            OR: [
              { username: userIdFromToken as string },
              { email: userIdFromToken as string }
            ]
          },
        });
        if (user) {
          userIdNumber = user.id;
        }
      }
    } catch (prismaError: any) {
      console.error("Error finding user in Prisma:", prismaError);
      return NextResponse.json({ 
        error: "Error finding user in database",
        details: process.env.NODE_ENV === 'development' ? {
          message: prismaError?.message
        } : undefined
      }, { status: 500 });
    }
    
    if (!userIdNumber) {
      console.error("User not found. userIdFromToken:", userIdFromToken);
      return NextResponse.json({ 
        error: "User not found. Please login again." 
      }, { status: 404 });
    }
    
    console.log("User authenticated:", { id: userIdNumber, userIdFromToken });

    // Парсим formData - используем альтернативный метод для Next.js 14+
    const contentType = req.headers.get("content-type") || "";
    console.log("Content-Type:", contentType);

    let formData: FormData;
    try {
      // Пробуем стандартный метод Next.js
      formData = await req.formData();
      console.log("FormData parsed successfully using req.formData()");
    } catch (error: any) {
      console.error("req.formData() failed, trying alternative method:", error?.message);
      
      // Если стандартный метод не работает, пробуем альтернативный подход
      // В Next.js иногда нужно читать body напрямую
      try {
        // Конвертируем Request в стандартный Fetch Request для лучшей совместимости
        const clonedReq = req.clone();
        formData = await clonedReq.formData();
        console.log("FormData parsed successfully using cloned request");
      } catch (altError: any) {
        console.error("Alternative method also failed:", altError?.message);
        return NextResponse.json({ 
          error: "Failed to parse form data",
          details: process.env.NODE_ENV === 'development' ? {
            message: error?.message || altError?.message,
            contentType: contentType,
            hint: "Make sure you're using 'form-data' in Postman Body tab. Remove duplicate fields. Ensure Content-Type is not set manually."
          } : undefined
        }, { status: 400 });
      }
    }
    
    // Извлекаем данные из formData
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const housingType = formData.get("housingType") as string;
    const district = formData.get("district") as string;
    const address = formData.get("address") as string;
    const priceStr = formData.get("price") as string;
    const pricePeriod = formData.get("pricePeriod") as string || "month";
    const rooms = formData.get("rooms") ? parseInt(formData.get("rooms") as string) : null;
    const area = formData.get("area") ? parseFloat(formData.get("area") as string) : null;
    const floor = formData.get("floor") ? parseInt(formData.get("floor") as string) : null;
    const totalFloors = formData.get("totalFloors") ? parseInt(formData.get("totalFloors") as string) : null;
    const contactPhone = formData.get("contactPhone") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const contactTelegram = formData.get("contactTelegram") as string || "";
    const amenities = formData.get("amenities") as string || "[]";
    const images = formData.getAll("images") as File[];
    
    console.log("Extracted form data:", {
      title,
      housingType,
      district,
      price: priceStr,
      imagesCount: images.length
    });

    // Валидация обязательных полей
    if (!title || !housingType || !district || !priceStr) {
      return NextResponse.json({ 
        error: "Missing required fields: title, housingType, district, price" 
      }, { status: 400 });
    }

    const price = parseInt(priceStr);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ 
        error: "Invalid price value" 
      }, { status: 400 });
    }

    // Создаем объявление через Prisma ORM (PostgreSQL поддерживает внешние ключи правильно)
    console.log("Creating listing with user_id:", userIdNumber);

    // Проверяем, что Prisma Client инициализирован
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return NextResponse.json({ 
        error: "Database connection error" 
      }, { status: 500 });
    }

    // Проверяем, что пользователь действительно существует в PostgreSQL
    try {
      const userExists = await prisma.users.findUnique({
        where: { id: userIdNumber },
        select: { id: true, username: true }
      });
      
      if (!userExists) {
        console.error("User not found in PostgreSQL database:", userIdNumber);
        return NextResponse.json({ 
          error: "User not found in database. Please login again." 
        }, { status: 404 });
      }
      
      console.log("User verified in PostgreSQL:", userExists);
    } catch (verifyError: any) {
      console.error("Error verifying user:", verifyError);
      return NextResponse.json({ 
        error: "Error verifying user in database" 
      }, { status: 500 });
    }

    // Используем транзакцию Prisma для создания объявления и изображений
    const result = await prisma.$transaction(async (tx) => {
      // Создаем объявление через Prisma ORM
      const listing = await tx.housing_listings.create({
        data: {
          user_id: userIdNumber,
          title: title.trim(),
          description: description?.trim() || null,
          housing_type: housingType,
          district: district,
          address: address?.trim() || null,
          price: price,
          price_period: pricePeriod,
          rooms: rooms || null,
          area: area || null,
          floor: floor || null,
          total_floors: totalFloors || null,
          amenities: amenities || "[]",
          contact_phone: contactPhone?.trim() || null,
          contact_email: contactEmail?.trim() || null,
          contact_telegram: contactTelegram?.trim() || null,
          status: 'pending',
          is_featured: false,
          views: 0,
        },
      });
      
      console.log("Listing created successfully with ID:", listing.id, "and user_id:", userIdNumber);
      
      // Сохраняем изображения
      if (images.length > 0) {
        const imageData = await Promise.all(
          images.map(async (image, index) => {
            if (image.size > 0) {
              const arrayBuffer = await image.arrayBuffer();
              return {
                listing_id: listing.id,
                image: new Uint8Array(arrayBuffer),
                filename: image.name,
                is_main: index === 0,
                order_index: index,
              };
            }
            return null;
          })
        );

        const validImages = imageData.filter((img): img is NonNullable<typeof img> => img !== null);
        
        if (validImages.length > 0) {
          await tx.housing_images.createMany({
            data: validImages,
          });
        }
      }
      
      return listing.id;
    });

    return NextResponse.json({ 
      message: "Объявление создано", 
      listingId: result,
      status: 201 
    });
  } catch (error: any) {
    console.error("Error in POST /api/aggregator/housing:", error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Error code:", error?.code);
    console.error("Error meta:", error?.meta);
    
    // Более детальная информация об ошибке
    let errorMessage = error?.message || "Internal server error";
    if (error?.code) {
      errorMessage += ` (Code: ${error.code})`;
    }
    if (error?.meta) {
      console.error("Prisma error meta:", JSON.stringify(error.meta, null, 2));
    }
    
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        message: error?.message,
        code: error?.code,
        stack: error?.stack,
        meta: error?.meta
      } : undefined
    }, { status: 500 });
  }
}
