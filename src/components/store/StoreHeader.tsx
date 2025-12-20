"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { Cart } from "./Cart";
import { useState } from "react";
import type { Store } from "@/types";

interface StoreHeaderProps {
  store: Store;
}

export function StoreHeader({ store }: StoreHeaderProps) {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use store primary color if available, else default
  const primaryColor = store.customColors?.primary || "text-primary-600";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href={`/store/${store.username}`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</Link>
                <Link href={`/store/${store.username}/about`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">About</Link>
                <Link href={`/store/${store.username}/track`} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Track Order</Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href={`/store/${store.username}`} className="flex items-center gap-2">
            {store.logoUrl ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-full border">
                <Image src={store.logoUrl} alt={store.displayName} fill className="object-cover" />
              </div>
            ) : (
              <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold ${primaryColor}`}>
                {store.displayName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="text-xl font-bold truncate max-w-[150px] md:max-w-[200px]">
              {store.displayName}
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href={`/store/${store.username}`} className="hover:text-black">Shop</Link>
          <Link href={`/store/${store.username}/about`} className="hover:text-black">About</Link>
          <Link href={`/store/${store.username}/track`} className="hover:text-black">Track Order</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Cart Trigger */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <Cart storeUsername={store.username} onClose={() => setIsCartOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}