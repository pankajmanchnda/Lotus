import React, { useState } from "react";
import { ClassicalAyurvedicEngine } from "./engine";
import type { EvaluationResult, UserIntake } from "./types";

export default function App() {
  const [intake, setIntake] = useState<UserIntake>({
    age: 45,
    dailySteps: 6200,
    selectedSymptoms: [],
    symptomText: "constipation, insomnia, low iron",
    goalsText: "get active and improve glowing skin",
    allergies: []
  });
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleEvaluate = () => {
    setResult(ClassicalAyurvedicEngine.evaluateIntake(intake));
  };

  const downloadPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <main className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-5 rounded-lg border border-slate-800 bg-slate-900 p-5">
          <h1 className="text-2xl font-bold text-emerald-400">LotusVeda Protocol Engine</h1>
          <p className="mt-2 text-sm text-slate-400">Educational Ayurvedic protocol matching for practitioner review.</p>

          <label className="mt-6 block text-sm font-semibold text-slate-300">Symptoms / Conditions</label>
          <textarea
            className="mt-2 min-h-28 w-full rounded border border-slate-700 bg-slate-800 p-3 text-sm"
            value={intake.symptomText ?? ""}
            onChange={(event) => setIntake({ ...intake, symptomText: event.target.value })}
            placeholder="iron, anemia, insomnia, constipation, skin, fatigue"
          />

          <label className="mt-4 block text-sm font-semibold text-slate-300">Health Goals</label>
          <textarea
            className="mt-2 min-h-24 w-full rounded border border-slate-700 bg-slate-800 p-3 text-sm"
            value={intake.goalsText ?? ""}
            onChange={(event) => setIntake({ ...intake, goalsText: event.target.value })}
            placeholder="get active, glowing skin, better sleep"
          />

          <label className="mt-4 block text-sm font-semibold text-slate-300">Daily Steps</label>
          <input
            className="mt-2 w-full rounded border border-slate-700 bg-slate-800 p-3 text-sm"
            type="number"
            value={intake.dailySteps ?? 0}
            onChange={(event) => setIntake({ ...intake, dailySteps: Number(event.target.value) })}
          />

          <button
            type="button"
            onClick={handleEvaluate}
            className="mt-5 w-full rounded bg-emerald-500 px-4 py-3 font-bold text-slate-950"
          >
            Generate Assessment
          </button>
        </section>

        <section className="lg:col-span-7 rounded-lg border border-slate-800 bg-slate-900 p-5">
          {!result ? (
            <div className="text-slate-400">Enter symptoms and goals, then generate the assessment.</div>
          ) : (
            <div id="protocol-report">
              <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{result.matchedDisease?.name}</h2>
                  <p className="text-sm text-slate-400">{result.practitionerPage.summary}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Dosha: {result.primaryDosha} | Agni: {result.calculatedAgni}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={downloadPdf}
                  className="rounded border border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-300"
                >
                  Download / Print PDF
                </button>
              </div>

              <h3 className="mt-5 text-lg font-bold text-emerald-300">{result.practitionerPage.title}</h3>
              <div className="mt-3 space-y-3">
                {result.practitionerPage.rows.map((row, index) => (
                  <article key={`${row.medication}-${index}`} className="rounded border border-slate-800 bg-slate-950 p-4">
                    <h4 className="font-bold text-emerald-300">{row.medication}</h4>
                    <p className="mt-1 text-sm text-slate-300">Dosage: {row.dosage}</p>
                    <p className="mt-1 text-sm text-slate-300">Timing: {row.time}</p>
                    <p className="mt-1 text-sm text-slate-400">Objective: {row.objective}</p>
                    <p className="mt-1 text-xs text-amber-300">Safety: {row.safety}</p>
                    <p className="mt-1 text-xs text-slate-500">Source: {row.source}</p>
                  </article>
                ))}
              </div>

              <h3 className="mt-6 text-lg font-bold text-cyan-300">{result.patientPage.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{result.patientPage.summary}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
