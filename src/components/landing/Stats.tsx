// components/landing/Stats.tsx

import React from 'react';

interface Stat {
  value: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: '50+',
    label: 'Biomarkers',
    description: 'Analyzed and explained',
  },
  {
    value: '2 min',
    label: 'Average Time',
    description: 'To get your results',
  },
  {
    value: '100%',
    label: 'Private',
    description: 'Your data stays yours',
  },
  {
    value: '10k+',
    label: 'Users',
    description: 'Trust SecondView',
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-cream border-y border-warm-gray-100">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <p className="text-4xl lg:text-5xl font-bold text-charcoal mb-2">
                {stat.value}
              </p>
              <p className="text-lg font-medium text-charcoal mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-warm-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
