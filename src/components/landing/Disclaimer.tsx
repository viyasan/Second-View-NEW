// components/landing/Disclaimer.tsx

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
      <div className="flex items-start">
        <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-amber-900 mb-2">
            Important Medical Disclaimer
          </h3>
          <div className="text-amber-800 space-y-2">
            <p>
              <strong>SecondView is an educational tool</strong> designed to help you understand your blood test results.
              This is <strong>not medical advice, diagnosis, or treatment</strong>.
            </p>
            <p>
              Our AI-powered analysis explains biomarkers in simple terms, similar to how a family doctor or naturopath
              might explain results during a consultation. However, it does not replace professional medical advice.
            </p>
            <p className="font-semibold">
              Always discuss your results with a qualified healthcare provider before making any health decisions,
              starting or stopping medications, or changing your treatment plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MinimalDisclaimer: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
      <p className="text-sm text-gray-700 text-center">
        <strong>Educational purposes only.</strong> Not medical advice.
        Always consult your healthcare provider about your results.
      </p>
    </div>
  );
};

export const InlineDisclaimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <p className={`text-xs text-gray-500 italic ${className}`}>
      This analysis is for educational purposes only. Discuss results with your healthcare provider.
    </p>
  );
};
