import { DISEASES_LIBRARY } from "./libraryData";
import { ClinicalModule, Remedy } from "./types";

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(intake: any): any {
    const disease = DISEASES_LIBRARY.find((d: ClinicalModule) => d.id === "DIS-CONST-004");
    if (!disease) return null;

    const rows = disease.remedies.map((r: Remedy) => ({
      user: "Patient",
      time: "Post-Meal",
      medication: r.name,
      dosage: r.posology,
      objective: r.complianceNotes
    }));

    return {
      primaryDosha: disease.primaryDosha,
      calculatedAgni: "Samagni",
      practitionerPage: { title: "Practitioner Protocol", rows },
      patientPage: { title: "Patient Plan", rows: rows.map(r => ({ ...r, user: "You" })) }
    };
  }
}
