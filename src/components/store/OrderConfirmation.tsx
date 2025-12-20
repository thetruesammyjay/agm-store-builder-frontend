"use client";

import { CheckCircle2, Clock, Copy, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/format";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Link from "next/link";
import { PaymentInstructions } from "./PaymentInstructions";
import type { Order, Payment } from "@/types";

interface OrderConfirmationProps {
  order: Order;
  payment?: Payment; // Payment details if bank transfer is needed
  storeUsername: string;
}

export function OrderConfirmation({ order, payment, storeUsername }: OrderConfirmationProps) {
  const { copy, copied } = useCopyToClipboard();
  const isPendingPayment = order.paymentStatus === 'pending' && payment;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 px-4">
      {/* Status Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Order Placed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your order. Your order number is <span className="font-mono font-bold text-gray-900">{order.orderNumber}</span>
        </p>
      </div>

      {/* Payment Instructions (If Pending) */}
      {isPendingPayment && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <PaymentInstructions payment={payment} />
        </div>
      )}

      {/* Order Details Card */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order Details</CardTitle>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
          </div>
          <CardDescription>
            Placed on {formatDate(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Items List */}
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-sm">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.quantity}x {item.productName}
                  </p>
                  {item.selectedVariations && (
                    <p className="text-gray-500 text-xs">
                      {Object.values(item.selectedVariations).join(", ")}
                    </p>
                  )}
                </div>
                <p className="font-medium text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service Fee</span>
              <span>{formatCurrency(order.agmFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer</h4>
              <p className="text-gray-600">{order.customerName}</p>
              <p className="text-gray-600">{order.customerEmail}</p>
              <p className="text-gray-600">{order.customerPhone}</p>
            </div>
            {order.customerAddress && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Address</h4>
                <p className="text-gray-600">{order.customerAddress.street}</p>
                <p className="text-gray-600">
                  {order.customerAddress.city}, {order.customerAddress.state}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href={`/store/${storeUsername}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full h-12">
            Continue Shopping
          </Button>
        </Link>
        <Link href={`/store/${storeUsername}/track/${order.orderNumber}`} className="w-full sm:w-auto">
          <Button className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white">
            Track Order <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}