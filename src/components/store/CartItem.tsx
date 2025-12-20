"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/hooks/useCart";

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartItem({ item }: { item: CartItemData }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-gray-50">
        <Image
          src={item.image || "/images/placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center rounded-md border border-gray-200">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-gray-100 disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-gray-100"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}