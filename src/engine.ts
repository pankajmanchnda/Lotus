import type { AgniType, DiseaseProfile, Dosha, EvaluationResult, Formulation, UserIntake, ProtocolRecommendation } from "./types";
import { DISEASES_LIBRARY, FAMILY_PROTOCOL_LIBRARY, FORMULATIONS_LIBRARY } from "./libraryData";

const urgentSymptoms = [
  "chest pain",
  "shortness of breath",
  "blood in stool",
  "black stool",
  "severe pain",
  "fainting",
  "stroke",
  "suicidal",
  "jaundice",
  "fever",
  "pregnant",
  "pregnancy",
  "breastfeeding",
  "kidney disease",
  "liver disease"
];

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(input: UserIntake): EvaluationResult {
    // 1. Calculate Primary Dosha Imbalance from Symptoms Vectors
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;

    const tokenizedSymptoms = tokenizeFreeText(input.symptomText);
    const tokenizedGoals = tokenizeFreeText(input.goalsText);

    const expandedSymptoms = [
      ...input.selectedSymptoms,
      ...tokenizedSymptoms,
      ...tokenizedGoals
    ];

    expandedSymptoms.forEach((symptom) => {
      const norm = normalize(symptom);
      
      // Vata Vector Assignments
      if (["alternating constipation & diarrhea", "mucus in stool", "abdominal gurgling & mild pain", "constipation", "bloating", "gas"].some(match => norm.includes(match))) {
        vataScore += 3;
      }
      // Pitta Vector Assignments
      if (["heartburn & burning sensation", "acid reflux after meals", "nausea & sour eructations", "acidity", "reflux", "burning"].some(match => norm.includes(match))) {
        pittaScore += 3;
      }
      // Kapha Vector Assignments
      if (["lethargy & heaviness in stomach", "slow digestion & weight retention", "white tongue coating & brain fog", "sluggish", "heaviness"].some(match => norm.includes(match))) {
        kaphaScore += 3;
      }
    });

    // RULE OF TEXT HIERARCHY PRIORITIZATION: 
    // Acute symptoms override geographic baseline climate impact scores. 
    // Environmental scores are applied only as balancing tie-breakers.
    if (vataScore === 0 && pittaScore === 0 && kaphaScore === 0) {
      switch (input.weatherType) {
        case 'Cold-Dry': vataScore += 1.5; break;
        case 'Hot-Humid': pittaScore += 1.5; break;
        case 'Cold-Humid': kaphaScore += 1.5; break;
        case 'Variable-Windy': vataScore += 1.5; break;
      }
    }

    // Determine baseline primary imbalance vector
    let primaryDosha: Dosha = "Vata";
    if (pittaScore > vataScore && pittaScore >= kaphaScore) primaryDosha = "Pitta";
    if (kaphaScore > vataScore && kaphaScore > pittaScore) primaryDosha = "Kapha";

    // 2. Compute Metabolic Capacity (Agni) via Biometrics & Activity Tracking Data
    let calculatedAgni: AgniType = "Samagni";
    if (primaryDosha === "Kapha" || input.dailySteps < 4000) {
      calculatedAgni = "Mandagni";
    } else if (primaryDosha === "Vata") {
      // High physical activity over 12,000 steps balances stagnant Kapha but can fluctuate Vata digestion
      calculatedAgni = input.dailySteps > 12000 ? "Vishamagni" : "Vishamagni";
    } else if (primaryDosha === "Pitta") {
      calculatedAgni = "Tikshnagni";
    }

    // 3. Search and Match Classical Disease Profile via Madhava Nidana Index
    let matchedDisease: DiseaseProfile | null = null;
    let maxMatches = 0;

    DISEASES_LIBRARY.forEach((disease) => {
      const intersections = disease.cardinalSymptoms.filter((symptom) => {
        const normalizedSymptom = normalize(symptom);
        return expandedSymptoms.some((item) => normalize(item).includes(normalizedSymptom) || normalizedSymptom.includes(normalize(item)));
      }).length;
      if (intersections > maxMatches) {
        maxMatches = intersections;
        matchedDisease = disease;
      }
    });

    const urgentFlags = findUrgentFlags(input);

    // 4. Query & Filter Remedies from Library (Applying Safety Gates)
    const safeFormulations = matchedDisease && urgentFlags.length === 0
      ? (matchedDisease as DiseaseProfile).remedies.filter((remedy) => {
          const hasHeavyMetals = remedy.ingredients.some((ingredient) => ingredient.isHeavyMetalOrMineral);
          const isAgniCompatible = remedy.compatibleAgni.includes(calculatedAgni);
          
          const normalizedAllergies = input.allergies.map((allergy) =>
