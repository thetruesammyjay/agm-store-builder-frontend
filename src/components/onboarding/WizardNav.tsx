import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface WizardNavProps {
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isPending?: boolean;
  backLabel?: string;
  nextLabel?: string;
  showSkip?: boolean;
  onSkip?: () => void;
}

export function WizardNav({
  onBack,
  onNext,
  isNextDisabled,
  isPending,
  backLabel = "Back",
  nextLabel = "Continue",
  showSkip,
  onSkip,
}: WizardNavProps) {
  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
      <div className="flex gap-4">
        {onBack ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isPending}
            className="text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
          </Button>
        ) : (
          <div /> /* Spacer */
        )}
      </div>

      <div className="flex items-center gap-3">
        {showSkip && (
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            disabled={isPending}
            className="text-gray-500"
          >
            Skip for now
          </Button>
        )}
        
        <Button
          type="button" // Usually 'submit' if inside form, but explicit handler is safer for wizards
          onClick={onNext}
          disabled={isNextDisabled || isPending}
          className="min-w-[120px] bg-primary-600 hover:bg-primary-700"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              {nextLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}