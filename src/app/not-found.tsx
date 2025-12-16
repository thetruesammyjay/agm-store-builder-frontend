import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center space-y-8 max-w-lg mx-auto">
          {/* Illustration Icon */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 bg-yellow-100 rounded-full animate-pulse opacity-50"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-sm border border-gray-100">
              <FileQuestion className="h-10 w-10 text-accent-500" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="text-lg text-gray-600">
              Sorry, we couldn't find the page or store you're looking for. It might have been moved, deleted, or the link is incorrect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-200 text-gray-900 bg-white hover:bg-gray-50">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}