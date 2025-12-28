// components/dashboard/BodyVisualization.tsx
// Interactive SVG human body visualization with organ health indicators

import React from 'react';
import { OrganSystem, OrganHealth } from '../../utils/organMapping';

interface BodyVisualizationProps {
  organHealth: Record<OrganSystem, OrganHealth>;
  onOrganClick?: (organ: OrganSystem) => void;
  selectedOrgan?: OrganSystem | null;
}

// Color definitions for organ status
const STATUS_COLORS = {
  good: {
    fill: '#22c55e',      // green-500
    glow: '#86efac',      // green-300
    stroke: '#16a34a'     // green-600
  },
  warning: {
    fill: '#eab308',      // yellow-500
    glow: '#fde047',      // yellow-300
    stroke: '#ca8a04'     // yellow-600
  },
  critical: {
    fill: '#ef4444',      // red-500
    glow: '#fca5a5',      // red-300
    stroke: '#dc2626'     // red-600
  }
};

export const BodyVisualization: React.FC<BodyVisualizationProps> = ({
  organHealth,
  onOrganClick,
  selectedOrgan
}) => {
  const getOrganStyle = (organ: OrganSystem) => {
    const health = organHealth[organ];
    const colors = STATUS_COLORS[health?.status || 'good'];
    const isSelected = selectedOrgan === organ;

    return {
      fill: colors.fill,
      stroke: colors.stroke,
      filter: isSelected ? `drop-shadow(0 0 12px ${colors.glow})` : `drop-shadow(0 0 6px ${colors.glow})`,
      opacity: isSelected ? 1 : 0.85,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    };
  };

  const handleOrganClick = (organ: OrganSystem) => {
    onOrganClick?.(organ);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-warm-gray-50 to-warm-gray-100 rounded-2xl p-4">
      <svg
        viewBox="0 0 200 400"
        className="w-full h-full max-w-[280px] max-h-[500px]"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Body gradient */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e5e5" />
            <stop offset="50%" stopColor="#d4d4d4" />
            <stop offset="100%" stopColor="#c4c4c4" />
          </linearGradient>

          {/* Glow filters for each status */}
          <filter id="glowGood" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowWarning" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowCritical" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Human Body Outline */}
        <g id="body-outline" fill="url(#bodyGradient)" stroke="#a3a3a3" strokeWidth="1.5">
          {/* Head */}
          <ellipse cx="100" cy="35" rx="28" ry="32" />

          {/* Neck */}
          <rect x="88" y="65" width="24" height="20" rx="4" />

          {/* Torso */}
          <path
            d="M60 85
               Q55 90 52 110
               L48 180
               Q48 195 60 200
               L70 200
               L70 210
               L130 210
               L130 200
               L140 200
               Q152 195 152 180
               L148 110
               Q145 90 140 85
               L100 82
               Z"
          />

          {/* Left Arm */}
          <path
            d="M52 90
               Q35 95 28 120
               L22 180
               Q20 195 25 200
               L35 200
               Q42 195 44 180
               L48 120
               Q48 100 52 90"
          />

          {/* Right Arm */}
          <path
            d="M148 90
               Q165 95 172 120
               L178 180
               Q180 195 175 200
               L165 200
               Q158 195 156 180
               L152 120
               Q152 100 148 90"
          />

          {/* Left Leg */}
          <path
            d="M70 210
               L65 300
               Q63 340 60 360
               L55 390
               Q53 398 60 400
               L80 400
               Q87 398 85 390
               L88 350
               Q90 320 92 280
               L95 210"
          />

          {/* Right Leg */}
          <path
            d="M130 210
               L135 300
               Q137 340 140 360
               L145 390
               Q147 398 140 400
               L120 400
               Q113 398 115 390
               L112 350
               Q110 320 108 280
               L105 210"
          />
        </g>

        {/* Interactive Organs */}
        <g id="organs">
          {/* Heart - positioned in upper left chest */}
          <g
            onClick={() => handleOrganClick('heart')}
            style={getOrganStyle('heart')}
            className="organ-heart"
          >
            <path
              d="M85 115
                 C75 105 65 115 65 125
                 C65 140 85 155 95 165
                 C105 155 125 140 125 125
                 C125 115 115 105 105 115
                 C100 110 90 110 85 115"
              transform="translate(-10, -5) scale(0.7)"
            />
            {/* Heart label dot */}
            <circle cx="78" cy="108" r="4" fill="#fff" opacity="0.8" />
          </g>

          {/* Liver - positioned in upper right abdomen */}
          <g
            onClick={() => handleOrganClick('liver')}
            style={getOrganStyle('liver')}
            className="organ-liver"
          >
            <ellipse cx="118" cy="145" rx="22" ry="15" />
            {/* Liver label dot */}
            <circle cx="118" cy="145" r="4" fill="#fff" opacity="0.8" />
          </g>

          {/* Kidneys - positioned in lower back area */}
          <g
            onClick={() => handleOrganClick('kidneys')}
            style={getOrganStyle('kidneys')}
            className="organ-kidneys"
          >
            {/* Left Kidney */}
            <ellipse cx="75" cy="168" rx="10" ry="15" />
            {/* Right Kidney */}
            <ellipse cx="125" cy="168" rx="10" ry="15" />
            {/* Kidney label dots */}
            <circle cx="75" cy="168" r="3" fill="#fff" opacity="0.8" />
            <circle cx="125" cy="168" r="3" fill="#fff" opacity="0.8" />
          </g>

          {/* Thyroid - positioned in neck area */}
          <g
            onClick={() => handleOrganClick('thyroid')}
            style={getOrganStyle('thyroid')}
            className="organ-thyroid"
          >
            <path
              d="M92 78
                 Q88 82 88 88
                 Q88 92 100 95
                 Q112 92 112 88
                 Q112 82 108 78
                 Q100 80 92 78"
            />
            {/* Thyroid label dot */}
            <circle cx="100" cy="86" r="3" fill="#fff" opacity="0.8" />
          </g>
        </g>

        {/* Legend */}
        <g transform="translate(10, 350)">
          <circle cx="8" cy="8" r="6" fill={STATUS_COLORS.good.fill} />
          <text x="20" y="12" fontSize="10" fill="#525252">Good</text>

          <circle cx="8" cy="26" r="6" fill={STATUS_COLORS.warning.fill} />
          <text x="20" y="30" fontSize="10" fill="#525252">Warning</text>

          <circle cx="8" cy="44" r="6" fill={STATUS_COLORS.critical.fill} />
          <text x="20" y="48" fontSize="10" fill="#525252">Attention</text>
        </g>
      </svg>

      {/* Organ Labels - positioned absolutely */}
      <div className="absolute top-4 right-4 space-y-2 text-xs">
        {selectedOrgan && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
            <p className="font-medium text-charcoal">
              {organHealth[selectedOrgan]?.displayName}
            </p>
            <p className={`text-sm ${
              organHealth[selectedOrgan]?.status === 'good' ? 'text-green-600' :
              organHealth[selectedOrgan]?.status === 'warning' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {organHealth[selectedOrgan]?.inRangeCount}/{organHealth[selectedOrgan]?.totalCount} markers in range
            </p>
          </div>
        )}
      </div>

      {/* Pulsing animation styles */}
      <style>{`
        .organ-heart:hover,
        .organ-liver:hover,
        .organ-kidneys:hover,
        .organ-thyroid:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        .organ-heart,
        .organ-liver,
        .organ-kidneys,
        .organ-thyroid {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BodyVisualization;
