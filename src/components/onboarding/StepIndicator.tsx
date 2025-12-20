import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 5 }: StepIndicatorProps) {
  const steps = [
    { id: 1, label: "Name" },
    { id: 2, label: "Template" },
    { id: 3, label: "Branding" },
    { id: 4, label: "Product" },
    { id: 5, label: "Payment" },
  ];

  return (
    <div className="w-full py-4">
      {/* Mobile: Simple Text Progress */}
      <div className="md:hidden flex justify-between items-center text-sm font-medium text-gray-500 mb-4 px-1">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-gray-900">{steps[currentStep - 1]?.label}</span>
      </div>

      {/* Mobile: Progress Bar */}
      <div className="md:hidden h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop: Detailed Stepper */}
      <div className="hidden md:flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors duration-200",
                    isCompleted
                      ? "bg-green-600 border-green-600 text-white"
                      : isCurrent
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={cn(
                    "absolute top-10 text-xs font-medium whitespace-nowrap",
                    isCurrent ? "text-primary-700" : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors duration-200",
                    currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}