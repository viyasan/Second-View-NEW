// components/analysis/ResultsDashboard.tsx

import React, { useState } from 'react';
import { Biomarker } from '../../types/bloodTest';
import { BiomarkerCard } from './BiomarkerCard';
import { HealthSummary } from './HealthSummary';
import { ChatInterface } from './ChatInterface';
import { InlineDisclaimer } from '../landing/Disclaimer';
import { TrendingUp, MessageCircle, Download } from 'lucide-react';

interface ResultsDashboardProps {
  biomarkers: Biomarker[];
  aiAnalysis?: {
    summary: string;
    overallInsights: string[];
    questionsToAskDoctor: string[];
  };
  testDate: string;
  labName?: string;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  biomarkers,
  aiAnalysis,
  testDate,
  labName
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'chat'>('overview');
  
  // Group biomarkers by category
  const biomarkersByCategory = biomarkers.reduce((acc, marker) => {
    if (!acc[marker.category]) {
      acc[marker.category] = [];
    }
    acc[marker.category].push(marker);
    return acc;
  }, {} as Record<string, Biomarker[]>);

  // Calculate summary stats
  const normalCount = biomarkers.filter(b => b.status === 'normal').length;
  const flaggedCount = biomarkers.filter(b => b.status !== 'normal').length;
  const concerningCount = biomarkers.filter(b => 
    b.status === 'high' || b.status === 'low'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Blood Test Analysis
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>Test Date: {new Date(testDate).toLocaleDateString()}</span>
          {labName && <span>• {labName}</span>}
        </div>
        <InlineDisclaimer className="mt-2" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Markers"
          value={biomarkers.length}
          bgColor="bg-blue-50"
          textColor="text-blue-700"
        />
        <StatCard
          label="Normal Range"
          value={normalCount}
          bgColor="bg-green-50"
          textColor="text-green-700"
        />
        <StatCard
          label="Needs Attention"
          value={flaggedCount}
          bgColor={concerningCount > 0 ? "bg-red-50" : "bg-yellow-50"}
          textColor={concerningCount > 0 ? "text-red-700" : "text-yellow-700"}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<TrendingUp className="w-5 h-5" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === 'details'}
            onClick={() => setActiveTab('details')}
            label="Detailed Results"
          />
          <TabButton
            active={activeTab === 'chat'}
            onClick={() => setActiveTab('chat')}
            icon={<MessageCircle className="w-5 h-5" />}
            label="Ask Questions"
          />
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg">
        {activeTab === 'overview' && aiAnalysis && (
          <HealthSummary
            summary={aiAnalysis.summary}
            insights={aiAnalysis.overallInsights}
            questionsToAskDoctor={aiAnalysis.questionsToAskDoctor}
            biomarkers={biomarkers}
          />
        )}

        {activeTab === 'details' && (
          <div className="space-y-8">
            {Object.entries(biomarkersByCategory).map(([category, markers]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {markers.map(marker => (
                    <BiomarkerCard key={marker.name} biomarker={marker} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <ChatInterface biomarkers={biomarkers} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Results
        </button>
        <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Save to Profile
        </button>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, bgColor, textColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};
