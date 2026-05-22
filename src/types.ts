export interface Ingredient { name: string; botanicalName: string; source: string; isHeavyMetalOrMineral: boolean; }
export interface Remedy { id: string; name: string; textReference: string; styleReference: string; formFactor: string; targetDoshas: string[]; compatibleAgni: string[]; posology: string; anupana: string; usComplianceStatus: string; complianceNotes: string; ingredients: Ingredient[]; }
export interface ClinicalModule { id: string; name: string; modernApproximation: string; diagnosticSource: string; cardinalSymptoms: string[]; primaryDosha: string; remedies: Remedy[]; }

export type DiseaseProfile = ClinicalModule;
export type Formulation = Remedy;
