import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderItems } from "./OrderItems";
import { OrderCustomer } from "./OrderCustomer";
import { OrderTimeline } from "./OrderTimeline";
import { OrderActions } from "./OrderActions";
import { PrintInvoice } from "./PrintInvoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/format";
import type { OrderDetails as OrderDetailsType } from "@/types";

interface OrderDetailsProps {
  order: OrderDetailsType;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
            <OrderStatusBadge type="order" status={order.status} />
            <OrderStatusBadge type="payment" paymentStatus={order.paymentStatus} />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {formatDate(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <div className="flex gap-2">
          <PrintInvoice orderId={order.id} />
          <OrderActions order={order} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderItems items={order.items} />
              
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{order.shippingFee ? formatCurrency(order.shippingFee) : "Free"}</span>
                </div>
                {order.discount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline timeline={order.timeline} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OrderCustomer 
            customerName={order.customerName}
            customerEmail={order.customerEmail}
            customerPhone={order.customerPhone}
            customerAddress={order.customerAddress}
          />
          
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Payment Info</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Method</span>
                <span className="font-medium capitalize">{order.payment?.method?.replace('_', ' ') || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Reference</span>
                <span className="font-mono text-xs">{order.payment?.reference || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{order.payment?.paidAt ? formatDate(order.payment.paidAt) : 'Pending'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}