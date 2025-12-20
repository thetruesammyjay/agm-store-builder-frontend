"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  Wallet, 
  ShieldAlert, 
  LogOut,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";

const adminLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Stores", href: "/admin/stores", icon: Store },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Payouts", href: "/admin/payouts", icon: Wallet },
  { name: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const logout = useLogout();

  return (
    <div className="hidden border-r bg-slate-900 text-white md:block md:w-64 lg:w-72 h-screen fixed left-0 top-0 overflow-y-auto z-40">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
          <div className="relative w-8 h-8">
             {/* Using a simplified white logo for dark bg */}
             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold">A</span>
             </div>
          </div>
          <span>Admin</span>
        </Link>
      </div>
      
      <div className="flex flex-col gap-2 p-4 h-[calc(100vh-65px)] justify-between">
        <nav className="grid gap-1">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4">
            Platform
          </p>
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive 
                    ? "bg-primary-600 text-white shadow-md" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="grid gap-2 border-t border-slate-800 pt-4">
          <Button 
            variant="ghost" 
            className="justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30"
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