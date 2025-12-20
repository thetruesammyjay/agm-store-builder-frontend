"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountSchema, type BankAccountFormData } from "@/lib/validators";
import { useVerifyBankAccount, useAddBankAccount } from "@/hooks/usePayment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NIGERIAN_BANKS } from "@/lib/constants";
import { BankVerification } from "./BankVerification";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/useToast";

interface BankAccountFormProps {
  onSuccess?: (data: any) => void;
}

export function BankAccountForm({ onSuccess }: BankAccountFormProps) {
  const [verifiedAccount, setVerifiedAccount] = useState<{
    accountNumber: string;
    accountName: string;
    bankCode: string;
  } | null>(null);

  const { mutate: verifyAccount, isPending: isVerifying } = useVerifyBankAccount();
  const { mutate: addBank, isPending: isAdding } = useAddBankAccount();

  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountNumber: "",
      bankCode: "",
    },
  });

  const selectedBankCode = form.watch("bankCode");
  const accountNumber = form.watch("accountNumber");

  // Get selected bank name
  const selectedBank = NIGERIAN_BANKS.find(bank => bank.code === selectedBankCode);

  const handleVerify = () => {
    const { accountNumber, bankCode } = form.getValues();

    if (accountNumber.length !== 10) {
      form.setError("accountNumber", { 
        message: "Account number must be 10 digits" 
      });
      return;
    }

    if (!bankCode) {
      form.setError("bankCode", { 
        message: "Please select a bank" 
      });
      return;
    }

    verifyAccount(
      { accountNumber, bankCode },
      {
        onSuccess: (data) => {
          setVerifiedAccount({
            accountNumber: data.accountNumber,
            accountName: data.accountName,
            bankCode: data.bankCode,
          });
          toast.success("Account verified successfully");
        },
        onError: (error: any) => {
          setVerifiedAccount(null);
          const errorMessage = error.response?.data?.error?.message || 
                              "Could not verify account. Please check details.";
          form.setError("accountNumber", { message: errorMessage });
          toast.error("Verification failed", errorMessage);
        },
      }
    );
  };

  const onSubmit = (data: BankAccountFormData) => {
    if (!verifiedAccount) {
      toast.error("Please verify account", "You must verify your account before adding it");
      return;
    }

    addBank(
      {
        accountNumber: verifiedAccount.accountNumber,
        accountName: verifiedAccount.accountName,
        bankCode: verifiedAccount.bankCode,
        bankName: selectedBank?.name || "",
      },
      {
        onSuccess: (response) => {
          toast.success("Bank account added successfully");
          form.reset();
          setVerifiedAccount(null);
          onSuccess?.(response);
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.error?.message || 
                              "Failed to add bank account";
          toast.error("Failed to add account", errorMessage);
        },
      }
    );
  };

  // Reset verification when account number or bank changes
  const handleAccountNumberChange = (value: string) => {
    form.setValue("accountNumber", value);
    setVerifiedAccount(null);
  };

  const handleBankChange = (value: string) => {
    form.setValue("bankCode", value);
    setVerifiedAccount(null);
  };

  const canVerify = accountNumber.length === 10 && selectedBankCode && !isVerifying;
  const canSubmit = verifiedAccount !== null && !isAdding;

  return (
    <Form {...form}>
      <form 
        id="bank-form" 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="bankCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Bank *</FormLabel>
              <Select 
                onValueChange={handleBankChange}
                value={field.value}
                disabled={isVerifying || isAdding}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {NIGERIAN_BANKS.map((bank) => (
                    <SelectItem key={bank.code} value={bank.code}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number *</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="0123456789" 
                    maxLength={10}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={field.value}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      handleAccountNumberChange(value);
                    }}
                    disabled={isVerifying || isAdding}
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleVerify}
                  disabled={!canVerify}
                  className="min-w-[100px]"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <BankVerification 
          accountName={verifiedAccount?.accountName || null}
          isLoading={isVerifying}
        />

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            disabled={!canSubmit}
            className="flex-1"
          >
            {isAdding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Account...
              </>
            ) : (
              "Add Bank Account"
            )}
          </Button>
        </div>

        {!verifiedAccount && accountNumber.length === 10 && selectedBankCode && (
          <p className="text-sm text-muted-foreground text-center">
            Click "Verify" to confirm your account details
          </p>
        )}
      </form>
    </Form>
  );
}