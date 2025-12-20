// pages/DemoPage.tsx

import React, { useState, useEffect } from 'react';
import { ResultsDashboard } from '../components/analysis/ResultsDashboard';
import { sampleBloodTest, sampleBiomarkers } from '../data/sampleBloodTest';
import { analyzeBloodTest, generateBasicAnalysis } from '../lib/claude';
import { Loader2 } from 'lucide-react';

export const DemoPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnalysis = async () => {
      try {
        // Try AI analysis
        const result = await analyzeBloodTest({
          biomarkers: sampleBiomarkers
        });
        setAnalysis(result);
      } catch (error) {
        console.error('AI analysis failed, using basic analysis:', error);
        // Fallback to basic analysis
        const basicResult = generateBasicAnalysis(sampleBiomarkers);
        setAnalysis(basicResult);
      } finally {
        setIsLoading(false);
      }
    };

    getAnalysis();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing sample blood test results...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 border-b border-blue-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-200 text-blue-800 text-sm font-semibold rounded-full">
              DEMO
            </span>
            <p className="text-blue-900">
              This is a sample analysis. Upload your own test to get personalized results.
            </p>
          </div>
        </div>
      </div>
      <ResultsDashboard
        biomarkers={sampleBiomarkers}
        aiAnalysis={analysis}
        testDate={sampleBloodTest.testDate}
        labName={sampleBloodTest.labName}
      />
    </div>
  );
};
