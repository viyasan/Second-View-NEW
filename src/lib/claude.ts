// lib/claude.ts

import { Biomarker, AnalysisRequest, AnalysisResponse } from '../types/bloodTest';

const CLAUDE_API_ENDPOINT = 'https://api.anthropic.com/v1/messages';

// System prompt for educational blood test analysis
const SYSTEM_PROMPT = `You are a knowledgeable health educator helping patients understand their blood test results. Your role is similar to a family doctor or naturopath explaining results during a patient consultation.

CRITICAL GUIDELINES:
1. Explain biomarkers in simple, conversational language that a non-medical person can understand
2. Put results in practical context - explain what they mean for daily life, energy, health
3. Flag concerning values but emphasize this is educational information only
4. Show how different biomarkers relate to each other (e.g., cholesterol levels and heart health)
5. NEVER provide treatment recommendations, prescribe supplements, or give medical advice
6. NEVER suggest stopping or starting medications
7. Always remind users to discuss results with their healthcare provider before making any decisions
8. Be encouraging and supportive while being scientifically accurate
9. Use analogies and examples to make complex concepts understandable
10. If a value is concerning, explain why and what it might indicate, but stress the need for professional follow-up

Response Format:
Provide a structured analysis with:
- Overall Summary: 2-3 sentences about the general picture
- Biomarker Insights: For each flagged marker, explain in plain language
- Key Takeaways: 3-5 bullet points of main observations
- Questions to Ask Your Doctor: 3-5 specific questions based on the results

Remember: You are helping people understand their results, not diagnosing or treating them.`;

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function analyzeBloodTest(
  request: AnalysisRequest
): Promise<AnalysisResponse> {
  const { biomarkers, userContext } = request;

  const categorizedMarkers = groupByCategory(biomarkers);
  const categoryText = Object.entries(categorizedMarkers)
    .map(([category, markers]) => {
      const markerList = markers.map(m =>
        `  - ${m.displayName}: ${m.value} ${m.unit} [${m.status}]`
      ).join('\n');
      return `${category}:\n${markerList}`;
    }).join('\n\n');

  const userPrompt = `Please analyze these blood test results and provide educational insights:

${categoryText}

${userContext?.age ? `Patient context: Age ${userContext.age}, Gender: ${userContext.gender}` : ''}
${userContext?.symptoms ? `Reported symptoms: ${userContext.symptoms.join(', ')}` : ''}

Please provide:
1. An overall summary of what these results suggest about the person's health
2. Detailed explanations for any values outside the normal range
3. How different markers relate to each other
4. Key takeaways the person should know
5. Important questions they should ask their healthcare provider

Remember: This is educational information to help them understand their results. Always emphasize the importance of discussing with their doctor.`;

  try {
    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
        // Note: API key should be handled by the environment/proxy in production
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.content[0].text;

    // Parse the response into structured format
    return parseAnalysisResponse(analysisText, biomarkers);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

export async function askFollowUpQuestion(
  question: string,
  bloodTest: { biomarkers: Biomarker[] },
  conversationHistory: ClaudeMessage[]
): Promise<string> {
  const biomarkerContext = bloodTest.biomarkers.map(b =>
    `${b.displayName}: ${b.value} ${b.unit} (${b.status})`
  ).join(', ');

  const userPrompt = `Based on these blood test results: ${biomarkerContext}

User's question: ${question}

Please provide an educational answer that helps them understand their results better. Remember to emphasize that this is educational information and they should discuss with their healthcare provider.`;

  try {
    const messages: ClaudeMessage[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: userPrompt
      }
    ];

    const response = await fetch(CLAUDE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Helper function to group biomarkers by category
function groupByCategory(biomarkers: Biomarker[]): Record<string, Biomarker[]> {
  return biomarkers.reduce((acc, marker) => {
    if (!acc[marker.category]) {
      acc[marker.category] = [];
    }
    acc[marker.category].push(marker);
    return acc;
  }, {} as Record<string, Biomarker[]>);
}

// Helper function to parse Claude's response into structured format
function parseAnalysisResponse(
  analysisText: string,
  biomarkers: Biomarker[]
): AnalysisResponse {
  // Extract different sections from the analysis
  const lines = analysisText.split('\n');

  let summary = '';
  let overallInsights: string[] = [];
  let questionsToAskDoctor: string[] = [];

  let currentSection = '';

  lines.forEach(line => {
    const trimmed = line.trim();

    if (trimmed.toLowerCase().includes('overall summary') ||
        trimmed.toLowerCase().includes('general picture')) {
      currentSection = 'summary';
    } else if (trimmed.toLowerCase().includes('key takeaway') ||
               trimmed.toLowerCase().includes('main observation')) {
      currentSection = 'insights';
    } else if (trimmed.toLowerCase().includes('questions to ask') ||
               trimmed.toLowerCase().includes('discuss with')) {
      currentSection = 'questions';
    } else if (trimmed && trimmed !== '---') {
      if (currentSection === 'summary' && !summary) {
        summary = trimmed;
      } else if (currentSection === 'insights' && (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^\d+\./))) {
        overallInsights.push(trimmed.replace(/^[-•\d.]\s*/, ''));
      } else if (currentSection === 'questions' && (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.match(/^\d+\./))) {
        questionsToAskDoctor.push(trimmed.replace(/^[-•\d.]\s*/, ''));
      }
    }
  });

  // Create biomarker-specific analyses
  const biomarkerAnalyses: AnalysisResponse['biomarkerAnalyses'] = {};

  biomarkers.forEach(marker => {
    if (marker.status !== 'normal') {
      // Extract relevant information about this biomarker from the text
      const concernLevel =
        marker.status === 'high' || marker.status === 'low' ? 'discuss-with-doctor' :
        marker.status.includes('borderline') ? 'monitor' : 'none';

      biomarkerAnalyses[marker.name] = {
        interpretation: `Your ${marker.displayName} is ${marker.status.replace('-', ' ')}. This may warrant attention.`,
        concernLevel,
        relatedMarkers: getRelatedMarkers(marker, biomarkers)
      };
    }
  });

  return {
    summary: summary || analysisText.substring(0, 200),
    biomarkerAnalyses,
    overallInsights: overallInsights.length > 0 ? overallInsights : ['Review results with your healthcare provider'],
    questionsToAskDoctor: questionsToAskDoctor.length > 0 ? questionsToAskDoctor : ['What do these results mean for my overall health?']
  };
}

// Helper to identify related biomarkers
function getRelatedMarkers(marker: Biomarker, allMarkers: Biomarker[]): string[] {
  const relationships: Record<string, string[]> = {
    'glucose': ['hemoglobin', 'triglycerides'],
    'total_cholesterol': ['ldl', 'hdl', 'triglycerides'],
    'ldl': ['total_cholesterol', 'hdl', 'triglycerides'],
    'hdl': ['total_cholesterol', 'ldl', 'triglycerides'],
    'triglycerides': ['glucose', 'total_cholesterol', 'ldl', 'hdl'],
    'tsh': ['hemoglobin'],
    'creatinine': ['egfr'],
    'egfr': ['creatinine']
  };

  const related = relationships[marker.name] || [];
  return related.filter(name =>
    allMarkers.some(m => m.name === name)
  );
}

// Fallback analysis when API is unavailable
export function generateBasicAnalysis(biomarkers: Biomarker[]): AnalysisResponse {
  const flaggedMarkers = biomarkers.filter(b => b.status !== 'normal');
  const normalMarkers = biomarkers.filter(b => b.status === 'normal');

  let summary = '';
  if (flaggedMarkers.length === 0) {
    summary = 'All your biomarkers are within normal ranges, which is excellent! This suggests your body systems are functioning well.';
  } else {
    summary = `Out of ${biomarkers.length} markers tested, ${flaggedMarkers.length} are outside the normal range and may benefit from discussion with your healthcare provider.`;
  }

  const biomarkerAnalyses: AnalysisResponse['biomarkerAnalyses'] = {};
  flaggedMarkers.forEach(marker => {
    biomarkerAnalyses[marker.name] = {
      interpretation: `Your ${marker.displayName} is ${marker.value} ${marker.unit}, which is ${marker.status.replace('-', ' ')} compared to the normal range of ${marker.normalRangeMin}-${marker.normalRangeMax} ${marker.unit}.`,
      concernLevel: marker.status === 'high' || marker.status === 'low' ? 'discuss-with-doctor' : 'monitor',
      relatedMarkers: []
    };
  });

  const overallInsights = [
    `${normalMarkers.length} markers are within normal range`,
    flaggedMarkers.length > 0 ? `${flaggedMarkers.length} markers need attention` : 'All markers look good',
    'Always discuss results with your healthcare provider'
  ];

  const questionsToAskDoctor = flaggedMarkers.length > 0
    ? [
        'What could be causing the values outside the normal range?',
        'Do I need any follow-up tests?',
        'Are there lifestyle changes I should consider?'
      ]
    : [
        'How often should I get tested?',
        'Are there any preventive measures I should take?'
      ];

  return {
    summary,
    biomarkerAnalyses,
    overallInsights,
    questionsToAskDoctor
  };
}
