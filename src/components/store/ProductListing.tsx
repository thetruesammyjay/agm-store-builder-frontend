import { ProductCard } from "@/components/products/ProductCard";
import { PackageSearch } from "lucide-react";
import type { Product } from "@/types";

interface ProductListingProps {
  products: Product[];
  storeUsername: string;
}

export function ProductListing({ products, storeUsername }: ProductListingProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <PackageSearch className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
        <p className="text-gray-500 max-w-sm mt-2">
          We couldn't find any products matching your criteria. Try clearing your filters or search terms.
        </p>
      </div>
    );
  }

  // Format products to match ProductCard expectation (injecting store username)
  const formattedProducts = products.map(p => ({
    ...p,
    store: { username: storeUsername }
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {formattedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}