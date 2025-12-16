import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderConfirmation } from "@/components/store/OrderConfirmation";
import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { AlertCircle, Store } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ ref: string }>;
}) {
  const { username } = await params;
  const { ref } = await searchParams; // Payment reference

  if (!ref) notFound();

  try {
    // 1. Fetch Payment Details
    const payRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/${ref}`, { 
      cache: "no-store", // Ensure we get the latest status
    });
    
    if (!payRes.ok) {
       console.error("Payment fetch failed:", await payRes.text());
       throw new Error("Failed to fetch payment details");
    }

    const paymentData = (await payRes.json()).data;
    
    // 2. Fetch Full Order Details (if not fully included in payment response)
    // Adjust logic based on whether your payment endpoint includes the full order object or just ID
    const orderId = paymentData.order?.id || paymentData.orderId;
    
    const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
      cache: "no-store",
    });

    if (!orderRes.ok) {
        throw new Error("Failed to fetch order details");
    }

    const fullOrder = (await orderRes.json()).data;

    return (
      <Container className="py-8 md:py-12">
        <OrderConfirmation 
          order={fullOrder} 
          payment={paymentData}
          storeUsername={username} 
        />
      </Container>
    );

  } catch (error) {
    // Graceful Error State
    return (
        <Container className="py-20 flex flex-col items-center text-center max-w-md mx-auto min-h-[60vh] justify-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Info Unavailable</h1>
            <p className="text-gray-600 mb-8">
                We received your request, but couldn't load the confirmation details right now. 
                Please check your email for the receipt or contact support.
            </p>
            <div className="flex gap-4">
                <Link href={`/store/${username}`}>
                    <Button variant="outline" className="gap-2">
                      <Store className="w-4 h-4" /> Return to Store
                    </Button>
                </Link>
            </div>
        </Container>
    );
  }
}