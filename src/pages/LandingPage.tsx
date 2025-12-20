// pages/LandingPage.tsx

import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Disclaimer } from '../components/landing/Disclaimer';
import { HowItWorks } from '../components/landing/HowItWorks';

export const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HowItWorks />
        <Disclaimer />
      </div>
    </div>
  );
};
