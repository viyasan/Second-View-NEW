// utils/organMapping.ts
// Maps biomarkers to organ systems for the dashboard visualization

import { Biomarker } from '../types/bloodTest';

export type OrganSystem = 'heart' | 'liver' | 'kidneys' | 'thyroid' | 'vitamins' | 'blood';

export interface OrganHealth {
  organ: OrganSystem;
  displayName: string;
  status: 'good' | 'warning' | 'critical';
  biomarkers: Biomarker[];
  inRangeCount: number;
  totalCount: number;
  percentage: number;
}

// Biomarker to organ system mapping
export const ORGAN_BIOMARKER_MAP: Record<OrganSystem, string[]> = {
  heart: [
    'ldl',
    'hdl',
    'total_cholesterol',
    'triglycerides',
    'potassium',
    'sodium',
    'calcium'
  ],
  liver: [
    'alt',
    'ast',
    'albumin',
    'bilirubin'
  ],
  kidneys: [
    'creatinine',
    'egfr',
    'uric_acid'
  ],
  thyroid: [
    'tsh'
  ],
  vitamins: [
    'vitamin_d',
    'vitamin_b12',
    'iron',
    'ferritin'
  ],
  blood: [
    'wbc',
    'rbc',
    'hemoglobin',
    'hematocrit',
    'platelets',
    'glucose',
    'hba1c'
  ]
};

// Display names for organ systems
export const ORGAN_DISPLAY_NAMES: Record<OrganSystem, string> = {
  heart: 'Heart',
  liver: 'Liver & Kidneys',
  kidneys: 'Kidneys',
  thyroid: 'Thyroid',
  vitamins: 'Vitamins',
  blood: 'Blood Health'
};

// Tab configuration - combining liver and kidneys as per user request
export const DASHBOARD_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'heart', label: 'Heart' },
  { id: 'liver', label: 'Liver' },
  { id: 'thyroid', label: 'Thyroid' },
  { id: 'vitamins', label: 'Vitamins' }
] as const;

export type TabId = typeof DASHBOARD_TABS[number]['id'];

// Biomarker importance weights for health score calculation
export const BIOMARKER_WEIGHTS: Record<string, number> = {
  // Critical markers (2x weight)
  glucose: 2,
  hba1c: 2,
  potassium: 2,
  creatinine: 2,
  egfr: 2,
  sodium: 2,
  hemoglobin: 2,

  // High importance (1.5x weight)
  ldl: 1.5,
  total_cholesterol: 1.5,
  triglycerides: 1.5,
  tsh: 1.5,

  // Moderate importance (1x weight) - default
  hdl: 1,
  alt: 1,
  ast: 1,
  albumin: 1,
  bilirubin: 1,
  vitamin_d: 1,
  vitamin_b12: 1,
  iron: 1,
  ferritin: 1,
  calcium: 1,
  wbc: 1,
  rbc: 1,
  hematocrit: 1,
  platelets: 1,
  uric_acid: 1
};

/**
 * Calculate health score based on biomarkers
 * Uses weighted scoring where critical markers count more
 */
export function calculateHealthScore(biomarkers: Biomarker[]): {
  score: number;
  label: string;
  description: string;
} {
  if (biomarkers.length === 0) {
    return { score: 0, label: 'No Data', description: 'Upload your blood test to see your health score' };
  }

  let totalWeight = 0;
  let weightedInRange = 0;

  biomarkers.forEach(marker => {
    const weight = BIOMARKER_WEIGHTS[marker.name] || 1;
    totalWeight += weight;

    if (marker.status === 'normal') {
      weightedInRange += weight;
    } else if (marker.status === 'borderline-high' || marker.status === 'borderline-low') {
      // Borderline markers get partial credit (50%)
      weightedInRange += weight * 0.5;
    }
    // High/low markers get 0 credit
  });

  const score = Math.round((weightedInRange / totalWeight) * 100);

  let label: string;
  let description: string;

  if (score >= 90) {
    label = 'Excellent';
    description = 'Your biomarkers are in great shape!';
  } else if (score >= 75) {
    label = 'Good Standing';
    description = 'Most markers are healthy with room for improvement';
  } else if (score >= 60) {
    label = 'Fair';
    description = 'Some markers need attention';
  } else if (score >= 40) {
    label = 'Needs Attention';
    description = 'Several markers require follow-up with your doctor';
  } else {
    label = 'Consult Doctor';
    description = 'Please discuss these results with your healthcare provider';
  }

  return { score, label, description };
}

/**
 * Get biomarkers for a specific organ system
 */
