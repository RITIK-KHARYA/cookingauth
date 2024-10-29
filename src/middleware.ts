import { decrypt } from "./lib/session";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const protectectedRoutes = ["/dashboard"];
  const currentPath = req.nextUrl.pathname;
  const isProtected = protectectedRoutes.includes(currentPath);

  if (isProtected) {
    const cookie = req.cookies.get("session");
    const session = await decrypt(cookie?.value);
    if (!session?.userId) {
      redirect("/sign-up");
    }
    return NextResponse.next();
  }
}
