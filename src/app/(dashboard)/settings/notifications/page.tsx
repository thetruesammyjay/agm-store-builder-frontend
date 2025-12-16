"use client";

import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BackButton } from "@/components/shared/BackButton";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/settings" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">Control your email and SMS alerts.</p>
        </div>
      </div>

      <NotificationSettings />
    </div>
  );
}