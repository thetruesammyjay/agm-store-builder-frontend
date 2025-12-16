import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProductDetailsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32 mb-4" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
           <Skeleton className="h-8 w-64" />
           <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
            <CardContent className="space-y-6">
               <div className="flex gap-6">
                 <Skeleton className="h-32 w-32 rounded-lg" />
                 <div className="flex-1 space-y-2">
                   <Skeleton className="h-4 w-24" />
                   <Skeleton className="h-20 w-full" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <Card>
             <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
             <CardContent className="space-y-4">
               <Skeleton className="h-16 w-full" />
               <Skeleton className="h-16 w-full" />
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}