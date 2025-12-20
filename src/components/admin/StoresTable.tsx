"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Ban, 
  CheckCircle, 
  ExternalLink,
  Eye,
  AlertTriangle,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { formatCurrency, formatDate } from "@/lib/format";
import { useStoreAction, type AdminStoreList } from "@/hooks/useAdmin";

interface StoresTableProps {
  data: AdminStoreList[];
  isLoading: boolean;
}

export function StoresTable({ data, isLoading }: StoresTableProps) {
  const { mutate: performAction, isPending } = useStoreAction();
  
  // State for the confirmation dialog
  const [selectedStore, setSelectedStore] = useState<AdminStoreList | null>(null);
  const [actionType, setActionType] = useState<'suspend' | 'activate' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleActionClick = (store: AdminStoreList, type: 'suspend' | 'activate') => {
    setSelectedStore(store);
    setActionType(type);
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (selectedStore && actionType) {
      performAction({ storeId: selectedStore.id, action: actionType });
      setIsDialogOpen(false);
    }
  };

  const columns = [
    {
      header: "Store",
      accessorKey: "name" as keyof AdminStoreList,
      cell: (store: AdminStoreList) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{store.name}</span>
          <a 
            href={`https://${store.username}.shopwithagm.com`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
          >
            {store.username} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )
    },
    {
      header: "Owner",
      accessorKey: "ownerEmail" as keyof AdminStoreList,
      cell: (store: AdminStoreList) => (
        <div className="text-sm text-gray-600">{store.ownerEmail}</div>
      )
    },
    {
      header: "Revenue",
      accessorKey: "revenue" as keyof AdminStoreList,
      cell: (store: AdminStoreList) => (
        <span className="font-mono font-medium">{formatCurrency(store.revenue)}</span>
      )
    },
    {
      header: "Created",
      accessorKey: "createdAt" as keyof AdminStoreList,
      cell: (store: AdminStoreList) => (
        <span className="text-sm text-gray-500">{formatDate(store.createdAt)}</span>
      )
    },
    {
      header: "Status",
      accessorKey: "status" as keyof AdminStoreList,
      cell: (store: AdminStoreList) => {
        const isSuspended = store.status === 'suspended';
        return (
          <Badge 
            variant={isSuspended ? 'destructive' : 'default'} 
            className={isSuspended ? 'bg-red-100 text-red-700 hover:bg-red-100' : 'bg-green-100 text-green-700 hover:bg-green-100'}
          >
            {isSuspended ? (
              <span className="flex items-center gap-1"><Ban className="w-3 h-3" /> Suspended</span>
            ) : (
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>
            )}
          </Badge>
        );
      }
    },
    {
      header: "Actions",
      cell: (store: AdminStoreList) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Manage Store</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            {store.status === 'active' ? (
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                onClick={() => handleActionClick(store, 'suspend')}
              >
                <Ban className="mr-2 h-4 w-4" /> Suspend Store
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem 
                className="text-green-600 focus:text-green-600 focus:bg-green-50 cursor-pointer"
                onClick={() => handleActionClick(store, 'activate')}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Activate Store
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  // Cast columns to any to bypass strict type checking of DataTable if necessary
  const tableColumns = columns as any;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <DataTable 
          data={data} 
          columns={tableColumns} 
          isLoading={isLoading}
          emptyMessage="No stores found in the system."
        />
      </div>

      {selectedStore && (
        <ConfirmDialog
           // Since ConfirmDialog usually wraps a trigger, but here we control via state,
           // we render it conditionally. If your ConfirmDialog handles 'open' prop, use that.
           // Assuming a standard implementation pattern:
           trigger={<></>} 
           title={actionType === 'suspend' ? "Suspend Store Access" : "Reactivate Store"}
           description={
             actionType === 'suspend' 
               ? `Are you sure you want to suspend "${selectedStore.name}"? This will immediately take their store offline and prevent login.`
               : `Are you sure you want to reactivate "${selectedStore.name}"? The store will be publicly visible again.`
           }
           onConfirm={confirmAction}
           variant={actionType === 'suspend' ? 'destructive' : 'default'}
           confirmLabel={actionType === 'suspend' ? "Yes, Suspend Store" : "Yes, Activate Store"}
           isPending={isPending}
           // IMPORTANT: If your ConfirmDialog doesn't support 'open' prop, 
           // you might need to use a standard AlertDialog directly here.
           // Below implies standard Radix/Shadcn dialog behavior where mounting it triggers open if no trigger is clicked.
           // However, safer to use the state to mount/unmount the component entirely.
        />
      )}
      
      {/* NOTE: If ConfirmDialog doesn't support controlled state 'open', 
        use the standard AlertDialog components directly here for better control 
      */}
      {isDialogOpen && selectedStore && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4 m-4">
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${actionType === 'suspend' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {actionType === 'suspend' ? <AlertTriangle className="h-6 w-6" /> : <CheckCircle className="h-6 w-6" />}
                  </div>
                  <h3 className="text-lg font-bold">
                    {actionType === 'suspend' ? 'Suspend Store?' : 'Activate Store?'}
                  </h3>
               </div>
               <p className="text-gray-500 text-sm">
                  {actionType === 'suspend' 
                   ? `Are you sure you want to suspend "${selectedStore.name}"? This will immediately take their store offline.`
                   : `Are you sure you want to reactivate "${selectedStore.name}"?`}
               </p>
               <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isPending}>
                    Cancel
                  </Button>
                  <Button 
                    variant={actionType === 'suspend' ? 'destructive' : 'default'}
                    onClick={confirmAction}
                    disabled={isPending}
                    className={actionType === 'activate' ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {actionType === 'suspend' ? 'Suspend' : 'Activate'}
                  </Button>
               </div>
            </div>
         </div>
      )}
    </>
  );
}