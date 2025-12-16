"use client";

import { useRouter } from "next/navigation";
import { QuickProductForm, type QuickProductFormData } from "@/components/onboarding/QuickProductForm";
import { WizardNav } from "@/components/onboarding/WizardNav";
import { toast } from "@/store/notificationStore";
import { useEffect, useState } from "react";

export default function Step4Products() {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<Partial<QuickProductFormData>>({});

  useEffect(() => {
    const savedProduct = sessionStorage.getItem("onboarding_product");
    if (savedProduct) {
      setDefaultValues(JSON.parse(savedProduct));
    }
  }, []);

  const handleNext = (data?: QuickProductFormData) => {
    if (data) {
      sessionStorage.setItem("onboarding_product", JSON.stringify(data));
      toast.success("Product saved", "We'll add this to your store shortly.");
    }
    router.push("/onboarding/step-5-payment");
  };

  const handleSkip = () => {
    sessionStorage.removeItem("onboarding_product"); // Clear if skipped
    router.push("/onboarding/step-5-payment");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add your first product</h1>
        <p className="text-gray-500">
          Create a product to start selling immediately. This step is optional.
        </p>
      </div>

      <div className="pt-4">
        <QuickProductForm 
          onSubmit={handleNext} 
          defaultValues={defaultValues}
        />
      </div>

      <WizardNav 
        // We trigger the form submit externally via the form ID "quick-product-form"
        onNext={() => {
           const form = document.getElementById("quick-product-form") as HTMLFormElement;
           if (form) form.requestSubmit();
        }}
        onBack={() => router.push("/onboarding/step-3-customize")}
        showSkip
        onSkip={handleSkip}
        nextLabel="Save & Continue"
      />
    </div>
  );
}