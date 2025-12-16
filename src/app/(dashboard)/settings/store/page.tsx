"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StoreSettingsForm } from "@/components/settings/StoreSettingsForm";
import { BrandingSettings } from "@/components/settings/BrandingSettings";
import { BackButton } from "@/components/shared/BackButton";
import { useMyStores } from "@/hooks/useStore";
import { Loader2 } from "lucide-react";

export default function StoreSettingsPage() {
  const router = useRouter();
  
  // Fetch real stores associated with the authenticated user
  const { data: stores, isLoading } = useMyStores();
  
  // For the MVP (Single Store), we select the first store found.
  // In a multi-store architecture, this would come from a selectedStoreId in context/URL.
  const activeStore = stores?.[0];

  useEffect(() => {
    if (!isLoading && !activeStore) {
        // If data loaded but no store exists, user shouldn't be here
        // Optional: Redirect to onboarding or show empty state
    }
  }, [isLoading, activeStore, router]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!activeStore) {
      return (
          <div className="space-y-6">
              <div className="flex items-center gap-4">
                  <BackButton href="/dashboard/settings" />
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">Store Configuration</h1>
              </div>
              <div className="p-12 text-center border rounded-lg bg-gray-50 border-dashed">
                  <p className="text-gray-500">No active store found associated with your account.</p>
              </div>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/settings" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Store Configuration</h1>
            <p className="text-sm text-gray-500">Update your store details and branding.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* General Store Information (Name, Description) */}
        <StoreSettingsForm storeUsername={activeStore.username} />
        
        {/* Visual Identity (Logo, Colors, Fonts) */}
        <BrandingSettings storeUsername={activeStore.username} />
      </div>
    </div>
  );
}