import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  
  // Удаляем cookie с токеном
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}

