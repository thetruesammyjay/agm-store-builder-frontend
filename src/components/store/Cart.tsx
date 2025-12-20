"use client";

import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface CartProps {
  storeUsername: string;
  onClose: () => void;
}

export function Cart({ storeUsername, onClose }: CartProps) {
  const { items, isEmpty } = useCart();

  return (
    <div className="flex h-full flex-col bg-white">
      <SheetHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
        <SheetTitle className="text-lg font-bold flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" /> Your Cart ({items.length})
        </SheetTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
          <X className="h-5 w-5" />
        </Button>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-6">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-gray-100 p-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="text-sm text-gray-500">Add some items to get started</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <CartSummary storeUsername={storeUsername} onClose={onClose} />
    </div>
  );
}