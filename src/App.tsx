import React, { useState } from "react";
import { Activity, BookOpen, Layers, RefreshCw, Clock, SmartphoneNfc, CheckCircle2, Download } from "lucide-react";
import { ClassicalAyurvedicEngine } from "./engine";
import { SYMPTOM_OPTIONS } from "./libraryData";
import type { EvaluationResult, UserIntake, WeatherProfile } from "./types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function App() {
  const [intake, setIntake] = useState<UserIntake>({
    age: 34, weight: 80, height: 173,
    city: "Delhi", country: "India",
    weatherType: "Variable-Windy", dailySteps: 6455,
    selectedSymptoms: [], symptomText: "diabetes", goalsText: "free from diabetes", allergies: []
  });

  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleSyncDevice = () => {
    setIsSyncing(true);
    setTimeout(() => {
      // Fixed deterministic step simulation for testing
      setIntake(prev => ({ ...prev, dailySteps: 6455 }));
      setIsSyncing(false);
    }, 800);
  };

  const toggleSymptom = (symptom: string) => {
    setIntake((prev) => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptom)
        ? prev.selectedSymptoms.filter((item) => item !== symptom)
        : [...prev.selectedSymptoms, symptom]
    }));
  };

  const handleEvaluate = () => {
    const evaluation = ClassicalAyurvedicEngine.evaluateIntake(intake);
    setResult(evaluation);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;
    setIsGeneratingPDF(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#020617" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save("Ananta_Ayurveda_Protocol.pdf");
    } finally { setIsGeneratingPDF(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-emerald-400 flex items-center gap-3">
          <BookOpen className="h-7 w-7" /> Ananta Engine
        </h1>
        {result && (
          <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-xs font-bold">
            <Download className="h-4 w-4" /> Download PDF
          </button>
        )}
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <input className="bg-slate-800 p-2 rounded text-xs" type="number" value={intake.age} onChange={(e) => setIntake({...intake, age: Number(e.target.value)})} />
              <input className="bg-slate-800 p-2 rounded text-xs" type="number" value={intake.weight} onChange={(e) => setIntake({...intake, weight: Number(e.target.value)})} />
              <input className="bg-slate-800 p-2 rounded text-xs" type="number" value={intake.height} onChange={(e) => setIntake({...intake, height: Number(e.target.value)})} />
            </div>

            <button onClick={handleSyncDevice} className="w-full bg-slate-800 p-3 rounded text-xs flex items-center justify-center gap-2 border border-slate-700">
              <SmartphoneNfc className="h-4 w-4" /> {intake.dailySteps} Steps Synced
            </button>

            <textarea className="w-full bg-slate-800 p-2 rounded text-xs" placeholder="Symptoms" value={intake.symptomText} onChange={(e) => setIntake({...intake, symptomText: e.target.value})} />
            <textarea className="w-full bg-slate-800 p-2 rounded text-xs" placeholder="Goals" value={intake.goalsText} onChange={(e) => setIntake({...intake, goalsText: e.target.value})} />

            <div className="max-h-40 overflow-y-auto bg-slate-950 p-2 border border-slate-800 rounded">
              {SYMPTOM_OPTIONS.map((s, i) => (
                <label key={i} className="flex items-center gap-2 p-1 text-[10px] cursor-pointer hover:bg-slate-800">
                  <input type="checkbox" onChange={() => toggleSymptom(s)} /> {s}
                </label>
              ))}
            </div>

            {/* HIGHLY VISIBLE RUN BUTTON */}
            <button onClick={handleEvaluate} className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded font-bold text-sm shadow-xl">
              RUN VERIFICATION SEQUENCE
            </button>
          </div>
        </section>

        <section className="lg:col-span-7" id="pdf-content">
          {!result ? (
            <div className="bg-slate-900 border border-slate-800 p-10 text-center text-slate-500 rounded-xl">Diagnostics pending...</div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-emerald-400 font-bold">Diagnostics Summary</h3>
                <p className="text-sm mt-2">{result.primaryDosha} Imbalance | {result.calculatedAgni}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-emerald-400 font-bold">Action Protocol</h3>
                {result.protocolMatches.map((p, i) => (
                  <p key={i} className="text-xs mt-2">{p.objective}</p>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
