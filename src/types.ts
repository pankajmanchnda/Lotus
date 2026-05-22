export type Dosha = "Vata" | "Pitta" | "Kapha";
export type AgniType = "Mandagni" | "Tikshnagni" | "Vishamagni" | "Samagni";
export type SchemaVersion = "v1.0";

// This interface ensures all your data follows a strict contract
export interface ClinicalModule {
  dataVersion: SchemaVersion;
  lastUpdated: string;
  moduleCategory: "DIGESTIVE" | "RESPIRATORY" | "NERVOUS" | "MUSCULOSKELETAL" | "METABOLIC";
  
  // Core Profile
  id: string;
  name: string;
  modernApproximation: string;
  diagnosticSource: string;
  cardinalSymptoms: string[];
  primaryDosha: Dosha;
  
  // Remedy Schema
  remedies: {
    id: string;
    name: string;
    formFactor: string; // "Infusion" | "Powder" | "Tablet" | "Ghrita"
    posology: string;
    complianceStatus: "PASSED" | "FAILED";
    ingredients: {
      name: string;
      botanicalName: string;
      isMineral: boolean;
    }[];
  }[];
}

export interface UserIntake {
  age: number;
  weight: number;
  height: number;
  city: string;
  country: string;
  weatherType: string;
  dailySteps: number;
  symptomText: string;
  goalsText: string;
  selectedSymptoms: string[];
  allergies: string[];
}

export interface EvaluationResult {
  primaryDosha: Dosha;
  calculatedAgni: AgniType;
  matchedDisease: ClinicalModule | null;
  protocolMatches: any[];
  lifestyleRegimen: { ahara: string; vihara: string; };
}
