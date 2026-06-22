
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
 return NextResponse.redirect(
      new URL("/login", request.url)
    );  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/projects/:path*"
  ]
};