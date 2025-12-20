"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings,
  Store,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";

// FIX: Removed '/dashboard' prefix from routes to match file structure
const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <div className="hidden border-r bg-white md:block md:w-64 lg:w-72 h-screen fixed left-0 top-0 overflow-y-auto z-40">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <div className="relative w-28 h-8">
             <Image src="/logo.svg" alt="AGM" fill className="object-contain object-left" />
          </div>
        </Link>
      </div>
      
      <div className="flex flex-col gap-2 p-4 h-[calc(100vh-65px)] justify-between">
        <nav className="grid gap-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:text-primary-600",
                  isActive 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-gray-500 hover:bg-gray-50"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="grid gap-2">
          <div className="bg-primary-50 rounded-xl p-4">
            <h4 className="font-semibold text-primary-900 text-sm mb-1">Your Store</h4>
            <p className="text-xs text-primary-600 mb-3 truncate">agmshops.com</p>
            {/* In a real app, dynamically link to the user's store subdomain */}
            <Button size="sm" variant="outline" className="w-full bg-white border-primary-200 text-primary-700 hover:bg-primary-100">
                <Store className="mr-2 h-3 w-3" /> Visit Store
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}