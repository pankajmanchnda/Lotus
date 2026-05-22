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
  symptomText: string;
  goalsText: string;
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

// UPGRADE: Strongly typing the protocol medicine entry to catch compliance warnings automatically
export interface ProtocolMedicineItem {
  name: string;
  dosageInstructions: string;
  timing: string;
  isHeavyMetalOrMineral: boolean; // Vital for the absolute safety gate
  usComplianceStatus: "PASSED" | "FAILED";
  complianceNotes: string;
}

export interface ProtocolRecommendation {
  id: string;
  sourceDocument: string;
  audience: "Adult" | "Pediatric" | "Adult-Father" | "Adult-Mother";
  matchKeywords: string[];
  goals: string[];
  medicines: ProtocolMedicineItem[]; // UPGRADED: Swapped from raw string[] to structured objects
  objective: string;
  safetyNotes: string[];
  sourceExcerpt: string;
}

export interface EvaluationResult {
  primaryDosha: Dosha;
  calculatedAgni: AgniType;
  matchedDisease: DiseaseProfile | null;
  safeFormulations: Formulation[];
  protocolMatches: ProtocolRecommendation[];
  lifestyleRegimen: {
    ahara: string;
    vihara: string;
  };
}
