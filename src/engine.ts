import { DISEASES_LIBRARY } from "./libraryData";
import type { ClinicalModule, EvaluationResult, ProtocolRow, Remedy, UserIntake } from "./types";

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(intake: UserIntake): EvaluationResult | null {
    const disease = ClassicalAyurvedicEngine.findClinicalModule(intake);
    if (!disease) return null;

    const rows: ProtocolRow[] = disease.remedies.map((remedy: Remedy) => ({
      user: "Patient",
      time: "Post-Meal",
      medication: remedy.name,
      dosage: remedy.posology,
      objective: remedy.complianceNotes
    }));

    return {
      primaryDosha: disease.primaryDosha,
      calculatedAgni: "Samagni",
      practitionerPage: { title: "Practitioner Protocol", rows },
      patientPage: {
        title: "Patient Plan",
        rows: rows.map((row: ProtocolRow) => ({ ...row, user: "You" }))
      }
    };
  }

  public static generateProtocol(intake: UserIntake): EvaluationResult | null {
    return ClassicalAyurvedicEngine.evaluateIntake(intake);
  }

  private static findClinicalModule(intake: UserIntake): ClinicalModule | undefined {
    const selectedSymptoms = intake.selectedSymptoms ?? [];
    const symptomText = intake.symptomText?.toLowerCase() ?? "";

    const symptomMatch = DISEASES_LIBRARY.find((module: ClinicalModule) =>
      module.cardinalSymptoms.some((symptom: string) =>
        selectedSymptoms.includes(symptom) || symptomText.includes(symptom.toLowerCase())
      )
    );

    return symptomMatch ?? DISEASES_LIBRARY.find((module: ClinicalModule) => module.id === "DIS-CONST-004");
  }
}
