import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessMessageProps {
  message?: string | null;
  className?: string;
}

export function SuccessMessage({ message, className }: SuccessMessageProps) {
  if (!message) return null;

  return (
    <div className={cn("flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-100", className)}>
      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}