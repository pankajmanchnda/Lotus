export type Dosha = "Vata" | "Pitta" | "Kapha";
export type AgniType = "Mandagni" | "Tikshnagni" | "Vishamagni" | "Samagni";
export type WeatherProfile = "Cold-Dry" | "Hot-Humid" | "Cold-Humid" | "Variable-Windy";
export type ComplianceStatus = "PASSED" | "FAILED";

export interface UserIntake {
  age?: number;
  weight?: number;
  height?: number;
  city?: string;
  country?: string;
  weatherType?: WeatherProfile;
  dailySteps?: number;
  selectedSymptoms?: string[];
  symptomText?: string;
  goalsText?: string;
  allergies?: string[];
}

export interface Ingredient {
  name: string;
  botanicalName: string;
  source: string;
  isHeavyMetalOrMineral: boolean;
}

export interface Remedy {
  id: string;
  name: string;
  textReference: string;
  styleReference: string;
  formFactor: string;
  targetDoshas: Dosha[];
  compatibleAgni: AgniType[];
  posology: string;
  anupana: string;
  usComplianceStatus: ComplianceStatus;
  complianceNotes: string;
  ingredients: Ingredient[];
}

export interface ClinicalModule {
  id: string;
  name: string;
  modernApproximation: string;
  diagnosticSource: string;
  cardinalSymptoms: string[];
  primaryDosha: Dosha;
  remedies: Remedy[];
}

export type DiseaseProfile = ClinicalModule;
export type Formulation = Remedy;

export interface ProtocolRow {
  user: string;
  time: string;
  medication: string;
  dosage: string;
  objective: string;
  source: string;
  safety: string;
}

export interface ProtocolPage {
  title: string;
  summary: string;
  rows: ProtocolRow[];
}

export interface EvaluationResult {
  primaryDosha: Dosha;
  calculatedAgni: AgniType;
  matchedDisease: ClinicalModule | null;
  practitionerPage: ProtocolPage;
  patientPage: ProtocolPage;
}
