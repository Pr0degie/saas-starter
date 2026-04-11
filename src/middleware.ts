import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  

  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAdmin = nextUrl.pathname.startsWith("/admin");

  // Prevent logged-in users from re-visiting login/register pages.
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
  // Non-admin users are silently redirected rather than shown a 403.
  if (isAdmin && session?.user?.role !== "ADMIN") {
  return NextResponse.redirect(new URL("/dashboard", nextUrl));
}

  return NextResponse.next();
});

export const config = {
  // Skip API routes and Next.js internals — middleware only guards pages.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};