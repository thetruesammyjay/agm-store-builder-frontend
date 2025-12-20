import Image from "next/image";
import { formatCurrency } from "@/lib/format";
import type { OrderItem } from "@/types";

interface OrderItemsProps {
  items: OrderItem[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
            <Image
              src={item.productImage || "/images/placeholder.jpg"}
              alt={item.productName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                {item.productName}
              </h4>
              <p className="text-sm font-semibold text-gray-900 ml-4">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {item.quantity} x {formatCurrency(item.price)}
            </p>
            {item.selectedVariations && (
              <div className="mt-1 flex flex-wrap gap-1">
                {Object.entries(item.selectedVariations).map(([key, value]) => (
                  <span key={key} className="inline-flex items-center rounded bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {key}: {value}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}