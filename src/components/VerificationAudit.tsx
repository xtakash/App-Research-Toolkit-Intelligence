import React, { useState } from "react";
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Search, 
  Layers, 
  Eye, 
  ArrowRight,
  Filter
} from "lucide-react";
import { 
  ACCURACY_PROGRESSION, 
  HITS_AND_MISSES, 
  VERIFICATION_METHODOLOGY_STEPS 
} from "../data/verificationData";

export const VerificationAudit: React.FC = () => {
  const [selectedMissType, setSelectedMissType] = useState<string>("ALL");

  const filteredHitsMisses = selectedMissType === "ALL" 
    ? HITS_AND_MISSES 
    : HITS_AND_MISSES.filter(hm => hm.missType === selectedMissType);

  const missTypes = ["ALL", "Enterprise Gating", "Auth Mechanism", "Pricing Paywall", "Scrape-only/No API"];

  return (
    <section className="space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Verification & Accuracy Loops</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Accuracy Audit: Multi-Pass Progression & Hits vs Misses
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          "Accuracy is what matters most." To ensure findings are reliable, we audited a 30-app stratified sample against live developer portals and API curls. Here is the exact progression from raw Pass 1 to verified Pass 3, along with honest documentation of what the agent got wrong.
        </p>
      </div>

      {/* Accuracy Progression Timeline (68.4% -> 86.2% -> 97.4%) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white sm:text-lg flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <span>3-Stage Verification Progression</span>
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ACCURACY_PROGRESSION.map((pass) => {
            const isFinal = pass.passNumber === 3;
            return (
              <div
                key={pass.passNumber}
                className={`relative rounded-2xl border p-5 space-y-3 ${
                  isFinal
                    ? "border-emerald-500/40 bg-emerald-950/20 shadow-lg shadow-emerald-500/10"
                    : "border-slate-800 bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                    isFinal ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                  }`}>
                    Pass {pass.passNumber}
                  </span>
                  <span className={`text-2xl font-black ${
                    isFinal ? "text-emerald-400" : pass.passNumber === 2 ? "text-amber-400" : "text-slate-400"
                  }`}>
                    {pass.accuracy}%
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{pass.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pass.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="text-slate-400">
                    <strong className="text-slate-300">Tooling:</strong> {pass.tooling}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-300">Errors Caught:</strong> {pass.errorTypesEncountered}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification Methodology */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
          <Eye className="h-4 w-4 text-indigo-400" />
          <span>Verification Methodology: How We Proved Trustworthiness</span>
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VERIFICATION_METHODOLOGY_STEPS.map((m, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <span className="text-xs font-bold text-indigo-400">{m.step}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hits and Misses Case Studies (Honest Audit Breakdown) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Honest Audit: 10 Real Hits & Misses Case Studies</span>
            </h3>
            <p className="text-xs text-slate-400">
              Where the initial agent hallucinated or got blocked, what was actually true in real docs, how it was caught, and the rule implemented to prevent future regression.
            </p>
          </div>

          {/* Filter Pill */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs scrollbar-none">
            {missTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMissType(type)}
                className={`rounded-lg px-2.5 py-1 font-medium transition ${
                  selectedMissType === type
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredHitsMisses.map((hm) => (
            <div
              key={hm.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 transition hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-slate-700">
                    {hm.category}
                  </span>
                  <h4 className="mt-1 text-base font-bold text-white">{hm.appName}</h4>
                </div>
                <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
                  {hm.missType}
                </span>
              </div>

              {/* Pass 1 Claim vs Reality */}
              <div className="space-y-2 text-xs">
                <div className="rounded-xl border border-rose-900/30 bg-rose-950/20 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Pass 1 Agent Claim (The Mistake)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{hm.pass1Claim}</p>
                </div>

                <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Ground Truth (Hand Verified via Docs & Curl)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{hm.actualReality}</p>
                </div>
              </div>

              {/* Resolution Info */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="rounded bg-slate-950 p-2 border border-slate-800 text-slate-300">
                  <strong className="text-slate-400">How Caught:</strong> {hm.howCaught}
                </div>
                <div className="rounded bg-slate-950 p-2 border border-slate-800 text-slate-300">
                  <strong className="text-slate-400">Verdict Shift:</strong>{" "}
                  <span className="text-rose-400">{hm.verdictBefore}</span> &rarr;{" "}
                  <span className="text-emerald-400 font-bold">{hm.verdictAfter}</span>
                </div>
              </div>

              {/* Prevention Rule */}
              <div className="rounded-lg bg-indigo-950/40 border border-indigo-500/20 p-2.5 text-xs text-indigo-200">
                <strong>Prevention Rule:</strong> {hm.preventionRule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
