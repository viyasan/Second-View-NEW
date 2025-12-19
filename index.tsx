// pages/LandingPage.tsx

import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Disclaimer } from '../components/landing/Disclaimer';
import { HowItWorks } from '../components/landing/HowItWorks';

export const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HowItWorks />
        <Disclaimer />
      </div>
    </div>
  );
};

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

// pages/UploadPage.tsx

import React from 'react';
import { ManualEntry } from '../components/upload/ManualEntry';

export const UploadPage: React.FC = () => {
  return <ManualEntry />;
};

// pages/ResultsPage.tsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResultsDashboard } from '../components/analysis/ResultsDashboard';
import { analyzeBloodTest, generateBasicAnalysis } from '../lib/claude';
import { Loader2 } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { biomarkers, testDate, labName } = location.state || {};

  useEffect(() => {
    if (!biomarkers || !testDate) {
      navigate('/upload');
      return;
    }

    const getAnalysis = async () => {
      try {
        const result = await analyzeBloodTest({ biomarkers });
        setAnalysis(result);
      } catch (error) {
        console.error('AI analysis failed, using basic analysis:', error);
        const basicResult = generateBasicAnalysis(biomarkers);
        setAnalysis(basicResult);
      } finally {
        setIsLoading(false);
      }
    };

    getAnalysis();
  }, [biomarkers, testDate, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your blood test results...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <ResultsDashboard
      biomarkers={biomarkers}
      aiAnalysis={analysis}
      testDate={testDate}
      labName={labName}
    />
  );
};
