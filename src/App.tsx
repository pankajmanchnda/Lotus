import React, { useState } from "react";
import { Activity, BookOpen, CheckCircle2, Layers, RefreshCw, ShieldAlert, AlertTriangle, Clock, HelpCircle } from "lucide-react";
import { ClassicalAyurvedicEngine } from "./engine";
import { SYMPTOM_OPTIONS } from "./libraryData";
import type { EvaluationResult, UserIntake, WeatherProfile } from "./types";

export default function App() {
  const [intake, setIntake] = useState<UserIntake>({
    age: 49, // Updated default to sync with active tracking profiles
    weight: 72,
    height: 172,
    city: "San Francisco",
    country: "United States",
    weatherType: "Cold-Dry",
    dailySteps: 17000, // Syncs seamlessly with high-activity workout tracking inputs
    selectedSymptoms: [],
    symptomText: "borderline blood pressure, occasional ldl and triglycerides spike. healthy workout routine",
    goalsText: "get fit and agile, sleep well and reduce stress",
    allergies: []
  });

  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [allergyInput, setAllergyInput] = useState("");

  const toggleSymptom = (symptom: string) => {
    setIntake((prev) => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptom)
        ? prev.selectedSymptoms.filter((item) => item !== symptom)
        : [...prev.selectedSymptoms, symptom]
    }));
  };

  const addAllergy = (event: React.FormEvent) => {
    event.preventDefault();
    const allergy = allergyInput.trim();

    if (allergy && !intake.allergies.includes(allergy)) {
      setIntake((prev) => ({ ...prev, allergies: [...prev.allergies, allergy] }));
      setAllergyInput("");
    }
  };

  const removeAllergy = (index: number) => {
    setIntake((prev) => ({ ...prev, allergies: prev.allergies.filter((_, i) => i !== index) }));
  };

  const handleEvaluate = () => {
    const output = ClassicalAyurvedicEngine.evaluateIntake(intake);
    setResult(output);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400 flex items-center gap-3">
          <BookOpen className="h-8 w-8" /> Ananta Classical Ayurveda Core Engine
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Automated multi-text verification framework across [MN] Madhava Nidana, [BR] Bhaishajya Ratnavali,
          [BP] Bhava Prakasha, and [SHA] Sharngadhara Samhita.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Patient Intake Input Frame */}
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6 text-slate-200 flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" /> Patient Intake Metrics
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Age</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="number"
                  value={intake.age}
                  onChange={(event) => setIntake({ ...intake, age: parseInt(event.target.value, 10) || 0 })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Weight (kg)</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="number"
                  value={intake.weight}
                  onChange={(event) => setIntake({ ...intake, weight: parseInt(event.target.value, 10) || 0 })}
                />
              </div>
              <div>
                <label className="block
