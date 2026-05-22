import { DISEASES_LIBRARY } from "./libraryData";
import type { AgniType, ClinicalModule, EvaluationResult, ProtocolRow, Remedy, UserIntake } from "./types";

const semanticMap: Record<string, string[]> = {
  iron: ["DIS-FATIGUE-IRON-005"],
  anemia: ["DIS-FATIGUE-IRON-005"],
  fatigue: ["DIS-FATIGUE-IRON-005", "DIS-PAIN-RECOVERY-007"],
  weakness: ["DIS-FATIGUE-IRON-005"],
  insomnia: ["DIS-MEMORY-SLEEP-006", "DIS-PAIN-RECOVERY-007"],
  sleep: ["DIS-MEMORY-SLEEP-006", "DIS-PAIN-RECOVERY-007"],
  anxiety: ["DIS-MEMORY-SLEEP-006"],
  stress: ["DIS-MEMORY-SLEEP-006"],
  memory: ["DIS-MEMORY-SLEEP-006"],
  focus: ["DIS-MEMORY-SLEEP-006"],
  constipation: ["DIS-CONST-004"],
  stool: ["DIS-CONST-004"],
  bloating: ["DIS-CONST-004"],
  pain: ["DIS-PAIN-RECOVERY-007"],
  recovery: ["DIS-PAIN-RECOVERY-007"],
  inflammation: ["DIS-PAIN-RECOVERY-007"],
  skin: ["DIS-SKIN-IMMUNITY-008"],
  glowing: ["DIS-SKIN-IMMUNITY-008"],
  immunity: ["DIS-SKIN-IMMUNITY-008"],
  acidity: ["DIS-SKIN-IMMUNITY-008"]
};

export class ClassicalAyurvedicEngine {
  public static evaluateIntake(intake: UserIntake): EvaluationResult {
    const matchedDisease =
      ClassicalAyurvedicEngine.findSemanticMatch(intake) ??
      ClassicalAyurvedicEngine.findSymptomMatch(intake) ??
      DISEASES_LIBRARY[0];

    const calculatedAgni = ClassicalAyurvedicEngine.calculateAgni(intake, matchedDisease);
    const safeRemedies = ClassicalAyurvedicEngine.filterSafeRemedies(intake, matchedDisease.remedies);

    const rows: ProtocolRow[] = safeRemedies.map((remedy: Remedy) => ({
      user: "Patient",
      time: "Post-meal unless practitioner directs otherwise",
      medication: remedy.name,
      dosage: remedy.posology,
      objective: remedy.complianceNotes,
      source: remedy.textReference,
      safety: remedy.ingredients.some((ingredient) => ingredient.isHeavyMetalOrMineral)
        ? "Requires practitioner review because mineral ingredients are present."
        : "Botanical-only safety screen passed. Confirm with a licensed clinician before use."
    }));

    return {
      primaryDosha: matchedDisease.primaryDosha,
      calculatedAgni,
      matchedDisease,
      practitionerPage: {
        title: "Practitioner Protocol",
        summary: `${matchedDisease.name} matched from intake using semantic and symptom review.`,
        rows
      },
      patientPage: {
        title: "Patient Plan",
        summary: `Educational wellness plan for ${matchedDisease.modernApproximation}. Not medical advice.`,
        rows: rows.map((row: ProtocolRow) => ({
          ...row,
          user: "You",
          safety: `${row.safety} Keep a 2-hour gap from prescription medicines unless your clinician says otherwise.`
        }))
      }
    };
  }

  public static generateProtocol(intake: UserIntake): EvaluationResult {
    return ClassicalAyurvedicEngine.evaluateIntake(intake);
  }

  private static findSemanticMatch(intake: UserIntake): ClinicalModule | undefined {
    const haystack = ClassicalAyurvedicEngine.buildSearchText(intake);

    for (const [keyword, diseaseIds] of Object.entries(semanticMap)) {
      if (haystack.includes(keyword)) {
        const match = DISEASES_LIBRARY.find((disease: ClinicalModule) => diseaseIds.includes(disease.id));
        if (match) return match;
      }
    }

    return undefined;
  }

  private static findSymptomMatch(intake: UserIntake): ClinicalModule | undefined {
    const selectedSymptoms = intake.selectedSymptoms ?? [];
    const haystack = ClassicalAyurvedicEngine.buildSearchText(intake);

    return DISEASES_LIBRARY.find((disease: ClinicalModule) =>
      disease.cardinalSymptoms.some((symptom: string) =>
        selectedSymptoms.includes(symptom) || haystack.includes(symptom.toLowerCase())
      )
    );
  }

  private static filterSafeRemedies(intake: UserIntake, remedies: Remedy[]): Remedy[] {
    const allergies = (intake.allergies ?? []).map((allergy: string) => allergy.toLowerCase());

    return remedies.filter((remedy: Remedy) => {
      const hasAllergy = remedy.ingredients.some((ingredient) =>
        allergies.includes(ingredient.name.toLowerCase())
      );

      return remedy.usComplianceStatus === "PASSED" && !hasAllergy;
    });
  }

  private static calculateAgni(intake: UserIntake, disease: ClinicalModule): AgniType {
    if ((intake.dailySteps ?? 0) > 0 && (intake.dailySteps ?? 0) < 4000) return "Mandagni";
    if (disease.primaryDosha === "Vata") return "Vishamagni";
    if (disease.primaryDosha === "Pitta") return "Tikshnagni";
    if (disease.primaryDosha === "Kapha") return "Mandagni";
    return "Samagni";
  }

  private static buildSearchText(intake: UserIntake): string {
    return [
      ...(intake.selectedSymptoms ?? []),
      intake.symptomText ?? "",
      intake.goalsText ?? ""
    ].join(" ").toLowerCase();
  }
}
