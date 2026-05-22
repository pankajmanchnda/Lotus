import React, { useState } from "react";
import { ClassicalAyurvedicEngine } from "./engine";

export default function App() {
  const [result, setResult] = useState<any>(null);
  const handleEvaluate = () => setResult(ClassicalAyurvedicEngine.evaluateIntake({ symptomText: "" }));

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <button onClick={handleEvaluate} className="bg-emerald-600 p-4 rounded font-bold">
        RUN VERIFICATION
      </button>
      {result && <pre className="mt-4 text-xs">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
