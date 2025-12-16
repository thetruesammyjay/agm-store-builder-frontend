import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <Skeleton className="h-10 w-full md:w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Product List Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="border-b bg-gray-50/50 p-4 flex gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
        
        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b last:border-0 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-24 text-right" />
            <Skeleton className="h-8 w-8 rounded-md ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}