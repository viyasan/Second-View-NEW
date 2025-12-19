# SecondView MVP Implementation Plan

## Project Overview
Educational blood test analysis tool that provides AI-powered interpretation of biomarkers, similar to how a doctor or naturopath would explain results during a patient visit.

## Core Features for MVP

### 1. Landing Page
- Clear value proposition
- "Try with Sample Data" CTA
- "Upload Your Blood Test" CTA
- Prominent disclaimers about educational use
- How it works section

### 2. Blood Test Upload Flow
**Option A: PDF Upload (Primary)**
- Drag & drop PDF interface
- OCR processing to extract biomarker data
- Review extracted data (user can edit if needed)

**Option B: Manual Entry (Fallback)**
- Form with common biomarkers
- Pre-populated with standard ranges
- Save as user inputs

### 3. AI Analysis Engine
**Biomarker Analysis:**
- Compare values against normal ranges
- Flag high/low/borderline values
- Provide plain-language explanations
- Show interconnections between markers

**AI Chat Interface:**
- Users can ask follow-up questions
- Context-aware responses based on their specific results
- Educational responses only (no treatment advice)

### 4. Results Dashboard
- Visual summary (green/yellow/red indicators)
- Detailed biomarker cards
- AI-generated summary
- Export/print functionality
- Save results to profile (optional account creation)

### 5. Sample Data Feature
- Pre-loaded example blood test
- Users can explore without uploading real data
- Reduces friction for first-time users

## Tech Stack (Based on Your Repo)

```
Frontend:
- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui components
- React Router for navigation

Backend:
- Supabase (Auth + Database + Storage)
- Anthropic Claude API for AI analysis

Key Libraries:
- pdf-parse or pdf.js for PDF processing
- React Hook Form for form handling
- Recharts for data visualization
```

## Database Schema (Supabase)

```sql
-- Users table (handled by Supabase Auth)

-- Blood Tests table
CREATE TABLE blood_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  test_date DATE,
  lab_name TEXT,
  file_url TEXT, -- if uploaded as PDF
  biomarkers JSONB, -- structured biomarker data
  ai_analysis TEXT, -- cached AI response
  ai_summary TEXT
);

-- Biomarker Reference Data table
CREATE TABLE biomarker_references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  marker_name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  normal_range_min DECIMAL,
  normal_range_max DECIMAL,
  unit TEXT,
  category TEXT, -- e.g., "Complete Blood Count", "Metabolic Panel"
  explanation_high TEXT,
  explanation_low TEXT,
  importance_level TEXT -- "common", "specialized"
);
```

## Initial Biomarkers (Top 15 for MVP)

### Complete Blood Count (CBC)
1. WBC (White Blood Cells) - 4.5-11.0 x10^9/L
2. RBC (Red Blood Cells) - M: 4.7-6.1, F: 4.2-5.4 x10^12/L
3. Hemoglobin - M: 140-180, F: 120-160 g/L
4. Hematocrit - M: 42-52%, F: 37-47%
5. Platelets - 150-400 x10^9/L

### Metabolic Panel
6. Glucose (Fasting) - 3.9-5.6 mmol/L
7. Creatinine - M: 62-106, F: 44-80 μmol/L
8. eGFR - >60 mL/min/1.73m²

### Lipid Panel
9. Total Cholesterol - <5.2 mmol/L
10. LDL Cholesterol - <3.4 mmol/L
11. HDL Cholesterol - M: >1.0, F: >1.3 mmol/L
12. Triglycerides - <1.7 mmol/L

### Thyroid
13. TSH - 0.4-4.0 mIU/L

### Liver
14. ALT - 7-56 U/L
15. AST - 10-40 U/L

## AI Prompt Strategy

### System Prompt for Analysis
```
You are a knowledgeable health educator helping patients understand their blood test results. 
Your role is similar to a family doctor or naturopath explaining results during a consultation.

Guidelines:
1. Explain biomarkers in simple, conversational language
2. Put results in context (what they mean for daily life/health)
3. Flag concerning values but emphasize this is educational only
4. Show how different biomarkers relate to each other
5. NEVER provide treatment recommendations or medical advice
6. Always remind users to discuss with their healthcare provider
7. Be encouraging and supportive while being accurate

Analyze the following blood test results...
```

