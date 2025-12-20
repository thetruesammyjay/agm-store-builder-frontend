import { User, MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";

interface OrderCustomerProps {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerAddress?: Order["customerAddress"];
}

export function OrderCustomer({ 
  customerName, 
  customerEmail, 
  customerPhone, 
  customerAddress 
}: OrderCustomerProps) {
  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-gray-900">Customer Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-primary-50 p-1.5 text-primary-600">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{customerName}</p>
            <p className="text-xs text-gray-500">Customer</p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <a href={`mailto:${customerEmail}`} className="hover:text-primary-600">
              {customerEmail || "No email provided"}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <a href={`tel:${customerPhone}`} className="hover:text-primary-600">
              {customerPhone}
            </a>
          </div>
        </div>

        {customerAddress && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p>{customerAddress.street}</p>
                <p>{customerAddress.city}, {customerAddress.state}</p>
                {customerAddress.postalCode && <p>{customerAddress.postalCode}</p>}
                {customerAddress.country && <p>{customerAddress.country}</p>}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}