"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock } from "lucide-react";

interface DomainSettingsProps {
  storeUsername: string;
}

export function DomainSettings({ storeUsername }: DomainSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Domain Name</CardTitle>
        <CardDescription>
          Manage the web address customers use to find your store.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Default Subdomain */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">AGM Subdomain (Free)</label>
          <div className="flex items-center gap-2 p-3 bg-gray-50 border rounded-md text-gray-600">
            <Globe className="h-4 w-4" />
            <span className="font-medium">{storeUsername}.agmshops.com</span>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
          </div>
        </div>

        {/* Custom Domain (Premium) */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-900">Custom Domain</label>
            <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">Pro Plan</Badge>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Connect your own domain (e.g. mystore.com) to build trust.
          </p>
          <div className="flex gap-2 opacity-60 cursor-not-allowed">
            <Input disabled placeholder="e.g. www.mystore.com" />
            <Button disabled variant="secondary">Connect</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <span>Upgrade to Pro to unlock custom domains</span>
        </div>
        <Button size="sm" className="ml-auto bg-black text-white hover:bg-gray-800">
          Upgrade Plan
        </Button>
      </CardFooter>
    </Card>
  );
}