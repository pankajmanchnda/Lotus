import { DiseaseProfile, Formulation } from "./types";

export const DISEASES_LIBRARY: DiseaseProfile[] = [
  {
    id: "DIS-CONST-004",
    name: "Abhayarishta Protocol",
    modernApproximation: "Digestive Motility & Constipation",
    diagnosticSource: "[BR] Bhaishajya Ratnavali",
    cardinalSymptoms: ["Straining during elimination", "Hard stools"],
    primaryDosha: "Vata",
    remedies: [{
      id: "FORM-ARI-ABH-01",
      name: "Abhayarishta",
      textReference: "[BR]", styleReference: "[SHA]", formFactor: "Arishta",
      targetDoshas: ["Vata"], compatibleAgni: ["Vishamagni"],
      posology: "20ml with warm water", anupana: "Water",
      usComplianceStatus: "PASSED", complianceNotes: "Gentle regulator",
      ingredients: [{ name: "Haritaki", botanicalName: "T. chebula", source: "BP", isHeavyMetalOrMineral: false }]
    }]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap(d => d.remedies);
