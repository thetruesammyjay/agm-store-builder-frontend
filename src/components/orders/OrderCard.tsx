"use client";

import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import type { Order } from "@/types";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/dashboard/orders/${order.id}`}>
      <Card className="border border-gray-100 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                <span className="text-xs text-gray-500">• {formatDate(order.createdAt, "MMM d")}</span>
              </div>
              <p className="text-sm text-gray-600">{order.customerName}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <OrderStatusBadge type="order" status={order.status} className="text-[10px] px-1.5 h-5" />
              <OrderStatusBadge type="payment" paymentStatus={order.paymentStatus} className="text-[10px] px-1.5 h-5" />
            </div>
            <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}