"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { BackButton } from "@/components/shared/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Calendar, ShoppingBag, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderList } from "@/components/orders/OrderList";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  totalSpent: number;
  totalOrders: number;
  address?: {
    street: string;
    city: string;
    state: string;
  };
  orders: any[]; // Reusing order type logic
}

export default function CustomerDetailsPage() {
  const params = useParams();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.get(`/dashboard/customers/${params.id}`);
        setCustomer(res.data.data);
      } catch (error) {
        console.error("Failed to fetch customer", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomer();
  }, [params.id]);

  if (isLoading) {
    return <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
    </div>;
  }

  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="space-y-8">
      <BackButton label="Back to Customers" href="/dashboard/customers" />

      {/* Customer Header Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start">
             <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-primary-100 text-primary-700 text-2xl font-bold">
                  {customer.name.charAt(0).toUpperCase()}
                </AvatarFallback>
             </Avatar>
             <div className="space-y-1">
               <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
               <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-1">
                 <div className="flex items-center gap-1.5">
                   <Mail className="w-4 h-4" /> {customer.email}
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Phone className="w-4 h-4" /> {customer.phone}
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Calendar className="w-4 h-4" /> Joined {formatDate(customer.joinedAt)}
                 </div>
               </div>
               
               {customer.address && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 pt-1">
                    <MapPin className="w-4 h-4" /> 
                    {customer.address.street}, {customer.address.city}, {customer.address.state}
                  </div>
               )}
             </div>
          </CardContent>
        </Card>

        {/* Lifetime Stats */}
        <Card className="bg-primary-50 border-primary-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary-900 text-lg">Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold text-primary-700 mb-1">
               {formatCurrency(customer.totalSpent)}
             </div>
             <p className="text-sm text-primary-600 mb-4">{customer.totalOrders} total orders</p>
             <Separator className="bg-primary-200 mb-4" />
             <div className="flex items-center gap-2 text-sm text-primary-800">
               <ShoppingBag className="w-4 h-4" /> 
               Avg. Order: {formatCurrency(customer.totalSpent / (customer.totalOrders || 1))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
        <OrderList orders={customer.orders} />
      </div>
    </div>
  );
}