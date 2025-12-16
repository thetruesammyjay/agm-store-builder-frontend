"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function OverviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-4">
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-50/50">
        <AlertCircle className="h-6 w-6 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Dashboard Unavailable</h2>
      <p className="text-gray-500 mb-6 max-w-sm">
        We encountered an error loading your overview stats.
      </p>
      <Button onClick={reset} className="bg-primary-600 hover:bg-primary-700 text-white gap-2">
        <RefreshCcw className="h-4 w-4" /> Retry
      </Button>
    </div>
  );
}