"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ColorPicker } from "@/components/onboarding/ColorPicker";
import { LogoUpload } from "@/components/onboarding/LogoUpload";
import { WizardNav } from "@/components/onboarding/WizardNav";
import { toast } from "@/store/notificationStore";

export default function Step3Customize() {
  const router = useRouter();
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [logoUrl, setLogoUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedBranding = sessionStorage.getItem("onboarding_branding");
    if (savedBranding) {
      const parsed = JSON.parse(savedBranding);
      setPrimaryColor(parsed.primaryColor || "#3b82f6");
      setLogoUrl(parsed.logoUrl || "");
    }
    setIsLoaded(true);
  }, []);

  const handleNext = () => {
    sessionStorage.setItem("onboarding_branding", JSON.stringify({
      primaryColor,
      logoUrl
    }));
    router.push("/onboarding/step-4-products");
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add your branding</h1>
        <p className="text-gray-500">
          Make your store stand out. You can change these later in settings.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <label className="text-base font-semibold block text-gray-900">Store Logo</label>
          <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
            <LogoUpload value={logoUrl} onChange={setLogoUrl} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-base font-semibold block text-gray-900">Brand Color</label>
          <ColorPicker value={primaryColor} onChange={setPrimaryColor} />
        </div>
      </div>

      <WizardNav 
        onNext={handleNext}
        onBack={() => router.push("/onboarding/step-2-template")}
      />
    </div>
  );
}