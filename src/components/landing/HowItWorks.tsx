// components/landing/HowItWorks.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Brain, MessageCircle, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload your results',
      description: 'Upload a PDF or manually enter your biomarker values. We support all major lab formats.',
    },
    {
      number: '02',
      icon: <Brain className="w-6 h-6" />,
      title: 'AI analyzes your data',
      description: 'Our AI reviews each biomarker, comparing values to optimal ranges and identifying patterns.',
    },
    {
      number: '03',
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Get clear explanations',
      description: 'Receive plain-language insights about what your results mean for your health.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <p className="text-sm font-medium text-warm-gray-400 uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
            Get clarity on your health in three simple steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step number */}
              <div className="text-7xl lg:text-8xl font-bold text-warm-gray-100 mb-4 transition-colors group-hover:text-warm-gray-200">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-charcoal rounded-2xl flex items-center justify-center text-white mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-warm-gray-500 leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-16 border-t-2 border-dashed border-warm-gray-200 -translate-x-8" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 lg:mt-32 p-8 lg:p-12 bg-charcoal rounded-3xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
                Ready to understand your results?
              </h3>
              <p className="text-warm-gray-400 text-lg">
                Start with our demo or upload your own test results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white rounded-full font-medium border-2 border-warm-gray-600 hover:border-warm-gray-500 transition-all"
              >
                View Demo
              </Link>
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lime text-charcoal rounded-full font-medium hover:bg-lime/90 transition-all group"
              >
                Upload Your Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
