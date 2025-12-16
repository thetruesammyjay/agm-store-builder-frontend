"use client";

import { useState } from "react";
import { OrderList } from "@/components/orders/OrderList";
import { OrderFilter } from "@/components/orders/OrderFilter";
import { OrderExport } from "@/components/orders/OrderExport";
import { useOrders } from "@/hooks/useOrders";
import { useAuthStore } from "@/store/authStore";
import { Pagination } from "@/components/shared/Pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { OrderFilterData } from "@/lib/validators";

export default function OrdersPage() {
  const { user } = useAuthStore();
  const storeId = user?.id || ""; 
  
  const [filters, setFilters] = useState<OrderFilterData>({
    page: 1,
    limit: 10,
    search: "",
    status: undefined,
  });

  // The hook returns { orders: [], pagination: {} } directly
  const { data, isLoading } = useOrders(storeId, filters);

  const handleFilterChange = (newFilters: OrderFilterData) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">Manage and fulfill customer orders.</p>
        </div>
        <OrderExport storeId={storeId} filters={filters} />
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="p-4 border-b bg-gray-50/50">
          <OrderFilter filters={filters} onFilterChange={handleFilterChange} />
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-4">
               {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : (
            <>
              {/* Access orders directly from data */}
              <OrderList orders={data?.orders || []} />
              
              {/* Access pagination directly from data */}
              {data?.pagination && (
                <div className="border-t p-4">
                  <Pagination 
                    currentPage={data.pagination.page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}