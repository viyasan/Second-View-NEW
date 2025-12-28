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
  getBiomarkersForOrgan,
  OrganSystem,
  ORGAN_BIOMARKER_MAP,
  BIOMARKER_INFO,
  CATEGORY_INFO
} from '../../utils/organMapping';

import { BodyVisualization } from './BodyVisualization';
import { HealthScoreCard } from './HealthScoreCard';
import { BioMarkersSummaryCard } from './BioMarkersSummaryCard';
import { LastBloodTestCard } from './LastBloodTestCard';
import { BiomarkerCard } from './BiomarkerCard';
import { DashboardTabsPill } from './DashboardTabs';
import { DetailsSection } from './ExpandableDetails';
import { Search, Bell, Lightbulb, CheckCircle2 } from 'lucide-react';

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

  const [selectedBiomarker, setSelectedBiomarker] = useState<string | null>(null);

  // Calculate all derived data
  const healthScore = useMemo(() => calculateHealthScore(biomarkers), [biomarkers]);
  const biomarkerSummary = useMemo(() => getBiomarkerSummary(biomarkers), [biomarkers]);
  const testDates = useMemo(() => calculateTestDates(testDate), [testDate]);
  const organHealth = useMemo(() => getAllOrganHealth(biomarkers), [biomarkers]);
  const liverKidneysHealth = useMemo(() => getLiverKidneysHealth(biomarkers), [biomarkers]);

  // Get biomarkers for the current tab
  const getTabBiomarkers = useMemo(() => {
    const tabToOrgans: Record<TabId, OrganSystem[]> = {
      overview: [],
      heart: ['heart'],
      liver: ['liver', 'kidneys'],
      thyroid: ['thyroid'],
      vitamins: ['vitamins']
    };

    const organs = tabToOrgans[activeTab];
    if (organs.length === 0) return [];

    return organs.flatMap(organ => getBiomarkersForOrgan(biomarkers, organ));
  }, [activeTab, biomarkers]);

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
    setSelectedBiomarker(null); // Reset selected biomarker when changing tabs

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

  // Handle biomarker card click
  const handleBiomarkerClick = (biomarkerName: string) => {
    setSelectedBiomarker(biomarkerName === selectedBiomarker ? null : biomarkerName);
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
            {/* Overview Tab - Show summary cards */}
            {activeTab === 'overview' ? (
              <>
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

                {/* Overview Details Section */}
                <DetailsSection>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-charcoal mb-2">
                      {CATEGORY_INFO.overview.title}
                    </h3>
                    <p className="text-warm-gray-600 mb-4">
                      {CATEGORY_INFO.overview.description}
                    </p>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                      <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-2">Quick Tips</p>
                        <ul className="space-y-1">
                          {CATEGORY_INFO.overview.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-blue-800 flex items-center gap-2">
                              <span className="w-1 h-1 bg-blue-400 rounded-full" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </DetailsSection>
              </>
            ) : (
              <>
                {/* Category Tab - Show biomarker cards */}
                <div className={`grid gap-4 mb-6 ${
                  getTabBiomarkers.length <= 2 ? 'grid-cols-2' :
                  getTabBiomarkers.length <= 4 ? 'grid-cols-2 lg:grid-cols-4' :
                  'grid-cols-2 lg:grid-cols-3'
                }`}>
                  {getTabBiomarkers.map((biomarker) => (
                    <BiomarkerCard
                      key={biomarker.name}
                      biomarker={biomarker}
                      onClick={() => handleBiomarkerClick(biomarker.name)}
                      isSelected={selectedBiomarker === biomarker.name}
                    />
                  ))}
                </div>

                {/* Category Details Section */}
                <DetailsSection>
                  <div className="p-6">
                    {selectedBiomarker && BIOMARKER_INFO[selectedBiomarker] ? (
                      <>
                        <h3 className="text-lg font-semibold text-charcoal mb-2">
                          {BIOMARKER_INFO[selectedBiomarker].displayName}
                        </h3>
                        <p className="text-warm-gray-600 mb-4">
                          {BIOMARKER_INFO[selectedBiomarker].importance}
                        </p>

                        {BIOMARKER_INFO[selectedBiomarker].funFact && (
                          <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl mb-4">
                            <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-purple-900">Did you know?</p>
                              <p className="text-sm text-purple-800">
                                {BIOMARKER_INFO[selectedBiomarker].funFact}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="p-4 bg-green-50 rounded-xl">
                          <p className="text-sm font-medium text-green-900 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Actions You Can Take
                          </p>
                          <ul className="space-y-2">
                            {BIOMARKER_INFO[selectedBiomarker].actions.map((action, i) => (
                              <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-charcoal mb-2">
                          {CATEGORY_INFO[activeTab].title}
                        </h3>
                        <p className="text-warm-gray-600 mb-4">
                          {CATEGORY_INFO[activeTab].description}
                        </p>
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-2">Quick Tips</p>
                            <ul className="space-y-1">
                              {CATEGORY_INFO[activeTab].tips.map((tip, i) => (
                                <li key={i} className="text-sm text-blue-800 flex items-center gap-2">
                                  <span className="w-1 h-1 bg-blue-400 rounded-full" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <p className="text-sm text-warm-gray-400 mt-4 text-center">
                          Click on a biomarker card above to see detailed information
                        </p>
                      </>
                    )}
                  </div>
                </DetailsSection>
              </>
            )}
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
