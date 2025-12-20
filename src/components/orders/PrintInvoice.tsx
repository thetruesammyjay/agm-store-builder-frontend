"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintInvoiceProps {
  orderId: string; // Used if fetching specific print view URL
}

export function PrintInvoice({ orderId }: PrintInvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handlePrint}
      className="h-9"
    >
      <Printer className="mr-2 h-4 w-4" />
      Print Invoice
    </Button>
  );
}