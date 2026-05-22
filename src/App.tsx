import React, { useState } from "react";
import { Activity, BookOpen, CheckCircle2, Layers, RefreshCw, Clock } from "lucide-react";
import { ClassicalAyurvedicEngine } from "./engine";
import { SYMPTOM_OPTIONS } from "./libraryData";
import type { EvaluationResult, UserIntake, WeatherProfile } from "./types";

export default function App() {
  const [intake, setIntake] = useState<UserIntake>({
    age: 38, weight: 72, height: 172,
    city: "San Francisco", country: "United States",
    weatherType: "Cold-Dry", dailySteps: 12000,
    selectedSymptoms: [], symptomText: "", goalsText: "", allergies: []
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
    setResult(ClassicalAyurvedicEngine.evaluateIntake(intake));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400 flex items-center gap-3">
          <BookOpen className="h-8 w-8" /> Ananta Classical Ayurveda Core Engine
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Automated multi-text verification framework using [MN] Madhava Nidana, [BR] Bhaishajya Ratnavali, [BP] Bhava Prakasha, and [SHA] Sharngadhara Samhita.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Metric Intake Sidebar */}
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl h-fit">
          <h2 className="text-xl font-bold mb-6 text-slate-200 flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" /> Patient Intake Metrics
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Age</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="number" value={intake.age} onChange={(e) => setIntake({ ...intake, age: parseInt(e.target.value, 10) || 0 })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Weight (kg)</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="number" value={intake.weight} onChange={(e) => setIntake({ ...intake, weight: parseInt(e.target.value, 10) || 0 })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Height (cm)</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="number" value={intake.height} onChange={(e) => setIntake({ ...intake, height: parseInt(e.target.value, 10) || 0 })} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="text" value={intake.country} onChange={(e) => setIntake({ ...intake, country: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="text" value={intake.city} onChange={(e) => setIntake({ ...intake, city: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Daily Steps</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="number" value={intake.dailySteps} onChange={(e) => setIntake({ ...intake, dailySteps: parseInt(e.target.value, 10) || 0 })} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Current Weather Type</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" value={intake.weatherType} onChange={(e) => setIntake({ ...intake, weatherType: e.target.value as WeatherProfile })}>
                <option value="Cold-Dry">Cold &amp; Dry</option>
                <option value="Hot-Humid">Hot &amp; Humid</option>
                <option value="Cold-Humid">Cold &amp; Humid</option>
                <option value="Variable-Windy">Variable &amp; Windy</option>
              </select>
            </div>

            {/* RESTORED FREE-TEXT INPUTS */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Additional Symptoms / Conditions</label>
              <textarea
                className="w-full min-h-20 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="e.g., thyroid, blood pressure, fatigue, anxiety"
                value={intake.symptomText}
                onChange={(event) => setIntake({ ...intake, symptomText: event.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Health Goals</label>
              <textarea
                className="w-full min-h-20 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="e.g., get fit and active, reduce stress"
                value={intake.goalsText}
                onChange={(event) => setIntake({ ...intake, goalsText: event.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Active Pathological Symptoms (Vikriti Select)</label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-800 p-2 rounded bg-slate-950">
                {SYMPTOM_OPTIONS.map((symptom, idx) => {
                  const isChecked = intake.selectedSymptoms.includes(symptom);
                  return (
                    <label key={idx} className="flex items-start gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer text-xs">
                      <input className="mt-0.5 accent-emerald-500" type="checkbox" checked={isChecked} onChange={() => toggleSymptom(symptom)} />
                      <span className={isChecked ? "text-emerald-400 font-medium" : "text-slate-300"}>{symptom}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Allergies Registry</label>
              <form onSubmit={addAllergy} className="flex gap-2 mb-2">
                <input className="flex-1 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-slate-100 focus:outline-none" type="text" placeholder="e.g., Honey, Lactose" value={allergyInput} onChange={(e) => setAllergyInput(e.target.value)} />
                <button type="submit" className="bg-slate-700 hover:bg-slate-600 px-3 rounded text-xs font-bold">Add</button>
              </form>
              <div className="flex flex-wrap gap-1">
                {intake.allergies.map((allergy, i) => (
                  <span key={i} className="bg-red-950/40 border border-red-900/60 text-red-400 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    {allergy} <button type="button" onClick={() => removeAllergy(i)} className="hover:text-red-200 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>

            <button type="button" onClick={handleEvaluate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-lg text-sm tracking-wide transition flex items-center justify-center gap-2 shadow-lg">
              <RefreshCw className="h-4 w-4" /> Run Verification Sequence
            </button>
          </div>
        </section>

        {/* Output Diagnostics Panels */}
        <section className="lg:col-span-7 space-y-6">
          {!result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
              <Layers className="h-12 w-12 mx-auto mb-4 stroke-1 text-slate-700" />
              <p className="text-sm">Enter your personalized symptoms and goals to generate a clinically matched protocol.</p>
            </div>
          ) : (
            <>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-3 text-slate-200">Algorithmic Diagnostics Summary</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500">Calculated Vikriti</span>
                    <span className="text-xl font-bold text-amber-400">{result.primaryDosha} Imbalance</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500">Agni Metabolic State</span>
                    <span className="text-xl font-bold text-cyan-400">{result.calculatedAgni}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-4 text-slate-200">Text-Validated Action Protocols</h3>
                {result.protocolMatches.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-4 italic">No disease matched. Ensure relevant symptom criteria checkboxes are marked on the intake dashboard.</p>
                ) : (
                  <div className="space-y-5 mt-4">
                    {result.protocolMatches.map((protocol) => (
                      <div key={protocol.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <h4 className="text-md font-bold text-emerald-400">{protocol.audience}</h4>
                          <span className="text-[10px] font-mono tracking-wide text-slate-400 bg-slate-900 px-2 py-1 border border-slate-800 rounded">
                            {protocol.sourceDocument}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4">{protocol.objective}</p>
                        
                        <div className="space-y-3 mb-4">
                          <span className="block font-bold text-xs text-slate-400 uppercase tracking-wider">Active Formulation Parameters</span>
                          <div className="grid grid-cols-1 gap-3">
                            {protocol.medicines.map((med, idx) => (
                              <div key={idx} className="p-3 rounded-lg border bg-slate-900 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-slate-200">{med.name}</span>
                                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">Approved Export Matrix</span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-slate-500" /> {med.dosageInstructions} • <strong className="text-slate-300">{med.timing}</strong>
                                  </p>
                                </div>
                                <div className="text-[11px] max-w-sm font-sans text-emerald-400 bg-slate-950/50 p-2 rounded border border-slate-950 md:text-right">
                                  {med.complianceNotes}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-[11px] text-slate-400 space-y-1">
                          <strong className="text-amber-400 uppercase tracking-wider text-[10px] block">Compendium Safety Overlays:</strong>
                          {protocol.safetyNotes.map((note, i) => <p key={i}>• {note}</p>)}
                        </div>
                        <p className="text-[10px] font-mono text-slate-600 mt-3 italic">{protocol.sourceExcerpt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-3 text-slate-200">Daily Seasonal Guidelines</h3>
                <div className="space-y-3 mt-4 text-sm">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                    <strong className="text-amber-400 block mb-1 text-xs uppercase tracking-wider">Ahara (Dietary Strategy)</strong>
                    <p className="text-slate-300">{result.lifestyleRegimen.ahara}</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                    <strong className="text-cyan-400 block mb-1 text-xs uppercase tracking-wider">Vihara (Lifestyle Output)</strong>
                    <p className="text-slate-300">{result.lifestyleRegimen.vihara}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
