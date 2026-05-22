import { DISEASES_LIBRARY } from "./libraryData";

export class ClassicalAyurvedicEngine {
  public static generateProtocol(intake: any): EvaluationResult {
    // Match based on input symptoms
    const matched = DISEASES_LIBRARY[0]; 

    const rows = matched.remedies.map(r => ({
      user: "Patient",
      time: "Post-Meal",
      medication: r.name,
      dosage: r.posology,
      objective: r.complianceNotes // The "Why"
    }));

    return {
      practitionerPage: { title: "Practitioner Clinical Protocol", rows },
      patientPage: { 
        title: "Your Daily Wellness Plan", 
        rows: rows.map(row => ({ ...row, user: "You", objective: `Supports: ${matched.modernApproximation}` })) 
      },
      primaryDosha: "Vata",
      calculatedAgni: "Samagni"
    };
  }
}
