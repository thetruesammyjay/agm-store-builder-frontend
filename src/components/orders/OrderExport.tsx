"use client";

import { useExportOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import type { OrderFilterData } from "@/lib/validators";

interface OrderExportProps {
  storeId: string;
  filters?: OrderFilterData;
}

export function OrderExport({ storeId, filters }: OrderExportProps) {
  const { mutate: exportOrders, isPending } = useExportOrders(storeId);

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => exportOrders(filters)}
      disabled={isPending}
      className="h-9"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      Export CSV
    </Button>
  );
}