// components/upload/ManualEntry.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Biomarker } from '../../types/bloodTest';
import { calculateBiomarkerStatus } from '../../data/sampleBloodTest';
import { MinimalDisclaimer } from '../landing/Disclaimer';
import { Plus, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';

interface BiomarkerInput {
  name: string;
  displayName: string;
  value: string;
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  category: string;
}

interface ExtractedBiomarker {
  name: string;
  displayName: string;
  value: number;
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  category: string;
  confidence?: number;
  rawText?: string;
}

interface ManualEntryProps {
  initialBiomarkers?: ExtractedBiomarker[];
  showReviewMessage?: boolean;
  onBack?: () => void;
}

const commonBiomarkers: Omit<BiomarkerInput, 'value'>[] = [
  // CBC
  { name: 'wbc', displayName: 'White Blood Cells (WBC)', unit: 'x10^9/L', normalRangeMin: 4.5, normalRangeMax: 11.0, category: 'Complete Blood Count' },
  { name: 'rbc', displayName: 'Red Blood Cells (RBC)', unit: 'x10^12/L', normalRangeMin: 4.2, normalRangeMax: 6.1, category: 'Complete Blood Count' },
  { name: 'hemoglobin', displayName: 'Hemoglobin', unit: 'g/L', normalRangeMin: 120, normalRangeMax: 180, category: 'Complete Blood Count' },
  { name: 'hematocrit', displayName: 'Hematocrit', unit: '%', normalRangeMin: 37, normalRangeMax: 52, category: 'Complete Blood Count' },
  { name: 'platelets', displayName: 'Platelets', unit: 'x10^9/L', normalRangeMin: 150, normalRangeMax: 400, category: 'Complete Blood Count' },
  // Metabolic
  { name: 'glucose', displayName: 'Glucose (Fasting)', unit: 'mmol/L', normalRangeMin: 3.9, normalRangeMax: 5.6, category: 'Metabolic Panel' },
  { name: 'creatinine', displayName: 'Creatinine', unit: 'μmol/L', normalRangeMin: 44, normalRangeMax: 106, category: 'Metabolic Panel' },
  { name: 'egfr', displayName: 'eGFR', unit: 'mL/min/1.73m²', normalRangeMin: 60, normalRangeMax: 120, category: 'Metabolic Panel' },
  // Lipid
  { name: 'total_cholesterol', displayName: 'Total Cholesterol', unit: 'mmol/L', normalRangeMin: 0, normalRangeMax: 5.2, category: 'Lipid Panel' },
  { name: 'ldl', displayName: 'LDL Cholesterol', unit: 'mmol/L', normalRangeMin: 0, normalRangeMax: 3.4, category: 'Lipid Panel' },
  { name: 'hdl', displayName: 'HDL Cholesterol', unit: 'mmol/L', normalRangeMin: 1.0, normalRangeMax: 3.0, category: 'Lipid Panel' },
  { name: 'triglycerides', displayName: 'Triglycerides', unit: 'mmol/L', normalRangeMin: 0, normalRangeMax: 1.7, category: 'Lipid Panel' },
  // Thyroid
  { name: 'tsh', displayName: 'TSH', unit: 'mIU/L', normalRangeMin: 0.4, normalRangeMax: 4.0, category: 'Thyroid Function' },
  // Liver
  { name: 'alt', displayName: 'ALT', unit: 'U/L', normalRangeMin: 7, normalRangeMax: 56, category: 'Liver Function' },
  { name: 'ast', displayName: 'AST', unit: 'U/L', normalRangeMin: 10, normalRangeMax: 40, category: 'Liver Function' },
];

export const ManualEntry: React.FC<ManualEntryProps> = ({
  initialBiomarkers = [],
  showReviewMessage = false,
  onBack,
}) => {
  const navigate = useNavigate();
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [labName, setLabName] = useState('');
  const [selectedBiomarkers, setSelectedBiomarkers] = useState<BiomarkerInput[]>(() => {
    if (initialBiomarkers.length > 0) {
      return initialBiomarkers.map((b) => ({
        name: b.name,
        displayName: b.displayName,
        value: b.value.toString(),
        unit: b.unit,
        normalRangeMin: b.normalRangeMin,
        normalRangeMax: b.normalRangeMax,
        category: b.category,
      }));
    }
    return [];
  });
  const [showBiomarkerSelector, setShowBiomarkerSelector] = useState(initialBiomarkers.length === 0);

  const handleAddBiomarker = (biomarker: Omit<BiomarkerInput, 'value'>) => {
    setSelectedBiomarkers(prev => [...prev, { ...biomarker, value: '' }]);
  };

  const handleRemoveBiomarker = (index: number) => {
    setSelectedBiomarkers(prev => prev.filter((_, i) => i !== index));
  };

  const handleValueChange = (index: number, value: string) => {
    setSelectedBiomarkers(prev => prev.map((marker, i) =>
      i === index ? { ...marker, value } : marker
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert to Biomarker format
    const biomarkers: Biomarker[] = selectedBiomarkers
      .filter(marker => marker.value !== '')
      .map(marker => {
        const value = parseFloat(marker.value);
        return {
          name: marker.name,
          displayName: marker.displayName,
          value,
          unit: marker.unit,
          normalRangeMin: marker.normalRangeMin,
          normalRangeMax: marker.normalRangeMax,
          status: calculateBiomarkerStatus(value, marker.normalRangeMin, marker.normalRangeMax),
          category: marker.category
        };
      });

    if (biomarkers.length === 0) {
      alert('Please enter at least one biomarker value');
      return;
    }

    // Navigate to results with state
    navigate('/results', {
      state: {
        biomarkers,
        testDate,
        labName
      }
    });
  };

  const availableBiomarkers = commonBiomarkers.filter(
    cb => !selectedBiomarkers.some(sb => sb.name === cb.name)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            ← Back to options
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {showReviewMessage ? 'Review Extracted Results' : 'Enter Your Blood Test Results'}
        </h1>
        <p className="text-gray-600">
          {showReviewMessage
            ? 'We extracted these values from your PDF. Please review and correct any errors before continuing.'
            : 'Manually enter your biomarker values from your lab report'}
        </p>
        <MinimalDisclaimer />
      </div>

      {showReviewMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-800">
              Successfully extracted {selectedBiomarkers.length} biomarker{selectedBiomarkers.length !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-green-700 mt-1">
              Review the values below and make any corrections needed. You can also add additional biomarkers.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Test Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Date
              </label>
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lab Name (Optional)
              </label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                placeholder="e.g., LifeLabs, Quest Diagnostics"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Biomarker Values */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Biomarker Values</h2>
            <button
              type="button"
              onClick={() => setShowBiomarkerSelector(!showBiomarkerSelector)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Biomarker
            </button>
          </div>

          {showBiomarkerSelector && availableBiomarkers.length > 0 && (
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-medium mb-3">Select biomarkers to add:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availableBiomarkers.map((biomarker) => (
                  <button
                    key={biomarker.name}
                    type="button"
                    onClick={() => {
                      handleAddBiomarker(biomarker);
                      if (availableBiomarkers.length === 1) {
                        setShowBiomarkerSelector(false);
                      }
                    }}
                    className="text-left px-3 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                  >
                    {biomarker.displayName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedBiomarkers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No biomarkers added yet. Click "Add Biomarker" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedBiomarkers.map((marker, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {marker.displayName}
                      </label>
                      <p className="text-xs text-gray-500">
                        Normal range: {marker.normalRangeMin} - {marker.normalRangeMax} {marker.unit}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Value
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          value={marker.value}
                          onChange={(e) => handleValueChange(index, e.target.value)}
                          placeholder="0.0"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {marker.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBiomarker(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Remove biomarker"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={selectedBiomarkers.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            <Save className="w-5 h-5" />
            Generate Analysis
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
