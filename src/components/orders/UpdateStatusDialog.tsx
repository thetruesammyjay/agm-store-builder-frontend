"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderStatusSchema, type OrderStatusFormData } from "@/lib/validators";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "@/store/notificationStore";
import type { OrderStatus } from "@/types";

interface UpdateStatusDialogProps {
  orderId: string;
  currentStatus: OrderStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateStatusDialog({ orderId, currentStatus, open, onOpenChange }: UpdateStatusDialogProps) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus(orderId);

  const form = useForm<OrderStatusFormData>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const onSubmit = (data: OrderStatusFormData) => {
    updateStatus(data, {
      onSuccess: () => {
        toast.success("Status Updated", "The order status has been updated successfully.");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error("Update Failed", error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of order to notify the customer.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || form.getValues("status") === currentStatus} className="bg-primary-600 hover:bg-primary-700">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Status
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}