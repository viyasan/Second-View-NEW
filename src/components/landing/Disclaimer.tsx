// components/landing/Disclaimer.tsx

import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        <div className="bg-warm-gray-50 border border-warm-gray-200 rounded-2xl p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-3">
                Important Medical Disclaimer
              </h3>
              <div className="text-warm-gray-600 space-y-3 text-sm leading-relaxed">
                <p>
                  <strong className="text-charcoal">SecondView is an educational tool</strong> designed to help you understand your blood test results.
                  This is <strong className="text-charcoal">not medical advice, diagnosis, or treatment</strong>.
                </p>
                <p>
                  Our AI explains biomarkers in simple terms, similar to how a doctor might during a consultation.
                  However, it does not replace professional medical advice.
                </p>
                <p className="font-medium text-charcoal">
                  Always discuss your results with a qualified healthcare provider before making any health decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MinimalDisclaimer: React.FC = () => {
  return (
    <div className="bg-warm-gray-50 border border-warm-gray-100 rounded-xl p-4 my-4">
      <p className="text-sm text-warm-gray-600 text-center">
        <strong className="text-charcoal">Educational purposes only.</strong> Not medical advice.
        Always consult your healthcare provider about your results.
      </p>
    </div>
  );
};

export const InlineDisclaimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 text-warm-gray-400 ${className}`}>
      <Info className="w-4 h-4" />
      <p className="text-xs">
        Educational purposes only. Discuss results with your healthcare provider.
      </p>
    </div>
  );
};
