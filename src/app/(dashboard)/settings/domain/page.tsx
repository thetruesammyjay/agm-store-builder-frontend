"use client";

import { DomainSettings } from "@/components/settings/DomainSettings";
import { useAuthStore } from "@/store/authStore";
import { BackButton } from "@/components/shared/BackButton";

export default function DomainSettingsPage() {
  const { user } = useAuthStore();
  const storeUsername = user?.email?.split('@')[0] || "demo";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/settings" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Domain Name</h1>
            <p className="text-sm text-gray-500">Configure your store URL and custom domains.</p>
        </div>
      </div>

      <DomainSettings storeUsername={storeUsername} />
    </div>
  );
}