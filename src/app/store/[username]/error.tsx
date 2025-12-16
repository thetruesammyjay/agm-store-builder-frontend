"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Container } from "@/components/shared/Container";

export default function StoreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 flex flex-col items-center justify-center text-center min-h-[50vh]">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't load the store content. This might be a temporary connection issue.
      </p>
      <Button onClick={reset} className="gap-2">
        <RefreshCcw className="h-4 w-4" /> Try Again
      </Button>
    </Container>
  );
}