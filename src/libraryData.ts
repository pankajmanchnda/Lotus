import type { DiseaseProfile, Formulation } from "./types";

export const SYMPTOM_OPTIONS = [
  // 1. Annavaha Srotas (Digestive & Gut)
  "Alternating Constipation & Diarrhea",
  "Mucus in Stool",
  "Heartburn & Burning Sensation",
  "Nausea & Sour Eructations",
  "Lethargy & Heaviness in Stomach",
  
  // 2. Pranavaha Srotas (Respiratory)
  "Dry Persistent Cough",
  "Shortness of Breath on Exertion",
  "Chest Congestion & Phlegm",

  // 3. Rasavaha Srotas (Cardiovascular & Lymphatic)
  "Palpitations & Uneven Heartbeat",
  "Chronic Low-Grade Fever",
  "Systemic Swelling (Edema)",

  // 4. Raktavaha Srotas (Blood, Liver & Skin)
  "Red, Inflamed Skin Eruptions",
  "Yellowing of Eyes & Skin (Jaundice)",
  "Chronic Itching & Hives",

  // 5. Asthivaha & Mamsavaha Srotas (Musculoskeletal)
  "Joint Stiffness & Popping",
  "Sharp Pain on Movement",
  "Muscle Wasting & Weakness",

  // 6. Majjavaha Srotas (Nervous System & Mind)
  "Racing Thoughts & Anxiety",
  "Difficulty Falling Asleep",
  "Tremors & Spasms",

  // 7. Mutravaha Srotas (Urinary & Metabolic)
  "Frequent Urination & Thirst",
  "Burning Sensation during Urination",
  "Unexplained Fatigue & Sweet Cravings",

  // 8. Artavavaha & Shukravaha Srotas (Reproductive)
  "Irregular or Painful Cycles",
  "Low Vitality & Libido",
  "Hormonal Mood Fluctuations"
];

