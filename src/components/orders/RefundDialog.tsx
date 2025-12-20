"use client";

import { useState } from "react";
import { useCancelOrder } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "@/store/notificationStore";

interface RefundDialogProps {
  orderId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefundDialog({ orderId, open, onOpenChange }: RefundDialogProps) {
  const [reason, setReason] = useState("");
  const { mutate: cancelOrder, isPending } = useCancelOrder(orderId);

  const handleSubmit = () => {
    cancelOrder(reason, {
      onSuccess: () => {
        toast.success("Order Cancelled", "The order has been cancelled and refund initiated if applicable.");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error("Action Failed", error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" /> Cancel Order
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this order? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for cancellation (optional)</Label>
            <Textarea
              id="reason"
              placeholder="e.g. Out of stock, Customer request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Keep Order
          </Button>
          <Button type="button" variant="destructive" onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cancel & Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}