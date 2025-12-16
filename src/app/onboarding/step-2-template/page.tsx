"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TemplateSelector } from "@/components/onboarding/TemplateSelector";
import { WizardNav } from "@/components/onboarding/WizardNav";

export default function Step2Template() {
  const router = useRouter();
  const [template, setTemplate] = useState("products");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTemplate = sessionStorage.getItem("onboarding_template");
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
    setIsLoaded(true);
  }, []);

  const handleNext = () => {
    sessionStorage.setItem("onboarding_template", template);
    router.push("/onboarding/step-3-customize");
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Choose a template</h1>
        <p className="text-gray-500">
          Select a starting point that best fits your business model.
        </p>
      </div>

      <div className="pt-4">
        <TemplateSelector value={template} onChange={setTemplate} />
      </div>

      <WizardNav 
        onNext={handleNext}
        onBack={() => router.push("/onboarding/step-1-name")}
      />
    </div>
  );
}