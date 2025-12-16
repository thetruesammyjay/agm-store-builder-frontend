import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
           <Skeleton className="h-10 w-32" />
           <Skeleton className="h-10 w-32" />
        </div>
      </div>
      
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm space-y-2">
            <div className="flex justify-between">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        {/* Chart Area */}
        <div className="col-span-1 lg:col-span-4 p-6 rounded-xl border border-gray-100 bg-white shadow-sm">
           <div className="flex justify-between mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
           </div>
           <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Recent Orders/List Area */}
        <div className="col-span-1 lg:col-span-3 p-6 rounded-xl border border-gray-100 bg-white shadow-sm">
           <div className="flex justify-between mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-16" />
           </div>
           <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                         <Skeleton className="h-4 w-32" />
                         <Skeleton className="h-3 w-20" />
                      </div>
                   </div>
                   <Skeleton className="h-4 w-16" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}