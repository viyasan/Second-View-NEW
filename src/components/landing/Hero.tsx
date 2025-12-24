// components/landing/Hero.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[90vh] bg-cream flex items-center relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white to-cream" />

      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Copy */}
          <div className="flex flex-col">
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm-gray-100 rounded-full w-fit mb-8">
              <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
              <span className="text-sm text-warm-gray-600 font-medium">
                Trusted by 10,000+ users
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl lg:text-7xl font-semibold text-charcoal leading-[1.1] mb-6 tracking-tight">
              Understand your
              <br />
              <span className="text-warm-gray-400">blood tests.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-warm-gray-500 mb-10 max-w-lg leading-relaxed">
              AI-powered analysis that explains your biomarkers in plain English—like a doctor would.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-white rounded-full text-lg font-medium hover:bg-warm-gray-800 transition-all group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-charcoal rounded-full text-lg font-medium border-2 border-warm-gray-200 hover:border-warm-gray-300 hover:bg-warm-gray-50 transition-all"
              >
                View Demo
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-warm-gray-200">
              <TrustBadge icon={<Shield className="w-4 h-4" />} text="Private & Secure" />
              <TrustBadge icon={<Zap className="w-4 h-4" />} text="Results in 2 min" />
              <TrustBadge icon={<Lock className="w-4 h-4" />} text="HIPAA Compliant" />
            </div>
          </div>

          {/* Right: Product visual */}
          <div className="relative">
            {/* Main card - Dashboard preview */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-warm-gray-200/50 p-6 lg:p-8 border border-warm-gray-100">
              {/* Mock dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-charcoal">Your Results</h3>
                  <p className="text-sm text-warm-gray-400">Analyzed just now</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-700 font-medium">Healthy</span>
                </div>
              </div>

              {/* Mock biomarkers */}
              <div className="space-y-4">
                <BiomarkerPreview
                  name="Hemoglobin"
                  value="14.2"
                  unit="g/dL"
                  status="normal"
                  range="12.0-17.5"
                />
                <BiomarkerPreview
                  name="Glucose (Fasting)"
                  value="95"
                  unit="mg/dL"
                  status="normal"
                  range="70-100"
                />
                <BiomarkerPreview
                  name="Cholesterol (Total)"
                  value="210"
                  unit="mg/dL"
                  status="borderline"
                  range="< 200"
                />
              </div>

              {/* AI Insight preview */}
              <div className="mt-6 p-4 bg-warm-gray-50 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-lime" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-1">AI Insight</p>
                    <p className="text-sm text-warm-gray-500">
                      Your results look great overall. Consider monitoring your cholesterol with dietary adjustments...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements for depth */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-lime/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-warm-gray-200/50 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-warm-gray-500">
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

interface BiomarkerPreviewProps {
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'borderline' | 'high' | 'low';
  range: string;
}

const BiomarkerPreview: React.FC<BiomarkerPreviewProps> = ({ name, value, unit, status, range }) => {
  const statusColors = {
    normal: 'bg-green-500',
    borderline: 'bg-yellow-500',
    high: 'bg-red-500',
    low: 'bg-orange-500',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-warm-gray-50 rounded-xl">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <div>
          <p className="text-sm font-medium text-charcoal">{name}</p>
          <p className="text-xs text-warm-gray-400">Range: {range}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-charcoal">{value}</p>
        <p className="text-xs text-warm-gray-400">{unit}</p>
      </div>
    </div>
  );
};
