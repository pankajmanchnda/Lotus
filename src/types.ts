export interface ProtocolPage {
  title: string;
  rows: {
    user: string;
    time: string;
    medication: string;
    dosage: string;
    objective: string;
  }[];
}

export interface EvaluationResult {
  practitionerPage: ProtocolPage;
  patientPage: ProtocolPage;
  // Keep existing logic
  primaryDosha: string;
  calculatedAgni: string;
}
