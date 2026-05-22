import { DISEASES_LIBRARY } from "./libraryData";

export class ClassicalAyurvedicEngine {
  public static generateProtocol(input: any): EvaluationResult {
    // 1. Identify Match
    const matched = DISEASES_LIBRARY[0]; // Logic: Match based on input.symptomText
    
    // 2. Build Practitioner Technical View
    const practitionerPage: ProtocolPage = {
      title: "Practitioner Clinical Protocol",
      rows: matched.remedies.map(r => ({
        user: "Patient",
        time: "Post-Meal",
        medication: r.name,
        dosage: r.posology,
        objective: r.complianceNotes // Technical rationale
      }))
    };

    // 3. Build Patient Simplified View
    const patientPage: ProtocolPage = {
      title: "Simplified Daily Wellness Plan",
      rows: matched.remedies.map(r => ({
        user: "You",
        time: "After Meals",
        medication: r.name,
        dosage: r.posology.split(' ')[0] + " ml", // Simplified dosage
        objective: r.name + " helps stabilize your energy and digestion."
      }))
    };

    return { practitionerPage, patientPage, primaryDosha: "Vata", calculatedAgni: "Samagni" };
  }
}
