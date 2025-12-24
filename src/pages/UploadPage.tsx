// pages/UploadPage.tsx

import React, { useState } from 'react';
import { ManualEntry } from '../components/upload/ManualEntry';
import { PDFUpload, ExtractedBiomarker } from '../components/upload/PDFUpload';
import { FileText, Edit3, ArrowRight } from 'lucide-react';

type EntryMode = 'select' | 'pdf' | 'manual';

export const UploadPage: React.FC = () => {
  const [mode, setMode] = useState<EntryMode>('select');
  const [extractedBiomarkers, setExtractedBiomarkers] = useState<ExtractedBiomarker[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleExtracted = (biomarkers: ExtractedBiomarker[]) => {
    setExtractedBiomarkers(biomarkers);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleBack = () => {
    setMode('select');
    setExtractedBiomarkers([]);
    setError(null);
  };

  // Mode selection screen
  if (mode === 'select') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Enter Your Blood Test Results
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you'd like to input your lab results
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* PDF Upload Option */}
          <button
            onClick={() => setMode('pdf')}
            className="group p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <FileText className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Upload PDF
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-gray-600">
              Upload your lab report PDF and we'll automatically extract biomarker values using OCR
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 font-medium">
              <span className="px-2 py-1 bg-blue-50 rounded">Recommended</span>
            </div>
          </button>

          {/* Manual Entry Option */}
          <button
            onClick={() => setMode('manual')}
            className="group p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-400 hover:shadow-lg transition-all text-left"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Edit3 className="w-7 h-7 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              Enter Manually
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-gray-600">
              Type in your biomarker values directly from your lab report
            </p>
          </button>
        </div>
      </div>
    );
  }

  // PDF Upload mode
  if (mode === 'pdf') {
    // If we have extracted biomarkers, show ManualEntry pre-populated
    if (extractedBiomarkers.length > 0) {
      return (
        <ManualEntry
          initialBiomarkers={extractedBiomarkers}
          showReviewMessage={true}
          onBack={handleBack}
        />
      );
    }

    return (
      <PDFUpload
        onExtracted={handleExtracted}
        onError={handleError}
        onBack={handleBack}
      />
    );
  }

  // Manual entry mode
  return <ManualEntry onBack={handleBack} />;
};
