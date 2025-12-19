// components/landing/HowItWorks.tsx

import React from 'react';
import { Upload, Brain, MessageCircle, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: 'Upload or Enter Your Results',
      description: 'Upload a PDF of your blood test or manually enter your biomarker values. We support all common lab formats.'
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: 'AI Analyzes Your Data',
      description: 'Our AI reviews your biomarkers and compares them to normal ranges, identifying any values that need attention.'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: 'Get Plain-Language Explanations',
      description: 'Receive easy-to-understand explanations of what your results mean, similar to what a doctor would tell you.'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: 'Ask Follow-Up Questions',
      description: 'Chat with our AI to dive deeper into your results and get answers to your specific questions.'
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get clarity on your blood test results in minutes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            
            {/* Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {step.description}
              </p>
            </div>

            {/* Connector Arrow (hidden on last step and mobile) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to understand your health better?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you want to explore with our sample data or upload your own results, 
          we're here to help you make sense of your biomarkers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/demo"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            View Sample Analysis
          </a>
          <a 
            href="/upload"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Upload Your Test
          </a>
        </div>
      </div>
    </div>
  );
};
