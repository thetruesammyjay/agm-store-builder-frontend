"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

// FIX: Use ComponentProps to infer props directly from the Button component
interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  textToCopy: string;
  iconOnly?: boolean;
}

export function CopyButton({ textToCopy, iconOnly, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Button
      variant="ghost"
      size={iconOnly ? "icon" : "sm"}
      className={cn("h-8", className)}
      onClick={handleCopy}
      {...props}
    >
      {hasCopied ? (
        <>
          <Check className={cn("h-4 w-4 text-green-500", !iconOnly && "mr-2")} />
          {!iconOnly && "Copied"}
        </>
      ) : (
        <>
          <Copy className={cn("h-4 w-4", !iconOnly && "mr-2")} />
          {!iconOnly && "Copy"}
        </>
      )}
    </Button>
  );
}