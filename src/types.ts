export interface ProtocolRow {
  user: string;
  time: string;
  medication: string;
  dosage: string;
  objective: string;
}

export interface ProtocolPage {
  title: string;
  rows: ProtocolRow[];
}

export interface EvaluationResult {
  practitionerPage: ProtocolPage;
  patientPage: ProtocolPage;
  primaryDosha: string;
  calculatedAgni: string;
}
