import { DISEASES_LIBRARY } from "./libraryData";

// Semantic map: Bridges modern terminology to your Classical Library IDs
const semanticMap: Record<string, string> = {
  "iron deficiency": "DIS-NUTR-005",
  "anemia": "DIS-NUTR-005",
  "insomnia": "DIS-NIDR-007",
  "sleep": "DIS-NIDR-007",
  "constipation": "DIS-CONST-004",
  "fatigue": "DIS-FATIGUE-002",
  "diabetes": "DIS-PRAM-008",
  "sugar": "DIS-PRAM-008",
  "anxiety": "DIS-NERV-006"
};

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(intake: any): any {
    const lowerText = intake.symptomText.toLowerCase();
    let matchedId = null;

    // 1. Semantic Match: Scan text for keywords
    for (const [keyword, id] of Object.entries(semanticMap)) {
      if (lowerText.includes(keyword)) {
        matchedId = id;
        break;
      }
    }

    // 2. Logic fallback: Use manual selection if no AI match found
    const disease = matchedId 
      ? DISEASES_LIBRARY.find(d => d.id === matchedId) 
      : DISEASES_LIBRARY.find(d => d.cardinalSymptoms.some(s => intake.selectedSymptoms.includes(s)));

    if (!disease) return null;

    // 3. Return structured dual-view protocols
    return {
      primaryDosha: disease.primaryDosha,
      calculatedAgni: "Samagni",
      practitionerPage: {
        title: "Practitioner Clinical Protocol",
        rows: disease.remedies.map(r => ({
          user: "Patient",
          time: "Post-Meal",
          medication: r.name,
          dosage: r.posology,
          objective: r.complianceNotes
        }))
      },
      patientPage: {
        title: "Patient Wellness Plan",
        rows: disease.remedies.map(r => ({
          user: "You",
          time: "After Meals",
          medication: r.name,
          dosage: r.posology,
          objective: `Supports: ${disease.modernApproximation}`
        }))
      }
    };
  }
}
