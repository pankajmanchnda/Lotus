import type { DiseaseProfile, Formulation } from "./types";

export const SYMPTOM_OPTIONS = [
  "Alternating Constipation & Diarrhea", "Mucus in Stool", "Heartburn & Burning Sensation",
  "Nausea & Sour Eructations", "Lethargy & Heaviness in Stomach", "Dry Persistent Cough",
  "Shortness of Breath on Exertion", "Chest Congestion & Phlegm", "Palpitations & Uneven Heartbeat",
  "Chronic Low-Grade Fever", "Systemic Swelling (Edema)", "Red, Inflamed Skin Eruptions",
  "Yellowing of Eyes & Skin (Jaundice)", "Chronic Itching & Hives", "Joint Stiffness & Popping",
  "Sharp Pain on Movement", "Muscle Wasting & Weakness", "Racing Thoughts & Anxiety",
  "Difficulty Falling Asleep", "Tremors & Spasms", "Frequent Urination & Thirst",
  "Burning Sensation during Urination", "Unexplained Fatigue & Sweet Cravings",
  "Irregular or Painful Cycles", "Low Vitality & Libido", "Hormonal Mood Fluctuations"
];

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
      textReference: "[BR] Bhaishajya Ratnavali",
      styleReference: "[SHA] Sharngadhara Samhita",
      formFactor: "Arishta",
      targetDoshas: ["Vata"],
      compatibleAgni: ["Vishamagni"],
      posology: "20ml with 20ml warm water, post-dinner.",
      anupana: "Lukewarm Water",
      usComplianceStatus: "PASSED",
      complianceNotes: "Gentle bowel regulator.",
      ingredients: [{ name: "Haritaki", botanicalName: "Terminalia chebula", source: "BP", isHeavyMetalOrMineral: false }]
    }]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap((disease) => disease.remedies);
