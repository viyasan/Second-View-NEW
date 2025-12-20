// components/analysis/BiomarkerCard.tsx

import React, { useState } from 'react';
import { Biomarker } from '../../types/bloodTest';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { getStatusColor, getStatusLabel } from '../../data/sampleBloodTest';

interface BiomarkerCardProps {
  biomarker: Biomarker;
}

export const BiomarkerCard: React.FC<BiomarkerCardProps> = ({ biomarker }) => {
  const [isExpanded, setIsExpanded] = useState(biomarker.status !== 'normal');

  const statusColor = getStatusColor(biomarker.status);
  const statusLabel = getStatusLabel(biomarker.status);

  const getStatusIcon = () => {
    switch (statusColor) {
      case 'green':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'yellow':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'red':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (statusColor) {
      case 'green':
        return 'border-green-200';
      case 'yellow':
        return 'border-yellow-200';
      case 'red':
        return 'border-red-200';
      default:
        return 'border-gray-200';
    }
  };

  const getBgColor = () => {
    switch (statusColor) {
      case 'green':
        return 'bg-green-50';
      case 'yellow':
        return 'bg-yellow-50';
      case 'red':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  // Calculate percentage within range for visual bar
  const range = biomarker.normalRangeMax - biomarker.normalRangeMin;
  const valuePosition = ((biomarker.value - biomarker.normalRangeMin) / range) * 100;
  const clampedPosition = Math.max(0, Math.min(100, valuePosition));

  return (
    <div className={`border-2 ${getBorderColor()} rounded-lg overflow-hidden transition-all hover:shadow-md`}>
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full ${getBgColor()} p-4 flex items-start justify-between hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-start gap-3 flex-1 text-left">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{biomarker.displayName}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">
                {biomarker.value}
              </span>
              <span className="text-sm text-gray-600">{biomarker.unit}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{statusLabel}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
        )}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-4 bg-white space-y-4">
          {/* Visual Range Indicator */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Low</span>
              <span>Normal Range</span>
              <span>High</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              {/* Normal range highlight */}
              <div
                className="absolute h-full bg-green-200"
                style={{ left: '0%', right: '0%' }}
              />
              {/* Value marker */}
              <div
                className={`absolute w-1 h-full ${
                  statusColor === 'green' ? 'bg-green-600' :
                  statusColor === 'yellow' ? 'bg-yellow-600' :
                  'bg-red-600'
                }`}
                style={{ left: `${clampedPosition}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{biomarker.normalRangeMin}</span>
              <span>{biomarker.normalRangeMax} {biomarker.unit}</span>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-gray-50 rounded p-3">
            <h4 className="font-medium text-gray-900 mb-2">What this means:</h4>
            <p className="text-sm text-gray-700">
              {getExplanation(biomarker)}
            </p>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Normal Range:</span>
              <p className="font-medium text-gray-900">
                {biomarker.normalRangeMin} - {biomarker.normalRangeMax} {biomarker.unit}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Your Value:</span>
              <p className={`font-medium ${
                statusColor === 'green' ? 'text-green-700' :
                statusColor === 'yellow' ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {biomarker.value} {biomarker.unit}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to provide basic explanations
function getExplanation(biomarker: Biomarker): string {
  const explanations: Record<string, { normal: string; high: string; low: string }> = {
    wbc: {
      normal: 'White blood cells help fight infections. Your levels are healthy.',
      high: 'Elevated white blood cells may indicate infection, inflammation, or stress. Discuss with your doctor.',
      low: 'Low white blood cells may affect your immune system. Your doctor should evaluate this.'
    },
    glucose: {
      normal: 'Your blood sugar levels are in a healthy range.',
      high: 'Elevated glucose may suggest prediabetes or diabetes risk. Consider lifestyle changes and discuss with your doctor.',
      low: 'Low blood sugar can cause fatigue and dizziness. Discuss proper nutrition with your doctor.'
    },
    total_cholesterol: {
      normal: 'Your cholesterol is at a healthy level.',
      high: 'High cholesterol increases heart disease risk. Diet, exercise, and medication may help.',
      low: 'Very low cholesterol is rare but should be discussed with your doctor.'
    },
    hdl: {
      normal: 'HDL is "good" cholesterol that protects your heart. Your levels are healthy.',
      high: 'High HDL is generally protective for heart health.',
      low: 'Low HDL may increase heart disease risk. Exercise and healthy fats can help raise it.'
    },
    ldl: {
      normal: 'Your LDL cholesterol is at a healthy level.',
      high: 'LDL is "bad" cholesterol. High levels increase heart disease risk. Discuss treatment options with your doctor.',
      low: 'Very low LDL is generally not a concern.'
    },
    tsh: {
      normal: 'Your thyroid function appears normal.',
      high: 'High TSH may indicate underactive thyroid (hypothyroidism). You may feel tired or cold. Discuss with your doctor.',
      low: 'Low TSH may indicate overactive thyroid (hyperthyroidism). You may feel anxious or have rapid heartbeat. Discuss with your doctor.'
    }
  };

  const markerExplanations = explanations[biomarker.name];
  if (!markerExplanations) {
    return biomarker.status === 'normal'
      ? `Your ${biomarker.displayName} is within the normal range.`
      : `Your ${biomarker.displayName} is ${biomarker.status.replace('-', ' ')}. Discuss this with your healthcare provider.`;
  }

  if (biomarker.status === 'normal') {
    return markerExplanations.normal;
  } else if (biomarker.status === 'high' || biomarker.status === 'borderline-high') {
    return markerExplanations.high;
  } else {
    return markerExplanations.low;
  }
}
