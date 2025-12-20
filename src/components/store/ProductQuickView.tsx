"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { InventoryTracker } from "@/components/products/InventoryTracker";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductQuickViewProps {
  product: Product;
  storeUsername: string;
}

export function ProductQuickView({ product, storeUsername }: ProductQuickViewProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm backdrop-blur-sm">
          <Eye className="h-4 w-4 text-gray-700" />
          <span className="sr-only">Quick view {product.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden gap-0">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto bg-gray-100 h-full min-h-[300px]">
            <Image
              src={product.images[0] || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 flex flex-col h-full">
            <div className="flex-1 space-y-4">
              <div>
                <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </DialogTitle>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                  )}
                  <InventoryTracker stock={product.stockQuantity} />
                </div>
              </div>

              <DialogDescription className="text-base text-gray-600 line-clamp-4">
                {product.description || "No description available for this product."}
              </DialogDescription>

              {/* Variations placeholder */}
              {product.variations && product.variations.length > 0 && (
                <div className="py-2">
                  <p className="text-sm font-medium text-gray-900 mb-2">Options available</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variations[0].options.map((opt) => (
                      <span key={opt} className="px-3 py-1 rounded-full border text-xs bg-gray-50">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 mt-4 border-t">
              <AddToCartButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] || "", // FIXED: Mapping images array to single image
                  stockQuantity: product.stockQuantity
                }} 
                storeUsername={storeUsername} 
                fullWidth 
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}