// components/dashboard/BioMarkersSummaryCard.tsx
// Displays summary of biomarkers: total, in range, and flagged

import React from 'react';

interface BioMarkersSummaryCardProps {
  total: number;
  inRange: number;
  flagged: number;
  borderline?: number;
  critical?: number;
}

export const BioMarkersSummaryCard: React.FC<BioMarkersSummaryCardProps> = ({
  total,
  inRange,
  flagged,
  borderline = 0,
  critical = 0
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-warm-gray-500 mb-3">Bio-Markers</h3>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-bold text-charcoal">
          {total}
        </span>
        <span className="text-warm-gray-400 text-lg mb-1">tested</span>
      </div>

      <div className="space-y-2">
        {/* In Range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-warm-gray-600">In Range</span>
          </div>
          <span className="text-sm font-semibold text-green-600">{inRange}</span>
        </div>

        {/* Flagged */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-warm-gray-600">Flagged</span>
          </div>
          <span className="text-sm font-semibold text-red-600">{flagged}</span>
        </div>

        {/* Breakdown if provided */}
        {(borderline > 0 || critical > 0) && (
          <div className="pt-2 mt-2 border-t border-warm-gray-100">
            {borderline > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-warm-gray-400 pl-4">Borderline</span>
                <span className="text-yellow-600">{borderline}</span>
              </div>
            )}
            {critical > 0 && (
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-warm-gray-400 pl-4">Needs Attention</span>
                <span className="text-red-600">{critical}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visual bar */}
      <div className="mt-4 flex h-2 rounded-full overflow-hidden bg-warm-gray-100">
        {inRange > 0 && (
          <div
            className="bg-green-500 transition-all duration-500"
            style={{ width: `${(inRange / total) * 100}%` }}
          />
        )}
        {borderline > 0 && (
          <div
            className="bg-yellow-400 transition-all duration-500"
            style={{ width: `${(borderline / total) * 100}%` }}
          />
        )}
        {critical > 0 && (
          <div
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${(critical / total) * 100}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default BioMarkersSummaryCard;
