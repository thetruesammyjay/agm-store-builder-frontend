"use client";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

interface CartSummaryProps {
  storeUsername: string;
  onClose?: () => void;
  isCheckout?: boolean;
}

export function CartSummary({ storeUsername, onClose, isCheckout = false }: CartSummaryProps) {
  const { subtotal, total, isEmpty } = useCart();

  if (isEmpty) return null;

  return (
    <div className="border-t bg-gray-50 p-6 space-y-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Service Fee (1%)</span>
          <span>{formatCurrency(total - subtotal)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-base font-bold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {!isCheckout && (
        <div className="space-y-3">
          <Link href={`/store/${storeUsername}/checkout`} onClick={onClose} className="block w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
              Checkout Now <Lock className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-center text-xs text-gray-500">
            Secure checkout powered by Monnify
          </p>
        </div>
      )}
    </div>
  );
}