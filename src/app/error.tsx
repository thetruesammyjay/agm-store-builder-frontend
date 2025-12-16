"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry)
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gray-50 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full space-y-6">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-danger-500" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong!
          </h2>
          <p className="text-gray-500">
            We encountered an unexpected error. Our team has been notified.
            Please try again or go back to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            onClick={reset}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full border-gray-200 text-gray-700">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-left overflow-hidden">
            <p className="text-xs font-mono text-danger-600 break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-gray-400 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}