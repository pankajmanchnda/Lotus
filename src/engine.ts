import type { AgniType, DiseaseProfile, Dosha, EvaluationResult, Formulation, UserIntake } from "./types";
import { DISEASES_LIBRARY } from "./libraryData";

const urgentSymptoms = [
  "chest pain", "shortness of breath", "blood in stool", "black stool", 
  "severe pain", "fainting", "stroke", "suicidal", "jaundice", "fever"
];

function tokenizeFreeText(value: string): string[] {
  return String(value || "").trim().toLowerCase()
    .split(/[,;\n\.]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(input: UserIntake): EvaluationResult {
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;

    // Combine checkboxes with free-text input for a comprehensive profile analysis
    const tokenizedFreeText = [...tokenizeFreeText(input.symptomText), ...tokenizeFreeText(input.goalsText)];
    const comprehensiveSymptoms = [...input.selectedSymptoms, ...tokenizedFreeText];

    comprehensiveSymptoms.forEach((symptom) => {
      const norm = String(symptom).toLowerCase();
      if (["alternating constipation & diarrhea", "mucus in stool", "abdominal gurgling & mild pain", "constipation", "bloating", "gas", "anxiety", "insomnia", "stress", "blood pressure"].some(match => norm.includes(match))) vataScore += 3;
      if (["heartburn & burning sensation", "acid reflux after meals", "nausea & sour eructations", "acidity", "burning", "heat", "anger"].some(match => norm.includes(match))) pittaScore += 3;
      if (["lethargy & heaviness in stomach", "slow digestion & weight retention", "white tongue coating & brain fog", "sluggish", "weight gain", "fatigue", "tired", "energy", "thyroid"].some(match => norm.includes(match))) kaphaScore += 3;
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
    if (primaryDosha === "Kapha" || input.dailySteps < 4000) calculatedAgni = "Mandagni";
    else if (primaryDosha === "Vata") calculatedAgni = "Vishamagni";
    else if (primaryDosha === "Pitta") calculatedAgni = "Tikshnagni";

    const matchResult = DISEASES_LIBRARY.reduce<{ disease: DiseaseProfile | null; max: number }>(
      (acc, currentDisease) => {
        const intersections = currentDisease.cardinalSymptoms.filter(s => comprehensiveSymptoms.some(comp => comp.includes(s.toLowerCase()) || s.toLowerCase().includes(comp))).length;
        if (intersections > acc.max) {
          return { disease: currentDisease, max: intersections };
        }
        return acc;
      },
      { disease: null, max: 0 }
    );

    // Fallback logic: If free text doesn't exactly match a cardinal symptom, assign a baseline disease based on the primary Dosha calculation
    let activeDisease = matchResult.disease;
    if (!activeDisease) {
        if (primaryDosha === "Vata") activeDisease = DISEASES_LIBRARY.find(d => d.id === "DIS-GRAH-001") || null;
        else if (primaryDosha === "Pitta") activeDisease = DISEASES_LIBRARY.find(d => d.id === "DIS-AMLA-002") || null;
        else if (primaryDosha === "Kapha") activeDisease = DISEASES_LIBRARY.find(d => d.id === "DIS-AGNI-003") || null;
    }

    const isUsDestination = input.country.toLowerCase().trim() === "united states" || input.country.toLowerCase().trim() === "us";
    const urgentFlags = urgentSymptoms.filter(s => input.symptomText.toLowerCase().includes(s));

    const safeFormulations = (activeDisease !== null && urgentFlags.length === 0)
      ? activeDisease.remedies.filter((remedy) => {
          const hasHeavyMetals = remedy.ingredients.some(ing => ing.isHeavyMetalOrMineral);
          const isAgniCompatible = remedy.compatibleAgni.includes(calculatedAgni);
          const normalizedAllergies = input.allergies.map(a => a.toLowerCase().trim());
          const matchesAllergy = remedy.ingredients.some(ing => normalizedAllergies.includes(ing.name.toLowerCase().trim()));
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

    const formattedProtocolMatches: any[] = [];
    
    if (activeDisease !== null && safeFormulations.length > 0) {
        
        // Dynamically build the personalized objective weaving in the user's free text
        const userSymptoms = input.symptomText ? input.symptomText : 'reported imbalances';
        const userGoals = input.goalsText ? input.goalsText : 'achieve optimal wellness';
        const personalizedObjective = `Custom protocol targeting ${userSymptoms} to help you ${userGoals}. Clinically matched to classical ${activeDisease.name} (${activeDisease.modernApproximation}).`;

        formattedProtocolMatches.push({
          id: activeDisease.id,
          sourceDocument: "BHAISHAJYA RATNAVALI CLASSICAL LIBRARY",
          audience: "Adult " + primaryDosha + " Protocol",
          matchKeywords: activeDisease.cardinalSymptoms,
          goals: [ahara],
          objective: personalizedObjective,
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
        });
    }

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
