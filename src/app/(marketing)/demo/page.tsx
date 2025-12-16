import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DemoPage() {
  return (
    <div className="py-16 px-4 md:px-8 text-center space-y-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">See AGM In Action</h1>
        <p className="text-xl text-gray-600">
          Experience what your customers will see. We've built a fully functional demo store so you can explore the features.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl p-4 md:p-8 border border-gray-200">
        <div className="relative aspect-video bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center group">
          {/* In a real app, put a screenshot of a store here */}
          <div className="text-center space-y-4 p-8">
             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-10 h-10 text-primary-600" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900">Demo Fashion Store</h3>
             <p className="text-gray-500 max-w-md mx-auto">
               Explore product pages, cart functionality, and checkout flow.
             </p>
             <Link href="https://demo.shopwithagm.com" target="_blank">
                <Button size="lg" className="mt-4 bg-primary-500 hover:bg-primary-600 text-white">
                    Visit Live Demo
                </Button>
             </Link>
          </div>
        </div>
      </div>

      <div className="bg-primary-50 rounded-2xl p-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Like what you see?</h2>
        <p className="text-gray-700">
            You can build a store exactly like this in less than 5 minutes.
        </p>
        <Link href="/signup">
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                Build My Store <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </Link>
      </div>
    </div>
  );
}