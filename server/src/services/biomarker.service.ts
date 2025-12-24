import { BIOMARKER_PATTERNS } from '../config/biomarkers.js';

export interface ExtractedBiomarker {
  name: string;
  displayName: string;
  value: number;
  unit: string;
  normalRangeMin: number;
  normalRangeMax: number;
  category: string;
  confidence: number;
  rawText: string;
}

export function extractBiomarkers(ocrText: string): ExtractedBiomarker[] {
  const extracted: ExtractedBiomarker[] = [];
  const foundBiomarkers = new Set<string>();

  // Normalize whitespace but preserve some structure
  const normalizedText = ocrText
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ');

  for (const biomarker of BIOMARKER_PATTERNS) {
    // Skip if already found this biomarker
    if (foundBiomarkers.has(biomarker.name)) {
      continue;
    }

    for (const pattern of biomarker.patterns) {
      const match = normalizedText.match(pattern);

      if (match) {
        let value = parseFloat(match[1]);

        // Skip if value is NaN
        if (isNaN(value)) {
          continue;
        }

        const detectedUnit = match[2] || '';

        // Apply unit conversion if needed
        if (biomarker.convertValue) {
          value = biomarker.convertValue(value, detectedUnit);
        }

        // Validate against expected range (catches OCR errors)
        if (biomarker.minValidValue !== undefined && value < biomarker.minValidValue) {
          continue;
        }
        if (biomarker.maxValidValue !== undefined && value > biomarker.maxValidValue) {
          continue;
        }

        // Round to reasonable precision
        value = Math.round(value * 100) / 100;

        extracted.push({
          name: biomarker.name,
          displayName: biomarker.displayName,
          value,
          unit: biomarker.unit,
          normalRangeMin: biomarker.normalRangeMin,
          normalRangeMax: biomarker.normalRangeMax,
          category: biomarker.category,
          confidence: 0.85,
          rawText: match[0].trim().substring(0, 100), // Limit raw text length
        });

        foundBiomarkers.add(biomarker.name);
        break; // Found this biomarker, move to next
      }
    }
  }

  return extracted;
}
