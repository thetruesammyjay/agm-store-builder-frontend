import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export function Logo({ className, width = 120, height = 32, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-bold text-xl", className)}>
      <div className="relative" style={{ width, height }}>
        <Image 
          src="/logo.svg" 
          alt="AGM Store Builder" 
          fill 
          className="object-contain object-left"
          priority
        />
      </div>
      {showText && <span className="sr-only">AGM Store Builder</span>}
    </Link>
  );
}