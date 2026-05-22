import type { DiseaseProfile, Formulation, ProtocolRecommendation } from "./types";

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
    name: "Grahani Roga",
    modernApproximation: "Irritable Bowel Syndrome / Chronic Malabsorption",
    diagnosticSource: "[MN] Madhava Nidana, Grahani Rogadhikara, Ch. 4",
    cardinalSymptoms: [
      "Alternating Constipation & Diarrhea",
      "Mucus in Stool",
      "Abdominal Gurgling & Mild Pain"
    ],
    primaryDosha: "Vata",
    remedies: [
      {
        id: "FORM-KUT-012",
        name: "Kutajarishta Liquid",
        textReference: "[BR] Bhaishajya Ratnavali, Grahani Rogadhikara, v. 92-97",
        styleReference: "[SHA] Sharngadhara Samhita, Madhyama Khanda, Ch. 10 (Sandhana)",
        formFactor: "Arishta (Naturally Fermented Infusion)",
        targetDoshas: ["Vata", "Kapha"],
        compatibleAgni: ["Vishamagni", "Mandagni", "Samagni"],
        posology: "20 ml mixed with an equal quantity of water, twice daily after food.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "100% plant-based botanicals. Free of restricted mineral materials.",
        ingredients: [
          { name: "Kutaja", botanicalName: "Holarrhena antidysenterica", source: "[BP] Guduchyadi Varga, v. 110", isHeavyMetalOrMineral: false },
          { name: "Draksha", botanicalName: "Vitis vinifera", source: "[BP] Amradiphala Varga, v. 102", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-AMLA-002",
    name: "Amlapitta Roga",
    modernApproximation: "Hyperacidity / Gastroesophageal Reflux Disease (GERD)",
    diagnosticSource: "[MN] Madhava Nidana, Amlapitta Nidana, Ch. 52",
    cardinalSymptoms: [
      "Heartburn & Burning Sensation",
      "Acid Reflux after Meals",
      "Nausea & Sour Eructations"
    ],
    primaryDosha: "Pitta",
    remedies: [
      {
        id: "FORM-SHT-044",
        name: "Shatavari Ghrita Core",
        textReference: "[BR] Bhaishajya Ratnavali, Amlapitta Chikitsa, v. 44-48",
        styleReference: "[SHA] Sharngadhara Samhita, Madhyama Khanda, Ch. 9 (Snehapaka)",
        formFactor: "Ghrita (Medicated Clarified Butter Ghee)",
        targetDoshas: ["Pitta"],
        compatibleAgni: ["Tikshnagni", "Samagni"],
        posology: "5 grams taken once daily on an empty stomach in the early morning.",
        anupana: "Warm Organic Milk",
        usComplianceStatus: "PASSED",
        complianceNotes: "Botanical lipid infusion. Contains dairy allergen (Ghee) - explicit label required.",
        ingredients: [
          { name: "Shatavari", botanicalName: "Asparagus racemosus", source: "[BP] Guduchyadi Varga, v. 180", isHeavyMetalOrMineral: false },
          { name: "Goghrita", botanicalName: "Clarified Butterfat", source: "[BP] Ghrita Varga, v. 4", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  },
  {
    id: "DIS-AGNI-003",
    name: "Agnimandya",
    modernApproximation: "Sluggish Metabolism / Dyspepsia",
    diagnosticSource: "[MN] Madhava Nidana, Agnimandya Nidana, Ch. 6",
    cardinalSymptoms: [
      "Lethargy & Heaviness in Stomach",
      "Slow Digestion & Weight Retention",
      "White Tongue Coating & Brain Fog"
    ],
    primaryDosha: "Kapha",
    remedies: [
      {
        id: "FORM-CHIT-099",
        name: "Chitrakadi Vati Decoction Extract",
        textReference: "[BR] Bhaishajya Ratnavali, Agnimandya Chikitsa, v. 21",
        styleReference: "[SHA] Sharngadhara Samhita, Madhyama Khanda, Ch. 7 (Vati)",
        formFactor: "Vati (Compressed Plant Extract Tablets)",
        targetDoshas: ["Kapha", "Vata"],
        compatibleAgni: ["Mandagni", "Vishamagni"],
        posology: "1 tablet (250mg) chewed or swallowed 15 minutes before main meals.",
        anupana: "Lukewarm Water",
        usComplianceStatus: "PASSED",
        complianceNotes: "Pure spice-and-root compression matrix. No heavy metal bhasma content.",
        ingredients: [
          { name: "Chitraka", botanicalName: "Plumbago zeylanica", source: "[BP] Haritakyadi Varga, v. 72", isHeavyMetalOrMineral: false },
          { name: "Pippali", botanicalName: "Piper longum", source: "[BP] Haritakyadi Varga, v. 54", isHeavyMetalOrMineral: false }
        ]
      }
    ]
  }
];

export const FORMULATIONS_LIBRARY: Formulation[] = DISEASES_LIBRARY.flatMap((disease) => disease.remedies);


export const FAMILY_PROTOCOL_LIBRARY: ProtocolRecommendation[] = [
  {
    id: "FAM-ADULT-THYROID-001",
    sourceDocument: "Family Ayurvedic Protocol final.pdf",
    audience: "Adult-Mother",
    matchKeywords: ["thyroid", "thyronorm", "puffiness", "lethargy", "fatigue", "weight retention", "sluggish"],
    goals: ["get active", "get thin", "reduce puffiness", "energy", "metabolism"],
    medicines: ["Thyronorm 62.5 mcg", "Kanchnaar Guggulu", "Punarnava Mandur", "Ashokarishta", "Lohaasavam", "Balaarishtam", "Dashmoolarishtam"],
    timing: "Thyronorm empty stomach 6:30-7:00 AM; adult liquids 20 minutes post-meals; Kanchnaar Guggulu 20 minutes before lunch.",
    dosage: "PDF protocol: Thyronorm 1 tablet empty stomach; Kanchnaar Guggulu 2 tablets with warm water; Punarnava Mandur 2 tablets + Ashokarishta 15 ml + Lohaasavam 15 ml in 30 ml water; Balaarishtam 20 ml in 20 ml water; Dashmoolarishtam 20 ml in 20 ml water.",
    objective: "Supports thyroid-related sluggishness, systemic puffiness, fatigue, anxious loops, irritability, and restorative sleep according to the family protocol.",
    safetyNotes: ["Keep a 2-hour gap from allopathic drugs as stated in the PDF.", "Thyroid medication timing must be clinician-managed.", "Use practitioner review before combining with prescription medication."],
    sourceExcerpt: "MOTHER: Thyronorm 62.5 mcg empty stomach; Kanchnaar Guggulu 2 tablets; Punarnava Mandur + Ashokarishta + Lohaasavam; Balaarishtam; Dashmoolarishtam."
  },
  {
    id: "FAM-ADULT-BP-CARDIO-002",
    sourceDocument: "Family Ayurvedic Protocol final.pdf",
    audience: "Adult-Father",
    matchKeywords: ["blood pressure", "bp", "cardiac", "heart", "cholesterol", "lipids", "iron", "fatigue", "gym", "20k steps", "active"],
    goals: ["get fit and agile", "get active", "stamina", "cardio support", "fitness"],
    medicines: ["Punarnava Mandur", "Arjunarishta", "Lohaasavam", "Divya Saraswatarista with Gold", "Ashwagandhaarishtam", "Dashmoolarishtam"],
    timing: "Morning post-breakfast, afternoon post-lunch, and night post-dinner as listed in the adult father protocol.",
    dosage: "PDF protocol: Punarnava Mandur 2 tablets + Arjunarishta 15 ml + Lohaasavam 15 ml in 30 ml water; Divya Saraswatarista with Gold 20 ml in 20 ml water; Ashwagandhaarishtam 15 ml + Dashmoolarishtam 15 ml in 30 ml water.",
    objective: "Supports borderline iron deficiency, blood count, borderline BP/cardiac strain, fluctuating lipids, stress loops, and muscle/bone strain from high activity.",
    safetyNotes: ["Saraswatarista with Gold contains a metal/mineral component and should be blocked from general U.S. consumer recommendations without specialist review.", "Monitor BP and medication interactions with a clinician.", "Liquids are mixed with equal lukewarm water per PDF."],
    sourceExcerpt: "FATHER: Punarnava Mandur + Arjunarishta + Lohaasavam; Divya Saraswatarista with Gold; Ashwagandhaarishtam + Dashmoolarishtam."
  },
  {
    id: "FAM-ADULT-ENERGY-SLEEP-003",
    sourceDocument: "Family Ayurvedic Protocol final.pdf",
    audience: "Adult",
    matchKeywords: ["sleep", "stress", "anxiety", "irritability", "brain loops", "fatigue", "lack of interest", "rest", "recovery"],
    goals: ["get active", "energy", "recover better", "sleep better", "calm mind"],
    medicines: ["Ashwagandhaarishtam", "Dashmoolarishtam", "Balaarishtam", "Ashokarishta"],
    timing: "Adult protocol emphasizes afternoon post-lunch and night post-dinner support, with liquids mixed in equal lukewarm water.",
    dosage: "PDF protocol varies by person: Ashwagandhaarishtam 15 ml + Dashmoolarishtam 15 ml; Dashmoolarishtam 20 ml; Balaarishtam 20 ml; Ashokarishta 15 ml as part of morning combination.",
    objective: "Supports fatigue, nervous irritability, anxiety, structural strength, and physically restorative sleep according to the family protocol.",
    safetyNotes: ["Use practitioner review for sedatives, psychiatric medication, pregnancy, liver disease, or severe insomnia.", "Keep 2-hour gap from allopathic drugs as stated in PDF."],
    sourceExcerpt: "Night protocols include Ashwagandhaarishtam and Dashmoolarishtam for sleep/rest; mother protocol uses Balaarishtam and Dashmoolarishtam for fatigue and restorative sleep."
  },
  {
    id: "FAM-PEDS-RESP-NOSEBLEED-004",
    sourceDocument: "Family Ayurvedic Protocol final.pdf",
    audience: "Pediatric",
    matchKeywords: ["child", "pediatric", "nosebleed", "nasal", "breathlessness", "cough", "mucus", "focus", "memory", "irritability"],
    goals: ["school focus", "respiratory comfort", "reduce irritability"],
    medicines: ["Aravindasava", "Saraswatarista", "Chandrakala Ras", "Divya Drakshasava", "Dashmoolarishtam", "Cow's Ghee Nasya"],
    timing: "Morning post-breakfast and night post-dinner pediatric protocol. Bedtime ghee nasya is listed for son only.",
    dosage: "PDF protocol: Aravindasava 5 ml + Saraswatarista 5 ml in 10 ml water; Chandrakala Ras 1 tablet crushed in 1 tsp honey; Drakshasava 5-10 ml; Dashmoolarishtam 5 ml depending on child protocol.",
    objective: "Pediatric support for borderline iron deficiency, focus, irritability, nosebleeds, mucus, and sudden breathlessness per the family protocol.",
    safetyNotes: ["Pediatric protocols require pediatrician/Ayurvedic practitioner review.", "Chandrakala Ras may include mineral ingredients depending on manufacturer; block for U.S. consumer recommendation without specialist review.", "Honey is not appropriate for infants; this protocol is for age 9 in the PDF."],
    sourceExcerpt: "TWINS AGE 9: Aravindasava, Saraswatarista, Chandrakala Ras, Drakshasava, Dashmoolarishtam, and ghee nasya are listed in child-specific routines."
  }
];
