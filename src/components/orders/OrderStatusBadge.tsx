import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/types";

interface OrderStatusBadgeProps {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  className?: string;
  type: "order" | "payment";
}

export function OrderStatusBadge({ status, paymentStatus, className, type }: OrderStatusBadgeProps) {
  const getStyles = (val: string) => {
    switch (val) {
      // Order Statuses
      case "confirmed":
      case "fulfilled":
        return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
      
      // Payment Statuses
      case "paid":
        return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      case "refunded":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200";
    }
  };

  const value = type === "order" ? status : paymentStatus;
  if (!value) return null;

  return (
    <Badge 
      variant="outline" 
      className={cn("capitalize font-medium shadow-none", getStyles(value), className)}
    >
      {value}
    </Badge>
  );
}