import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl space-y-12">
        {/* Search Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">How can we help?</h1>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
                className="pl-10 h-12 text-lg" 
                placeholder="Search for answers..." 
            />
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 rounded-xl hover:border-primary-500 cursor-pointer transition-colors text-center space-y-3">
                <HelpCircle className="w-8 h-8 mx-auto text-primary-500" />
                <h3 className="font-bold text-gray-900">Getting Started</h3>
                <p className="text-sm text-gray-500">Setting up your store and adding products.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl hover:border-primary-500 cursor-pointer transition-colors text-center space-y-3">
                <FileText className="w-8 h-8 mx-auto text-primary-500" />
                <h3 className="font-bold text-gray-900">Payments & Payouts</h3>
                <p className="text-sm text-gray-500">Understanding transaction fees and bank transfers.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl hover:border-primary-500 cursor-pointer transition-colors text-center space-y-3">
                <MessageCircle className="w-8 h-8 mx-auto text-primary-500" />
                <h3 className="font-bold text-gray-900">Account Management</h3>
                <p className="text-sm text-gray-500">Password reset and profile settings.</p>
            </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">When do I get paid?</h4>
                    <p className="text-gray-600">Payouts are processed instantly. As soon as a customer pays, the funds (minus our fee) are sent to your bank account.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Can I use my own domain?</h4>
                    <p className="text-gray-600">Currently, we provide a free agmshop.com subdomain. Custom domains will be available in the Pro plan soon.</p>
                </div>
            </div>
        </div>

        <div className="text-center pt-8">
            <p className="text-gray-600 mb-4">Still need help?</p>
            <Link href="/contact">
                <Button>Contact Support</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}