export function getBiomarkersForOrgan(
  biomarkers: Biomarker[],
  organ: OrganSystem
): Biomarker[] {
  const organBiomarkerNames = ORGAN_BIOMARKER_MAP[organ];
  return biomarkers.filter(b => organBiomarkerNames.includes(b.name));
}

/**
 * Calculate health status for an organ system
 */
export function getOrganHealth(
  biomarkers: Biomarker[],
  organ: OrganSystem
): OrganHealth {
  const organBiomarkers = getBiomarkersForOrgan(biomarkers, organ);
  const inRangeCount = organBiomarkers.filter(b => b.status === 'normal').length;
  const totalCount = organBiomarkers.length;
  const percentage = totalCount > 0 ? Math.round((inRangeCount / totalCount) * 100) : 100;

  let status: 'good' | 'warning' | 'critical';

  if (percentage >= 80) {
    status = 'good';
  } else if (percentage >= 50) {
    status = 'warning';
  } else {
    status = 'critical';
  }

  // Check for any critical (high/low) markers
  const hasCriticalMarker = organBiomarkers.some(b =>
    b.status === 'high' || b.status === 'low'
  );

  if (hasCriticalMarker && status === 'good') {
    status = 'warning';
  }

  return {
    organ,
    displayName: ORGAN_DISPLAY_NAMES[organ],
    status,
    biomarkers: organBiomarkers,
    inRangeCount,
    totalCount,
    percentage
  };
}

/**
 * Get health status for all organs
 */
export function getAllOrganHealth(biomarkers: Biomarker[]): Record<OrganSystem, OrganHealth> {
  const organs: OrganSystem[] = ['heart', 'liver', 'kidneys', 'thyroid', 'vitamins', 'blood'];

  return organs.reduce((acc, organ) => {
    acc[organ] = getOrganHealth(biomarkers, organ);
    return acc;
  }, {} as Record<OrganSystem, OrganHealth>);
}

/**
 * Get combined liver and kidneys health (for the Liver tab)
 */
export function getLiverKidneysHealth(biomarkers: Biomarker[]): OrganHealth {
  const liverHealth = getOrganHealth(biomarkers, 'liver');
  const kidneysHealth = getOrganHealth(biomarkers, 'kidneys');

  const combinedBiomarkers = [...liverHealth.biomarkers, ...kidneysHealth.biomarkers];
  const inRangeCount = liverHealth.inRangeCount + kidneysHealth.inRangeCount;
  const totalCount = liverHealth.totalCount + kidneysHealth.totalCount;
  const percentage = totalCount > 0 ? Math.round((inRangeCount / totalCount) * 100) : 100;

  let status: 'good' | 'warning' | 'critical';
  if (liverHealth.status === 'critical' || kidneysHealth.status === 'critical') {
    status = 'critical';
  } else if (liverHealth.status === 'warning' || kidneysHealth.status === 'warning') {
    status = 'warning';
  } else {
    status = 'good';
  }

  return {
    organ: 'liver',
    displayName: 'Liver & Kidneys',
    status,
    biomarkers: combinedBiomarkers,
    inRangeCount,
    totalCount,
    percentage
  };
}

/**
 * Calculate days since test and next test date
 */
export function calculateTestDates(testDate: string): {
  daysSinceTest: number;
  nextTestDate: Date;
  daysUntilNextTest: number;
  formattedTestDate: string;
  formattedNextTestDate: string;
} {
  const test = new Date(testDate);
  const today = new Date();
  const diffTime = today.getTime() - test.getTime();
  const daysSinceTest = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Next test is 6 months from test date
  const nextTestDate = new Date(test);
  nextTestDate.setMonth(nextTestDate.getMonth() + 6);

  const daysUntilNextTest = Math.ceil(
    (nextTestDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return {
    daysSinceTest,
    nextTestDate,
    daysUntilNextTest,
    formattedTestDate: formatDate(test),
    formattedNextTestDate: formatDate(nextTestDate)
  };
}

/**
 * Get biomarker summary stats
 */
export function getBiomarkerSummary(biomarkers: Biomarker[]): {
  total: number;
  inRange: number;
  flagged: number;
  borderline: number;
  critical: number;
} {
  const total = biomarkers.length;
  const inRange = biomarkers.filter(b => b.status === 'normal').length;
  const borderline = biomarkers.filter(b =>
    b.status === 'borderline-high' || b.status === 'borderline-low'
  ).length;
  const critical = biomarkers.filter(b =>
    b.status === 'high' || b.status === 'low'
  ).length;
  const flagged = borderline + critical;

  return { total, inRange, flagged, borderline, critical };
}
