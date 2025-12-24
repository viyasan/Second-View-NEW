// pages/LandingPage.tsx

import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Stats } from '../components/landing/Stats';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { Disclaimer } from '../components/landing/Disclaimer';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-cream">
      <Hero />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <Disclaimer />
    </div>
  );
};
