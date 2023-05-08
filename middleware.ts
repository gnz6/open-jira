import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = req.nextUrl.pathname.replace("/api/entries", "");
    const checkMongoIdRegex = new RegExp("^[a-fA-F0-9]{24}$");
    if (!checkMongoIdRegex.test(id)) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/bad-request";
      url.search = `?message=${id} is not a valid id`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path", "/api/entries/:path"],
};
