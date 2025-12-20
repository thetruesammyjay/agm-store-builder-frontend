"use client";

import { useState, useEffect } from "react";
import { useStore, useUpdateStore } from "@/hooks/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoUpload } from "@/components/onboarding/LogoUpload";
import { ColorPicker } from "@/components/onboarding/ColorPicker";
import { FontSelector } from "@/components/onboarding/FontSelector";
import { Loader2 } from "lucide-react";
import { toast } from "@/store/notificationStore";

interface BrandingSettingsProps {
  storeUsername: string;
}

export function BrandingSettings({ storeUsername }: BrandingSettingsProps) {
  const { data: store, isLoading } = useStore(storeUsername);
  const { mutate: updateStore, isPending } = useUpdateStore(store?.id || "");

  // Local state for UI interactivity before save
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [font, setFont] = useState("inter");

  useEffect(() => {
    if (store) {
      setLogoUrl(store.logoUrl || "");
      setPrimaryColor(store.customColors?.primary || "#3b82f6");
      setFont(store.customFonts?.body || "inter");
    }
  }, [store]);

  const handleSave = () => {
    updateStore({
      logoUrl,
      customColors: {
        primary: primaryColor,
        // Preserve existing or default
        secondary: store?.customColors?.secondary || "#ffffff",
        accent: store?.customColors?.accent || "#eab308",
      },
      customFonts: {
        heading: font,
        body: font,
      }
    }, {
      onSuccess: () => toast.success("Branding updated", "Your store look has been updated."),
      onError: (err: any) => toast.error("Update failed", err.message),
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand & Appearance</CardTitle>
        <CardDescription>
          Customize how your store looks to your customers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-medium">Store Logo</label>
          <LogoUpload value={logoUrl} onChange={setLogoUrl} />
        </div>

        <div className="space-y-3">
          <ColorPicker value={primaryColor} onChange={setPrimaryColor} />
        </div>

        <div className="space-y-3 max-w-sm">
          <FontSelector value={font} onChange={setFont} />
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Branding
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}