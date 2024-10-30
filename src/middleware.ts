import { decrypt } from "./lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const protectedRoutes = ["/dashboard"];
  const currentPathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPathname);
  if (isProtectedRoute) {
    const cookie = request.cookies.get("session");
    const session = await decrypt(cookie?.value);
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
