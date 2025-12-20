"use client";

import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "./OrderStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Order } from "@/types";

interface OrderListProps {
  orders: Order[];
  isLoading?: boolean;
}

export function OrderList({ orders, isLoading }: OrderListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full animate-pulse bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg bg-gray-50 border-dashed border-gray-200">
        <div className="rounded-full bg-gray-100 p-4 mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No orders found</h3>
        <p className="text-gray-500">Orders will appear here once customers start buying.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium">
                <Link href={`/dashboard/orders/${order.id}`} className="text-primary-600 hover:underline">
                  {order.orderNumber}
                </Link>
              </TableCell>
              <TableCell className="text-gray-500 text-sm">
                {formatDate(order.createdAt, "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{order.customerName}</span>
                  <span className="text-xs text-gray-500 truncate max-w-[150px]">{order.customerEmail}</span>
                </div>
              </TableCell>
              <TableCell>
                <OrderStatusBadge type="order" status={order.status} />
              </TableCell>
              <TableCell>
                <OrderStatusBadge type="payment" paymentStatus={order.paymentStatus} />
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(order.total)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}