"use client";

import { useProduct } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/authStore";
import { BackButton } from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, ExternalLink, BarChart3, Package, Archive } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { useParams } from "next/navigation";
import { InventoryTracker } from "@/components/products/InventoryTracker";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuthStore();
  const username = user?.email?.split('@')[0] || "store"; // Fallback username logic

  const { data: response, isLoading } = useProduct(username, id);

  if (isLoading) return <div>Loading...</div>; // Skeleton handled by loading.tsx usually

  const product = response?.data;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="space-y-6">
      <BackButton label="Back to Products" href="/dashboard/products" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <div className="flex items-center gap-2">
             <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
             <Badge variant={product.isActive ? "default" : "secondary"}>
                {product.isActive ? "Active" : "Draft"}
             </Badge>
           </div>
           <Link 
             href={`/store/${username}/products/${product.id}`} 
             target="_blank"
             className="text-sm text-primary-600 hover:underline flex items-center gap-1 mt-1"
            >
             View in store <ExternalLink className="w-3 h-3" />
           </Link>
        </div>
        <Link href={`/dashboard/products/${id}/edit`}>
          <Button className="gap-2">
            <Edit className="w-4 h-4" /> Edit Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
               <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex gap-6">
                 <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                    <Image 
                      src={product.images[0] || "/images/placeholder.jpg"} 
                      alt={product.name} 
                      fill 
                      className="object-cover" 
                    />
                 </div>
                 <div className="space-y-1">
                   <p className="text-sm text-gray-500">Description</p>
                   <p className="text-gray-900 whitespace-pre-line">{product.description || "No description provided."}</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Compare at Price</p>
                    <p className="text-lg text-gray-600 line-through">
                      {product.compareAtPrice ? formatCurrency(product.compareAtPrice) : "-"}
                    </p>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory & Variants</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between mb-4">
                 <div>
                    <p className="text-sm text-gray-500">SKU</p>
                    <p className="font-mono">{product.sku || "N/A"}</p>
                 </div>
                 <InventoryTracker stock={product.stockQuantity} />
               </div>
               
               {product.variations && product.variations.length > 0 ? (
                 <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-2 text-sm">Variations</h4>
                    <div className="space-y-2">
                      {product.variations.map((v: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-600">{v.name}</span>
                          <span className="font-medium">{v.options.join(", ")}</span>
                        </div>
                      ))}
                    </div>
                 </div>
               ) : (
                 <p className="text-sm text-gray-400 italic">No variations configured.</p>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
           <Card>
             <CardHeader>
               <CardTitle className="text-base">Performance</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                   <BarChart3 className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Total Sales</p>
                   <p className="font-bold text-lg">{product.salesCount || 0}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-green-50 rounded-lg text-green-600">
                   <Package className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Revenue Generated</p>
                   <p className="font-bold text-lg">{formatCurrency((product.salesCount || 0) * product.price)}</p>
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="border-red-100">
             <CardHeader>
               <CardTitle className="text-base text-red-600">Danger Zone</CardTitle>
             </CardHeader>
             <CardContent>
               <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 border-red-200">
                 <Archive className="w-4 h-4 mr-2" /> Archive Product
               </Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}