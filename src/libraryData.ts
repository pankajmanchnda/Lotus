import type { DiseaseProfile, Formulation } from "./types";

export const SYMPTOM_OPTIONS = [
  // Digestion & Gut
  "Alternating Constipation & Diarrhea",
  "Mucus in Stool",
  "Abdominal Gurgling & Mild Pain",
  "Heartburn & Burning Sensation",
  "Acid Reflux after Meals",
  "Nausea & Sour Eructations",
  "Lethargy & Heaviness in Stomach",
  "Slow Digestion & Weight Retention",
  "White Tongue Coating & Brain Fog",
  // Joint & Structural
  "Joint Stiffness & Popping",
  "Sharp Pain on Movement",
  "Swelling in Major Joints",
  // Respiratory & Immunity
  "Dry Persistent Cough",
  "Shortness of Breath on Exertion",
  "Chest Congestion & Phlegm",
  // Stress, Sleep & Nervous System
  "Racing Thoughts & Anxiety",
  "Difficulty Falling Asleep",
  "Nervous Palpitations",
  // Metabolic & Blood Sugar
  "Frequent Urination & Thirst",
  "Unexplained Fatigue & Sweet Cravings",
  "Tingling in Extremities"
];

export const DISEASES_LIBRARY: DiseaseProfile[] = [
  // --- EXISTING DIGESTIVE PROTOCOLS ---
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
        textReference: "[BR] Bhaishajya Ratnavali, Grahani Rogadhikara",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Vata", "Kapha"],
        compatibleAgni: ["Vishamagni", "Mandagni", "Samagni"],
        posology: "20 ml mixed with an equal quantity of water, twice daily post-meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "100% plant-based botanicals. Extracted from bark without heavy metal matrices.",
        ingredients: [
          { name: "Kutaja", botanicalName: "Holarrhena antidysenterica", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }
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
        textReference: "[BR] Bhaishajya Ratnavali, Amlapitta Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Snehapaka",
        formFactor: "Ghrita (Medicated Clarified Ghee)",
        targetDoshas: ["Pitta"],
        compatibleAgni: ["Tikshnagni", "Samagni"],
        posology: "5 grams taken once daily on an empty stomach in the early morning.",
        anupana: "Warm Organic Milk",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical lipid infusion. Contains dairy allergen (Ghee) - explicit label required.",
        ingredients: [
          { name: "Shatavari", botanicalName: "Asparagus racemosus", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }
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
        textReference: "[BR] Bhaishajya Ratnavali, Agnimandya Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Vati Kalpana",
        formFactor: "Vati (Compressed Herbal Tablet)",
        targetDoshas: ["Kapha", "Vata"],
        compatibleAgni: ["Mandagni", "Vishamagni"],
        posology: "1 tablet (250mg) chewed or swallowed 15 minutes before main meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Pure spice-and-root compression matrix. Free of heavy metal bhasmas.",
        ingredients: [
          { name: "Chitraka", botanicalName: "Plumbago zeylanica", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },

  // --- NEW PROTOCOLS ---
  {
    id: "DIS-SAND-004",
    name: "Sandhigata Vata Protocol",
    modernApproximation: "Osteoarthritis / Structural Degeneration",
    diagnosticSource: "[MN] Madhava Nidana, Vata Vyadhi, Ch. 22",
    cardinalSymptoms: ["Joint Stiffness & Popping", "Sharp Pain on Movement", "Swelling in Major Joints"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-BR-YOG-112",
        name: "Yogaraja Guggulu",
        textReference: "[BR] Bhaishajya Ratnavali, Amavata Chikitsa, v. 90-95",
        styleReference: "[SHA] Sharngadhara Samhita, Vati Kalpana",
        formFactor: "Guggulu (Resin-Bound Tablet)",
        targetDoshas: ["Vata", "Kapha"],
        compatibleAgni: ["Samagni", "Vishamagni"],
        posology: "2 tablets twice daily after meals.",
        anupana: "Warm Water or Rasnadi Kwatha",
        usComplianceStatus: "PASSED",
        complianceNotes: "Plant resin base. Free from Bhasma (calcined metals) ensuring US retail compliance.",
        ingredients: [
          { name: "Guggulu Resin", botanicalName: "Commiphora mukul", source: "[BP] Karpuradi Varga", isHeavyMetalOrMineral: false },
          { name: "Triphala", botanicalName: "Terminalia chebula, etc.", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-KASA-005",
    name: "Kasa / Shwasa Protocol",
    modernApproximation: "Respiratory Congestion / Immunity Impairment",
    diagnosticSource: "[MN] Madhava Nidana, Kasa Nidana, Ch. 11",
    cardinalSymptoms: ["Dry Persistent Cough", "Shortness of Breath on Exertion", "Chest Congestion & Phlegm"],
    primaryDosha: "Kapha",
    remedies: [
      {
        id: "FORM-BR-SITO-055",
        name: "Sitopaladi Churna",
        textReference: "[BR] Bhaishajya Ratnavali, Rajayakshma Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Churna Kalpana",
        formFactor: "Churna (Fine Herbal Powder)",
        targetDoshas: ["Kapha", "Pitta"],
        compatibleAgni: ["Mandagni", "Samagni"],
        posology: "3 grams mixed into a paste, licked from a spoon 3-4 times daily.",
        anupana: "Raw Honey & Ghee",
        usComplianceStatus: "PASSED",
        complianceNotes: "Food-grade spice compilation. Highly compliant.",
        ingredients: [
          { name: "Vamshalochan", botanicalName: "Bambusa arundinacea", source: "[BP] Karpuradi Varga", isHeavyMetalOrMineral: false },
          { name: "Pippali", botanicalName: "Piper longum", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-NIDR-006",
    name: "Vata Vyadhi (Nidranasha) Protocol",
    modernApproximation: "Nervous System Stress / Insomnia",
    diagnosticSource: "[MN] Madhava Nidana, Vata Vyadhi, Ch. 22",
    cardinalSymptoms: ["Racing Thoughts & Anxiety", "Difficulty Falling Asleep", "Nervous Palpitations"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-BR-ASHW-077",
        name: "Ashwagandharishta",
        textReference: "[BR] Bhaishajya Ratnavali, Murcha Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Vata"],
        compatibleAgni: ["Vishamagni", "Samagni"],
        posology: "15 ml mixed with equal water, after lunch and dinner.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical adaptogen matrix. Safe for prolonged use without dependency.",
        ingredients: [
          { name: "Ashwagandha", botanicalName: "Withania somnifera", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-PRAM-007",
    name: "Prameha Protocol",
    modernApproximation: "Metabolic Syndrome / Pre-Diabetic Support",
    diagnosticSource: "[MN] Madhava Nidana, Prameha Nidana, Ch. 33",
    cardinalSymptoms: ["Frequent Urination & Thirst", "Unexplained Fatigue & Sweet Cravings", "Tingling in Extremities"],
    primaryDosha: "Kapha",
    remedies: [
      {
        id: "FORM-BR-NISHA-088",
        name: "Nisha Amalaki Extract",
        textReference: "[BR] Bhaishajya Ratnavali, Prameha Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Vati Kalpana",
        formFactor: "Vati (Compressed Herbal Tablet)",
        targetDoshas: ["Kapha", "Pitta"],
        compatibleAgni: ["Mandagni", "Tikshnagni"],
        posology: "2 tablets twice daily, 30 minutes before meals.",
        anupana: "Warm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Simple binary botanical combination. Monitors blood sugar effectively.",
        ingredients: [
          { name: "Haridra (Turmeric)", botanicalName: "Curcuma longa", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false },
          { name: "Amalaki", botanicalName: "Emblica officinalis", source: "[BP] Haritakyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap((disease) => disease.remedies);
