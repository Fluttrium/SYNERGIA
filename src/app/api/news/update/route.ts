import { NextResponse, NextRequest } from "next/server";
import { updateNews, initDatabase } from "@/db/db";

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "News ID is required" },
        { status: 400 }
      );
    }

    await initDatabase();
    await updateNews(id, updates);

    return NextResponse.json({ 
      message: "News updated successfully",
      success: true 
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

