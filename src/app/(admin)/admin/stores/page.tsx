"use client";

import { useAdminStores } from "@/hooks/useAdmin";
import { StoresTable } from "@/components/admin/StoresTable";
import { Store, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminStoresPage() {
  const { data: stores = [], isLoading } = useAdminStores();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Store className="h-6 w-6 text-indigo-600" /> Store Management
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor, audit, and regulate all stores on the platform.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="bg-white">
             <Download className="mr-2 h-4 w-4" /> Export CSV
           </Button>
        </div>
      </div>

      <StoresTable data={stores} isLoading={isLoading} />
    </div>
  );
}