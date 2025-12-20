"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
  disabled?: boolean;
}

export function OTPInput({ 
  value, 
  onChange, 
  length = 6, 
  className,
  disabled 
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Initialize array for inputs
  const inputs = Array.from({ length }, (_, i) => i);

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    // Allow only numbers
    if (!/^\d*$/.test(val)) return;

    const newValue = value.split("");
    
    // Handle paste or single char
    if (val.length > 1) {
      const pastedChars = val.slice(0, length).split("");
      onChange(pastedChars.join(""));
      focusInput(Math.min(pastedChars.length, length - 1));
      return;
    }

    newValue[index] = val;
    const finalValue = newValue.join("").slice(0, length);
    onChange(finalValue);

    // Auto advance
    if (val && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        // Move back if current empty
        focusInput(index - 1);
      }
    }
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {inputs.map((index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-bold p-0 focus-visible:ring-primary-500"
        />
      ))}
    </div>
  );
}