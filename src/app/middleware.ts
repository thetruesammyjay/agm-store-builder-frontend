import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname (e.g. "sammy.shopwithagm.com" or "localhost:3000")
  let hostname = req.headers.get("host")!;

  // Handle Vercel Preview URLs or Localhost
  // This allows us to test subdomains locally like: http://store1.localhost:3000
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // App Domain - Change this when going to production
  // If you are testing locally, use "localhost:3000"
  const appDomain = "shopwithagm.com"; 

  // Check if we are on the main domain or a subdomain
  // "www" is treated as the main domain
  if (
    hostname === appDomain ||
    hostname === `www.${appDomain}` ||
    hostname === "localhost:3000"
  ) {
    // This is the main landing page / app dashboard
    // No rewrite needed, Next.js handles this normally
    return NextResponse.next();
  }

  // --- SUBDOMAIN LOGIC ---
  
  // Extract subdomain (e.g. "sammy" from "sammy.shopwithagm.com")
  // If local, splits "sammy.localhost:3000" -> "sammy"
  const subdomain = hostname.split(".")[0];

  // Rewrite the request to a specific folder in your app
  // This sends the user to /src/app/store/[subdomain]/page.tsx
  // But the URL in the browser remains "sammy.shopwithagm.com"
  return NextResponse.rewrite(
    new URL(`/store/${subdomain}${path}`, req.url)
  );
}