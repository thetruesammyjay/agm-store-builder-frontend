import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Card>
        <CardHeader className="p-4 border-b">
           <div className="flex gap-4">
             <Skeleton className="h-10 w-full md:w-64" />
             <div className="flex gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
             </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border-b flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-32 hidden md:block" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-16 text-right" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}