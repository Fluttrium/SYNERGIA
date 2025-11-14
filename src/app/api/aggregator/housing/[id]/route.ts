import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listingId = parseInt(params.id);

    const listing = await prisma.housing_listings.findUnique({
      where: { id: listingId },
      include: {
        housing_images: {
          orderBy: {
            order_index: 'asc',
          },
        },
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Увеличиваем просмотры
    const currentViews = listing.views || 0;
    await prisma.housing_listings.update({
      where: { id: listingId },
      data: {
        views: currentViews + 1,
      },
    });

    const result = {
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
      amenities: listing.amenities ? JSON.parse(listing.amenities) : [],
      contactPhone: listing.contact_phone,
      contactEmail: listing.contact_email,
      contactTelegram: listing.contact_telegram,
      views: (listing.views || 0) + 1,
      createdAt: listing.created_at?.toISOString() || new Date().toISOString(),
      images: listing.housing_images.map((img) => ({
        image: img.image ? `data:image/jpeg;base64,${Buffer.from(img.image).toString('base64')}` : null,
        filename: img.filename,
        isMain: img.is_main || false,
        orderIndex: img.order_index || 0,
      })),
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
