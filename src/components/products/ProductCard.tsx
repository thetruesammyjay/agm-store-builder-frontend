"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/store/notificationStore";
import { InventoryTracker } from "./InventoryTracker";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product & { store: { username: string } };
  featured?: boolean;
}

export function ProductCard({ product, featured }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      storeUsername: product.store.username,
    });

    toast.success("Added to cart", `${product.name} is in your cart.`);
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Link href={`/store/${product.store.username}/products/${product.id}`}>
      <Card className="group h-full overflow-hidden border-gray-100 transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 font-bold text-white">
                -{discountPercentage}%
              </Badge>
            )}
            {featured && (
              <Badge className="bg-accent-500 text-accent-900 font-bold">
                Featured
              </Badge>
            )}
          </div>

          {/* Quick Actions (Desktop Hover) */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden md:block">
            <Button 
              className="w-full bg-white text-gray-900 hover:bg-gray-100 shadow-sm"
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="line-clamp-1 font-semibold text-gray-900" title={product.name}>
                {product.name}
              </h3>
              <p className="line-clamp-1 text-sm text-gray-500">
                {product.description || "No description"}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary-600">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
            
            <InventoryTracker stock={product.stockQuantity} />
          </div>

          {/* Mobile Add Button */}
          <Button 
            size="sm" 
            className="mt-3 w-full md:hidden"
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}