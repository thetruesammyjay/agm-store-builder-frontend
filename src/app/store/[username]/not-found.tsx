import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Home } from "lucide-react";
import { Container } from "@/components/shared/Container";

export default function StoreNotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
        <Store className="h-10 w-10 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Store Not Found</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          The store you are looking for doesn't exist or may have been removed. 
          Please check the URL and try again.
        </p>
      </div>
      <Link href="/">
        <Button className="gap-2">
          <Home className="h-4 w-4" /> Go to AGM Homepage
        </Button>
      </Link>
    </Container>
  );
}