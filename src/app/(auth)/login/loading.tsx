import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
           <Skeleton className="h-8 w-32" />
        </div>
        <div className="flex justify-center">
           <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-full" />
        </div>

        <Skeleton className="h-11 w-full bg-primary/10" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}