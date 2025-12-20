"use client";

import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

interface CheckoutSummaryProps {
  storeUsername?: string;
  onClose?: () => void;
  isCheckout?: boolean;
}

export function CheckoutSummary({ storeUsername, onClose, isCheckout = false }: CheckoutSummaryProps) {
  const { items, subtotal, total, isEmpty } = useCart();

  if (isEmpty) return null;

  return (
    <Card className="border-gray-200 shadow-sm bg-gray-50/50">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-12 w-12 rounded bg-white border">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
              </div>
              <p className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Fee (1%)</span>
            <span>{formatCurrency(total - subtotal)}</span>
          </div>
          <div className="flex justify-between border-t pt-4 text-lg font-bold text-gray-900">
            <span>Total to Pay</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {!isCheckout && storeUsername && (
          <div className="space-y-3 pt-4 border-t">
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
      </CardContent>
    </Card>
  );
}