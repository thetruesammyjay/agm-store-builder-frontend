import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Share2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Link href="/dashboard/products/new" className="w-full">
          <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 border-gray-200 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all">
            <Plus className="mr-3 h-5 w-5 text-primary-500" />
            <div className="text-left">
              <span className="block font-semibold text-gray-900">Add Product</span>
              <span className="block text-xs text-gray-500 font-normal mt-0.5">Create new item</span>
            </div>
          </Button>
        </Link>

        <Link href="/dashboard/settings" className="w-full">
          <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Settings className="mr-3 h-5 w-5 text-gray-500" />
            <div className="text-left">
              <span className="block font-semibold text-gray-900">Store Settings</span>
              <span className="block text-xs text-gray-500 font-normal mt-0.5">Manage details</span>
            </div>
          </Button>
        </Link>

        <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Share2 className="mr-3 h-5 w-5 text-accent-600" />
            <div className="text-left">
              <span className="block font-semibold text-gray-900">Share Store</span>
              <span className="block text-xs text-gray-500 font-normal mt-0.5">Copy link</span>
            </div>
        </Button>

        <Button variant="outline" className="w-full justify-start h-auto py-3 px-4 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Eye className="mr-3 h-5 w-5 text-blue-500" />
            <div className="text-left">
              <span className="block font-semibold text-gray-900">View Store</span>
              <span className="block text-xs text-gray-500 font-normal mt-0.5">Open preview</span>
            </div>
        </Button>
      </CardContent>
    </Card>
  );
}