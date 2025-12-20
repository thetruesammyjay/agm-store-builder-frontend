"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/store/notificationStore";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stockQuantity: number;
  };
  storeUsername: string;
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({ product, storeUsername, fullWidth, className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [status, setStatus] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleAddToCart = (e?: React.MouseEvent) => {
    // Prevent event bubbling if button is inside a card link
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (product.stockQuantity <= 0) return;

    setStatus('adding');

    // Simulate a tiny delay for better UX feedback
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        storeUsername,
      });

      setStatus('added');
      toast.success("Added to cart", `${product.name} has been added.`);

      // Reset back to idle after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    }, 400);
  };

  const isOutOfStock = product.stockQuantity <= 0;

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isOutOfStock || status === 'adding'}
      className={cn(
        "h-11 transition-all duration-300",
        fullWidth ? "w-full" : "",
        isOutOfStock 
          ? "bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-not-allowed border-gray-200" 
          : status === 'added'
            ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
            : "bg-primary-600 hover:bg-primary-700 text-white shadow-sm border-transparent",
        className
      )}
    >
      {status === 'adding' ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : status === 'added' ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Added
        </>
      ) : (
        <ShoppingCart className="mr-2 h-5 w-5" />
      )}
      
      {isOutOfStock ? "Out of Stock" : status === 'adding' ? "Adding..." : status === 'added' ? "In Cart" : "Add to Cart"}
    </Button>
  );
}