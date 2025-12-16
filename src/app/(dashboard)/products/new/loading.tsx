import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function NewProductLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Details Skeleton */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Pricing Skeleton */}
          <Card>
            <CardContent className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar Skeleton (Images) */}
        <div className="space-y-8">
          <Card>
             <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="grid grid-cols-3 gap-2">
                   <Skeleton className="aspect-square w-full rounded-md" />
                   <Skeleton className="aspect-square w-full rounded-md" />
                   <Skeleton className="aspect-square w-full rounded-md" />
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}