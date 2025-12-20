"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  Wallet, 
  ShieldAlert, 
  LogOut,
  Settings,
  ShieldCheck
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

// Admin Navigation Links
const ADMIN_LINKS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Store Management", href: "/admin/stores", icon: Store },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Payout Requests", href: "/admin/payouts", icon: Wallet },
  { name: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
];

interface SuperAdminSidebarProps {
  onLinkClick?: () => void; // Optional prop to close mobile drawer on click
}

export function SuperAdminSidebar({ onLinkClick }: SuperAdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col h-full text-white bg-slate-900 border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/50">
             <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="block font-bold tracking-tight text-white leading-none">AGM Admin</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">SUPER ADMIN</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Platform Controls
        </p>
        {ADMIN_LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <link.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
              )} />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-800 transition-colors text-left outline-none">
              <Avatar className="h-9 w-9 border border-slate-700 bg-slate-800">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.fullName || "Admin"}&background=4f46e5&color=fff`} />
                <AvatarFallback className="bg-indigo-900 text-indigo-200">
                    {user?.fullName?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.fullName || "Admin User"}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <Settings className="h-4 w-4 text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-white">
            <DropdownMenuLabel className="text-slate-400">Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer hover:bg-slate-800">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer hover:bg-slate-800">
              Security Logs
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem 
              className="text-red-400 focus:bg-red-950/30 focus:text-red-300 cursor-pointer hover:bg-red-950/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}