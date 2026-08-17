import React, { useState } from "react";
import { 
  BarChart3, 
  KeyRound, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  Layers, 
  Info,
  ChevronRight
} from "lucide-react";
import { 
  AUTH_DISTRIBUTION, 
  ACCESS_BY_CATEGORY, 
  TOP_BLOCKERS, 
  PATTERN_CLUSTERS 
} from "../data/patternsData";

interface PatternsSectionProps {
  onSelectCategory?: (category: string) => void;
  onSelectApp?: (appName: string) => void;
}

export const PatternsSection: React.FC<PatternsSectionProps> = ({ 
  onSelectCategory,
  onSelectApp 
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string>("pattern-1");

  return (
    <section className="space-y-10">
      {/* Section Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Macro Pattern Analysis</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Ecosystem Patterns: Auth, Access Tiers & Friction Points
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Clustered insights derived from the 100-app dataset. Understanding these patterns enables Composio to prioritize toolkit builds and build automated ingestion pipelines.
        </p>
      </div>

      {/* 4 Interactive Pattern Clusters */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white sm:text-lg flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span>Strategic Macro Clusters</span>
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PATTERN_CLUSTERS.map((cluster) => {
            const isSelected = selectedCluster === cluster.id;
            return (
              <div
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-950/30 shadow-lg shadow-indigo-500/10"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-indigo-400">{cluster.stat}</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                    {cluster.appsCount} Apps
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-400 mt-0.5">{cluster.subStat}</div>
                <h4 className="mt-2 font-bold text-white text-sm line-clamp-2">{cluster.title}</h4>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-3">{cluster.description}</p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-semibold text-indigo-400">
                  <span>View Details</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Deep-Dive Banner */}
        {(() => {
          const cluster = PATTERN_CLUSTERS.find(c => c.id === selectedCluster) || PATTERN_CLUSTERS[0];
          return (
            <div className="rounded-xl border border-indigo-500/30 bg-slate-900/90 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Cluster Focus</span>
                  <h4 className="text-base font-bold text-white sm:text-lg">{cluster.title}</h4>
                </div>
                <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-300 self-start">
                  Impacts {cluster.appsCount} of 100 Apps
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{cluster.description}</p>
              <div className="rounded-lg bg-indigo-950/40 border border-indigo-500/20 p-3 text-xs text-indigo-200">
                <strong>Composio Strategic Takeaway:</strong> {cluster.keyTakeaway}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400">Representative Apps:</span>
                {cluster.highlightedApps.map((app) => (
                  <button
                    key={app}
                    onClick={() => onSelectApp?.(app)}
                    className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:border-indigo-500 hover:text-white transition"
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Grid: Auth Breakdown + Category Gating */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Auth Method Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-blue-400" />
                <span>Authentication Method Distribution</span>
              </h3>
              <p className="text-xs text-slate-400">How credentials are provisioned and passed</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {AUTH_DISTRIBUTION.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{item.name}</span>
                  <span className="font-bold text-white">{item.percentage} ({item.count} apps)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: item.percentage, backgroundColor: item.color }} 
                  />
                </div>
                <p className="text-[11px] text-slate-400">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Serve vs Gated by Category */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span>Self-Serve vs Gated by Category</span>
              </h3>
              <p className="text-xs text-slate-400">Free developer sandbox vs paid/partner walls</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 max-h-[380px] overflow-y-auto pr-1">
            {ACCESS_BY_CATEGORY.map((item) => (
              <div 
                key={item.category} 
                onClick={() => onSelectCategory?.(item.category)}
                className="group cursor-pointer rounded-lg p-2 transition hover:bg-slate-800/60"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200 group-hover:text-indigo-400 transition">{item.category}</span>
                  <span className="font-semibold text-slate-300">
                    <span className="text-emerald-400">{item.selfServe}% Self-Serve</span>
                    {item.gated > 0 && <span className="text-slate-400"> / <span className="text-rose-400">{item.gated}% Gated</span></span>}
                  </span>
                </div>
                {/* Visual stacked bar */}
                <div className="mt-1 flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full bg-emerald-500" style={{ width: `${item.selfServe}%` }} />
                  <div className="h-full bg-rose-500" style={{ width: `${item.gated}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Blockers & Engineering Mitigations */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div>
          <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span>Top 5 Integration Blockers & Composio Mitigations</span>
          </h3>
          <p className="text-xs text-slate-400">
            The friction points that prevent AI agents from calling tools autonomously, and how to engineer around them.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {TOP_BLOCKERS.map((blocker) => (
            <div key={blocker.name} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/10 text-xs font-bold text-amber-400">
                  #{blocker.rank}
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                  {blocker.frequency}
                </span>
              </div>
              <h4 className="font-bold text-white text-xs sm:text-sm">{blocker.name}</h4>
              <p className="text-xs text-slate-300">{blocker.description}</p>
              <div className="rounded bg-slate-950 p-2 text-[11px] text-emerald-400 border border-emerald-500/20">
                <strong>Mitigation:</strong> {blocker.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
