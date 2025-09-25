"use client";

import { useState, ReactNode } from "react";
import { IoChevronBack, IoChevronForward } from "@react-icons/all-files/io5/IoChevronBack";
import { IoChevronForward as IoChevronForwardIcon } from "@react-icons/all-files/io5/IoChevronForward";

interface Step {
  id: string;
  title: string;
  description: string;
  component: ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  onCancel,
  isLoading = false,
  submitLabel = "Submit"
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold gradient-text">
            {steps[currentStep].title}
          </h2>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <p className="text-gray-600 mt-2 text-sm">
          {steps[currentStep].description}
        </p>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 min-h-[500px]">
        {steps[currentStep].component}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={isFirstStep ? onCancel : prevStep}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          <IoChevronBack size={20} />
          {isFirstStep ? "Cancel" : "Previous"}
        </button>

        <button
          onClick={isLastStep ? onComplete : nextStep}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? submitLabel : "Next"}
          {!isLastStep && <IoChevronForwardIcon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
