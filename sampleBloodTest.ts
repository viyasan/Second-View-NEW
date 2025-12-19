// data/sampleBloodTest.ts

import { BloodTest, Biomarker } from '../types/bloodTest';

export const sampleBiomarkers: Biomarker[] = [
  // Complete Blood Count (CBC)
  {
    name: 'wbc',
    displayName: 'White Blood Cells (WBC)',
    value: 7.2,
    unit: 'x10^9/L',
    normalRangeMin: 4.5,
    normalRangeMax: 11.0,
    status: 'normal',
    category: 'Complete Blood Count'
  },
  {
    name: 'rbc',
    displayName: 'Red Blood Cells (RBC)',
    value: 4.9,
    unit: 'x10^12/L',
    normalRangeMin: 4.2,
    normalRangeMax: 6.1,
    status: 'normal',
    category: 'Complete Blood Count'
  },
  {
    name: 'hemoglobin',
    displayName: 'Hemoglobin',
    value: 148,
    unit: 'g/L',
    normalRangeMin: 120,
    normalRangeMax: 180,
    status: 'normal',
    category: 'Complete Blood Count'
  },
  {
    name: 'hematocrit',
    displayName: 'Hematocrit',
    value: 43,
    unit: '%',
    normalRangeMin: 37,
    normalRangeMax: 52,
    status: 'normal',
    category: 'Complete Blood Count'
  },
  {
    name: 'platelets',
    displayName: 'Platelets',
    value: 245,
    unit: 'x10^9/L',
    normalRangeMin: 150,
    normalRangeMax: 400,
    status: 'normal',
    category: 'Complete Blood Count'
  },

  // Metabolic Panel
  {
    name: 'glucose',
    displayName: 'Glucose (Fasting)',
    value: 5.8,
    unit: 'mmol/L',
    normalRangeMin: 3.9,
    normalRangeMax: 5.6,
    status: 'borderline-high',
    category: 'Metabolic Panel'
  },
  {
    name: 'creatinine',
    displayName: 'Creatinine',
    value: 88,
    unit: 'μmol/L',
    normalRangeMin: 44,
    normalRangeMax: 106,
    status: 'normal',
    category: 'Metabolic Panel'
  },
  {
    name: 'egfr',
    displayName: 'eGFR',
    value: 92,
    unit: 'mL/min/1.73m²',
    normalRangeMin: 60,
    normalRangeMax: 120,
    status: 'normal',
    category: 'Metabolic Panel'
  },

  // Lipid Panel
  {
    name: 'total_cholesterol',
    displayName: 'Total Cholesterol',
    value: 5.4,
    unit: 'mmol/L',
    normalRangeMin: 0,
    normalRangeMax: 5.2,
    status: 'borderline-high',
    category: 'Lipid Panel'
  },
  {
    name: 'ldl',
    displayName: 'LDL Cholesterol',
    value: 3.6,
    unit: 'mmol/L',
    normalRangeMin: 0,
    normalRangeMax: 3.4,
    status: 'borderline-high',
    category: 'Lipid Panel'
  },
  {
    name: 'hdl',
    displayName: 'HDL Cholesterol',
    value: 1.4,
    unit: 'mmol/L',
    normalRangeMin: 1.0,
    normalRangeMax: 3.0,
    status: 'normal',
    category: 'Lipid Panel'
  },
  {
    name: 'triglycerides',
    displayName: 'Triglycerides',
    value: 1.5,
    unit: 'mmol/L',
    normalRangeMin: 0,
    normalRangeMax: 1.7,
    status: 'normal',
    category: 'Lipid Panel'
  },

  // Thyroid
  {
    name: 'tsh',
    displayName: 'TSH (Thyroid Stimulating Hormone)',
    value: 2.1,
    unit: 'mIU/L',
    normalRangeMin: 0.4,
    normalRangeMax: 4.0,
    status: 'normal',
    category: 'Thyroid Function'
  },

  // Liver Function
  {
    name: 'alt',
    displayName: 'ALT (Alanine Aminotransferase)',
    value: 28,
    unit: 'U/L',
    normalRangeMin: 7,
    normalRangeMax: 56,
    status: 'normal',
    category: 'Liver Function'
  },
  {
    name: 'ast',
    displayName: 'AST (Aspartate Aminotransferase)',
    value: 24,
    unit: 'U/L',
    normalRangeMin: 10,
    normalRangeMax: 40,
    status: 'normal',
    category: 'Liver Function'
  }
];

export const sampleBloodTest: BloodTest = {
  testDate: '2024-11-15',
  labName: 'LifeLabs',
  biomarkers: sampleBiomarkers
};

// Helper function to calculate status
export function calculateBiomarkerStatus(
  value: number,
  min: number,
  max: number
): Biomarker['status'] {
  const borderlineThreshold = 0.1; // 10% threshold for borderline
  const range = max - min;
  
  if (value < min) {
    if (value >= min - (range * borderlineThreshold)) {
      return 'borderline-low';
    }
    return 'low';
  }
  
  if (value > max) {
    if (value <= max + (range * borderlineThreshold)) {
      return 'borderline-high';
    }
    return 'high';
  }
  
  return 'normal';
}

// Helper to get status color
export function getStatusColor(status: Biomarker['status']): string {
  switch (status) {
    case 'normal':
      return 'green';
    case 'borderline-high':
    case 'borderline-low':
      return 'yellow';
    case 'high':
    case 'low':
      return 'red';
    default:
      return 'gray';
  }
}

// Helper to get status label
export function getStatusLabel(status: Biomarker['status']): string {
  switch (status) {
    case 'normal':
      return 'Within Normal Range';
    case 'borderline-high':
      return 'Slightly Elevated';
    case 'borderline-low':
      return 'Slightly Below Range';
    case 'high':
      return 'Above Normal Range';
    case 'low':
      return 'Below Normal Range';
    default:
      return 'Unknown';
  }
}
