// components/dashboard/HealthScoreCard.tsx
// Displays the overall health score with visual indicator

import React from 'react';

interface HealthScoreCardProps {
  score: number;
  label: string;
  description?: string;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({
  score,
  label,
  description
}) => {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getProgressColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    if (score >= 40) return 'bg-orange-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-warm-gray-500 mb-3">Health Score</h3>

      <div className="flex items-end gap-2 mb-2">
        <span className={`text-5xl font-bold ${getScoreColor()}`}>
          {score}
        </span>
        <span className="text-warm-gray-400 text-lg mb-1">/100</span>
      </div>

      <p className={`text-lg font-semibold ${getScoreColor()} mb-3`}>
        {label}
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-warm-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>

      {description && (
        <p className="text-xs text-warm-gray-400 mt-3">
          {description}
        </p>
      )}
    </div>
  );
};

export default HealthScoreCard;
