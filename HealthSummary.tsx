// components/analysis/HealthSummary.tsx

import React from 'react';
import { Biomarker } from '../../types/bloodTest';
import { Lightbulb, MessageSquare, TrendingUp, Activity } from 'lucide-react';

interface HealthSummaryProps {
  summary: string;
  insights: string[];
  questionsToAskDoctor: string[];
  biomarkers: Biomarker[];
}

export const HealthSummary: React.FC<HealthSummaryProps> = ({
  summary,
  insights,
  questionsToAskDoctor,
  biomarkers
}) => {
  // Calculate category summaries
  const categoryStats = getCategoryStats(biomarkers);
  
  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Activity className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Overall Health Picture
            </h2>
            <p className="text-blue-800 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-600" />
          Results by Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <CategoryCard key={category} category={category} stats={stats} />
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Key Takeaways
        </h3>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <p className="text-gray-700 flex-1">{insight}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Questions for Doctor */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          Questions to Ask Your Healthcare Provider
        </h3>
        <p className="text-purple-800 mb-3 text-sm">
          These questions can help you have a more productive conversation with your doctor:
        </p>
        <ul className="space-y-2">
          {questionsToAskDoctor.map((question, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-purple-600 flex-shrink-0">•</span>
              <p className="text-purple-900">{question}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Educational Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 text-center">
          💡 <strong>Remember:</strong> This analysis is meant to help you understand your results. 
          Your healthcare provider has access to your full medical history and can provide personalized guidance.
        </p>
      </div>
    </div>
  );
};

interface CategoryStats {
  total: number;
  normal: number;
  flagged: number;
}

function getCategoryStats(biomarkers: Biomarker[]): Record<string, CategoryStats> {
  const stats: Record<string, CategoryStats> = {};
  
  biomarkers.forEach(marker => {
    if (!stats[marker.category]) {
      stats[marker.category] = { total: 0, normal: 0, flagged: 0 };
    }
    stats[marker.category].total++;
    if (marker.status === 'normal') {
      stats[marker.category].normal++;
    } else {
      stats[marker.category].flagged++;
    }
  });
  
  return stats;
}

interface CategoryCardProps {
  category: string;
  stats: CategoryStats;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, stats }) => {
  const percentage = (stats.normal / stats.total) * 100;
  const allNormal = stats.flagged === 0;
  
  return (
    <div className={`p-4 rounded-lg border-2 ${
      allNormal ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
    }`}>
      <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-2xl font-bold ${
          allNormal ? 'text-green-700' : 'text-yellow-700'
        }`}>
          {stats.normal}/{stats.total}
        </span>
        <span className="text-sm text-gray-600">in normal range</span>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${
            allNormal ? 'bg-green-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {stats.flagged > 0 && (
        <p className="text-xs text-gray-600 mt-2">
          {stats.flagged} marker{stats.flagged !== 1 ? 's' : ''} need attention
        </p>
      )}
    </div>
  );
};
