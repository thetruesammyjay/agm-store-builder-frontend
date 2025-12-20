import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface InventoryTrackerProps {
  stock: number;
  className?: string;
}

export function InventoryTracker({ stock, className }: InventoryTrackerProps) {
  if (stock === 0) {
    return (
      <Badge variant="destructive" className={cn("px-2 py-0.5 text-xs font-medium", className)}>
        Out of Stock
      </Badge>
    );
  }

  if (stock <= 5) {
    return (
      <Badge variant="secondary" className={cn("bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 px-2 py-0.5 text-xs", className)}>
        Low Stock: {stock} left
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={cn("text-green-600 border-green-200 bg-green-50 px-2 py-0.5 text-xs", className)}>
      In Stock
    </Badge>
  );
}