"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useCheckUsername } from "@/hooks/useStore"; 
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface UsernameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function UsernameInput({ value, onChange, error: externalError }: UsernameInputProps) {
  const debouncedValue = useDebounce(value, 500);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  
  // React Query hook for checking username
  const { data: availabilityData, refetch } = useCheckUsername(debouncedValue);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 3) {
      setIsChecking(true);
      refetch().then(() => setIsChecking(false));
    } else {
      setIsAvailable(null);
    }
  }, [debouncedValue, refetch]);

  useEffect(() => {
    if (availabilityData !== undefined) {
      setIsAvailable(availabilityData);
    }
  }, [availabilityData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize input: lowercase, alphanumeric and hyphens only
    const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    onChange(sanitized);
    setIsAvailable(null); // Reset status while typing
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Choose your store URL</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 bg-gray-50 border-r rounded-l-md text-sm">
            shopwithagm.com/store/
          </div>
          <Input
            id="username"
            value={value}
            onChange={handleChange}
            className={cn(
              "pl-[185px] pr-10 h-12 font-medium",
              isAvailable === true && "border-green-500 focus-visible:ring-green-500",
              (isAvailable === false || externalError) && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="my-brand"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isChecking && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
            {!isChecking && isAvailable === true && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {!isChecking && isAvailable === false && <XCircle className="h-5 w-5 text-red-500" />}
          </div>
        </div>
      </div>

      {/* FIXED: Use min-h-5 instead of min-h-[20px] */}
      <div className="min-h-5 text-sm">
        {isChecking ? (
          <span className="text-gray-500">Checking availability...</span>
        ) : isAvailable === true ? (
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> {value} is available!
          </span>
        ) : isAvailable === false ? (
          <span className="text-red-600">Username is already taken</span>
        ) : externalError ? (
          <span className="text-red-600">{externalError}</span>
        ) : (
          <span className="text-gray-500">
            Use 3-30 characters. Letters, numbers, and hyphens only.
          </span>
        )}
      </div>
    </div>
  );
}