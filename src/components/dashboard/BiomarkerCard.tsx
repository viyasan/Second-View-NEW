// components/dashboard/BiomarkerCard.tsx
// Individual biomarker card for category tabs

import React from 'react';
import { Biomarker } from '../../types/bloodTest';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface BiomarkerCardProps {
  biomarker: Biomarker;
  onClick?: () => void;
  isSelected?: boolean;
}

export const BiomarkerCard: React.FC<BiomarkerCardProps> = ({
  biomarker,
  onClick,
  isSelected
}) => {
  const getStatusColor = () => {
    switch (biomarker.status) {
      case 'normal':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-700'
        };
      case 'borderline-high':
      case 'borderline-low':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-700'
        };
      default:
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-300',
          text: 'text-yellow-800',
          badge: 'bg-yellow-100 text-yellow-800'
        };
    }
  };

  const getStatusLabel = () => {
    switch (biomarker.status) {
      case 'normal':
        return 'Normal';
      case 'borderline-high':
        return 'Slightly High';
      case 'borderline-low':
        return 'Slightly Low';
      case 'high':
        return 'High';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = () => {
    switch (biomarker.status) {
      case 'high':
      case 'borderline-high':
        return <TrendingUp className="w-4 h-4" />;
      case 'low':
      case 'borderline-low':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const colors = getStatusColor();

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-2xl p-5 border-2 transition-all duration-200
        ${colors.bg} ${colors.border}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        hover:shadow-md cursor-pointer
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-warm-gray-600">
          {biomarker.displayName}
        </span>
        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${colors.badge}`}>
          {getStatusIcon()}
          {getStatusLabel()}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-charcoal">
          {biomarker.value}
        </span>
        <span className="text-sm text-warm-gray-400">
          {biomarker.unit}
        </span>
      </div>

      <div className="text-xs text-warm-gray-400">
        Normal: {biomarker.normalRangeMin} - {biomarker.normalRangeMax} {biomarker.unit}
      </div>
    </button>
  );
};

export default BiomarkerCard;
