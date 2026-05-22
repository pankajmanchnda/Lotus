# Vibe Coding Prompt For Ananta Ayurveda Engine

Act as my senior research analyst, product architect, compliance-aware health app designer, and full-stack app developer.

Build **Ananta Ayurveda Engine**, a proprietary Ayurvedic knowledge-library and wellness guidance app. The product should house a structured library of classical Ayurvedic formulations and methodologies, beginning with **Bhaishajya Ratnavali** and later expanding into other gold-standard Ayurvedic references and practitioner-reviewed clinical protocols.

The app must collect patient/user context, assess wellness goals and ailment descriptions, screen for safety risks, and generate a cautious educational regimen using diet, routine, lifestyle, and Ayurvedic botanical candidates. Because this is health-related, the app must prioritize user safety, compliance, evidence tagging, contraindication checks, and practitioner review.

## Product Goal

Create a polished Vite/React TypeScript app that can evolve into a proprietary Ayurvedic decision-support platform.

The first version should:

- Store a structured Ayurvedic library with source references, traditional use, formulation methodology, cautions, contraindications, evidence level, and legal claim language.
- Collect user/patient intake data such as city, country, climate/weather, age, weight, height, exercise routine, symptoms, body type, ethnicity, health goals, ailments, allergies, medications, pregnancy status, and chronic conditions.
- Connect, or stub the architecture for connecting, to Apple HealthKit, Google Fit, and Pacer-style apps to import daily steps and activity trends.
- Use intake data to identify the likely wellness goal and generate an educational support plan.
- Suggest safer Ayurvedic support options with clear red-flag routing, not disease-treatment claims.
- Include a U.S. market viability and compliance layer for products exported from India.

## Hard Safety Boundary

Do **not** position the app as diagnosing, treating, curing, mitigating, or preventing disease.

The app should say:

- "supports digestive comfort"
- "supports stress resilience"
- "supports healthy sleep routines"
- "supports joint comfort and movement routines"

The app should avoid:

- "treats IBS"
- "cures arthritis"
- "prevents diabetes"
- "reverses hypertension"
- "replaces medical care"

If the user enters urgent symptoms, pregnancy, minors, chronic disease, prescription medications, severe symptoms, possible heavy-metal toxicity, liver/kidney disease, blood in stool, chest pain, shortness of breath, neurological symptoms, suicidal thoughts, or suspected infection, the app must pause recommendations and route to a qualified clinician.

## Core Modules

### 1. Intake Template

Collect:

- City and country
- Weather/climate context
- Age
- Weight
- Height
- Ethnicity
- Body tendency / prakriti: vata, pitta, kapha, mixed, unknown
- Exercise routine
- Daily steps
- Sleep pattern
- Stress level
- Symptoms and ailment description
- Health goals
- Allergies
- Current medications
- Supplements already used
- Pregnancy or breastfeeding
- Chronic conditions
- Surgeries or upcoming procedures
- Diet pattern
- Adverse reactions

### 2. Ayurvedic Knowledge Base

Each entry should include:

```ts
export type Dosha = "Vata" | "Pitta" | "Kapha";
export type AgniType = "Mandagni" | "Tikshnagni" | "Vishamagni" | "Samagni";
export type WeatherProfile = "Cold-Dry" | "Hot-Humid" | "Cold-Humid" | "Variable-Windy";

export interface UserIntake {
  age: number;
  weight: number;
  height: number;
  city: string;
  country: string;
  weatherType: WeatherProfile;
  dailySteps: number;
  selectedSymptoms: string[];
  allergies: string[];
}

export interface FormulationIngredient {
  name: string;
  botanicalName: string;
  source: string;
  isHeavyMetalOrMineral: boolean;
}

export interface Formulation {
  id: string;
  name: string;
  textReference: string;
  styleReference: string;
  formFactor: string;
  targetDoshas: Dosha[];
  compatibleAgni: AgniType[];
  ingredients: FormulationIngredient[];
  posology: string;
  anupana: string;
  usComplianceStatus: "PASSED" | "FAILED";
  complianceNotes: string;
}

export interface DiseaseProfile {
  id: string;
  name: string;
  modernApproximation: string;
  diagnosticSource: string;
  cardinalSymptoms: string[];
  primaryDosha: Dosha;
  remedies: Formulation[];
}

export interface EvaluationResult {
  primaryDosha: Dosha;
  calculatedAgni: AgniType;
  matchedDisease: DiseaseProfile | null;
  safeFormulations: Formulation[];
  lifestyleRegimen: {
    ahara: string;
    vihara: string;
  };
}
```

### 3. Recommendation Engine

The engine should:

- Match user goals to library entries.
- Prioritize lower-risk food, routine, and lifestyle changes first.
- Add botanicals only as educational candidates for practitioner review.
- Show source notes and evidence level for every recommendation.
- Check contraindications before displaying any botanical.
- Explain why an item was suggested.
- Track uncertainty and missing data.
- Offer a safer alternative when risk is detected.

### 4. Health/Pacer API Architecture

Build a placeholder integration layer:

- Browser app: manual daily step entry.
- iOS: HealthKit through a native wrapper.
- Android: Google Fit / Health Connect.
- Pacer: OAuth/API integration if available through partner access.
- Store consent, data source, timestamp, revocation status, and imported metrics.

Do not request more health data than needed. Treat step data, symptoms, medications, and goals as sensitive information.

### 5. Compliance Dashboard

Include internal controls for:

- FDA/FTC-safe claim language
- Disease-claim detection
- Structure/function claim register
- Evidence substantiation register
- Practitioner review status
- Legal review status
- Supplier GMP status
- Certificate of analysis status
- Heavy-metal and contaminant testing
- Import-alert risk
- Adverse event reporting
- Privacy consent

## U.S. Market Viability Position

The app is viable in the U.S. if launched as:

- A wellness education app
- Intake and adherence support
- Practitioner decision support
- A source-aware Ayurvedic library
- A compliant supplement-support and lifestyle platform

It is high-risk if launched as:

- A disease diagnosis app
- A treatment generator
- A replacement for medical care
- A marketplace for untested imported Ayurvedic medicines
- A claims engine that says products treat named diseases

## First Build Requirements

Use this file structure:

```text
├── package.json
├── index.html
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── types.ts
    ├── libraryData.ts
    ├── engine.ts
    └── App.tsx
```

Use React + TypeScript + Vite. Build a polished first-screen app, not a landing page. The first screen should let users begin intake immediately and see how the safety and knowledge-library engine works.

## Output Quality

The app should feel calm, credible, premium, and medically cautious. Avoid making it look like an alternative-medicine hype page. Use clear safety language, source tags, reviewer states, and compliance warnings where needed.
