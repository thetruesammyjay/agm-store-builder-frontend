import { Container } from "@/components/shared/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreLoading() {
  return (
    <div className="min-h-screen pb-20">
      {/* Banner Skeleton */}
      <Skeleton className="w-full h-48 md:h-64 lg:h-80" />
      
      <Container className="mt-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full md:w-64" />
        </div>

        <div className="flex gap-2 overflow-hidden">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}