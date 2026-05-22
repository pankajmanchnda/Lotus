import type { AgniType, DiseaseProfile, Dosha, EvaluationResult, Formulation, UserIntake } from "./types";
import { DISEASES_LIBRARY } from "./libraryData";

const urgentSymptoms = [
  "chest pain", "shortness of breath", "blood in stool", "black stool", 
  "severe pain", "fainting", "stroke", "suicidal", "jaundice", "fever"
];

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(input: UserIntake): EvaluationResult {
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;

    const activeSymptoms = [...input.selectedSymptoms];

    activeSymptoms.forEach((symptom) => {
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

    if (vataScore === 0 && pittaScore === 0 && kaphaScore === 0) {
      switch (input.weatherType) {
        case 'Cold-Dry': vataScore += 1.5; break;
        case 'Hot-Humid': pittaScore += 1.5; break;
        case 'Cold-Humid': kaphaScore += 1.5; break;
        case 'Variable-Windy': vataScore += 1.5; break;
      }
    }

    let primaryDosha: Dosha = "Vata";
    if (pittaScore > vataScore && pittaScore >= kaphaScore) primaryDosha = "Pitta";
    if (kaphaScore > vataScore && kaphaScore > pittaScore) primaryDosha = "Kapha";

    let calculatedAgni: AgniType = "Samagni";
    if (primaryDosha === "Kapha" || input.dailySteps < 4000) {
      calculatedAgni = "Mandagni";
    } else if (primaryDosha === "Vata") {
      calculatedAgni = "Vishamagni";
    } else if (primaryDosha === "Pitta") {
      calculatedAgni = "Tikshnagni";
    }

    let matchedDisease: DiseaseProfile | null = null;
    let maxMatches = 0;

    // FIXED: Using a standard for...of loop so TypeScript tracks the variable correctly
    for (const disease of DISEASES_LIBRARY) {
      const intersections = disease.cardinalSymptoms.filter((symptom) => 
        activeSymptoms.includes(symptom)
      ).length;
      if (intersections > maxMatches) {
        maxMatches = intersections;
        matchedDisease = disease;
      }
    }

    const isUsDestination = input.country.toLowerCase().trim() === "united states" || input.country.toLowerCase().trim() === "us";
    const urgentFlags = urgentSymptoms.filter(s => input.symptomText.toLowerCase().includes(s));

    // FIXED: Explicitly assigning the type so the compiler stops panicking
    const activeDisease = matchedDisease as DiseaseProfile | null;

    const safeFormulations = activeDisease && urgentFlags.length === 0
      ? activeDisease.remedies.filter((remedy) => {
          const hasHeavyMetals = remedy.ingredients.some((ing) => ing.isHeavyMetalOrMineral);
          const isAgniCompatible = remedy.compatibleAgni.includes(calculatedAgni);
          const normalizedAllergies = input.allergies.map((a) => a.toLowerCase().trim());
          const matchesAllergy = remedy.ingredients.some((ing) => normalizedAllergies.includes(ing.name.toLowerCase().trim()));
          const passesUSRules = isUsDestination ? remedy.usComplianceStatus === "PASSED" : true;

          return !hasHeavyMetals && isAgniCompatible && !matchesAllergy && passesUSRules;
        })
      : [];

    let ahara = "Maintain a regular balanced, seasonal whole-food diet.";
    let vihara = "Target a consistent exercise routine. Daily movement goal: 7,500+ steps.";

    if (primaryDosha === "Vata") {
      ahara = "Favor warm, grounding, cooked organic stews and healthy fats. Avoid cold, raw, dry salads.";
      vihara = `Prioritize regular sleep cycles. Daily movement target: 8,000 steps to protect structural recovery paths.`;
    } else if (primaryDosha === "Pitta") {
      ahara = "Favor sweet, cooling, refreshing foods and leafy greens. Avoid hot pungent spices.";
      vihara = "Avoid physical training under high-heat midday sun conditions.";
    } else if (primaryDosha === "Kapha") {
      ahara = "Favor light, dry, warming, highly spiced foods. Avoid heavy refined sugars and dairy creams.";
      vihara = "Engage in bracing aerobic workout routines. Wake up early and eliminate afternoon sleep cycles.";
    }

    const formattedProtocolMatches = activeDisease && safeFormulations.length > 0 ? [{
      id: activeDisease.id,
      sourceDocument: "BHAISHAJYA RATNAVALI CLASSICAL LIBRARY",
      audience: "Adult " + primaryDosha + " Protocol",
      matchKeywords: activeDisease.cardinalSymptoms,
      goals: [ahara],
      objective: `Text-validated strategy addressing classical ${activeDisease.name} (${activeDisease.modernApproximation}). Calculated fresh from system inputs.`,
      sourceExcerpt: `Source Tracking: ${activeDisease.diagnosticSource} | Formulation Framework.`,
      timing: "Post-Meal Chronobiology Sync",
      safetyNotes: [
        "Formulation contains 100% Kasthaushadhis (botanicals). Clear of mineral materials.",
        "Maintain a 2-hour separation from modern allopathic pharmacological agents."
      ],
      medicines: safeFormulations.map(form => ({
        name: form.name,
        dosageInstructions: form.posology,
        timing: `Preparation Style: ${form.formFactor}`,
        isHeavyMetalOrMineral: false,
        usComplianceStatus: form.usComplianceStatus,
        complianceNotes: form.complianceNotes
      }))
    }] : [];

    return {
      primaryDosha,
      calculatedAgni,
      matchedDisease: activeDisease,
      safeFormulations,
      protocolMatches: formattedProtocolMatches, 
      lifestyleRegimen: { ahara, vihara }
    };
  }
}

export function normalize(value: unknown): string {
  return String(value || "").trim().toLowerCase();
}

export function evaluateIntake(input: UserIntake): EvaluationResult {
  return ClassicalAyurvedicEngine.evaluateIntake(input);
}