## MVP Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up project structure
- [ ] Create landing page with value prop
- [ ] Build sample data viewer
- [ ] Implement biomarker reference database
- [ ] Basic UI components (cards, layouts, navigation)

### Phase 2: Core Upload (Week 2)
- [ ] PDF upload interface
- [ ] PDF text extraction (OCR)
- [ ] Data extraction logic (parse biomarker values)
- [ ] Manual entry form (fallback)
- [ ] Data validation

### Phase 3: AI Analysis (Week 3)
- [ ] Integrate Claude API
- [ ] Build analysis prompt
- [ ] Generate biomarker explanations
- [ ] Create overall health summary
- [ ] Implement follow-up Q&A chat

### Phase 4: Results & Polish (Week 4)
- [ ] Results dashboard design
- [ ] Visual indicators (traffic light system)
- [ ] Export/print functionality
- [ ] Supabase integration (save results)
- [ ] Optional user accounts
- [ ] Legal disclaimers throughout
- [ ] Mobile responsive design

## Key User Flows

### Flow 1: Sample Data Explorer
```
Landing Page → "Try Sample Data" → 
View Analysis → Ask Questions → 
"Upload Your Own" CTA
```

### Flow 2: Upload & Analyze
```
Landing Page → "Upload Blood Test" → 
Upload PDF/Enter Data → Review Extracted Data → 
Generate Analysis → View Results → 
Ask Follow-up Questions → Save (optional)
```

### Flow 3: Returning User
```
Login → Dashboard → Past Results → 
View Trends → Upload New Test → Compare
```

## Critical Disclaimers

**Primary Disclaimer (Always Visible):**
> "SecondView is an educational tool designed to help you understand your blood test results. This is not medical advice, diagnosis, or treatment. Always discuss your results with a qualified healthcare provider before making any health decisions."

**Before Upload:**
> "Your privacy matters. Uploaded files are processed securely and you can delete them anytime."

**After Analysis:**
> "This analysis is for educational purposes only. Discuss these results with your doctor or healthcare provider."

## Success Metrics for MVP

1. **User Engagement**
   - % of visitors who try sample data
   - % who upload their own test
   - Average time spent reviewing results
   - # of follow-up questions asked

2. **Technical Performance**
   - PDF extraction accuracy
   - AI response time
   - Error rates

3. **User Feedback**
   - Helpfulness ratings
   - Clarity of explanations
   - Feature requests

## Next Steps After MVP

- Add more biomarkers (expand to 50+)
- Trend tracking over time
- Comparison with population averages
- Educational content library
- Export to PDF with explanations
- Share results with doctor
- Mobile app version
- Integration with lab APIs

## Design Principles

1. **Clarity First** - Health information should be crystal clear
2. **Trust Building** - Professional design, proper disclaimers, transparency
3. **Empowering** - Help users understand, don't overwhelm them
4. **Accessible** - Simple language, good contrast, mobile-friendly
5. **Privacy-Focused** - Clear data handling, easy deletion, optional accounts

## File Structure

```
secondview/
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── Disclaimer.tsx
│   │   ├── upload/
│   │   │   ├── PDFUpload.tsx
│   │   │   ├── ManualEntry.tsx
│   │   │   └── DataReview.tsx
│   │   ├── analysis/
│   │   │   ├── ResultsDashboard.tsx
│   │   │   ├── BiomarkerCard.tsx
│   │   │   ├── HealthSummary.tsx
│   │   │   └── ChatInterface.tsx
│   │   └── ui/ (shadcn components)
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── claude.ts
│   │   ├── pdfParser.ts
│   │   └── biomarkers.ts
│   ├── hooks/
│   │   ├── useAnalysis.ts
│   │   └── useUpload.ts
│   ├── types/
│   │   └── bloodTest.ts
│   ├── data/
│   │   ├── sampleBloodTest.ts
│   │   └── biomarkerReference.ts
│   └── App.tsx
├── supabase/
│   └── migrations/
└── docs/
    └── LEGAL.md (terms, privacy, medical disclaimers)
```

---

## Ready to Build?

This plan gives us a clear roadmap. I recommend we start with:

1. Landing page + sample data viewer (quick win, shows value immediately)
2. Manual entry form (simpler than PDF, gets core analysis working)
3. PDF upload (once analysis is proven)
4. Polish and optimize

Let's begin! What would you like to tackle first?
