import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options as authOptions } from "./app/api/auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  const jwtToken = await getToken({ req });
  console.log("jwtToken", jwtToken);
  if (jwtToken && jwtToken?.isVerified === 0) {
    if (path !== "/verify-email") {
      return NextResponse.redirect(new URL("/verify-email", req.nextUrl));
    }
  }

  const env = process.env.NODE_ENV;
  let token;

  if (env === "development") {
    token = req.cookies.get("next-auth.session-token")?.value || "";
  } else {
    token = req.cookies.get("__Secure-next-auth.session-token")?.value || "";
  }

  const isPublicPath = path === "/login" || path === "/register";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next(); // Make sure to call `NextResponse.next()` to proceed if no redirect is needed
}

export const config = {
  matcher: ["/profile/my-appointments", "/login", "/register", "/verify-email"],
};
