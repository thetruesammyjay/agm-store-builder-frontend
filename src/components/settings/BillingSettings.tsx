import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function BillingSettings() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Billing & Subscription</CardTitle>
            <CardDescription>Manage your plan and payment methods</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Free Plan</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">Standard Plan</h3>
              <p className="text-sm text-gray-500">Pay as you earn</p>
            </div>
            <span className="text-2xl font-bold">₦0<span className="text-sm font-normal text-gray-500">/mo</span></span>
          </div>
          
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> 2% Transaction Fee
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Unlimited Products
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> Instant Payouts
            </li>
          </ul>

          <Button variant="outline" className="w-full" disabled>Current Plan</Button>
        </div>

        <div className="text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h4 className="font-medium text-gray-900">Pro Plan Coming Soon</h4>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Custom domains, lower fees (0.5%), and advanced analytics.
          </p>
          <Button disabled size="sm">Join Waitlist</Button>
        </div>
      </CardContent>
    </Card>
  );
}