import { NextResponse, NextRequest } from "next/server";
import { getNewsById, initDatabase } from "@/db/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("🔍 API: Getting news with ID:", id);
    
    await initDatabase();

    const news = await getNewsById(id);
    console.log("📦 API: News from DB:", news ? "Found" : "Not found");

    if (!news) {
      console.log("❌ API: News not found for ID:", id);
      return NextResponse.json(
        { message: "News not found" },
        { status: 404 }
      );
    }

    console.log("✅ API: Returning news data");
    return NextResponse.json(news);
  } catch (error) {
    console.error("❌ API: Error fetching news:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("🗑️ API: Deleting news with ID:", id);
    
    await initDatabase();

    const { deleteNews } = await import("@/db/db");
    await deleteNews(id);

    console.log("✅ API: News deleted successfully");
    return NextResponse.json({
      message: "News deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("❌ API: Error deleting news:", error);
    return NextResponse.json(
      { message: "Internal server error", error: String(error) },
      { status: 500 }
    );
  }
}

