// components/dashboard/LastBloodTestCard.tsx
// Displays last blood test date and next scheduled test

import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface LastBloodTestCardProps {
  testDate: string;
  daysSinceTest: number;
  nextTestDate: string;
  daysUntilNextTest: number;
}

export const LastBloodTestCard: React.FC<LastBloodTestCardProps> = ({
  testDate,
  daysSinceTest,
  nextTestDate,
  daysUntilNextTest
}) => {
  // Determine urgency color for next test
  const getNextTestColor = () => {
    if (daysUntilNextTest <= 0) return 'text-red-600';
    if (daysUntilNextTest <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getNextTestBgColor = () => {
    if (daysUntilNextTest <= 0) return 'bg-red-50';
    if (daysUntilNextTest <= 30) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const formatDaysText = (days: number, isUntil: boolean = false) => {
    if (days === 0) return isUntil ? 'Today' : 'Today';
    if (days === 1) return isUntil ? 'Tomorrow' : '1 day ago';
    if (days < 0 && isUntil) return `${Math.abs(days)} days overdue`;
    return isUntil ? `In ${days} days` : `${days} days ago`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-warm-gray-500 mb-3">Last Blood Test</h3>

      {/* Test Date */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-charcoal">
          {testDate}
        </p>
        <p className="text-sm text-warm-gray-400">
          {formatDaysText(daysSinceTest)}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-warm-gray-100 my-4" />

      {/* Next Test */}
      <div className={`rounded-xl p-3 ${getNextTestBgColor()}`}>
        <div className="flex items-center gap-2 mb-1">
          <Calendar className={`w-4 h-4 ${getNextTestColor()}`} />
          <span className="text-xs font-medium text-warm-gray-500">Next Test</span>
        </div>
        <p className="text-sm font-semibold text-charcoal">
          {nextTestDate}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Clock className={`w-3 h-3 ${getNextTestColor()}`} />
          <span className={`text-xs font-medium ${getNextTestColor()}`}>
            {formatDaysText(daysUntilNextTest, true)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LastBloodTestCard;
