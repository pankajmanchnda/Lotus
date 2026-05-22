import type { DiseaseProfile, Formulation } from "./types";

export const DISEASES_LIBRARY: DiseaseProfile[] = [
  {
    id: "DIS-CONST-004",
    name: "Abhayarishta Protocol",
    modernApproximation: "Constipation / sluggish bowel motility",
    diagnosticSource: "[BR] Bhaishajya Ratnavali",
    cardinalSymptoms: ["constipation", "hard stools", "straining", "gas", "bloating"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-ABH-001",
        name: "Abhayarishta",
        textReference: "[BR] Bhaishajya Ratnavali",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana Kalpana",
        formFactor: "Arishta",
        targetDoshas: ["Vata"],
        compatibleAgni: ["Vishamagni", "Mandagni", "Samagni"],
        posology: "15-20 ml with equal lukewarm water after meals.",
        anupana: "Lukewarm water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical formulation. Avoid self-treatment in severe abdominal pain or bleeding.",
        ingredients: [
          { name: "Haritaki", botanicalName: "Terminalia chebula", source: "BP", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-FATIGUE-IRON-005",
    name: "Drakshasava Protocol",
    modernApproximation: "Fatigue / low vitality support",
    diagnosticSource: "Classical Draksha-based restorative protocol",
    cardinalSymptoms: ["fatigue", "low energy", "weakness", "anemia", "iron"],
    primaryDosha: "Pitta",
    remedies: [
      {
        id: "FORM-DRAK-001",
        name: "Drakshasava",
        textReference: "Classical Draksha Sandhana reference",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana Kalpana",
        formFactor: "Asava",
        targetDoshas: ["Vata", "Pitta"],
        compatibleAgni: ["Mandagni", "Samagni"],
        posology: "10-20 ml with equal water after meals.",
        anupana: "Lukewarm water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Contains natural fermentation. Screen for diabetes, alcohol sensitivity, pregnancy, and medication interactions.",
        ingredients: [
          { name: "Draksha", botanicalName: "Vitis vinifera", source: "BP", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-MEMORY-SLEEP-006",
    name: "Saraswatarishta Protocol",
    modernApproximation: "Stress, focus, sleep, and cognitive support",
    diagnosticSource: "Classical Medhya Rasayana protocol",
    cardinalSymptoms: ["insomnia", "stress", "anxiety", "memory", "focus", "brain fog"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-SARA-001",
        name: "Saraswatarishta",
        textReference: "Classical Saraswata Arishta reference",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana Kalpana",
        formFactor: "Arishta",
        targetDoshas: ["Vata"],
        compatibleAgni: ["Vishamagni", "Samagni"],
        posology: "10-15 ml with equal water after food, preferably evening.",
        anupana: "Lukewarm water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Use clinician guidance for sedatives, psychiatric medication, pregnancy, or pediatric use.",
        ingredients: [
          { name: "Brahmi", botanicalName: "Bacopa monnieri", source: "BP", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-PAIN-RECOVERY-007",
    name: "Dashmoolarishtam Protocol",
    modernApproximation: "Vata pain, recovery, inflammation, and sleep support",
    diagnosticSource: "Classical Dashamoola protocol",
    cardinalSymptoms: ["body pain", "joint pain", "recovery", "inflammation", "sleep", "restlessness"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-DASH-001",
        name: "Dashmoolarishtam",
        textReference: "Classical Dashamoola Arishta reference",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana Kalpana",
        formFactor: "Arishta",
        targetDoshas: ["Vata", "Kapha"],
        compatibleAgni: ["Vishamagni", "Mandagni", "Samagni"],
        posology: "15-20 ml with equal lukewarm water after dinner.",
        anupana: "Lukewarm water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Avoid self-treatment for acute injury, fever, swelling, or severe unexplained pain.",
        ingredients: [
          { name: "Dashamoola", botanicalName: "Classical ten-root group", source: "BR", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-SKIN-IMMUNITY-008",
    name: "Amalaki Rasayana Protocol",
    modernApproximation: "Skin glow, antioxidant, digestion, and immune support",
    diagnosticSource: "Classical Rasayana protocol",
    cardinalSymptoms: ["skin", "glowing skin", "immunity", "acidity", "heat", "pitta", "anti aging"],
    primaryDosha: "Pitta",
    remedies: [
      {
        id: "FORM-AMLA-001",
        name: "Amalaki Rasayana",
        textReference: "Classical Amalaki Rasayana reference",
        styleReference: "Rasayana Chikitsa",
        formFactor: "Rasayana",
        targetDoshas: ["Pitta", "Vata"],
        compatibleAgni: ["Tikshnagni", "Samagni"],
        posology: "3-5 g once daily, adjusted by practitioner.",
        anupana: "Warm water or clinician-selected vehicle",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical rasayana. Screen for allergies, acidity sensitivity, and existing medications.",
        ingredients: [
          { name: "Amalaki", botanicalName: "Emblica officinalis", source: "BP", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap(
  (disease: DiseaseProfile) => disease.remedies
);
