import { DISEASES_LIBRARY } from "./libraryData";

// Define the keyword-to-ID mapping
const semanticMap: Record<string, string> = {
  "iron deficiency": "DIS-NUTR-005", // Maps to Drakshasava Protocol
  "anemia": "DIS-NUTR-005",
  "insomnia": "DIS-NIDR-007",
  "sleep": "DIS-NIDR-007",
  "constipation": "DIS-CONST-004",
  "fatigue": "DIS-FATIGUE-002",
  "diabetes": "DIS-PRAM-008",
  "sugar": "DIS-PRAM-008"
};

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(intake: any): any {
    // 1. AI Reasoning Layer: Check symptomText for keywords
    const lowerText = intake.symptomText.toLowerCase();
    let matchedId = null;

    for (const [keyword, id] of Object.entries(semanticMap)) {
      if (lowerText.includes(keyword)) {
        matchedId = id;
        break;
      }
    }

    // 2. Fallback to manual selection if no AI match
    const disease = matchedId 
      ? DISEASES_LIBRARY.find(d => d.id === matchedId) 
      : DISEASES_LIBRARY.find(d => d.cardinalSymptoms.some(s => intake.selectedSymptoms.includes(s)));

    if (!disease) return null;

    // 3. Return structured data
    return {
      primaryDosha: disease.primaryDosha,
      calculatedAgni: "Samagni",
      protocolMatches: disease.remedies.map(r => ({
        audience: disease.name,
        objective: disease.modernApproximation,
        medicines: [{ name: r.name, dosageInstructions: r.posology, timing: "Post-Meal", complianceNotes: r.complianceNotes }]
      }))
    };
  }
}
