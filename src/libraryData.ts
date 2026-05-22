import type { DiseaseProfile, Formulation } from "./types";

export const SYMPTOM_OPTIONS = [
  "Alternating Constipation & Diarrhea",
  "Mucus in Stool",
  "Abdominal Gurgling & Mild Pain",
  "Heartburn & Burning Sensation",
  "Acid Reflux after Meals",
  "Nausea & Sour Eructations",
  "Lethargy & Heaviness in Stomach",
  "Slow Digestion & Weight Retention",
  "White Tongue Coating & Brain Fog"
];

export const DISEASES_LIBRARY: DiseaseProfile[] = [
  {
    id: "DIS-GRAH-001",
    name: "Grahani Roga Protocol",
    modernApproximation: "Chronic Malabsorption / Dysbiosis Framework",
    diagnosticSource: "[MN] Madhava Nidana, Ch. 4",
    cardinalSymptoms: ["Alternating Constipation & Diarrhea", "Mucus in Stool", "Abdominal Gurgling & Mild Pain"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-BR-KUT-012",
        name: "Kutajarishta Liquid",
        textReference: "[BR] Bhaishajya Ratnavali, Grahani Rogadhikara, v. 92-97",
        styleReference: "[SHA] Sharngadhara Samhita, M.K. Ch. 10 (Sandhana)",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Vata", "Kapha"],
        compatibleAgni: ["Vishamagni", "Mandagni", "Samagni"],
        posology: "20 ml mixed with an equal quantity of water, twice daily post-meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "100% plant-based botanicals. Extracted from bark without heavy metal matrices.",
        ingredients: [
          { name: "Kutaja", botanicalName: "Holarrhena antidysenterica", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false },
          { name: "Draksha", botanicalName: "Vitis vinifera", source: "[BP] Amradiphala Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-AMLA-002",
    name: "Amlapitta Digestive Protocol",
    modernApproximation: "Hyperacidity / Acid Reflux Management",
    diagnosticSource: "[MN] Madhava Nidana, Ch. 52",
    cardinalSymptoms: ["Heartburn & Burning Sensation", "Acid Reflux after Meals", "Nausea & Sour Eructations"],
    primaryDosha: "Pitta",
    remedies: [
      {
        id: "FORM-BR-SHT-044",
        name: "Shatavari Ghrita Core",
        textReference: "[BR] Bhaishajya Ratnavali, Amlapitta Chikitsa, v. 44-48",
        styleReference: "[SHA] Sharngadhara Samhita, M.K. Ch. 9 (Snehapaka)",
        formFactor: "Ghrita (Medicated Clarified Ghee)",
        targetDoshas: ["Pitta"],
        compatibleAgni: ["Tikshnagni", "Samagni"],
        posology: "5 grams taken once daily on an empty stomach in the early morning.",
        anupana: "Warm Organic Milk",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical lipid infusion. Contains dairy allergen (Ghee) - explicit label required.",
        ingredients: [
          { name: "Shatavari", botanicalName: "Asparagus racemosus", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false },
          { name: "Goghrita", botanicalName: "Clarified Butterfat", source: "[BP] Ghrita Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-AGNI-003",
    name: "Agnimandya Metabolic Protocol",
    modernApproximation: "Sluggish Metabolism / Slow Motility Support",
    diagnosticSource: "[MN] Madhava Nidana, Ch. 6",
    cardinalSymptoms: ["Lethargy & Heaviness in Stomach", "Slow Digestion & Weight Retention", "White Tongue Coating & Brain Fog"],
    primaryDosha: "Kapha",
    remedies: [
      {
        id: "FORM-BR-CHIT-099",
        name: "Chitrakadi Vati Extract",
        textReference: "[BR] Bhaishajya Ratnavali, Agnimandya Chikitsa, v. 21",
        styleReference: "[SHA] Sharngadhara Samhita, M.K. Ch. 7 (Vati Kalpana)",
        formFactor: "Vati (Compressed Herbal Tablet)",
        targetDoshas: ["Kapha", "Vata"],
        compatibleAgni: ["Mandagni", "Vishamagni"],
        posology: "1 tablet (250mg) chewed or swallowed 15 minutes before main meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Pure spice-and-root compression matrix. Free of heavy metal bhasmas.",
        ingredients: [
          { name: "Chitraka", botanicalName: "Plumbago zeylanica", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false },
          { name: "Pippali", botanicalName: "Piper longum", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap((disease) => disease.remedies);
