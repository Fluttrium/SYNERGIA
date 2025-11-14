import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;

  // Проверяем защищенные маршруты
  const isAdminRoute = pathname.startsWith("/admin");
  const isProfileRoute = pathname.startsWith("/profile");

  if (!tokenCookie || !tokenCookie.value) {
    if (isAdminRoute || isProfileRoute) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const token = tokenCookie.value;

  try {
    // Верификация токена
    const secret = new TextEncoder().encode('your_secret_key');
    const { payload } = await jwtVerify(token, secret);

    // Проверка роли для админ-панели
    if (isAdminRoute && payload.role !== 'admin') {
      console.log("Access denied: User is not an admin");
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
