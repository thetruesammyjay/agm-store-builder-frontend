"use client";

import { usePathname } from "next/navigation";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import Image from "next/image";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const logout = useLogout();

  // Determine current step based on URL
  const getStep = () => {
    if (pathname.includes("step-1")) return 1;
    if (pathname.includes("step-2")) return 2;
    if (pathname.includes("step-3")) return 3;
    if (pathname.includes("step-4")) return 4;
    if (pathname.includes("step-5")) return 5;
    return 6; // Complete
  };

  const currentStep = getStep();
  const showStepper = currentStep <= 5;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="relative w-24 h-8">
          <Image 
            src="/logo.svg" 
            alt="AGM" 
            fill 
            className="object-contain object-left" 
            priority
          />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout}
          className="text-gray-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Log Out</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8 md:py-12">
        {showStepper && (
          <div className="mb-8 md:mb-12">
            <StepIndicator currentStep={currentStep} totalSteps={5} />
          </div>
        )}
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}