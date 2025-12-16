"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductList } from "@/components/products/ProductList";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductSort } from "@/components/products/ProductSort";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { toast } from "@/store/notificationStore";
import type { ProductFilterData } from "@/lib/validators"; // Import the type

export default function ProductsPage() {
  const { user } = useAuthStore();
  const username = user?.email?.split('@')[0] || "demo";

  // Strictly type the state to match ProductFilterData
  const [filters, setFilters] = useState<ProductFilterData>({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt", // Default matches one of the allowed literals
    inStock: undefined,
  });

  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Cast the hook return to expected structure if types are inferred as {}
  const { data: response, isLoading, refetch } = useProducts(username, filters) as any;
  const { mutate: deleteProduct } = useDeleteProduct();

  // Handle the response structure. Assuming API returns { success: true, data: [...] }
  // or if hook unwraps it, handle accordingly. 
  // Based on other hooks, response.data usually holds the array.
  const products = response?.data || [];

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete, {
        onSuccess: () => {
          toast.success("Product deleted");
          setProductToDelete(null);
          refetch();
        },
        onError: () => toast.error("Failed to delete product"),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Manage your inventory and catalog.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="w-full md:w-auto flex-1">
          <ProductFilter 
            onSearch={(q) => setFilters({...filters, search: q, page: 1})}
            onStatusFilter={(status) => {
               // Logic to map status string if needed
               console.log(status);
            }} 
          />
        </div>
        <ProductSort onSort={(val) => setFilters({...filters, sortBy: val as any})} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
           <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : (
           <ProductList 
             products={products} 
             onDelete={(id) => setProductToDelete(id)} 
           />
        )}
        
        <div className="p-4 border-t">
           <div className="flex justify-center gap-2">
             <Button 
               variant="outline" 
               size="sm" 
               disabled={filters.page === 1}
               onClick={() => setFilters({...filters, page: (filters.page || 1) - 1})}
             >
               Previous
             </Button>
             <Button 
               variant="outline" 
               size="sm"
               disabled={products.length < (filters.limit || 10)}
               onClick={() => setFilters({...filters, page: (filters.page || 1) + 1})}
             >
               Next
             </Button>
           </div>
        </div>
      </div>

      {productToDelete && (
        <ConfirmDialog 
          trigger={<></>}
          title="Delete Product?"
          description="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          variant="destructive"
        />
      )}
    </div>
  );
}