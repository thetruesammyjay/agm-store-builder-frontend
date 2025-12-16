import { StoreBanner } from "@/components/store/StoreBanner";
import { ProductListing } from "@/components/store/ProductListing";
import { SearchProducts } from "@/components/store/SearchProducts";
import { CategoryFilter } from "@/components/store/CategoryFilter";
import { Container } from "@/components/shared/Container";
import { StoreContact } from "@/components/store/StoreContact";

// Helper to fetch products
async function getProducts(username: string, searchParams: { [key: string]: string | string[] | undefined }) {
  const params = new URLSearchParams();
  if (searchParams.search) params.append("search", String(searchParams.search));
  if (searchParams.category) params.append("category", String(searchParams.category));
  if (searchParams.sort) params.append("sortBy", String(searchParams.sort));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}/products?${params.toString()}`, {
    cache: "no-store", // Real-time inventory
  });

  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

// Helper to fetch store data for banner
async function getStore(username: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores/${username}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function StoreHomePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username } = await params;
  const resolvedSearchParams = await searchParams;
  
  const [store, products] = await Promise.all([
    getStore(username),
    getProducts(username, resolvedSearchParams)
  ]);

  if (!store) return null; // Layout handles 404

  // Extract unique categories from products (or fetch from API if available)
  const categories = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen pb-20">
      <StoreBanner store={store} />
      
      <Container className="mt-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
          <SearchProducts />
        </div>

        <CategoryFilter categories={categories} />

        <ProductListing products={products} storeUsername={username} />

        {/* Contact / Footer Info Section */}
        <div className="mt-20">
            <StoreContact store={store} />
        </div>
      </Container>
    </div>
  );
}