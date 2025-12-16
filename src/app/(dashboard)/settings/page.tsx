"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoreSettingsForm } from "@/components/settings/StoreSettingsForm";
import { BrandingSettings } from "@/components/settings/BrandingSettings";
import { PaymentSettings } from "@/components/settings/PaymentSettings";
import { DomainSettings } from "@/components/settings/DomainSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { TeamSettings } from "@/components/settings/TeamSettings";
import { DangerZone } from "@/components/settings/DangerZone";
import { useAuthStore } from "@/store/authStore";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const storeUsername = user?.email?.split('@')[0] || "demo"; // Placeholder logic

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your store preferences and account.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap gap-2 bg-transparent p-0">
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-gray-200">General</TabsTrigger>
          <TabsTrigger value="branding" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-gray-200">Branding</TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-gray-200">Payments</TabsTrigger>
          <TabsTrigger value="domains" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-gray-200">Domains</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-gray-200">Notifications</TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-white data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-gray-200">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <StoreSettingsForm storeUsername={storeUsername} />
          <BillingSettings />
          <TeamSettings />
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <BrandingSettings storeUsername={storeUsername} />
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <PaymentSettings />
        </TabsContent>

        <TabsContent value="domains" className="space-y-6">
          <DomainSettings storeUsername={storeUsername} />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <ProfileSettings />
          <SecuritySettings />
          <DangerZone />
        </TabsContent>
      </Tabs>
    </div>
  );
}