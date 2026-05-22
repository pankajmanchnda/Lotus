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
                <label className="block text-xs font-medium text-slate-400 mb-1">Height (cm)</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="number"
                  value={intake.height}
                  onChange={(event) => setIntake({ ...intake, height: parseInt(event.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="text"
                  value={intake.country}
                  onChange={(event) => setIntake({ ...intake, country: event.target.value })}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Location City</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="text"
                  value={intake.city}
                  onChange={(event) => setIntake({ ...intake, city: event.target.value })}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Daily Steps</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="number"
                  value={intake.dailySteps}
                  onChange={(event) => setIntake({ ...intake, dailySteps: parseInt(event.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Current Environmental Weather</label>
              <select
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                value={intake.weatherType}
                onChange={(event) => setIntake({ ...intake, weatherType: event.target.value as WeatherProfile })}
              >
                <option value="Cold-Dry">Cold &amp; Dry Environment</option>
                <option value="Hot-Humid">Hot &amp; Humid Environment</option>
                <option value="Cold-Humid">Cold &amp; Humid Environment</option>
                <option value="Variable-Windy">Variable &amp; Windy Environment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Additional Symptoms / Conditions</label>
              <textarea
                className="w-full min-h-20 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="e.g., thyroid, blood pressure, diabetes, fatigue"
                value={intake.symptomText}
                onChange={(event) => setIntake({ ...intake, symptomText: event.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Health Goals</label>
              <textarea
                className="w-full min-h-20 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="e.g., get fit and agile, get thin"
                value={intake.goalsText}
                onChange={(event) => setIntake({ ...intake, goalsText: event.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                Active Pathological Symptoms (Vikriti Select)
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 border border-slate-800 p-2 rounded bg-slate-950">
                {SYMPTOM_OPTIONS.map((symptom, index) => {
                  const isChecked = intake.selectedSymptoms.includes(symptom);
                  return (
                    <label key={index} className="flex items-start gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer text-xs">
                      <input
                        className="mt-0.5 accent-emerald-500"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSymptom(symptom)}
                      />
                      <span className={isChecked ? "text-emerald-400 font-medium" : "text-slate-300"}>{symptom}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Allergies Registry</label>
              <form onSubmit={addAllergy} className="flex gap-2 mb-2">
                <input
                  className="flex-1 bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-slate-100 focus:outline-none"
                  type="text"
                  placeholder="e.g., Honey, Ghee, Ginger"
                  value={allergyInput}
                  onChange={(event) => setAllergyInput(event.target.value)}
                />
                <button type="submit" className="bg-slate-700 hover:bg-slate-600 px-3 rounded text-xs font-bold transition">
                  Add
                </button>
              </form>
              <div className="flex flex-wrap gap-1">
                {intake.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="bg-red-950/40 border border-red-900/60 text-red-400 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                  >
                    {allergy}
                    <button type="button" onClick={() => removeAllergy(index)} className="hover:text-red-200 font-bold ml-1">
                      x
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleEvaluate}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-lg text-sm tracking-wide transition flex items-center justify-center gap-2 mt-2 shadow-lg"
            >
              <RefreshCw className="h-4 w-4" /> Run Verification Sequence
            </button>
          </div>
        </section>

        {/* Analytics Display Panel */}
        <section className="lg:col-span-7 space-y-6">
          {!result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
              <Layers className="h-12 w-12 mx-auto mb-4 stroke-1 text-slate-700" />
              <p class="text-sm">Configure patient metrics and execute the verification sequence.</p>
            </div>
          ) : (
            <>
              {/* Telemetry Output Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-3 text-slate-200">
                  Algorithmic Diagnostics Summary
                </h3>
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

                {result.matchedDisease ? (
                  <div className="mt-4 bg-emerald-950/20 border border-emerald-900/40 rounded p-4">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      Matched Clinical Profile
                    </span>
                    <h4 className="text-lg font-bold text-slate-200">{result.matchedDisease.name}</h4>
                    <p className="text-xs text-slate-400 italic mb-2">{result.matchedDisease.modernApproximation}</p>
                    <span className="text-[11px] font-mono text-slate-500 block">Original Source: {result.matchedDisease.diagnosticSource}</span>
                  </div>
                ) : (
                  <div className="mt-4 bg-amber-950/20 border border-amber-900/40 rounded p-4 text-xs text-amber-400">
                    No clear disease configuration matched the selected combination of symptoms. Re-examine symptom fields.
                  </div>
                )}
              </div>

              {/* Family PDF Processing View Layer */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-4 text-slate-200">
                  Family PDF Protocol Matches
                </h3>
                {result.protocolMatches.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-4 italic">No direct protocol match was found in the attached family PDF.</p>
                ) : (
                  <div className="space-y-5 mt-4">
                    {result.protocolMatches.map((protocol) => (
                      <div key={protocol.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <h4 className="text-md font-bold text-emerald-400">{protocol.audience} Protocol</h4>
                          <span className="text-[10px] font-mono tracking-wide text-slate-400 bg-slate-900 px-2 py-1 border border-slate-800 rounded">
                            {protocol.sourceDocument}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-4">{protocol.objective}</p>
                        
                        {/* Upgraded Dynamic Medicine Evaluation Loop */}
                        <div className="space-y-3 mb-4">
                          <span className="block font-bold text-xs text-slate-400 uppercase tracking-wider">Medicines From PDF Manifest</span>
                          <div className="grid grid-cols-1 gap-3">
                            {protocol.medicines.map((med, idx) => (
                              <div key={idx} className={`p-3 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-3 ${med.usComplianceStatus === 'FAILED' ? 'bg-red-950/20 border-red-900/40' : 'bg-slate-900 border-slate-800'}`}>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-slate-200">{med.name}</span>
                                    {med.usComplianceStatus === 'FAILED' ? (
                                      <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-1">
                                        <AlertTriangle className="h-2.5 w-2.5" /> Blocked (US)
                                      </span>
                                    ) : (
                                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold flex items-center gap-1">
                                        <CheckCircle2 className="h-2.5 w-2.5" /> Approved
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-slate-500" /> {med.timing} • <strong className="text-slate-300">{med.dosageInstructions}</strong>
                                  </p>
                                </div>
                                <div className="text-[11px] max-w-md font-sans text-slate-400 md:text-right bg-slate-950/40 p-2 rounded border border-slate-900">
                                  {med.complianceNotes}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-amber-950/10 border border-amber-900/30 rounded-lg p-3 text-[11px] text-amber-200/90 space-y-1">
                          <strong className="text-amber-400 uppercase tracking-wider text-[10px] block">System Safeguard Excerpts:</strong>
                          {protocol.safetyNotes.map((note, i) => <p key={i}>• {note}</p>)}
                        </div>
                        <p className="text-[10px] font-mono text-slate-600 mt-3 italic">Raw Match Segment: {protocol.sourceExcerpt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botanical Formulations Output Frame */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-4 text-slate-200">
                  Compliant Botanical Library Recommendations
                </h3>
                {result.safeFormulations.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-4 italic">No generic botanical formulations triggered based on active symptom metrics parameters.</p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {result.safeFormulations.map((formulation) => (
                      <div key={formulation.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500/10 border-l border-b border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> {formulation.usComplianceStatus}
                        </div>
                        <h4 class="text-md font-bold text-emerald-400 mb-1">{formulation.name}</h4>
                        <div className="text-[11px] font-mono text-slate-400 space-y-0.5 mb-3">
                          <p>Formula: {formulation.textReference}</p>
                          <p>Process: {formulation.styleReference}</p>
                        </div>
                        <div className="border-t border-slate-800 pt-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block font-bold text-slate-400 mb-1">Posology &amp; Administration</span>
                            <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80">{formulation.posology}</p>
                            <span className="block text-[11px] text-slate-500 mt-1">Vehicle: <strong className="text-slate-400">{formulation.anupana}</strong></span>
                          </div>
                          <div>
                            <span className="block font-bold text-slate-400 mb-1">Botanical Composition Manifest</span>
                            <ul className="space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800/80 font-mono text-[11px] text-slate-300">
                              {formulation.ingredients.map((ingredient, index) => (
                                <li key={index} className="truncate">- {ingredient.name} <span className="text-slate-500">({ingredient.botanicalName})</span></li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Lifestyle Directive Framework */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-3 text-slate-200">Lifestyle Regimen (Ahara / Vihara)</h3>
                <div className="space-y-3 mt-4 text-sm">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                    <strong className="text-amber-400 block mb-1 text-xs uppercase tracking-wider">Ahara (Dietary Directives)</strong>
                    <p className="text-slate-300">{result.lifestyleRegimen.ahara}</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                    <strong className="text-cyan-400 block mb-1 text-xs uppercase tracking-wider">Vihara (Lifestyle Behavior)</strong>
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
