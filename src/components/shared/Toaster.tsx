"use client";

import { useNotificationStore } from "@/store/notificationStore";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts, removeToast } = useNotificationStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-100 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-right-full bg-white",
            toast.type === 'error' && "border-red-200 bg-red-50",
            toast.type === 'success' && "border-green-200 bg-green-50",
            toast.type === 'warning' && "border-yellow-200 bg-yellow-50",
            toast.type === 'info' && "border-blue-200 bg-blue-50",
          )}
        >
          <div className="shrink-0 pt-0.5">
             {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
             {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
             {toast.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
             {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
          </div>
          
          <div className="flex-1">
            <h3 className={cn("text-sm font-semibold", 
               toast.type === 'error' ? "text-red-900" : "text-gray-900"
            )}>
              {toast.title}
            </h3>
            {toast.description && (
              <p className={cn("text-sm mt-1",
                 toast.type === 'error' ? "text-red-700" : "text-gray-500"
              )}>
                {toast.description}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 rounded-md p-1 opacity-50 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      ))}
    </div>
  );
}