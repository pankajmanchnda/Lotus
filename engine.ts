import type { AgniType, DiseaseProfile, Dosha, EvaluationResult, Formulation, UserIntake } from "./types";
import { DISEASES_LIBRARY, FORMULATIONS_LIBRARY } from "./libraryData";

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
  "fever"
];

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(input: UserIntake): EvaluationResult {
    // 1. Calculate Primary Dosha Imbalance from Symptoms Vectors
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;

    input.selectedSymptoms.forEach((symptom) => {
      if (["Alternating Constipation & Diarrhea", "Mucus in Stool", "Abdominal Gurgling & Mild Pain"].includes(symptom)) {
        vataScore += 3;
      }

      if (["Heartburn & Burning Sensation", "Acid Reflux after Meals", "Nausea & Sour Eructations"].includes(symptom)) {
        pittaScore += 3;
      }

      if (["Lethargy & Heaviness in Stomach", "Slow Digestion & Weight Retention", "White Tongue Coating & Brain Fog"].includes(symptom)) {
        kaphaScore += 3;
      }
    });

    // Determine baseline primary imbalance vector.
    let primaryDosha: Dosha = "Vata";
    if (pittaScore > vataScore && pittaScore >= kaphaScore) primaryDosha = "Pitta";
    if (kaphaScore > vataScore && kaphaScore > pittaScore) primaryDosha = "Kapha";

    // 2. Compute Metabolic Capacity (Agni) via Biometrics & Activity
    let calculatedAgni: AgniType = "Samagni";
    if (primaryDosha === "Kapha" || input.dailySteps < 4000) {
      calculatedAgni = "Mandagni";
    } else if (primaryDosha === "Vata") {
      calculatedAgni = "Vishamagni";
    } else if (primaryDosha === "Pitta") {
      calculatedAgni = "Tikshnagni";
    }

    // 3. Search and Match Classical Disease Profile via Madhava Nidana Index
    let matchedDisease: DiseaseProfile | null = null;
    let maxMatches = 0;

    DISEASES_LIBRARY.forEach((disease) => {
      const intersections = disease.cardinalSymptoms.filter((symptom) => input.selectedSymptoms.includes(symptom)).length;
      if (intersections > maxMatches) {
        maxMatches = intersections;
        matchedDisease = disease;
      }
    });

    const urgentFlags = findUrgentFlags(input);

    // 4. Query & Filter Remedies from Library (Applying Safety Gates)
    const safeFormulations = matchedDisease && urgentFlags.length === 0
      ? (matchedDisease as DiseaseProfile).remedies.filter((remedy) => {
          // Rule 1: Exclude heavy metals or minerals completely.
          const hasHeavyMetals = remedy.ingredients.some((ingredient) => ingredient.isHeavyMetalOrMineral);
          // Rule 2: Ensure compatibility with calculated Agni status to prevent indigestion.
          const isAgniCompatible = remedy.compatibleAgni.includes(calculatedAgni);
          // Rule 3: Exclude user allergies.
          const normalizedAllergies = input.allergies.map((allergy) => allergy.toLowerCase());
          const matchesAllergy = remedy.ingredients.some((ingredient) => normalizedAllergies.includes(ingredient.name.toLowerCase()));
          // Rule 4: Exclude any entry that has not passed the U.S. compliance screen.
          const isUsCompliant = remedy.usComplianceStatus === "PASSED";

          return !hasHeavyMetals && isAgniCompatible && !matchesAllergy && isUsCompliant;
        })
      : [];

    // 5. Generate Tailored Diet & Lifestyle Guidelines (Ahara / Vihara)
    let ahara = "Maintain a regular balanced, seasonal whole-food diet.";
    let vihara = "Target a consistent exercise routine. Daily movement goal: 7,500+ steps.";

    if (primaryDosha === "Vata") {
      ahara = "Favor warm, grounding, cooked organic stews and healthy fats. Avoid cold, raw, dry salads.";
      vihara = "Prioritize regular sleep cycles, warm oil self-massage (Abhyanga), and mild grounding exercise.";
    } else if (primaryDosha === "Pitta") {
      ahara = "Favor sweet, cooling, refreshing foods and leafy greens. Avoid hot spices, excessive vinegars, and citrus.";
      vihara = "Avoid physical exercise under high-heat midday sun. Practice cooling breathing protocols (Shitali Pranayama).";
    } else if (primaryDosha === "Kapha") {
      ahara = "Favor light, dry, warming, highly spiced foods. Avoid heavy dairy creams, cold iced drinks, and oily sweets.";
      vihara = "Engage in invigorating aerobic activity. Wake up early in the morning and avoid daytime sleeping.";
    }

    return {
      primaryDosha,
      calculatedAgni,
      matchedDisease,
      safeFormulations,
      lifestyleRegimen: { ahara, vihara }
    };
  }
}

export function normalize(value: unknown): string {
  return String(value || "").trim().toLowerCase();
}

export function findUrgentFlags(intake: UserIntake): string[] {
  const haystack = normalize([...intake.selectedSymptoms, ...intake.allergies].join(" "));
  return urgentSymptoms.filter((symptom) => haystack.includes(symptom));
}

export function searchLibrary(query: string): Formulation[] {
  const normalized = normalize(query);

  if (!normalized) {
    return FORMULATIONS_LIBRARY;
  }

  return FORMULATIONS_LIBRARY.filter((formulation) => normalize(JSON.stringify(formulation)).includes(normalized));
}

export function evaluateIntake(input: UserIntake): EvaluationResult {
  return ClassicalAyurvedicEngine.evaluateIntake(input);
}
