"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BankAccountForm } from "@/components/onboarding/BankAccountForm";
import { WizardNav } from "@/components/onboarding/WizardNav";
import { useCreateStore } from "@/hooks/useStore";
import { useCreateProduct } from "@/hooks/useProducts";
import { toast } from "@/store/notificationStore";
import { Loader2 } from "lucide-react";
import api from "@/lib/api"; // Correct import for direct API usage if needed

export default function Step5Payment() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hooks
  const { mutateAsync: createStore } = useCreateStore();
  // We need storeId for product creation, so we'll use the one returned from createStore
  // The hook needs a placeholder storeId initially, but we override it in the mutation call
  const { mutateAsync: createProduct } = useCreateProduct(""); 

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // 1. Retrieve data
      const storeDataRaw = sessionStorage.getItem("onboarding_store");
      const brandingRaw = sessionStorage.getItem("onboarding_branding");
      const template = sessionStorage.getItem("onboarding_template") || "products";
      const productRaw = sessionStorage.getItem("onboarding_product");

      if (!storeDataRaw) throw new Error("Missing store information");

      const storeData = JSON.parse(storeDataRaw);
      const branding = brandingRaw ? JSON.parse(brandingRaw) : {};
      const product = productRaw ? JSON.parse(productRaw) : null;

      // 2. Create Store
      const newStore = await createStore({
        username: storeData.username,
        displayName: storeData.displayName,
        templateId: template as any,
        customColors: {
          primary: branding.primaryColor || "#3b82f6",
          secondary: "#ffffff",
          accent: "#eab308"
        },
        // Assuming logoUrl is handled by store update or creation supports it
      });

      if (!newStore?.id) throw new Error("Failed to create store");

      // 3. Bank Account is already handled by BankAccountForm submission
      
      // 4. Create Product (if added)
      if (product) {
        try {
            // Direct API call to ensure we use the new store ID immediately
            await api.post(`/stores/${newStore.id}/products`, {
                ...product,
                isActive: true,
                stockQuantity: 99 // Default stock if not set in quick form
            });
        } catch (err) {
            console.error("Failed to create initial product", err);
            // We don't block success if product fails, just log it
        }
      }

      // Cleanup
      sessionStorage.clear();
      
      // Success Redirect
      router.push(`/onboarding/complete?url=${newStore.username}.shopwithagm.com`);

    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast.error("Setup Failed", error.message || "Could not complete setup. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    handleFinalSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Get Paid</h1>
        <p className="text-gray-500">
          Add your bank account to receive instant payouts. This is secure and encrypted.
        </p>
      </div>

      <div className="pt-4">
        {/* BankAccountForm handles the bank submission internally, then calls onSuccess */}
        <BankAccountForm onSuccess={() => handleFinalSubmit()} />
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Building your store...</h3>
          <p className="text-gray-500">This will just take a moment.</p>
        </div>
      )}

      <WizardNav 
        onNext={() => {
            // Trigger form submission which calls handleFinalSubmit on success
            const form = document.getElementById("bank-form") as HTMLFormElement;
            if (form) form.requestSubmit();
        }}
        onBack={() => router.push("/onboarding/step-4-products")}
        showSkip
        onSkip={handleSkip}
        nextLabel="Finish Setup"
        isPending={isSubmitting}
      />
    </div>
  );
}