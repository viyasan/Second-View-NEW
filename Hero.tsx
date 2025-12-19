// components/landing/Hero.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Brain, Shield } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Understand Your
            <span className="text-blue-600"> Blood Test Results</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a second view of your health with AI-powered analysis that explains your biomarkers in simple terms—just like a doctor would.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              to="/demo" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Try Sample Results
            </Link>
            <Link 
              to="/upload" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Upload Your Test
            </Link>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-gray-500 mb-16">
            ✓ Free to use • ✓ Privacy-focused • ✓ Educational purposes only
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="AI-Powered Analysis"
              description="Get detailed explanations of your biomarkers in plain English, powered by advanced AI"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-blue-600" />}
              title="Easy to Understand"
              description="No medical jargon. We explain what your results mean for your daily health and wellbeing"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Private & Secure"
              description="Your health data is processed securely. You control what you share and can delete anytime"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
