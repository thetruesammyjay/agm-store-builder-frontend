"use client";

import { useState } from "react";
import { useBankAccounts } from "@/hooks/usePayment";
import { BankAccountForm } from "@/components/onboarding/BankAccountForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building2, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { toast } from "@/store/notificationStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Fetch real data from API
  const { data: accounts = [], isLoading, isError } = useBankAccounts();

  const handleSuccess = () => {
    setIsDialogOpen(false);
    toast.success("Bank account added successfully");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payout Accounts</CardTitle>
          <CardDescription>Loading your accounts...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-red-500">
          Failed to load bank accounts. Please refresh the page.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Payout Accounts</CardTitle>
          <CardDescription>
            Manage the bank accounts where you receive your earnings.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              <BankAccountForm onSuccess={handleSuccess} />
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {accounts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
            <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No bank accounts added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded border">
                    <Building2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{account.bankName}</p>
                    <p className="text-sm text-gray-500 font-mono tracking-wide">
                      {account.accountNumber}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{account.accountName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {account.isVerified ? (
                    <div className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </div>
                  ) : (
                    <div className="flex items-center text-xs font-medium text-yellow-600 bg-yellow-50 px-2.5 py-0.5 rounded-full">
                      Pending
                    </div>
                  )}
                  
                  {/* Optional: Add delete button here in future */}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}