"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Split path into segments, filter out empty strings
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Don't show breadcrumbs on the main dashboard root if preferred, 
  // or show just "Home" > "Dashboard"
  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 hidden md:flex">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/dashboard" 
            className="text-gray-400 hover:text-primary-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard Home</span>
          </Link>
        </li>
        
        {segments.map((segment, index) => {
          // Skip "dashboard" since we have the home icon
          if (segment === "dashboard") return null;

          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          
          // Format segment name: "add-product" -> "Add Product"
          const name = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <Fragment key={href}>
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <li>
                {isLast ? (
                  <span className="text-sm font-medium text-gray-900" aria-current="page">
                    {name}
                  </span>
                ) : (
                  <Link 
                    href={href} 
                    className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    {name}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}