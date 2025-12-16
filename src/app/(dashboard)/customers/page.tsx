"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/dashboard/customers");
        setCustomers(res.data.data);
      } catch (error) {
        console.error("Failed to load customers", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const columns = [
    {
      header: "Customer",
      cell: (row: Customer) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-gray-200">
            <AvatarFallback className="bg-primary-50 text-primary-700 font-medium">
              {row.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Phone",
      accessorKey: "phone" as keyof Customer
    },
    {
      header: "Orders",
      accessorKey: "totalOrders" as keyof Customer,
      className: "text-center"
    },
    {
      header: "Total Spent",
      accessorKey: "totalSpent" as keyof Customer,
      cell: (row: Customer) => formatCurrency(row.totalSpent),
      className: "text-right"
    },
    {
      header: "Last Order",
      accessorKey: "lastOrderDate" as keyof Customer,
      cell: (row: Customer) => formatDate(row.lastOrderDate),
      className: "text-right text-gray-500"
    }
  ];

  const tableColumns = columns as any;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500">View and manage your customer base.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
        <DataTable 
          data={customers} 
          columns={tableColumns} 
          isLoading={isLoading} 
          emptyMessage="No customers found yet."
        />
      </div>
    </div>
  );
}