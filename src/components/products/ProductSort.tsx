"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  onSort: (value: string) => void;
}

export function ProductSort({ onSort }: ProductSortProps) {
  return (
    <Select onValueChange={onSort} defaultValue="created_desc">
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="created_desc">Newest First</SelectItem>
        <SelectItem value="created_asc">Oldest First</SelectItem>
        <SelectItem value="price_desc">Price: High to Low</SelectItem>
        <SelectItem value="price_asc">Price: Low to High</SelectItem>
        <SelectItem value="name_asc">Name: A-Z</SelectItem>
      </SelectContent>
    </Select>
  );
}