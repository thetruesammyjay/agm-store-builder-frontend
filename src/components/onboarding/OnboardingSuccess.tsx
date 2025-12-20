import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Store, Settings } from "lucide-react";
import Confetti from "react-confetti"; // You might need to install this: npm i react-confetti
import { useWindowSize } from "react-use"; // Optional, or handle window size manually

export function OnboardingSuccess({ storeUrl }: { storeUrl: string }) {
  // Safe mock for window size to avoid hydration mismatch if react-use isn't installed
  // In real app, implement a useWindowSize hook or install library
  const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <div className="text-center space-y-8 py-10 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         {/* Confetti here if desired */}
      </div>

      <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <Check className="w-12 h-12 text-green-600" />
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900">Store Created!</h1>
        <p className="text-lg text-gray-600">
          Congratulations! Your store is now live and ready to accept payments.
        </p>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-primary-600 text-center select-all">
          {storeUrl}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link href="/dashboard">
          <Button size="lg" className="w-full sm:w-auto h-12 text-base">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <a href={`https://${storeUrl}`} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-base">
            <Store className="mr-2 h-4 w-4" /> View Live Store
          </Button>
        </a>
      </div>
    </div>
  );
}