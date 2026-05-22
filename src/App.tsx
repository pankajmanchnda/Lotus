import React, { useState } from "react";
import { BookOpen, Download, SmartphoneNfc } from "lucide-react";
import { ClassicalAyurvedicEngine } from "./engine";
import { jsPDF } from "jspdf";

export default function App() {
  const [result, setResult] = useState<any>(null);
  const [intake] = useState({ age: 34, dailySteps: 6455 });

  const handleEvaluate = () => setResult(ClassicalAyurvedicEngine.generateProtocol({}));

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Practitioner Page
    doc.setFontSize(18);
    doc.text(result.practitionerPage.title, 10, 20);
    result.practitionerPage.rows.forEach((r: any, i: number) => {
      doc.setFontSize(10);
      doc.text(`${r.medication} | Dosage: ${r.dosage} | Why: ${r.objective}`, 10, 30 + (i * 10));
    });
    // Patient Page
    doc.addPage();
    doc.setFontSize(18);
    doc.text(result.patientPage.title, 10, 20);
    result.patientPage.rows.forEach((r: any, i: number) => {
      doc.setFontSize(12);
      doc.text(`${r.medication} - Take ${r.dosage}`, 10, 30 + (i * 10));
    });
    doc.save("Ayurvedic_Protocol.pdf");
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-8">
      <header className="flex justify-between border-b border-slate-800 pb-4 mb-8">
        <h1 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
          <BookOpen /> Ananta Engine
        </h1>
        {result && (
          <button onClick={handleDownloadPDF} className="bg-emerald-600 px-4 py-2 rounded text-xs font-bold uppercase">
            <Download className="inline h-3 w-3 mr-1" /> Download PDF
          </button>
        )}
      </header>
      
      <button onClick={handleEvaluate} className="w-full bg-emerald-600 py-4 rounded font-bold shadow-lg">
        RUN VERIFICATION SEQUENCE
      </button>

      {result && (
        <div className="mt-8 bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-emerald-400 font-bold mb-4">Diagnostics Ready</h2>
          <p className="text-sm">Vikriti: {result.primaryDosha} | Agni: {result.calculatedAgni}</p>
        </div>
      )}
    </div>
  );
}
