import { DISEASES_LIBRARY } from "./libraryData";

export class ClassicalAyurvedicEngine {
  public static generateProtocol(intake: any): EvaluationResult {
    const matched = DISEASES_LIBRARY[0]; 

    const rows = matched.remedies.map(r => ({
      user: "Patient",
      time: "Post-Meal",
      medication: r.name,
      dosage: r.posology,
      objective: r.complianceNotes
    }));

    return {
      practitionerPage: { 
        title: "Practitioner: Clinical & Pharmacological Rationale", 
        rows 
      },
      patientPage: { 
        title: "Patient: Daily Wellness Protocol", 
        rows: rows.map(row => ({ 
          ...row, 
          user: "You", 
          objective: "Supports metabolic balance and tissue recovery." 
        })) 
      },
      primaryDosha: "Vata",
      calculatedAgni: "Samagni"
    };
  }
}
