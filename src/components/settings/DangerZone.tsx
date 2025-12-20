"use client";

import { useMutation } from "@tanstack/react-query";
import { del } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "@/store/notificationStore";

interface DangerZoneProps {
  storeId?: string; // Optional if we delete the user account instead
}

export function DangerZone({ storeId }: DangerZoneProps) {
  const router = useRouter();

  const { mutate: deleteStore, isPending } = useMutation({
    mutationFn: async () => {
      // If storeId is provided, delete specific store. Else delete account.
      const endpoint = storeId ? `/stores/${storeId}` : '/auth/account';
      await del(endpoint);
    },
    onSuccess: () => {
      toast.success("Store deleted", "Your store has been permanently deleted.");
      router.push("/dashboard"); // Or login/home if account deletion
    },
    onError: (error: any) => {
      toast.error("Error", error.message || "Failed to delete store.");
    },
  });

  return (
    <Card className="border-red-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-red-600">Danger Zone</CardTitle>
        <CardDescription>
          Irreversible actions. Proceed with caution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-red-100 rounded-lg bg-red-50 gap-4">
          <div>
            <h4 className="font-semibold text-red-900">Delete Store</h4>
            <p className="text-sm text-red-700 mt-1">
              Permanently delete this store and all associated products, orders, and customer data.
            </p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="shrink-0 bg-red-600 hover:bg-red-700 border-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Store
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your store
                  and remove all data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={(e) => {
                    e.preventDefault();
                    deleteStore();
                  }}
                  disabled={isPending}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Yes, delete my store
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}