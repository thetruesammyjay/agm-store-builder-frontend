"use client";

import { Copy, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { formatCurrency, formatTimeRemaining } from "@/lib/format";
import { Progress } from "@/components/ui/progress";

interface PaymentInstructionsProps {
  payment: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    amount: number;
    expiresAt: string;
    reference: string;
  };
}

export function PaymentInstructions({ payment }: PaymentInstructionsProps) {
  const { copy, copied } = useCopyToClipboard();

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-green-800">Awaiting Payment</CardTitle>
          <CardDescription>
            Please make a transfer to the account details below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Bank Name</p>
              <p className="font-semibold text-gray-900">{payment.bankName}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Account Number</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-mono font-bold tracking-wider text-gray-900">
                  {payment.accountNumber}
                </p>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copy(payment.accountNumber)}
                  className="h-8 text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Account Name</p>
              <p className="font-medium text-gray-900 truncate">{payment.accountName}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Expires in</span>
              <span>30:00</span>
            </div>
            <Progress value={100} className="h-1" />
            <p className="text-xs text-center text-gray-500 pt-2">
              Payment is automatically confirmed once received.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}