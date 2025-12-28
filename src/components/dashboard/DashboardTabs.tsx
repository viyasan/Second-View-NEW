// components/dashboard/DashboardTabs.tsx
// Tab navigation for the dashboard - Overview, Heart, Liver, Thyroid, Vitamins

import React from 'react';
import { DASHBOARD_TABS, TabId } from '../../utils/organMapping';

interface DashboardTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex items-center gap-1 bg-warm-gray-100 rounded-full p-1.5 w-fit">
      {DASHBOARD_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
            ${activeTab === tab.id
              ? 'bg-white text-charcoal shadow-sm'
              : 'text-warm-gray-500 hover:text-warm-gray-700 hover:bg-warm-gray-50'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Alternative pill-style tabs (matching the mockup more closely)
export const DashboardTabsPill: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex items-center border-b border-warm-gray-200">
      {DASHBOARD_TABS.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative px-8 py-4 text-sm font-medium transition-all duration-200
            ${activeTab === tab.id
              ? 'text-charcoal'
              : 'text-warm-gray-400 hover:text-warm-gray-600'
            }
            ${index !== DASHBOARD_TABS.length - 1 ? 'border-r border-warm-gray-200' : ''}
          `}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
          )}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;
