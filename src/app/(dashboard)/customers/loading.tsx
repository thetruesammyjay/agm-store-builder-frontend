import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomersLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b">
             <Skeleton className="h-10 w-full md:w-64" />
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1">
                   <Skeleton className="h-4 w-32" />
                   <Skeleton className="h-3 w-40" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 hidden sm:block" />
              <Skeleton className="h-4 w-16 text-right" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}