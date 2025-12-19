# SecondView - AI Blood Test Analysis MVP

An educational tool that helps people understand their blood test results using AI-powered analysis. SecondView provides plain-language explanations of biomarkers, similar to how a doctor or naturopath would explain results during a consultation.

## 🎯 Project Overview

**Purpose**: Educational blood test interpretation tool  
**Position**: "Second view" of your health - not medical advice  
**Target Users**: Patients who want to better understand their lab results  
**Tech Stack**: React, TypeScript, Tailwind CSS, Claude AI, Supabase

## ✨ Core Features

### 1. **Sample Data Demo**
- Pre-loaded blood test results
- Instant exploration without uploading real data
- Full AI analysis to showcase capabilities

### 2. **Manual Entry**
- Enter biomarker values from paper lab reports
- 15 common biomarkers pre-configured
- Smart validation against normal ranges
- Visual status indicators (green/yellow/red)

### 3. **AI-Powered Analysis**
- Plain-language explanations of each biomarker
- Overall health summary
- Key insights and takeaways
- Suggested questions to ask your doctor
- Context about how markers relate to each other

### 4. **Interactive Q&A**
- Chat interface for follow-up questions
- Context-aware responses based on user's specific results
- Educational focus, never medical advice

### 5. **Results Dashboard**
- Visual summary with traffic-light system
- Detailed biomarker cards with explanations
- Tabbed interface (Overview, Details, Chat)
- Export and save functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/viyasan/secondview.git
cd secondview

# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
# or
bun dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Anthropic API Key (for AI analysis)
VITE_ANTHROPIC_API_KEY=your_api_key_here

# Supabase Configuration (optional for MVP)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

**Note**: For MVP testing, you can use the basic analysis fallback without API keys.

## 📁 Project Structure

```
secondview/
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx              # Main landing page hero section
│   │   │   ├── HowItWorks.tsx        # Step-by-step explanation
│   │   │   └── Disclaimer.tsx        # Medical disclaimers
│   │   ├── upload/
│   │   │   └── ManualEntry.tsx       # Manual biomarker entry form
│   │   └── analysis/
│   │       ├── ResultsDashboard.tsx   # Main results view
│   │       ├── BiomarkerCard.tsx      # Individual biomarker display
│   │       ├── HealthSummary.tsx      # AI summary and insights
│   │       └── ChatInterface.tsx      # Q&A chat
│   ├── pages/
│   │   └── index.tsx                  # All page components
│   ├── lib/
│   │   └── claude.ts                  # Claude AI integration
│   ├── data/
│   │   └── sampleBloodTest.ts        # Sample data and helpers
│   ├── types/
│   │   └── bloodTest.ts              # TypeScript types
│   └── App.tsx                        # Main app component
├── docs/
│   └── SECONDVIEW_MVP_PLAN.md        # Detailed implementation plan
└── README.md
```

## 🧪 Supported Biomarkers

### Complete Blood Count (CBC)
- White Blood Cells (WBC)
- Red Blood Cells (RBC)
- Hemoglobin
- Hematocrit
- Platelets

### Metabolic Panel
- Glucose (Fasting)
- Creatinine
- eGFR (Kidney function)

### Lipid Panel
- Total Cholesterol
- LDL Cholesterol
- HDL Cholesterol
- Triglycerides

### Thyroid Function
- TSH (Thyroid Stimulating Hormone)

### Liver Function
- ALT (Alanine Aminotransferase)
- AST (Aspartate Aminotransferase)

## 🔒 Privacy & Disclaimers

### Medical Disclaimer
**SecondView is an educational tool designed to help you understand your blood test results. This is NOT medical advice, diagnosis, or treatment.**

- All analysis is for educational purposes only
- Always discuss results with a qualified healthcare provider
- Never start, stop, or change treatments based solely on this tool
- We do not provide treatment recommendations

### Privacy
- Data is processed client-side when possible
- Optional account creation for saving results
- Users can delete their data anytime
- No data sold to third parties

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

### Key Technologies

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **Lucide React**: Icons
- **Claude AI API**: AI-powered analysis
- **Supabase** (optional): Backend and database

## 🎨 Design Principles

1. **Clarity First**: Health information should be crystal clear
2. **Trust Building**: Professional design, proper disclaimers
3. **Empowering**: Help users understand, don't overwhelm
4. **Accessible**: Simple language, good contrast, mobile-friendly
5. **Privacy-Focused**: Clear data handling, easy deletion

## 📋 Roadmap

### Phase 1: MVP (Current)
- [x] Landing page with value prop
- [x] Sample data viewer
- [x] Manual entry form
- [x] AI analysis integration
- [x] Results dashboard
- [x] Q&A chat interface
- [x] Basic disclaimers

### Phase 2: Enhanced Features
- [ ] PDF upload and OCR
- [ ] More biomarkers (expand to 50+)
- [ ] Trend tracking over time
- [ ] Export to PDF
- [ ] User accounts (optional)
- [ ] Save multiple tests

### Phase 3: Advanced
- [ ] Comparison with population averages
- [ ] Educational content library
- [ ] Integration with lab APIs
- [ ] Mobile app
- [ ] Multi-language support

## 🤝 Contributing

This is currently a private MVP. If you're interested in contributing:

1. Reach out to discuss your ideas
2. Follow coding standards (TypeScript, ESLint)
3. Include tests for new features
4. Update documentation

## ⚖️ Legal

### Terms of Service
- Educational use only
- No warranties expressed or implied
- Users responsible for verifying information with healthcare providers

### Privacy Policy
- Minimal data collection
- Optional accounts
- Right to deletion
- No third-party sales

## 📧 Contact

For questions, feedback, or support:
- **Website**: [secondview.ca](https://secondview.ca)
- **GitHub**: [github.com/viyasan/secondview](https://github.com/viyasan/secondview)

## 🙏 Acknowledgments

- Built with [Claude](https://claude.ai) by Anthropic
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Remember**: This tool helps you understand your results, but always discuss with your healthcare provider before making any health decisions.
