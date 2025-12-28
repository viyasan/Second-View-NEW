// utils/organMapping.ts
// Maps biomarkers to organ systems for the dashboard visualization

import { Biomarker } from '../types/bloodTest';

export type OrganSystem = 'heart' | 'liver' | 'kidneys' | 'thyroid' | 'vitamins' | 'blood';

export interface OrganHealth {
  organ: OrganSystem;
  displayName: string;
  status: 'good' | 'warning';
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

// Biomarker information for detailed explanations
export interface BiomarkerInfo {
  name: string;
  displayName: string;
  importance: string;
  actions: string[];
  funFact?: string;
}

export const BIOMARKER_INFO: Record<string, BiomarkerInfo> = {
  // Heart biomarkers
  ldl: {
    name: 'ldl',
    displayName: 'LDL Cholesterol',
    importance: 'LDL (Low-Density Lipoprotein) is often called "bad" cholesterol because high levels can lead to plaque buildup in arteries, increasing risk of heart disease and stroke.',
    actions: [
      'Reduce saturated and trans fats in your diet',
      'Increase fiber intake with oats, beans, and vegetables',
      'Exercise regularly (aim for 150 minutes per week)',
      'Consider plant sterols and stanols'
    ],
    funFact: 'Your liver produces about 75% of your cholesterol naturally.'
  },
  hdl: {
    name: 'hdl',
    displayName: 'HDL Cholesterol',
    importance: 'HDL (High-Density Lipoprotein) is "good" cholesterol that helps remove other forms of cholesterol from your bloodstream, protecting against heart disease.',
    actions: [
      'Exercise regularly to boost HDL levels',
      'Choose healthy fats like olive oil and avocados',
      'Quit smoking if applicable',
      'Maintain a healthy weight'
    ],
    funFact: 'HDL acts like a garbage truck, collecting excess cholesterol and taking it to your liver for disposal.'
  },
  total_cholesterol: {
    name: 'total_cholesterol',
    displayName: 'Total Cholesterol',
    importance: 'Total cholesterol is the sum of all cholesterol in your blood. While important, the ratio of HDL to LDL matters more than the total number alone.',
    actions: [
      'Focus on improving HDL/LDL ratio',
      'Eat heart-healthy foods like fish, nuts, and vegetables',
      'Limit processed and fried foods',
      'Stay physically active'
    ]
  },
  triglycerides: {
    name: 'triglycerides',
    displayName: 'Triglycerides',
    importance: 'Triglycerides are fats in your blood used for energy. High levels combined with low HDL or high LDL can increase risk of heart disease.',
    actions: [
      'Limit sugar and refined carbohydrates',
      'Reduce alcohol consumption',
      'Choose healthy fats over saturated fats',
      'Exercise regularly to help lower levels'
    ],
    funFact: 'After a meal, triglycerides can increase significantly, which is why fasting blood tests are often required.'
  },
  potassium: {
    name: 'potassium',
    displayName: 'Potassium',
    importance: 'Potassium is essential for proper heart rhythm, muscle function, and maintaining healthy blood pressure levels.',
    actions: [
      'Eat potassium-rich foods like bananas, potatoes, and spinach',
      'Balance sodium and potassium intake',
      'Stay hydrated',
      'Consult your doctor about any supplements'
    ]
  },
  sodium: {
    name: 'sodium',
    displayName: 'Sodium',
    importance: 'Sodium helps regulate fluid balance and blood pressure. Both high and low levels can affect heart function and overall health.',
    actions: [
      'Monitor salt intake (aim for less than 2,300mg daily)',
      'Stay properly hydrated',
      'Check labels for hidden sodium in processed foods',
      'Balance with potassium-rich foods'
    ]
  },
  calcium: {
    name: 'calcium',
    displayName: 'Calcium',
    importance: 'Calcium is vital for heart muscle contractions, bone health, nerve signaling, and blood clotting.',
    actions: [
      'Include dairy or fortified alternatives in your diet',
      'Get adequate vitamin D for calcium absorption',
      'Consider leafy greens as calcium sources',
      'Discuss supplements with your healthcare provider'
    ]
  },

  // Liver biomarkers
  alt: {
    name: 'alt',
    displayName: 'ALT (Liver Enzyme)',
    importance: 'ALT (Alanine Aminotransferase) is an enzyme found mainly in the liver. Elevated levels may indicate liver inflammation or damage.',
    actions: [
      'Limit alcohol consumption',
      'Maintain a healthy weight',
      'Avoid unnecessary medications that stress the liver',
      'Eat a balanced diet with plenty of vegetables'
    ],
    funFact: 'Your liver performs over 500 vital functions, including filtering blood and producing bile.'
  },
  ast: {
    name: 'ast',
    displayName: 'AST (Liver Enzyme)',
    importance: 'AST (Aspartate Aminotransferase) is found in the liver and other organs. High levels may suggest liver issues or muscle damage.',
    actions: [
      'Reduce alcohol intake',
      'Exercise moderately (intense exercise can temporarily raise AST)',
      'Review medications with your doctor',
      'Maintain a liver-friendly diet'
    ]
  },
  albumin: {
    name: 'albumin',
    displayName: 'Albumin',
    importance: 'Albumin is a protein made by the liver that keeps fluid in your bloodstream and carries hormones, vitamins, and enzymes throughout your body.',
    actions: [
      'Ensure adequate protein intake',
      'Stay hydrated',
      'Address any underlying liver or kidney issues',
      'Eat a balanced, nutritious diet'
    ]
  },
  bilirubin: {
    name: 'bilirubin',
    displayName: 'Bilirubin',
    importance: 'Bilirubin is produced when red blood cells break down. The liver processes it for removal. High levels can cause jaundice and may indicate liver problems.',
    actions: [
      'Stay well-hydrated',
      'Avoid excessive alcohol',
      'Eat foods that support liver health',
      'Follow up with your doctor if levels are elevated'
    ]
  },

  // Kidney biomarkers
  creatinine: {
    name: 'creatinine',
    displayName: 'Creatinine',
    importance: 'Creatinine is a waste product from muscle metabolism filtered by your kidneys. High levels may indicate reduced kidney function.',
    actions: [
      'Stay well-hydrated throughout the day',
      'Limit excessive protein intake if advised',
      'Avoid NSAIDs that can stress kidneys',
      'Monitor blood pressure regularly'
    ],
    funFact: 'Your kidneys filter about 120-150 quarts of blood daily to produce 1-2 quarts of urine.'
  },
  egfr: {
    name: 'egfr',
    displayName: 'eGFR (Kidney Function)',
    importance: 'eGFR (estimated Glomerular Filtration Rate) measures how well your kidneys filter waste. It\'s a key indicator of overall kidney health.',
    actions: [
      'Control blood pressure and blood sugar',
      'Stay hydrated but don\'t overdo it',
      'Limit salt intake',
      'Avoid smoking'
    ]
  },
  uric_acid: {
    name: 'uric_acid',
    displayName: 'Uric Acid',
    importance: 'Uric acid is produced when the body breaks down purines. High levels can lead to gout and may affect kidney function.',
    actions: [
      'Limit purine-rich foods (red meat, organ meats, shellfish)',
      'Reduce alcohol, especially beer',
      'Stay well-hydrated',
      'Maintain a healthy weight'
    ]
  },

  // Thyroid biomarkers
  tsh: {
    name: 'tsh',
    displayName: 'TSH (Thyroid)',
    importance: 'TSH (Thyroid-Stimulating Hormone) regulates your thyroid gland. Abnormal levels can indicate an underactive or overactive thyroid, affecting metabolism, energy, and mood.',
    actions: [
      'Ensure adequate iodine and selenium intake',
      'Manage stress levels',
      'Get regular sleep',
      'Discuss any symptoms with your doctor'
    ],
    funFact: 'Your thyroid gland, shaped like a butterfly, controls the speed of your metabolism.'
  },

  // Vitamin biomarkers
  vitamin_d: {
    name: 'vitamin_d',
    displayName: 'Vitamin D',
    importance: 'Vitamin D is crucial for bone health, immune function, and mood regulation. Many people are deficient, especially in northern climates.',
    actions: [
      'Get 10-30 minutes of midday sunlight when possible',
      'Eat vitamin D-rich foods (fatty fish, fortified dairy)',
      'Consider supplementation if deficient',
      'Pair with vitamin K2 for optimal absorption'
    ],
    funFact: 'Vitamin D is actually a hormone that your skin produces when exposed to sunlight.'
  },
  vitamin_b12: {
    name: 'vitamin_b12',
    displayName: 'Vitamin B12',
    importance: 'Vitamin B12 is essential for nerve function, DNA synthesis, and red blood cell formation. Deficiency can cause fatigue, weakness, and neurological issues.',
    actions: [
      'Include B12-rich foods (meat, fish, dairy, eggs)',
      'Consider fortified foods if vegetarian/vegan',
      'Discuss supplementation with your doctor',
      'Check for absorption issues if persistently low'
    ]
  },
  iron: {
    name: 'iron',
    displayName: 'Iron',
    importance: 'Iron is essential for making hemoglobin, which carries oxygen in your blood. Low iron causes anemia and fatigue; high iron can damage organs.',
    actions: [
      'Eat iron-rich foods (lean meat, beans, spinach)',
      'Pair with vitamin C for better absorption',
      'Avoid tea/coffee with iron-rich meals',
      'Don\'t supplement without doctor\'s guidance'
    ]
  },
  ferritin: {
    name: 'ferritin',
    displayName: 'Ferritin',
    importance: 'Ferritin reflects your body\'s iron stores. Low levels precede anemia; high levels may indicate inflammation or iron overload.',
    actions: [
      'Address underlying causes if low',
      'For high levels, reduce iron-rich foods temporarily',
      'Stay hydrated',
      'Follow up with your healthcare provider'
    ]
  },

  // Blood biomarkers
  glucose: {
    name: 'glucose',
    displayName: 'Glucose (Blood Sugar)',
    importance: 'Blood glucose is your body\'s main energy source. Consistently high levels can indicate prediabetes or diabetes, affecting many organs over time.',
    actions: [
      'Limit refined sugars and simple carbs',
      'Exercise regularly to improve insulin sensitivity',
      'Eat fiber-rich foods to stabilize blood sugar',
      'Maintain a healthy weight'
    ],
    funFact: 'Your brain uses about 20% of your body\'s glucose, despite being only 2% of your body weight.'
  },
  hba1c: {
    name: 'hba1c',
    displayName: 'HbA1c (3-Month Average)',
    importance: 'HbA1c shows your average blood sugar over 2-3 months. It\'s a key marker for diabetes management and risk assessment.',
    actions: [
      'Focus on consistent, balanced eating habits',
      'Stay physically active daily',
      'Monitor blood sugar if recommended',
      'Work with your healthcare team on targets'
    ]
  },
  wbc: {
    name: 'wbc',
    displayName: 'White Blood Cells',
    importance: 'White blood cells are your immune system\'s soldiers. High counts may indicate infection or inflammation; low counts may affect your ability to fight illness.',
    actions: [
      'Get adequate sleep for immune health',
      'Manage stress levels',
      'Eat a nutrient-rich diet',
      'Stay up-to-date on vaccinations'
    ]
  },
  rbc: {
    name: 'rbc',
    displayName: 'Red Blood Cells',
    importance: 'Red blood cells carry oxygen throughout your body. Abnormal counts can cause fatigue, weakness, or other health issues.',
    actions: [
      'Ensure adequate iron, B12, and folate intake',
      'Stay hydrated',
      'Address any chronic health conditions',
      'Exercise regularly for healthy circulation'
    ]
  },
  hemoglobin: {
    name: 'hemoglobin',
    displayName: 'Hemoglobin',
    importance: 'Hemoglobin is the protein in red blood cells that carries oxygen. Low levels (anemia) cause fatigue; high levels may indicate other conditions.',
    actions: [
      'Eat iron-rich foods paired with vitamin C',
      'Include B12 and folate in your diet',
      'Address any underlying bleeding issues',
      'Stay at altitude gradually if traveling'
    ]
  },
  hematocrit: {
    name: 'hematocrit',
    displayName: 'Hematocrit',
    importance: 'Hematocrit measures the percentage of blood that\'s red blood cells. It helps assess hydration status and conditions like anemia or polycythemia.',
    actions: [
      'Stay well-hydrated',
      'Address nutritional deficiencies',
      'Avoid excessive alcohol',
      'Follow up on any abnormal results'
    ]
  },
  platelets: {
    name: 'platelets',
    displayName: 'Platelets',
    importance: 'Platelets help your blood clot. Low counts increase bleeding risk; high counts may increase clotting risk.',
    actions: [
      'Avoid unnecessary aspirin/NSAIDs if low',
      'Eat foods rich in folate and B12',
      'Report unusual bleeding to your doctor',
      'Stay physically active'
    ]
  }
};

// Category descriptions for the expanded details section
export const CATEGORY_INFO: Record<TabId, { title: string; description: string; tips: string[] }> = {
  overview: {
    title: 'Your Health Overview',
    description: 'This is a comprehensive view of all your biomarkers. Click on any organ in the body visualization to explore specific areas.',
    tips: [
      'Regular blood tests help catch issues early',
      'Trends over time matter more than single readings',
      'Discuss any concerns with your healthcare provider'
    ]
  },
  heart: {
    title: 'Cardiovascular Health',
    description: 'These markers help assess your heart health and risk of cardiovascular disease. Maintaining healthy levels protects against heart attacks and strokes.',
    tips: [
      'Heart disease is largely preventable with lifestyle changes',
      'The ratio of HDL to total cholesterol is important',
      'Regular exercise strengthens your heart muscle'
    ]
  },
  liver: {
    title: 'Liver & Kidney Function',
    description: 'Your liver and kidneys work together to filter toxins and maintain fluid balance. These markers indicate how well these vital organs are functioning.',
    tips: [
      'Your liver can regenerate, but prevention is better',
      'Stay hydrated to support kidney function',
      'Limit alcohol and processed foods'
    ]
  },
  thyroid: {
    title: 'Thyroid Function',
    description: 'Your thyroid controls metabolism, energy levels, and many body processes. Even small imbalances can significantly affect how you feel.',
    tips: [
      'Thyroid issues are common and very treatable',
      'Symptoms can be subtle and develop slowly',
      'Regular monitoring helps optimize treatment'
    ]
  },
  vitamins: {
    title: 'Vitamins & Nutrients',
    description: 'These essential nutrients support everything from energy production to immune function. Optimal levels help you feel your best.',
    tips: [
      'Food sources are usually better than supplements',
      'Some vitamins need others for proper absorption',
      'Deficiencies are common and often easy to fix'
    ]
  }
};

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

  // Only use 'good' and 'warning' statuses to avoid causing worry
  let status: 'good' | 'warning';

  if (percentage >= 80) {
    status = 'good';
  } else {
    status = 'warning';
  }

  // Check for any flagged (high/low) markers
  const hasFlaggedMarker = organBiomarkers.some(b =>
    b.status === 'high' || b.status === 'low'
  );

  if (hasFlaggedMarker && status === 'good') {
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

  // Only use 'good' and 'warning' statuses
  let status: 'good' | 'warning';
  if (liverHealth.status === 'warning' || kidneysHealth.status === 'warning') {
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
