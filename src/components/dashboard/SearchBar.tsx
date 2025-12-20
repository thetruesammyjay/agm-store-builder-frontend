"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to a dedicated search page or filter current view
      // For now, let's assume a global search page
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden sm:flex items-center relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <Input
        type="search"
        placeholder="Search products, orders, customers..."
        className="w-full bg-gray-50 pl-10 h-10 border-gray-200 focus:bg-white focus:border-primary-500 transition-all text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}