import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
           <Skeleton className="h-10 w-64" />
           <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
            <div className="flex justify-between">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Large Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 h-[400px] rounded-xl border border-gray-200 bg-white p-6">
           <Skeleton className="h-6 w-48 mb-6" />
           <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="col-span-3 h-[400px] rounded-xl border border-gray-200 bg-white p-6">
           <Skeleton className="h-6 w-48 mb-6" />
           <Skeleton className="h-[300px] w-full" />
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-3 h-[350px] rounded-xl border border-gray-200 bg-white p-6">
           <Skeleton className="h-6 w-32 mb-6" />
           <Skeleton className="h-[250px] w-full rounded-full" />
        </div>
        <div className="col-span-4 h-[350px] rounded-xl border border-gray-200 bg-white p-6">
           <Skeleton className="h-6 w-48 mb-6" />
           <Skeleton className="h-[250px] w-full" />
        </div>
      </div>
    </div>
  );
}