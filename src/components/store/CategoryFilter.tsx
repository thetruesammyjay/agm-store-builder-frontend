"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleSelect = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    // Reset pagination when filter changes
    params.delete("page");
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // If no categories exist, don't render anything
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar mask-fade-sides">
        <Button
          variant={!currentCategory ? "default" : "outline"}
          size="sm"
          onClick={() => handleSelect(null)}
          className={cn(
            "rounded-full px-4 min-w-fit transition-all",
            !currentCategory 
              ? "bg-black text-white hover:bg-gray-800 border-transparent shadow-md" 
              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
          )}
        >
          All
        </Button>
        
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={currentCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => handleSelect(cat)}
            className={cn(
              "rounded-full px-4 min-w-fit capitalize transition-all",
              currentCategory === cat 
                ? "bg-black text-white hover:bg-gray-800 border-transparent shadow-md" 
                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}