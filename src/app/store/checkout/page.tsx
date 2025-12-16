import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { CheckoutForm } from "@/components/store/CheckoutForm";
import { CheckoutSummary } from "@/components/store/CheckoutSummary";
import { BackButton } from "@/components/shared/BackButton";

// Helper to fetch store details
async function getStore(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}`, {
      // Revalidate every hour to keep store settings relatively fresh
      next: { tags: [`store-${username}`], revalidate: 3600 }, 
    });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch store for checkout:", error);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}): Promise<Metadata> {
  const { username } = await params;
  const store = await getStore(username);

  return {
    title: `Checkout - ${store?.displayName || "Store"}`,
    description: "Complete your purchase securely.",
    robots: {
      index: false, // Security: Don't index checkout pages
      follow: false,
    },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const store = await getStore(username);

  if (!store) {
    notFound();
  }

  return (
    <Container className="py-8 md:py-12 min-h-screen">
      <BackButton label="Continue Shopping" href={`/store/${username}`} className="mb-6" />
      
      <div className="flex items-center gap-2 mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <div className="h-1 flex-1 bg-gray-100 rounded-full ml-4 hidden sm:block" />
        {/* FIXED: Changed flex-shrink-0 to shrink-0 */}
        <span className="text-sm font-medium text-gray-500 hidden sm:block shrink-0">
          Secure Payment via Monnify
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm">
            <CheckoutForm storeId={store.id} />
          </div>
        </div>
        
        <div className="lg:col-span-1 order-1 lg:order-2">
          {/* Sticky Summary for Desktop */}
          <div className="lg:sticky lg:top-24">
             <CheckoutSummary storeUsername={username} isCheckout />
             
             {/* Security Badge */}
             <div className="mt-6 flex justify-center gap-4 text-xs text-gray-400 grayscale opacity-70">
               <div className="flex items-center gap-1">
                 <span className="bg-gray-200 w-4 h-4 rounded-full" /> SSL Secure
               </div>
               <div className="flex items-center gap-1">
                 <span className="bg-gray-200 w-4 h-4 rounded-full" /> 256-bit Encrypted
               </div>
             </div>
          </div>
        </div>
      </div>
    </Container>
  );
}