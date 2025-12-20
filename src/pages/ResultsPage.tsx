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
