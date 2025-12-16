"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ideally log this error to an external service like Sentry
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong
      </h2>
      
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        We encountered an error while loading your dashboard data. This might be a temporary connection issue.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={reset} 
          className="bg-primary-600 hover:bg-primary-700 text-white min-w-[140px]"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        
        <Link href="/">
          <Button variant="outline" className="min-w-[140px]">
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Button>
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-gray-100 rounded-lg max-w-lg w-full overflow-auto text-left">
          <p className="text-xs font-mono text-red-600 break-all">
            {error.message}
          </p>
          {error.digest && (
             <p className="text-xs font-mono text-gray-500 mt-2">Digest: {error.digest}</p>
          )}
        </div>
      )}
    </div>
  );
}