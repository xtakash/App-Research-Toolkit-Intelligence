import React from "react";
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  KeyRound, 
  Lock, 
  Cpu, 
  FileCode, 
  ShieldCheck,
  Zap,
  Layers,
  Terminal
} from "lucide-react";
import { AppItem } from "../types";

interface AppDetailModalProps {
  app: AppItem | null;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "Ready to Build":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Ready to Build (Green)</span>
          </span>
        );
      case "Build with Caveats":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Build with Caveats (Yellow)</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-400">
            <XCircle className="h-3.5 w-3.5" />
            <span>Gated / Heavy Blockers (Red)</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                {app.category}
              </span>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-300">
                {app.priorityTier}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl flex items-center gap-2">
              <span>{app.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">{app.oneLiner}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Verdict Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div>
            <span className="text-xs font-semibold text-slate-400">Composio Toolkit Verdict</span>
            <div className="mt-1">{getVerdictBadge(app.verdict)}</div>
          </div>
          <a
            href={app.evidenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 self-start sm:self-auto underline decoration-indigo-500/40"
          >
            <span>Official Developer Docs</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* 2-Column Specs Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Auth Spec */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <KeyRound className="h-4 w-4" />
              <span>Authentication Architecture</span>
            </div>
            <div className="text-sm font-semibold text-white">{app.authType}</div>
            <p className="text-xs text-slate-300 leading-relaxed">{app.authDetails}</p>
          </div>

          {/* Access Tier Spec */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Lock className="h-4 w-4" />
              <span>Access & Developer Onboarding</span>
            </div>
            <div className="text-sm font-semibold text-white">{app.accessTier}</div>
            <p className="text-xs text-slate-300 leading-relaxed">{app.selfServeDetails}</p>
          </div>

          {/* API Surface & Breadth */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <Layers className="h-4 w-4" />
              <span>API Surface & Protocol</span>
            </div>
            <div className="text-sm font-semibold text-white">{app.apiBreadth}</div>
            <p className="text-xs text-slate-300 leading-relaxed">{app.apiSurface}</p>
          </div>

          {/* MCP Status */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <Cpu className="h-4 w-4" />
              <span>Model Context Protocol (MCP)</span>
            </div>
            <div className="text-sm font-semibold text-white">{app.mcpStatus}</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {app.mcpStatus.includes("Official") 
                ? "Official vendor MCP server exists and can be imported directly into agent tools."
                : app.mcpStatus.includes("Community")
                ? "Community MCP server exists; requires security vetting and rate-limit wrapping."
                : "No public MCP server today; Composio custom toolkit compilation required."}
            </p>
          </div>
        </div>

        {/* Primary Blocker */}
        <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <span>Primary Integration Blocker / Nuance</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200">{app.primaryBlocker}</p>
        </div>

        {/* Suggested Composio Agent Tools */}
        {app.suggestedTools && app.suggestedTools.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Zap className="h-3.5 w-3.5 text-indigo-400" />
              <span>Suggested Agent Actions (Composio Tool Definitions)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {app.suggestedTools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center rounded-lg border border-indigo-500/20 bg-indigo-950/40 px-2.5 py-1 text-xs font-mono text-indigo-300"
                >
                  <code>{tool}</code>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sample Curl Header */}
        {app.sampleCurl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span>Developer Handshake / Curl Format</span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <code>{app.sampleCurl}</code>
            </div>
          </div>
        )}

        {/* Verification Audit Trail Note */}
        {app.pass1ErrorReason && (
          <div className="rounded-xl border border-indigo-500/20 bg-slate-950 p-3 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verification Audit Trail</span>
            </div>
            <p className="text-slate-300">
              <strong>Pass 1 Finding:</strong> {app.pass1Verdict} &rarr; <strong>Caught & Fixed:</strong> {app.pass1ErrorReason}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
