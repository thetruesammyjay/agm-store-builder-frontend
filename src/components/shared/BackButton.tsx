"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  className?: string;
  href?: string; // Optional override
}

export function BackButton({ label = "Back", className, href }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleBack} 
      className={cn("pl-0 hover:bg-transparent hover:text-primary-600 text-gray-500", className)}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}