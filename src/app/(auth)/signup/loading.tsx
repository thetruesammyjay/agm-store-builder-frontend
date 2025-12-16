import { Skeleton } from "@/components/ui/skeleton";

export default function SignupLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
           <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex justify-center">
           <Skeleton className="h-4 w-56" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Simulating the 5 input fields */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}

        <Skeleton className="h-11 w-full bg-primary/10 mt-6" />
      </div>

      <div className="flex justify-center mt-4">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}