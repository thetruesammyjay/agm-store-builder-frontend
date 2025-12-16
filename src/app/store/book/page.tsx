import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { BackButton } from "@/components/shared/BackButton";
import { BookingWizard } from "@/components/store/BookingWizard";
import { Metadata } from "next";
import { StoreContact } from "@/components/store/StoreContact";

// Helper to fetch store data
async function getStore(username: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}`, {
      next: { revalidate: 60, tags: [`store-${username}`] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Error fetching store:", e);
    return null;
  }
}

// Helper to fetch products (filtered for services if possible, or just all)
async function getServices(username: string) {
  try {
    // In a real app, you might filter by category=service or similar tag
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}/products?limit=50`, {
      cache: "no-store", // Ensure availability is fresh
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error("Error fetching services:", e);
    return [];
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ username: string }> 
}): Promise<Metadata> {
  const { username } = await params;
  const store = await getStore(username);

  if (!store) return { title: "Store Not Found" };

  return {
    title: `Book Appointment - ${store.displayName}`,
    description: `Schedule a service with ${store.displayName}.`,
    openGraph: {
      title: `Book Appointment - ${store.displayName}`,
      description: `Schedule a service with ${store.displayName}.`,
    }
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  // Fetch store and services in parallel for performance
  const [store, services] = await Promise.all([
    getStore(username),
    getServices(username),
  ]);

  if (!store) {
    notFound();
  }

  return (
    <Container className="py-8 md:py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <BackButton label="Back to Store" href={`/store/${username}`} className="mb-4" />
           <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Book an Appointment</h1>
           <p className="text-gray-500 mt-2 text-lg">
             Select a service and time that works best for you.
           </p>
        </div>
      </div>

      {services.length > 0 ? (
        <BookingWizard storeUsername={username} services={services} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services available</h3>
            <p className="text-gray-500 max-w-sm text-center mb-8">
              The store owner hasn't listed any bookable services yet. Please check back later.
            </p>
            <StoreContact store={store} />
        </div>
      )}
    </Container>
  );
}