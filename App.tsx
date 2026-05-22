import React, { useState } from "react";
import { Activity, BookOpen, CheckCircle2, Layers, RefreshCw, ShieldAlert } from "lucide-react";
import { ClassicalAyurvedicEngine } from "./engine";
import { SYMPTOM_OPTIONS } from "./libraryData";
import type { EvaluationResult, UserIntake, WeatherProfile } from "./types";

export default function App() {
  const [intake, setIntake] = useState<UserIntake>({
    age: 45,
    weight: 72,
    height: 170,
    city: "San Francisco",
    country: "United States",
    weatherType: "Cold-Dry",
    dailySteps: 6200,
    selectedSymptoms: [],
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Location City</label>
                <input
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  type="text"
                  value={intake.city}
                  onChange={(event) => setIntake({ ...intake, city: event.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Pacer Daily Steps</label>
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
                    <button
                      type="button"
                      onClick={() => removeAllergy(index)}
                      className="hover:text-red-200 font-bold ml-1"
                    >
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

        <section className="lg:col-span-7 space-y-6">
          {!result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
              <Layers className="h-12 w-12 mx-auto mb-4 stroke-1 text-slate-700" />
              <p className="text-sm">
                Configure patient metrics and execute the verification sequence to generate the classical query
                analysis pipeline.
              </p>
            </div>
          ) : (
            <>
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
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Source: {result.matchedDisease.diagnosticSource}
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 bg-amber-950/20 border border-amber-900/40 rounded p-4 text-xs text-amber-400">
                    No clear disease configuration matched the selected combination of symptoms. Re-examine symptom fields.
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-4 text-slate-200">
                  Compliant Botanical Recommendations
                </h3>
                {result.safeFormulations.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-4 italic">
                    No botanical formulas met the safety, compliance, or allergy criteria for this profile.
                  </p>
                ) : (
                  <div className="space-y-6 mt-4">
                    {result.safeFormulations.map((formulation) => (
                      <div key={formulation.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500/10 border-l border-b border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> {formulation.usComplianceStatus}
                        </div>
                        <h4 className="text-md font-bold text-emerald-400 mb-1">{formulation.name}</h4>
                        <div className="text-[11px] font-mono text-slate-400 space-y-0.5 mb-3">
                          <p>Formula: {formulation.textReference}</p>
                          <p>Process: {formulation.styleReference}</p>
                        </div>

                        <div className="border-t border-slate-800 pt-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="block font-bold text-slate-400 mb-1">Posology &amp; Administration</span>
                            <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                              {formulation.posology}
                            </p>
                            <span className="block text-[11px] text-slate-500 mt-1">
                              Vehicle (Anupana): <strong className="text-slate-400">{formulation.anupana}</strong>
                            </span>
                          </div>
                          <div>
                            <span className="block font-bold text-slate-400 mb-1">Botanical Composition Manifest</span>
                            <ul className="space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800/80 font-mono text-[11px] text-slate-300">
                              {formulation.ingredients.map((ingredient, index) => (
                                <li key={index} className="truncate">
                                  - {ingredient.name} <span className="text-slate-500">({ingredient.botanicalName})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded p-2.5 mt-3 text-[11px] text-slate-400 flex items-start gap-2">
                          <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-300">US Export &amp; Compliance Note:</strong>{" "}
                            {formulation.complianceNotes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-bold border-b border-slate-800 pb-3 text-slate-200">
                  Lifestyle Regimen (Ahara / Vihara)
                </h3>
                <div className="space-y-3 mt-4 text-sm">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                    <strong className="text-amber-400 block mb-1 text-xs uppercase tracking-wider">
                      Ahara (Dietary Directives)
                    </strong>
                    <p className="text-slate-300">{result.lifestyleRegimen.ahara}</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded">
                    <strong className="text-cyan-400 block mb-1 text-xs uppercase tracking-wider">
                      Vihara (Lifestyle Behavior)
                    </strong>
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