export const DISEASES_LIBRARY: DiseaseProfile[] = [
  // --- DIGESTIVE (Annavaha) ---
  {
    id: "DIS-GRAH-001",
    name: "Grahani Roga",
    modernApproximation: "Chronic Malabsorption / Dysbiosis",
    diagnosticSource: "[MN] Madhava Nidana, Ch. 4",
    cardinalSymptoms: ["Alternating Constipation & Diarrhea", "Mucus in Stool"],
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
        complianceNotes: "100% plant-based botanicals. Extracted from bark.",
        ingredients: [
          { name: "Kutaja", botanicalName: "Holarrhena antidysenterica", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-AMLA-002",
    name: "Amlapitta",
    modernApproximation: "Hyperacidity / Acid Reflux",
    diagnosticSource: "[MN] Madhava Nidana, Ch. 52",
    cardinalSymptoms: ["Heartburn & Burning Sensation", "Nausea & Sour Eructations"],
    primaryDosha: "Pitta",
    remedies: [
      {
        id: "FORM-BR-SHT-044",
        name: "Shatavari Ghrita",
        textReference: "[BR] Bhaishajya Ratnavali, Amlapitta Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Snehapaka",
        formFactor: "Ghrita (Medicated Clarified Ghee)",
        targetDoshas: ["Pitta"],
        compatibleAgni: ["Tikshnagni", "Samagni"],
        posology: "5 grams taken once daily on an empty stomach in the early morning.",
        anupana: "Warm Organic Milk",
        usComplianceStatus: "PASSED",
        complianceNotes: "Contains dairy allergen (Ghee).",
        ingredients: [
          { name: "Shatavari", botanicalName: "Asparagus racemosus", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },

  // --- RESPIRATORY (Pranavaha) ---
  {
    id: "DIS-KASA-003",
    name: "Kasa / Shwasa",
    modernApproximation: "Respiratory Congestion / Asthma Support",
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

  // --- CARDIOVASCULAR (Rasavaha) ---
  {
    id: "DIS-HRID-004",
    name: "Hridroga (Vataja)",
    modernApproximation: "Cardiac Stress / Benign Palpitations",
    diagnosticSource: "[MN] Madhava Nidana, Hridroga Nidana, Ch. 29",
    cardinalSymptoms: ["Palpitations & Uneven Heartbeat", "Systemic Swelling (Edema)"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-BR-ARJ-101",
        name: "Arjunarishta",
        textReference: "[BR] Bhaishajya Ratnavali, Hridroga Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Vata", "Pitta"],
        compatibleAgni: ["Samagni", "Vishamagni"],
        posology: "15 ml mixed with equal water, twice daily after meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical bark extract. Highly established in US phytotherapy markets.",
        ingredients: [
          { name: "Arjuna Bark", botanicalName: "Terminalia arjuna", source: "[BP] Vatadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },

  // --- SKIN & BLOOD (Raktavaha) ---
  {
    id: "DIS-KUSH-005",
    name: "Kushta / Visarpa",
    modernApproximation: "Inflammatory Skin Conditions / Urticaria",
    diagnosticSource: "[MN] Madhava Nidana, Kushta Nidana, Ch. 49",
    cardinalSymptoms: ["Red, Inflamed Skin Eruptions", "Chronic Itching & Hives"],
    primaryDosha: "Pitta",
    remedies: [
      {
        id: "FORM-BR-KHA-202",
        name: "Khadirarishta",
        textReference: "[BR] Bhaishajya Ratnavali, Kushta Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Pitta", "Kapha"],
        compatibleAgni: ["Tikshnagni", "Samagni"],
        posology: "20 ml with equal water, post meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Excellent blood purifier, compliant purely botanical resin.",
        ingredients: [
          { name: "Khadira", botanicalName: "Acacia catechu", source: "[BP] Vatadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },

  // --- MUSCULOSKELETAL (Asthivaha/Mamsavaha) ---
  {
    id: "DIS-SAND-006",
    name: "Sandhigata Vata",
    modernApproximation: "Osteoarthritis / Structural Degeneration",
    diagnosticSource: "[MN] Madhava Nidana, Vata Vyadhi, Ch. 22",
    cardinalSymptoms: ["Joint Stiffness & Popping", "Sharp Pain on Movement"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-BR-YOG-112",
        name: "Yogaraja Guggulu",
        textReference: "[BR] Bhaishajya Ratnavali, Amavata Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Vati Kalpana",
        formFactor: "Guggulu (Resin-Bound Tablet)",
        targetDoshas: ["Vata", "Kapha"],
        compatibleAgni: ["Samagni", "Vishamagni"],
        posology: "2 tablets twice daily after meals.",
        anupana: "Warm Water or Rasnadi Kwatha",
        usComplianceStatus: "PASSED",
        complianceNotes: "Plant resin base. Free from Bhasma (calcined metals).",
        ingredients: [
          { name: "Guggulu Resin", botanicalName: "Commiphora mukul", source: "[BP] Karpuradi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },

  // --- NERVOUS SYSTEM (Majjavaha) ---
  {
    id: "DIS-NIDR-007",
    name: "Vata Vyadhi (Nidranasha)",
    modernApproximation: "Nervous System Stress / Insomnia",
    diagnosticSource: "[MN] Madhava Nidana, Vata Vyadhi, Ch. 22",
    cardinalSymptoms: ["Racing Thoughts & Anxiety", "Difficulty Falling Asleep", "Tremors & Spasms"],
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
        complianceNotes: "Botanical adaptogen matrix. Safe for prolonged use.",
        ingredients: [
          { name: "Ashwagandha", botanicalName: "Withania somnifera", source: "[BP] Guduchyadi Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },

  // --- URINARY & METABOLIC (Mutravaha) ---
  {
    id: "DIS-PRAM-008",
    name: "Prameha",
    modernApproximation: "Metabolic Syndrome / Pre-Diabetic Support",
    diagnosticSource: "[MN] Madhava Nidana, Prameha Nidana, Ch. 33",
    cardinalSymptoms: ["Frequent Urination & Thirst", "Unexplained Fatigue & Sweet Cravings", "Burning Sensation during Urination"],
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
  },

  // --- REPRODUCTIVE (Artavavaha) ---
  {
    id: "DIS-ARTV-009",
    name: "Artava Dosha",
    modernApproximation: "Menstrual Irregularity / Hormonal Imbalance",
    diagnosticSource: "[MN] Madhava Nidana, Yoni Vyapad, Ch. 62",
    cardinalSymptoms: ["Irregular or Painful Cycles", "Hormonal Mood Fluctuations", "Low Vitality & Libido"],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-BR-ASHK-301",
        name: "Ashokarishta",
        textReference: "[BR] Bhaishajya Ratnavali, Stri Roga Chikitsa",
        styleReference: "[SHA] Sharngadhara Samhita, Sandhana",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Vata", "Pitta"],
        compatibleAgni: ["Vishamagni", "Samagni"],
        posology: "20 ml with equal water, twice daily.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Uterine tonic bark extract. 100% botanical.",
        ingredients: [
          { name: "Ashoka Bark", botanicalName: "Saraca asoca", source: "[BP] Pushpa Varga", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap((disease) => disease.remedies);
