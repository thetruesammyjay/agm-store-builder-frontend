import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Auth Header */}
      <div className="px-6 py-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary-600 text-gray-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Container */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-10">
              <Image 
                src="/logo.svg" 
                alt="AGM Store Builder" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white px-6 py-8 shadow-sm border border-gray-100 rounded-2xl sm:px-10">
            {children}
          </div>

          {/* Footer Footer */}
          <p className="text-center text-xs text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} AGM Store Builder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}