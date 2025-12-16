import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading...
      </p>
    </div>
  );
}