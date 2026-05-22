export type Dosha = "Vata" | "Pitta" | "Kapha";
export type AgniType = "Mandagni" | "Tikshnagni" | "Vishamagni" | "Samagni";
export type ComplianceStatus = "PASSED" | "FAILED";

export interface UserIntake {
  symptomText?: string;
  selectedSymptoms?: string[];
  age?: number;
  dailySteps?: number;
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
  targetDoshas


cat > src/types.ts <<'EOF'
export type Dosha = "Vata" | "Pitta" | "Kapha";
export type AgniType = "Mandagni" | "Tikshnagni" | "Vishamagni" | "Samagni";
export type ComplianceStatus = "PASSED" | "FAILED";

export interface UserIntake {
  symptomText?: string;
  selectedSymptoms?: string[];
  age?: number;
  dailySteps?: number;
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

export interface ProtocolRow {
  user: string;
  time: string;
  medication: string;
  dosage: string;
  objective: string;
}

export interface EvaluationResult {
  primaryDosha: Dosha;
  calculatedAgni: AgniType;
  practitionerPage: { title: string; rows: ProtocolRow[] };
  patientPage: { title: string; rows: ProtocolRow[] };
}
