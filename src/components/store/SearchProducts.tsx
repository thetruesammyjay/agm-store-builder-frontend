"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function SearchProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [query, setQuery] = useState(initialSearch);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // Only update if the value has changed from what's in the URL
    if (debouncedQuery === searchParams.get("search")) return;

    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    } else {
      params.delete("search");
    }
    
    // Reset page to 1 when searching
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
        aria-label="Search products"
      />
    </div>
  );
}