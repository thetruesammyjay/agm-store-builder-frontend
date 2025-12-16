"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Client-side protection: Redirect to login if no token found
    // Note: Middleware should also handle this for server-side protection
    if (!isAuthenticated || !token) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, token, router]);

  // Show a full-screen loading spinner while verifying auth state
  if (isChecking) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar Component 
        - Hidden on mobile (controlled via Header's Sheet/Drawer)
        - Visible on desktop (fixed position)
      */}
      <Sidebar />
      
      <div className="flex flex-col flex-1 min-h-screen md:pl-64 lg:pl-72 transition-all duration-300 ease-in-out">
        <DashboardHeader />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}