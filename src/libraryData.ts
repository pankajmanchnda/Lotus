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
  // ... [Previous Disease Profiles 001 through 009 remain exactly as they were] ...
  
  // --- BATCH 1: HIGH-IMPACT, LOW-INVASIVE CLINICAL MODULES ---
  {
    id: "DIS-CONST-004",
    name: "Abhayarishta Protocol",
    modernApproximation: "Digestive Motility & Constipation",
    diagnosticSource: "[BR] Bhaishajya Ratnavali, Udara Rogadhikara",
    cardinalSymptoms: ["Straining during elimination", "Hard stools"],
    primaryDosha: "Vata",
    remedies: [{
      id: "FORM-ARI-ABH-01",
      name: "Abhayarishta",
      textReference: "[BR] Bhaishajya Ratnavali",
      styleReference: "[SHA] Sharngadhara Samhita",
      formFactor: "Arishta (Fermented Infusion)",
      targetDoshas: ["Vata"],
      compatibleAgni: ["Vishamagni", "Mandagni"],
      posology: "20ml with 20ml warm water, post-dinner.",
      anupana: "Lukewarm Water",
      usComplianceStatus: "PASSED",
      complianceNotes: "Gentle bowel regulator. Aids in downward movement of Vata.",
      ingredients: [{ name: "Haritaki", botanicalName: "Terminalia chebula", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }]
    }]
  },
  {
    id: "DIS-NUTR-005",
    name: "Drakshasava Protocol",
    modernApproximation: "Nutrient Absorption & Anemia Support",
    diagnosticSource: "[BR] Bhaishajya Ratnavali, Pandu Rogadhikara",
    cardinalSymptoms: ["Pale complexion", "Low energy", "Post-meal fatigue"],
    primaryDosha: "Pitta",
    remedies: [{
      id: "FORM-ARI-DRAK-02",
      name: "Divya Drakshasava",
      textReference: "[BR] Bhaishajya Ratnavali",
      styleReference: "[SHA] Sharngadhara Samhita",
      formFactor: "Asava (Sweet Fermented Infusion)",
      targetDoshas: ["Pitta", "Vata"],
      compatibleAgni: ["Mandagni", "Samagni"],
      posology: "15ml with equal water, twice daily post-meal.",
      anupana: "Lukewarm Water",
      usComplianceStatus: "PASSED",
      complianceNotes: "Natural iron source. Highly absorbable tonic for exhaustion.",
      ingredients: [{ name: "Draksha (Grape)", botanicalName: "Vitis vinifera", source: "[BP] Phala Varga", isHeavyMetalOrMineral: false }]
    }]
  },
  {
    id: "DIS-NERV-006",
    name: "Saraswatarishta Protocol",
    modernApproximation: "Cognitive Focus & Nervous System Fatigue",
    diagnosticSource: "[BR] Bhaishajya Ratnavali, Unmada Rogadhikara",
    cardinalSymptoms: ["Difficulty focusing", "Mental lethargy"],
    primaryDosha: "Vata",
    remedies: [{
      id: "FORM-ARI-SAR-03",
      name: "Divya Saraswatarishta",
      textReference: "[BR] Bhaishajya Ratnavali",
      styleReference: "[SHA] Sharngadhara Samhita",
      formFactor: "Arishta (Fermented Infusion)",
      targetDoshas: ["Vata"],
      compatibleAgni: ["Samagni", "Vishamagni"],
      posology: "20ml with equal water, daily post-breakfast.",
      anupana: "Lukewarm Water",
      usComplianceStatus: "PASSED",
      complianceNotes: "Deep nerve tonic. Enhances memory and mental clarity.",
      ingredients: [{ name: "Brahmi", botanicalName: "Bacopa monnieri", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }]
    }]
  },
  {
    id: "DIS-MUSC-007",
    name: "Dashmoolarishtam Protocol",
    modernApproximation: "Post-Exertion Recovery & Structural Pain",
    diagnosticSource: "[BR] Bhaishajya Ratnavali, Vata Vyadhi Chikitsa",
    cardinalSymptoms: ["Aching muscles", "Body fatigue", "Joint stiffness"],
    primaryDosha: "Vata",
    remedies: [{
      id: "FORM-ARI-DASH-04",
      name: "Dashmoolarishtam",
      textReference: "[BR] Bhaishajya Ratnavali",
      styleReference: "[SHA] Sharngadhara Samhita",
      formFactor: "Arishta (Fermented Infusion)",
      targetDoshas: ["Vata"],
      compatibleAgni: ["Samagni", "Vishamagni"],
      posology: "20ml with equal water, after heavy physical exertion or dinner.",
      anupana: "Lukewarm Water",
      usComplianceStatus: "PASSED",
      complianceNotes: "Root-based decoction. Rebuilds strength after Vata exhaustion.",
      ingredients: [{ name: "Dashmoola", botanicalName: "Ten root decoction", source: "[BP] Mulaka Varga", isHeavyMetalOrMineral: false }]
    }]
  },
  {
    id: "DIS-IMM-008",
    name: "Amalaki Rasayana Protocol",
    modernApproximation: "Systemic Immunity & Antioxidant Support",
    diagnosticSource: "[BP] Bhava Prakasha, Rasayana Varga",
    cardinalSymptoms: ["Frequent colds", "Weak immunity", "Age-related vigor loss"],
    primaryDosha: "Pitta",
    remedies: [{
      id: "FORM-RAS-AMA-05",
      name: "Amalaki Rasayana",
      textReference: "[BP] Bhava Prakasha",
      styleReference: "[SHA] Sharngadhara Samhita",
      formFactor: "Powder / Jam",
      targetDoshas: ["Pitta", "Vata"],
      compatibleAgni: ["Tikshnagni", "Samagni"],
      posology: "1 tsp with warm water or honey, AM empty stomach.",
      anupana: "Warm Water or Honey",
      usComplianceStatus: "PASSED",
      complianceNotes: "Potent vitamin C source. Protects cellular integrity.",
      ingredients: [{ name: "Amalaki", botanicalName: "Emblica officinalis", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }]
    }]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap((disease) => disease.remedies);
