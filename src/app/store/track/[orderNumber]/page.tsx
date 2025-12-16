import { Container } from "@/components/shared/Container";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/shared/BackButton";
import { formatCurrency } from "@/lib/format";

async function getOrderTracking(orderNumber: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/track/${orderNumber}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ username: string; orderNumber: string }>;
}) {
  const { username, orderNumber } = await params;
  const trackingData = await getOrderTracking(orderNumber);

  if (!trackingData) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
        <p className="text-gray-500">Please check the order number and try again.</p>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12 max-w-2xl">
      <BackButton label="Back to Shop" href={`/store/${username}`} className="mb-6" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{trackingData.orderNumber}</h1>
          <p className="text-gray-500 text-sm mt-1">Track your delivery status</p>
        </div>
        <div className="flex gap-2">
            <OrderStatusBadge type="order" status={trackingData.status} />
            <OrderStatusBadge type="payment" paymentStatus={trackingData.paymentStatus} />
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTimeline timeline={trackingData.timeline} />
        </CardContent>
      </Card>
      
      {/* Optional: Add items summary here if returned by tracking API */}
    </Container>
  );
}