import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  let hostname = request.headers.get("host") || "";

  // Remove port number for local development (e.g. localhost:3000 -> localhost)
  // This allows us to test subdomains locally like: store.localhost:3000
  hostname = hostname.replace(":3000", "");

  const mainDomain = "agmshops.com"; 
  const isVercelDomain = hostname.includes("vercel.app");

  // --------------------------------------------------------
  // 1. Identify if we are on the Main App vs a Subdomain Store
  // --------------------------------------------------------
  
  // We explicitly check for the "Main" domains.
  // This list includes:
  // - localhost (root)
  // - shopwithagm.com (production root)
  // - www.shopwithagm.com
  // - *.vercel.app (preview deployments - treated as main app)
  const isMainApp = 
    hostname === "localhost" ||
    hostname === mainDomain ||
    hostname === `www.${mainDomain}` ||
    isVercelDomain;

  // If we are on the main app, let Next.js handle routing normally.
  // This serves: Landing Page, Login, Signup, Dashboard, Admin
  if (isMainApp) {
    return NextResponse.next();
  }

  // --------------------------------------------------------
  // 2. Extract Subdomain (Store Name)
  // --------------------------------------------------------
  
  // If we reach here, we are on a subdomain (e.g., "nike.shopwithagm.com" or "nike.localhost")
  // We extract "nike" by removing the root domain part.
  const subdomain = hostname.replace(`.${mainDomain}`, "").replace(".localhost", "");

  // Safety check: if extraction resulted in empty string, stop.
  if (!subdomain) {
    return NextResponse.next();
  }

  // --------------------------------------------------------
  // 3. Rewrite Request to Store Folder
  // --------------------------------------------------------

  // This tells Next.js: 
  // "When user visits 'nike.shopwithagm.com/cart', 
  // actually render 'src/app/store/nike/cart' in the background."
  return NextResponse.rewrite(
    new URL(`/store/${subdomain}${url.pathname}${url.search}`, request.url)
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.svg (brand logo)
     * - robots.txt, sitemap.xml (SEO files)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg|robots.txt|sitemap.xml|public).*)",
  ],
};
