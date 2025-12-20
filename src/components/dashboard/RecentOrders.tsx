"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/format";
import type { RecentOrder } from "@/types"; 

interface RecentOrdersProps {
  orders?: RecentOrder[];
}

export function RecentOrders({ orders = [] }: RecentOrdersProps) {
  return (
    <Card className="border border-gray-100 shadow-sm h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold text-gray-900">Recent Orders</CardTitle>
        <Link href="/dashboard/orders">
          <Button size="sm" variant="ghost" className="gap-1 text-primary-600 hover:text-primary-700">
            View All <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px] pl-6">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No recent orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.orderNumber} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium pl-6 text-gray-900">
                    {order.orderNumber}
                    <div className="text-xs text-gray-500 font-normal mt-0.5">
                      {/* Safety check for valid date */}
                      {(() => {
                        try {
                          return format(new Date(order.timestamp), "MMM d, HH:mm");
                        } catch (e) {
                          return "";
                        }
                      })()}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 truncate max-w-[120px]">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900 pr-6">
                    {formatCurrency(order.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}