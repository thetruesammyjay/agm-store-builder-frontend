"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import type { OrderFilterData } from "@/lib/validators";

interface OrderFilterProps {
  filters: OrderFilterData;
  onFilterChange: (newFilters: OrderFilterData) => void;
}

export function OrderFilter({ filters, onFilterChange }: OrderFilterProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Trigger filter change when debounced search value changes
  useEffect(() => {
    // Only trigger if the search value is different from what's in filters
    if (debouncedSearch !== filters.search) {
      onFilterChange({ ...filters, search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, filters, onFilterChange]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search by order number, customer..."
          className="pl-9 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Select 
          value={filters.status || "all"} 
          onValueChange={(val) => onFilterChange({ ...filters, status: val === "all" ? undefined : val as any, page: 1 })}
        >
          <SelectTrigger className="w-[140px] bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="fulfilled">Fulfilled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={filters.paymentStatus || "all"} 
          onValueChange={(val) => onFilterChange({ ...filters, paymentStatus: val === "all" ? undefined : val as any, page: 1 })}
        >
          <SelectTrigger className="w-[150px] bg-white">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payment</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}