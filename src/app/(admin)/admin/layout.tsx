"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Menu, Bell, Search, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { SuperAdminSidebar } from "@/components/admin/SuperAdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAccess = async () => {
      if (!isAuthenticated) {
        router.push("/admin/login"); 
        return;
      }

      // Strict Role Check for Admin Access
      if (user?.role !== 'admin' && user?.role !== 'super_admin') {
         router.push("/dashboard"); // Redirect unauthorized users
         return;
      }
      
      setIsChecking(false);
    };

    checkAccess();
  }, [isAuthenticated, user, router]);

  if (isChecking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 gap-4">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
        <p className="text-sm font-medium text-slate-400 animate-pulse">
          Verifying Admin Privileges...
        </p>
      </div>
    );
  }

  // Determine current page title
  const getPageTitle = () => {
    if (pathname === "/admin") return "Overview";
    if (pathname.includes("/stores")) return "Store Management";
    if (pathname.includes("/users")) return "User Management";
    if (pathname.includes("/payouts")) return "Payout Requests";
    if (pathname.includes("/audit")) return "Audit Logs";
    return "Admin Dashboard";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 fixed inset-y-0 z-50">
        <SuperAdminSidebar />
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col md:pl-72 min-w-0 transition-all duration-300">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:bg-slate-100">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r-slate-800 bg-slate-900 text-white">
                <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                <SheetDescription className="sr-only">Access platform admin tools</SheetDescription>
                <SuperAdminSidebar onLinkClick={() => setIsMobileOpen(false)} />
              </SheetContent>
            </Sheet>

            {/* Page Title */}
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search global data..." 
                className="pl-9 w-64 bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500 h-9 text-sm"
              />
            </div>

            {/* Admin Notifications */}
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}