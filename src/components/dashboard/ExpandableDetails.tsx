// components/dashboard/ExpandableDetails.tsx
// Expandable details section for future content

import React from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ExpandableDetailsProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const ExpandableDetails: React.FC<ExpandableDetailsProps> = ({
  isExpanded = false,
  onToggle,
  title = 'Details',
  children
}) => {
  return (
    <div className="bg-warm-gray-200/50 rounded-2xl overflow-hidden transition-all duration-300">
      {/* Header - clickable to expand */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 hover:bg-warm-gray-200/70 transition-colors"
        >
          <span className="text-sm font-medium text-warm-gray-600">{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-warm-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-warm-gray-400" />
          )}
        </button>
      )}

      {/* Content Area */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          ${!onToggle ? 'max-h-none opacity-100 min-h-[200px]' : ''}
        `}
      >
        {children || <ExpandableDetailsPlaceholder />}
      </div>
    </div>
  );
};

// Placeholder content for the details section
export const ExpandableDetailsPlaceholder: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center">
      <div className="w-16 h-16 rounded-full bg-warm-gray-300/50 flex items-center justify-center mb-4">
        <Info className="w-8 h-8 text-warm-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-warm-gray-500 mb-2">
        Detailed Insights Coming Soon
      </h3>
      <p className="text-sm text-warm-gray-400 max-w-md">
        This section will display detailed analysis, trends, and personalized
        recommendations based on your selected biomarkers and organ system.
      </p>
    </div>
  );
};

// Static version without toggle (always visible placeholder)
export const DetailsSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-warm-gray-200/50 rounded-2xl min-h-[200px] overflow-hidden">
      {children || <ExpandableDetailsPlaceholder />}
    </div>
  );
};

export default ExpandableDetails;
