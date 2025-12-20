"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { useCurrentUser } from "@/hooks/useAuth";

export function AdminHeader() {
  const { data: user } = useCurrentUser();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm md:ml-64 lg:ml-72">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">Platform Administration</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
           <ShieldCheck className="h-4 w-4 text-slate-600" />
           <span className="text-sm font-medium text-slate-700">Super Admin Mode</span>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                {user?.data?.fullName?.[0] || "A"}
            </div>
        </div>
      </div>
    </header>
  );
}