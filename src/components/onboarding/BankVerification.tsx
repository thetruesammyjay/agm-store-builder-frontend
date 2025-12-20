import { CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface BankVerificationProps {
  accountName: string | null;
  isLoading: boolean;
}

export function BankVerification({ accountName, isLoading }: BankVerificationProps) {
  if (isLoading) {
    return <Skeleton className="h-16 w-full rounded-lg" />;
  }

  if (!accountName) return null;

  return (
    <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
      </div>
      <div>
        <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Account Verified</p>
        <p className="font-bold text-green-900 text-lg">{accountName}</p>
      </div>
    </div>
  );
}