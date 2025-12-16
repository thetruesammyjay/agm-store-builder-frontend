"use client";

import { useOrder } from "@/hooks/useOrders";
import { OrderDetails } from "@/components/orders/OrderDetails";
import { BackButton } from "@/components/shared/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrderDetails as OrderDetailsType } from "@/types";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: orderData, isLoading, error } = useOrder(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[400px] rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  // Check if order is missing or error occurred
  if (error || !orderData) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="p-3 bg-red-100 rounded-full">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Order not found</h2>
        <p className="text-gray-500">The order you are looking for does not exist or has been deleted.</p>
        <Button onClick={() => router.push("/dashboard/orders")}>Back to Orders</Button>
      </div>
    );
  }

  // Cast the order data to OrderDetailsType since the component expects the extended fields
  // (timeline, store) which are present in the full API response but not the list type.
  const order = orderData as unknown as OrderDetailsType;

  return (
    <div className="space-y-6">
      <BackButton label="Back to Orders" href="/dashboard/orders" />
      <OrderDetails order={order} />
    </div>
  );
}