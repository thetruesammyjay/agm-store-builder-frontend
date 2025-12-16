"use client";

import { useAdminPayouts, usePayoutAction, type PayoutRequest } from "@/hooks/useAdmin";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";

export default function AdminPayoutsPage() {
  const { data: payouts = [], isLoading } = useAdminPayouts();
  const { mutate: processPayout, isPending } = usePayoutAction();

  // We define the column structure strictly to satisfy the DataTable requirements
  const columns = [
    {
      header: "User",
      accessorKey: "user" as keyof PayoutRequest,
      cell: (row: PayoutRequest) => (
        <div>
          <p className="font-medium text-gray-900">{row.user.name}</p>
          <p className="text-xs text-gray-500">{row.user.email}</p>
        </div>
      )
    },
    {
      header: "Amount",
      accessorKey: "amount" as keyof PayoutRequest,
      cell: (row: PayoutRequest) => <span className="font-bold">{formatCurrency(row.amount)}</span>
    },
    {
      header: "Bank Details",
      // No accessorKey needed here since we use cell for composite rendering
      cell: (row: PayoutRequest) => (
        <div className="text-sm">
          <p className="font-medium">{row.bank.name}</p>
          <p className="text-gray-500 font-mono">{row.bank.account}</p>
        </div>
      )
    },
    {
      header: "Date Requested",
      accessorKey: "date" as keyof PayoutRequest,
      cell: (row: PayoutRequest) => formatDate(row.date)
    },
    {
      header: "Actions",
      cell: (row: PayoutRequest) => (
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 h-8"
            onClick={() => processPayout({ payoutId: row.id, action: 'approve' })}
            disabled={isPending}
          >
            <Check className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50 h-8"
            onClick={() => processPayout({ payoutId: row.id, action: 'reject' })}
            disabled={isPending}
          >
            <X className="w-4 h-4 mr-1" /> Reject
          </Button>
        </div>
      )
    }
  ];

  // Cast columns to any to bypass the specific Column type export issue from DataTable
  // In a perfect world, we would export Column<T> from DataTable.tsx
  const tableColumns = columns as any;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payout Requests</h1>
      <p className="text-gray-500">Review and approve withdrawal requests from sellers.</p>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
        <DataTable 
          data={payouts} 
          columns={tableColumns} 
          isLoading={isLoading} 
          emptyMessage="No pending payouts found."
        />
      </div>
    </div>
  );
}