import { Container } from "@/components/shared/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <Container className="py-8 md:py-12">
      <Skeleton className="h-8 w-32 mb-6" />
      
      <div className="flex items-center gap-2 mb-8 pb-4 border-b">
        <Skeleton className="h-10 w-48" />
        <div className="flex-1" />
        <Skeleton className="h-4 w-32 hidden sm:block" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-6">
             <Skeleton className="h-8 w-1/3" />
             <div className="space-y-4">
               <Skeleton className="h-12 w-full" />
               <div className="grid grid-cols-2 gap-4">
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
               </div>
             </div>
             <Skeleton className="h-12 w-full mt-8" />
          </div>
        </div>
        
        <div className="lg:col-span-1 order-1 lg:order-2">
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </div>
    </Container>
  );
}