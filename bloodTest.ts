// types/bloodTest.ts

export interface Biomarker {
  name: string;
  displayName: string;
  value: number;
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  status: 'normal' | 'high' | 'low' | 'borderline-high' | 'borderline-low';
  category: string;
}

export interface BiomarkerReference {
  id: string;
  markerName: string;
  displayName: string;
  description: string;
  normalRangeMin: number;
  normalRangeMax: number;
  unit: string;
  category: string;
  explanationHigh: string;
  explanationLow: string;
  importanceLevel: 'common' | 'specialized';
}

export interface BloodTest {
  id?: string;
  userId?: string;
  createdAt?: string;
  testDate: string;
  labName?: string;
  fileUrl?: string;
  biomarkers: Biomarker[];
  aiAnalysis?: string;
  aiSummary?: string;
}

export interface AnalysisRequest {
  biomarkers: Biomarker[];
  userContext?: {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    symptoms?: string[];
  };
}

export interface AnalysisResponse {
  summary: string;
  biomarkerAnalyses: {
    [key: string]: {
      interpretation: string;
      concernLevel: 'none' | 'monitor' | 'discuss-with-doctor';
      relatedMarkers: string[];
    };
  };
  overallInsights: string[];
  questionsToAskDoctor: string[];
}
