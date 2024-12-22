import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface InvoiceStepsProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  steps: { title: string; component: React.ReactNode }[];
}

const InvoiceSteps: React.FC<InvoiceStepsProps> = ({
  currentStep,
  onNext,
  onBack,
  steps
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        {steps[currentStep].component}
      </div>
      
      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentStep > 0 ? steps[currentStep - 1].title : 'Back'}
        </Button>
        
        <Button
          onClick={onNext}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2"
        >
          {currentStep < steps.length - 1 ? steps[currentStep + 1].title : 'Finish'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InvoiceSteps;