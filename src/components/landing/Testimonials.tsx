// components/landing/Testimonials.tsx

import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    role: 'Health Enthusiast',
    content: 'Finally, I can understand my blood test results without scheduling another appointment. The AI explanations are clear and helpful.',
    avatar: 'SM',
  },
  {
    name: 'James K.',
    role: 'Marathon Runner',
    content: 'As an athlete, I track my biomarkers regularly. SecondView makes it easy to spot trends and understand what the numbers mean.',
    avatar: 'JK',
  },
  {
    name: 'Dr. Emily R.',
    role: 'Family Physician',
    content: 'I recommend SecondView to my patients who want to better understand their results between visits. Great educational tool.',
    avatar: 'ER',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-warm-gray-50">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-warm-gray-400 uppercase tracking-widest mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
            Loved by health-conscious people
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<Testimonial> = ({ name, role, content, avatar }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-warm-gray-100 hover:border-warm-gray-200 transition-colors">
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-lime text-lime" />
        ))}
      </div>

      {/* Content */}
      <p className="text-warm-gray-600 leading-relaxed mb-8">
        "{content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center">
          <span className="text-white font-medium">{avatar}</span>
        </div>
        <div>
          <p className="font-semibold text-charcoal">{name}</p>
          <p className="text-sm text-warm-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};
