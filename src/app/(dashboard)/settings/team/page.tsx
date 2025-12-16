"use client";

import { TeamSettings } from "@/components/settings/TeamSettings";
import { BackButton } from "@/components/shared/BackButton";

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/settings" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Team Members</h1>
            <p className="text-sm text-gray-500">Manage access to your store dashboard.</p>
        </div>
      </div>

      <TeamSettings />
    </div>
  );
}