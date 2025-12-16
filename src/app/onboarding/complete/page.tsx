"use client";

import { useSearchParams } from "next/navigation";
import { OnboardingSuccess } from "@/components/onboarding/OnboardingSuccess";
import { Suspense } from "react";

function CompleteContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "your-store.shopwithagm.com";

  return <OnboardingSuccess storeUrl={url} />;
}

export default function OnboardingCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteContent />
    </Suspense>
  );
}