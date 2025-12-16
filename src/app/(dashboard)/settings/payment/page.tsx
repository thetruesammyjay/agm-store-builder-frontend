"use client";

import { PaymentSettings } from "@/components/settings/PaymentSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { BackButton } from "@/components/shared/BackButton";

export default function PaymentSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton href="/dashboard/settings" />
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Billing & Payments</h1>
            <p className="text-sm text-gray-500">Manage payouts and subscription plans.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <PaymentSettings />
        <BillingSettings />
      </div>
    </div>
  );
}