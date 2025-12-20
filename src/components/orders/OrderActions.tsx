"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Ban, RefreshCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateStatusDialog } from "./UpdateStatusDialog";
import { RefundDialog } from "./RefundDialog";
import type { Order } from "@/types";

interface OrderActionsProps {
  order: Order;
}

export function OrderActions({ order }: OrderActionsProps) {
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => setShowStatusDialog(true)}
          disabled={order.status === "cancelled"}
        >
          Update Status
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => setShowStatusDialog(true)}
              disabled={order.status === "cancelled"}
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Change Status
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setShowRefundDialog(true)}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
              disabled={order.status === "cancelled"}
            >
              <Ban className="mr-2 h-4 w-4" /> Cancel & Refund
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <UpdateStatusDialog 
        orderId={order.id} 
        currentStatus={order.status}
        open={showStatusDialog}
        onOpenChange={setShowStatusDialog}
      />

      <RefundDialog 
        orderId={order.id}
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
      />
    </>
  );
}