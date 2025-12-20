import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "default" | "lg" | "xl" | "full";
}

export function Container({ children, className, size = "default", ...props }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    default: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <div 
      className={cn("mx-auto px-4 md:px-6 w-full", sizeClasses[size], className)} 
      {...props}
    >
      {children}
    </div>
  );
}