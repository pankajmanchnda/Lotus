import React, { useState } from "react";
import { Activity, BookOpen, Layers, RefreshCw, Clock, SmartphoneNfc, CheckCircle2, Download } from "lucide-react";
import { ClassicalAyurvedicEngine } from "./engine";
import { SYMPTOM_OPTIONS } from "./libraryData";
import type { EvaluationResult, UserIntake, WeatherProfile } from "./types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function App() {
  const [intake, setIntake] = useState<UserIntake>({
    age: 49, weight: 72, height: 172,
    city: "Las Vegas", country: "United States",
    weatherType: "Hot-Humid", dailySteps: 0, 
    selectedSymptoms: [], symptomText: "", goalsText: "", allergies: []
  });

  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [allergyInput, setAllergyInput] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleSyncDevice = () => {
    setIsSyncing(true);
    setSyncComplete(false);
    setTimeout(() => {
      const simulatedSteps = Math.floor(Math.random() * (14000 - 4000 + 1)) + 4000;
      setIntake(prev => ({ ...prev, dailySteps: simulatedSteps }));
      setIsSyncing(false);
      setSyncComplete(true);
    }, 1500);
  };

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

  const handleDownloadPDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Capture the element as a high-res image
      const canvas = await html2canvas(element, { 
        scale: 2, 
        backgroundColor: "#020617", // Matches your slate-950 background
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL("image/png");
      
      // Calculate PDF dimensions (A4 paper size)
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add padding and inject the image
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Ananta_Protocol_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400 flex items-center gap-3">
            <BookOpen className="h-8 w-8" /> Ananta Classical Ayurveda Core Engine
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Automated multi-text verification framework using [MN], [BR], [BP], and [SHA].
          </p>
        </div>
        {result && (
          <button 
            onClick={handleDownloadPDF} 
            disabled={isGeneratingPDF}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${isGeneratingPDF ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-lg hover:shadow-emerald-900/50'}`}
          >
            {isGeneratingPDF ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isGeneratingPDF ? "Generating PDF..." : "Download Protocol"}
          </button>
        )}
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="text" value={intake.country} onChange={(e) => setIntake({ ...intake, country: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none" type="text" value={intake.city} onChange={(e) => setIntake({ ...intake, city: e.target.value })} />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <label className="block text-xs font-bold tracking-wider text-slate-400 mb-2 uppercase">Biometric Telemetry</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleSyncDevice}
                  disabled={isSyncing}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${isSyncing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : syncComplete ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'}`}
                >
                  {isSyncing ? <><RefreshCw className="h-4 w-4 animate-spin" /> Fetching...</> : syncComplete ? <><CheckCircle2 className="h-4 w-4" /> Device Synced</> : <><SmartphoneNfc className="h-4 w-4" /> Sync Wearable</>}
                </button>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded p-2 text-center">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Daily Steps</span>
                  <span className={`text-lg font-mono font-bold ${syncComplete ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {intake.dailySteps > 0 ? intake.dailySteps.toLocaleString() : "---"}
                  </span>
                </div>
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

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Additional Symptoms / Conditions</label>
              <textarea className="w-full min-h-20 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500" placeholder="e.g., thyroid, blood pressure, fatigue, anxiety" value={intake.symptomText} onChange={(event) => setIntake({ ...intake, symptomText: event.target.value })} />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Health Goals</label>
              <textarea className="w-full min-h-20 bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500" placeholder="e.g., get fit and active, reduce stress" value={intake.goalsText} onChange={(event) => setIntake({ ...intake, goalsText: event.target.value })} />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Active Pathological Symptoms (Srotas Select)</label>
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

            <button type="button" onClick={handleEvaluate} className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-lg text-sm tracking-wide transition flex items-center justify-center gap-2 shadow-lg">
              <RefreshCw className="h-4 w-4" /> Run Verification Sequence
            </button>
          </div>
        </section>

        <section className="lg:col-span-7 space-y-6">
          {!result ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
              <Layers className="h-12 w-12 mx-auto mb-4 stroke-1 text-slate-700" />
              <p className="text-sm">Enter your personalized symptoms and goals to generate a clinically matched protocol.</p>
            </div>
          ) : (
            // WRAPPED IN ID FOR PDF EXPORT
            <div id="pdf-content" className="space-y-6 bg-slate-950 p-2 md:p-6 rounded-xl">
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
                  <p className="text-sm text-slate-500 mt-4 italic">No disease matched. Ensure relevant symptom criteria checkboxes are marked.</p>
                ) : (
                  <div className="space-y-5 mt-4">
                    {result.protocolMatches.map((protocol) => (
                      <div key={protocol.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <h4 className="text-md font-bold text-emerald-400">{protocol.audience}</h4>
                          <span className="text-[10px] font-mono tracking-wide text-slate-400 bg-slate-900 px-2 py-
