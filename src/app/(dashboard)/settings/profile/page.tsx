"use client";

import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { DangerZone } from "@/components/settings/DangerZone";
import { BackButton } from "@/components/shared/BackButton";

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/settings" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Profile & Security</h1>
            <p className="text-sm text-gray-500">Manage your personal account details.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <ProfileSettings />
        <SecuritySettings />
        <DangerZone />
      </div>
    </div>
  );
}