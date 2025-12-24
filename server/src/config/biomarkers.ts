// Biomarker extraction patterns matching the frontend's commonBiomarkers
// Improved patterns to handle various lab report formats and OCR artifacts

export interface BiomarkerPattern {
  name: string;
  displayName: string;
  patterns: RegExp[];
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  category: string;
  convertValue?: (value: number, detectedUnit: string) => number;
  // Validation: reject values outside this range (catches OCR errors)
  minValidValue?: number;
  maxValidValue?: number;
}

export const BIOMARKER_PATTERNS: BiomarkerPattern[] = [
  // Complete Blood Count
  {
    name: 'wbc',
    displayName: 'White Blood Cells (WBC)',
    patterns: [
      // "Total Leukocyte Count (TLC) 5.00 thou/mm3"
      /total\s*leuk?ocyte\s*count\s*\(?tlc\)?\s*([\d.]+)\s*(thou\/mm3|x?\s*10\^?9\/?L|thousand\/μL|K\/μL)?/i,
      // "WBC 5.0 x10^9/L"
      /(?:white\s*blood\s*cells?|wbc|leucocytes?|leukocytes?)\s*[:\-]?\s*([\d.]+)\s*(x?\s*10\^?9\/?L|thousand\/μL|K\/μL|thou\/mm3)?/i,
      /wbc\s*count\s*[:\-]?\s*([\d.]+)/i,
    ],
    unit: 'x10^9/L',
    normalRangeMin: 4.5,
    normalRangeMax: 11.0,
    category: 'Complete Blood Count',
    minValidValue: 1,
    maxValidValue: 50,
  },
  {
    name: 'rbc',
    displayName: 'Red Blood Cells (RBC)',
    patterns: [
      // "RBC Count 5.00 million/mm3"
      /rbc\s*count\s*[:\-]?\s*([\d.]+)\s*(million\/mm3|x?\s*10\^?12\/?L|million\/μL|M\/μL)?/i,
      /(?:red\s*blood\s*cells?|rbc|erythrocytes?)\s*[:\-]?\s*([\d.]+)\s*(million\/mm3|x?\s*10\^?12\/?L|million\/μL|M\/μL)?/i,
    ],
    unit: 'x10^12/L',
    normalRangeMin: 4.2,
    normalRangeMax: 6.1,
    category: 'Complete Blood Count',
    minValidValue: 2,
    maxValidValue: 10,
  },
  {
    name: 'hemoglobin',
    displayName: 'Hemoglobin',
    patterns: [
      // "Hemoglobin 15.00 g/dL" or "Hemoglobin 150 g/L"
      /(?:hemoglobin|haemoglobin|hgb|hb)\s*[:\-]?\s*([\d.]+)\s*(g\/dL|g\/L|gm\/dL|Bl)?/i,
    ],
    unit: 'g/L',
    normalRangeMin: 120,
    normalRangeMax: 180,
    category: 'Complete Blood Count',
    convertValue: (val: number, unit: string) => {
      // If value is in typical g/dL range (8-20), convert to g/L
      if (val >= 8 && val <= 20) {
        return val * 10;
      }
      // Already in g/L range
      return val;
    },
    minValidValue: 5,
    maxValidValue: 250,
  },
  {
    name: 'hematocrit',
    displayName: 'Hematocrit',
    patterns: [
      // "Packed Cell Volume (PCV) 45.00 %"
      /(?:packed\s*cell\s*volume|pcv|hematocrit|haematocrit|hct)\s*\(?(?:pcv)?\)?\s*[:\-]?\s*([\d.]+)\s*(%|L\/L)?/i,
    ],
    unit: '%',
    normalRangeMin: 37,
    normalRangeMax: 52,
    category: 'Complete Blood Count',
    convertValue: (val: number, unit: string) =>
      unit?.toLowerCase().includes('l/l') ? val * 100 : val,
    minValidValue: 20,
    maxValidValue: 70,
  },
  {
    name: 'platelets',
    displayName: 'Platelets',
    patterns: [
      // "Platelet Count 151 thou/mm3"
      /platelet\s*count\s*[:\-]?\s*([\d.]+)\s*(thou\/mm3|x?\s*10\^?9\/?L|thousand\/μL|K\/μL)?/i,
      /(?:platelets?|plt|thrombocytes?)\s*[:\-]?\s*([\d.]+)\s*(thou\/mm3|x?\s*10\^?9\/?L|thousand\/μL|K\/μL)?/i,
    ],
    unit: 'x10^9/L',
    normalRangeMin: 150,
    normalRangeMax: 400,
    category: 'Complete Blood Count',
    minValidValue: 50,
    maxValidValue: 800,
  },

  // Metabolic Panel
  {
    name: 'glucose',
    displayName: 'Glucose (Fasting)',
    patterns: [
      // "Glucose Fasting 80.00 mg/dL"
      /glucose\s*(?:fasting|,?\s*f)?\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L|g\/dL)?/i,
      /(?:fasting\s*glucose|fbs|fbg|blood\s*sugar)\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
    ],
    unit: 'mmol/L',
    normalRangeMin: 3.9,
    normalRangeMax: 5.6,
    category: 'Metabolic Panel',
    convertValue: (val: number, unit: string) => {
      // If value is in mg/dL range (typically 50-300), convert
      if (val >= 40 && val <= 500) {
        return Math.round((val / 18.0) * 100) / 100;
      }
      return val;
    },
    minValidValue: 1,
    maxValidValue: 50,
  },
  {
    name: 'creatinine',
    displayName: 'Creatinine',
    patterns: [
      // "Creatinine 1.00 mg/dL"
      /creatinine\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|μmol\/L|umol\/L|\/dL)?/i,
    ],
    unit: 'μmol/L',
    normalRangeMin: 44,
    normalRangeMax: 106,
    category: 'Metabolic Panel',
    convertValue: (val: number, unit: string) => {
      // If value is in mg/dL range (0.5-15), convert to μmol/L
      if (val >= 0.3 && val <= 20) {
        return Math.round(val * 88.4 * 100) / 100;
      }
      return val;
    },
    minValidValue: 20,
    maxValidValue: 2000,
  },
  {
    name: 'egfr',
    displayName: 'eGFR',
    patterns: [
      // "GFR Estimated 107 mL/min"
      /(?:e?gfr|estimated\s*gfr|gfr\s*estimated|glomerular\s*filtration)\s*[:\-]?\s*([\d.]+)\s*(mL\/min(?:\/1\.73m²)?)?/i,
    ],
    unit: 'mL/min/1.73m²',
    normalRangeMin: 60,
    normalRangeMax: 120,
    category: 'Metabolic Panel',
    minValidValue: 5,
    maxValidValue: 200,
  },

  // Lipid Panel - More specific patterns to avoid false matches
  {
    name: 'total_cholesterol',
    displayName: 'Total Cholesterol',
    patterns: [
      // "Cholesterol, Total 100.00 mg/dL" - prioritize this format
      /cholesterol[,\s]+total\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
      // "Total Cholesterol 100 mg/dL"
      /total\s*cholesterol\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
    ],
    unit: 'mmol/L',
    normalRangeMin: 0,
    normalRangeMax: 5.2,
    category: 'Lipid Panel',
    convertValue: (val: number, unit: string) => {
      // If value is in mg/dL range (typically 100-350), convert
      if (val >= 50 && val <= 500) {
        return Math.round((val / 38.67) * 100) / 100;
      }
      return val;
    },
    minValidValue: 1,
    maxValidValue: 15,
  },
  {
    name: 'ldl',
    displayName: 'LDL Cholesterol',
    patterns: [
      // "LDL Cholesterol, Calculated 50 mg/dL"
      /ldl\s*cholesterol[,\s]*(?:calculated|direct)?\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
      // "LDL-C 50 mg/dL"
      /ldl[\s\-]*c(?:holesterol)?\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
    ],
    unit: 'mmol/L',
    normalRangeMin: 0,
    normalRangeMax: 3.4,
    category: 'Lipid Panel',
    convertValue: (val: number, unit: string) => {
      // If value is in mg/dL range (typically 30-250), convert
      if (val >= 20 && val <= 400) {
        return Math.round((val / 38.67) * 100) / 100;
      }
      return val;
    },
    minValidValue: 0.5,
    maxValidValue: 12,
  },
  {
    name: 'hdl',
    displayName: 'HDL Cholesterol',
    patterns: [
      // "HDL Cholesterol 50 mg/dL"
      /hdl\s*cholesterol\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
      // "HDL-C 50 mg/dL"
      /hdl[\s\-]*c(?:holesterol)?\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
    ],
    unit: 'mmol/L',
    normalRangeMin: 1.0,
    normalRangeMax: 3.0,
    category: 'Lipid Panel',
    convertValue: (val: number, unit: string) => {
      // If value is in mg/dL range (typically 25-100), convert
      if (val >= 15 && val <= 150) {
        return Math.round((val / 38.67) * 100) / 100;
      }
      return val;
    },
    minValidValue: 0.3,
    maxValidValue: 5,
  },
  {
    name: 'triglycerides',
    displayName: 'Triglycerides',
    patterns: [
      // "Triglycerides 150 mg/dL"
      /triglycerides?\s*[:\-]?\s*([\d.]+)\s*(mg\/dL|mmol\/L)?/i,
    ],
    unit: 'mmol/L',
    normalRangeMin: 0,
    normalRangeMax: 1.7,
    category: 'Lipid Panel',
    convertValue: (val: number, unit: string) => {
      // If value is in mg/dL range (typically 50-500), convert
      if (val >= 30 && val <= 1000) {
        return Math.round((val / 88.57) * 100) / 100;
      }
      return val;
    },
    minValidValue: 0.2,
    maxValidValue: 15,
  },

  // Thyroid Function
  {
    name: 'tsh',
    displayName: 'TSH',
    patterns: [
      // "TSH 3.00 μIU/mL"
      /\btsh\b\s*[:\-]?\s*([\d.]+)\s*(mIU\/L|μIU\/mL|uIU\/mL|piU\/mL)?/i,
      /thyroid\s*stimulating\s*hormone\s*[:\-]?\s*([\d.]+)/i,
    ],
    unit: 'mIU/L',
    normalRangeMin: 0.4,
    normalRangeMax: 4.0,
    category: 'Thyroid Function',
    minValidValue: 0.01,
    maxValidValue: 100,
  },

  // Liver Function
  {
    name: 'alt',
    displayName: 'ALT',
    patterns: [
      // "ALT (SGPT) 40.0 U/L"
      /alt\s*\(?sgpt\)?\s*[:\-]?\s*([\d.]+)\s*(U\/L|IU\/L)?/i,
      /sgpt\s*\(?alt\)?\s*[:\-]?\s*([\d.]+)\s*(U\/L|IU\/L)?/i,
      /alanine\s*aminotransferase\s*[:\-]?\s*([\d.]+)/i,
    ],
    unit: 'U/L',
    normalRangeMin: 7,
    normalRangeMax: 56,
    category: 'Liver Function',
    minValidValue: 1,
    maxValidValue: 1000,
  },
  {
    name: 'ast',
    displayName: 'AST',
    patterns: [
      // "AST (SGOT) 30.0 U/L"
      /ast\s*\(?sgot\)?\s*[:\-]?\s*([\d.]+)\s*(U\/L|IU\/L)?/i,
      /sgot\s*\(?ast\)?\s*[:\-]?\s*([\d.]+)\s*(U\/L|IU\/L)?/i,
      /aspartate\s*aminotransferase\s*[:\-]?\s*([\d.]+)/i,
    ],
    unit: 'U/L',
    normalRangeMin: 10,
    normalRangeMax: 40,
    category: 'Liver Function',
    minValidValue: 1,
    maxValidValue: 1000,
  },
];
