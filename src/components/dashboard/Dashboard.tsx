// components/dashboard/Dashboard.tsx
// Main dashboard component combining all elements

import React, { useState, useMemo } from 'react';
import { Biomarker } from '../../types/bloodTest';
import {
  TabId,
  calculateHealthScore,
  getBiomarkerSummary,
  calculateTestDates,
  getAllOrganHealth,
  getLiverKidneysHealth,
  OrganSystem
} from '../../utils/organMapping';

import { BodyVisualization } from './BodyVisualization';
import { HealthScoreCard } from './HealthScoreCard';
import { BioMarkersSummaryCard } from './BioMarkersSummaryCard';
import { LastBloodTestCard } from './LastBloodTestCard';
import { DashboardTabsPill } from './DashboardTabs';
import { DetailsSection } from './ExpandableDetails';
import { Search, Bell } from 'lucide-react';

interface DashboardProps {
  biomarkers: Biomarker[];
  testDate: string;
  labName?: string;
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  biomarkers,
  testDate,
  labName,
  userName
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [selectedOrgan, setSelectedOrgan] = useState<OrganSystem | null>(null);

  // Calculate all derived data
  const healthScore = useMemo(() => calculateHealthScore(biomarkers), [biomarkers]);
  const biomarkerSummary = useMemo(() => getBiomarkerSummary(biomarkers), [biomarkers]);
  const testDates = useMemo(() => calculateTestDates(testDate), [testDate]);
  const organHealth = useMemo(() => getAllOrganHealth(biomarkers), [biomarkers]);
  // liverKidneysHealth will be used when Liver tab shows combined liver+kidney data
  const _liverKidneysHealth = useMemo(() => getLiverKidneysHealth(biomarkers), [biomarkers]);
  void _liverKidneysHealth; // Suppress unused warning for future use

  // Generate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Handle organ click from body visualization
  const handleOrganClick = (organ: OrganSystem) => {
    setSelectedOrgan(organ === selectedOrgan ? null : organ);

    // Map organ to tab
    const organToTab: Record<OrganSystem, TabId> = {
      heart: 'heart',
      liver: 'liver',
      kidneys: 'liver', // Kidneys grouped with liver
      thyroid: 'thyroid',
      vitamins: 'vitamins',
      blood: 'overview'
    };

    if (organ !== selectedOrgan) {
      setActiveTab(organToTab[organ]);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);

    // Map tab to organ for highlighting
    const tabToOrgan: Record<TabId, OrganSystem | null> = {
      overview: null,
      heart: 'heart',
      liver: 'liver',
      thyroid: 'thyroid',
      vitamins: null
    };

    setSelectedOrgan(tabToOrgan[tab]);
  };

  return (
    <div className="min-h-screen bg-warm-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-warm-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Dashboard Label */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+</span>
                </div>
                <span className="text-lg font-semibold text-charcoal">SecondView</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-warm-gray-100 rounded-full">
                <div className="w-4 h-4 bg-warm-gray-400 rounded" />
                <span className="text-sm font-medium text-warm-gray-600">Dashboard</span>
              </div>
            </div>

            {/* Search & User */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-64 bg-warm-gray-50 border border-warm-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-warm-gray-500 hover:text-warm-gray-700 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Greeting */}
        <h1 className="text-3xl font-semibold text-charcoal mb-6">
          {getGreeting()}, {userName || 'there'}!
        </h1>

        {/* Tabs */}
        <div className="mb-8">
          <DashboardTabsPill activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Body Visualization */}
          <div className="col-span-12 lg:col-span-5">
            <div className="h-[480px]">
              <BodyVisualization
                organHealth={organHealth}
                onOrganClick={handleOrganClick}
                selectedOrgan={selectedOrgan}
              />
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <HealthScoreCard
                score={healthScore.score}
                label={healthScore.label}
                description={healthScore.description}
              />
              <BioMarkersSummaryCard
                total={biomarkerSummary.total}
                inRange={biomarkerSummary.inRange}
                flagged={biomarkerSummary.flagged}
                borderline={biomarkerSummary.borderline}
                critical={biomarkerSummary.critical}
              />
              <LastBloodTestCard
                testDate={testDates.formattedTestDate}
                daysSinceTest={testDates.daysSinceTest}
                nextTestDate={testDates.formattedNextTestDate}
                daysUntilNextTest={testDates.daysUntilNextTest}
              />
            </div>

            {/* Expandable Details Section */}
            <DetailsSection>
              {/* Content will be added here based on tab/selection */}
              {selectedOrgan && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-charcoal mb-4">
                    {organHealth[selectedOrgan]?.displayName} Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {organHealth[selectedOrgan]?.biomarkers.map((marker) => (
                      <div
                        key={marker.name}
                        className="bg-white rounded-xl p-4 border border-warm-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-warm-gray-600">
                            {marker.displayName}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              marker.status === 'normal'
                                ? 'bg-green-100 text-green-700'
                                : marker.status === 'borderline-high' || marker.status === 'borderline-low'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {marker.status === 'normal' ? 'Normal' :
                             marker.status === 'borderline-high' ? 'Borderline High' :
                             marker.status === 'borderline-low' ? 'Borderline Low' :
                             marker.status === 'high' ? 'High' : 'Low'}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-charcoal">
                            {marker.value}
                          </span>
                          <span className="text-sm text-warm-gray-400">
                            {marker.unit}
                          </span>
                        </div>
                        <div className="text-xs text-warm-gray-400 mt-1">
                          Range: {marker.normalRangeMin} - {marker.normalRangeMax} {marker.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </DetailsSection>
          </div>
        </div>

        {/* Lab Info Footer */}
        {labName && (
          <div className="mt-6 text-sm text-warm-gray-400">
            Lab: {labName}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
