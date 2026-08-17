import React from "react";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  Lock, 
  Cpu,
  Layers,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { HEADLINE_METRICS, TOOLKIT_ROLLOUT_TIERS } from "../data/patternsData";

interface ExecutiveSummaryProps {
  onNavigate: (tab: string) => void;
  onSelectCategoryFilter?: (cat: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigate }) => {
  return (
    <section className="space-y-8">
      {/* Top Banner / Headline Pitch */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Product Ops Take-Home Assignment Deliverable</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            SaaS Toolkit Intelligence: <br />
            <span className="bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              100-App Surface Research & Pattern Discovery
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Composio turns apps into tools that AI agents can call. To scale toolkit creation beyond manual research, 
            we designed an autonomous multi-stage research agent combining <strong>Composio SDK</strong>, <strong>Browser-Use</strong>, 
            and <strong>Dual-LLM verification loops</strong> to analyze auth architectures, paywalls, and buildability across 100 benchmark SaaS apps.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="cta-explore-matrix"
              onClick={() => onNavigate("matrix")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-95 sm:text-sm"
            >
              <span>Explore 100-App Matrix</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="cta-try-agent"
              onClick={() => onNavigate("agent")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 active:scale-95 sm:text-sm"
            >
              <Cpu className="h-4 w-4 text-emerald-400" />
              <span>Test Live Research Agent</span>
            </button>
            <button
              id="cta-view-accuracy"
              onClick={() => onNavigate("verification")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-700 active:scale-95 sm:text-sm"
            >
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>View Accuracy & Verification Audit</span>
            </button>
          </div>
        </div>

        {/* Decorative ambient background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* 2-Minute Reviewer Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Analyzed</span>
            <Layers className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">100</p>
          <p className="mt-1 text-xs text-slate-400">Across 10 key SaaS sectors</p>
        </div>

        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-300">Ready to Build</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-400 sm:text-3xl">{HEADLINE_METRICS.readyToBuildPercent}%</p>
          <p className="mt-1 text-xs text-emerald-400/80">68 apps with zero partner gate</p>
        </div>

        <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-300">Build with Caveats</span>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-400 sm:text-3xl">{HEADLINE_METRICS.buildWithCaveatsPercent}%</p>
          <p className="mt-1 text-xs text-amber-400/80">20 apps with OAuth config friction</p>
        </div>

        <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-300">Gated / Blocked</span>
            <XCircle className="h-4 w-4 text-rose-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-400 sm:text-3xl">{HEADLINE_METRICS.gatedPercent}%</p>
          <p className="mt-1 text-xs text-rose-400/80">12 apps require partner/sales gate</p>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-300">Verified Accuracy</span>
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-indigo-400 sm:text-3xl">{HEADLINE_METRICS.verifiedAccuracy}%</p>
          <p className="mt-1 text-xs text-indigo-400/80">After 3-pass multi-verification</p>
        </div>
      </div>

      {/* The 4 Core Headline Findings (Insight Over Raw Table) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              Headline Macro Patterns & Core Insights
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm">
              The overarching architectural patterns discovered across the 100-app dataset.
            </p>
          </div>
          <button
            onClick={() => onNavigate("patterns")}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>Deep Dive Patterns</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Finding 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 transition hover:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-bold text-xs">
                #1
              </span>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Auth Dominance: API Keys Rule Developer & AI Infra; OAuth 2.0 Governs Workspaces
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong>42%</strong> of apps rely on Bearer API Keys (OpenAI, Pinecone, Supabase, Resend), making them <em>instantly callable</em> in agent runtimes without token rotation. Meanwhile, <strong>28%</strong> mandate OAuth 2.0 (Slack, Zoom, Salesforce) for user delegation, and <strong>18%</strong> support a modern hybrid PAT model (GitHub, Linear, Airtable, Notion).
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-blue-400">
              <KeyRound className="h-3.5 w-3.5" />
              <span>Takeaway: Composio should offer instant 0-to-1 PAT connectors while maintaining managed OAuth proxies.</span>
            </div>
          </div>

          {/* Finding 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 transition hover:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                #2
              </span>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Category Disparity: 100% Self-Serve AI/DevTools vs 62.5% Gated HR & ERP
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AI Infrastructure (100%), Marketing Automation (100%), and Developer Tools (87.5%) are almost entirely open with free sandbox tiers. Conversely, <strong>HR & Enterprise Operations (62.5% gated)</strong> like Workday, SAP, and Rippling require enterprise contracts or ISV partner certification.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400">
              <Lock className="h-3.5 w-3.5" />
              <span>Takeaway: Developer tools scale bottom-up via auto-generation; enterprise ERPs require top-down partner outreach.</span>
            </div>
          </div>

          {/* Finding 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 transition hover:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs">
                #3
              </span>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Primary Blocker: Workspace Admin Approval & Dynamic Tenant IDs (44% of Friction)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The #1 blocker for end-user adoption is not API complexity, but <strong>Workspace Admin Elevation</strong> (Slack bot install approval, Microsoft Teams tenant consent) and <strong>Dynamic Tenant Context</strong> (QuickBooks <code>realmId</code>, Xero <code>tenant-id</code>, Zendesk subdomain).
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Takeaway: Composio must auto-extract tenant metadata during OAuth handshake to eliminate manual user configuration.</span>
            </div>
          </div>

          {/* Finding 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 transition hover:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 font-bold text-xs">
                #4
              </span>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                The MCP Wave: 32% of Apps Already Have Model Context Protocol Implementations
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              32 out of 100 apps (GitHub, Sentry, Notion, Supabase, Linear, Stripe, PostgreSQL) already feature official or community MCP servers. Composio can directly bridge and host these MCP definitions while layering on enterprise-grade auth and rate-limiting.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-purple-400">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Takeaway: Composio can fast-track 30+ toolkits immediately by compiling existing MCP schemas into its registry.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Rollout Prioritization Tiers */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white sm:text-lg">
              Composio Toolkit Rollout Roadmap (Easy Wins vs Outreach)
            </h2>
            <p className="text-xs text-slate-400">
              Strategic phasing for launching the 100 toolkits with highest return on engineering effort.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 self-start">
            <Zap className="h-3 w-3" />
            3-Tier Rollout Strategy
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Tier 1 */}
          <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                {TOOLKIT_ROLLOUT_TIERS.tier1.badge}
              </span>
              <span className="text-xs font-semibold text-slate-400">44 Apps</span>
            </div>
            <h3 className="font-bold text-white text-sm">{TOOLKIT_ROLLOUT_TIERS.tier1.title}</h3>
            <p className="text-xs text-slate-300">{TOOLKIT_ROLLOUT_TIERS.tier1.criteria}</p>
            <div className="rounded-lg bg-slate-900/80 p-2.5 text-xs text-emerald-300">
              <strong>Strategy:</strong> {TOOLKIT_ROLLOUT_TIERS.tier1.strategy}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TOOLKIT_ROLLOUT_TIERS.tier1.sample.slice(0, 6).map((app) => (
                <span key={app} className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                  {app}
                </span>
              ))}
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">+38 more</span>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="rounded-xl border border-amber-800/30 bg-amber-950/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-400">
                {TOOLKIT_ROLLOUT_TIERS.tier2.badge}
              </span>
              <span className="text-xs font-semibold text-slate-400">36 Apps</span>
            </div>
            <h3 className="font-bold text-white text-sm">{TOOLKIT_ROLLOUT_TIERS.tier2.title}</h3>
            <p className="text-xs text-slate-300">{TOOLKIT_ROLLOUT_TIERS.tier2.criteria}</p>
            <div className="rounded-lg bg-slate-900/80 p-2.5 text-xs text-amber-300">
              <strong>Strategy:</strong> {TOOLKIT_ROLLOUT_TIERS.tier2.strategy}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TOOLKIT_ROLLOUT_TIERS.tier2.sample.slice(0, 6).map((app) => (
                <span key={app} className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                  {app}
                </span>
              ))}
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">+30 more</span>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="rounded-xl border border-rose-800/30 bg-rose-950/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-bold text-rose-400">
                {TOOLKIT_ROLLOUT_TIERS.tier3.badge}
              </span>
              <span className="text-xs font-semibold text-slate-400">20 Apps</span>
            </div>
            <h3 className="font-bold text-white text-sm">{TOOLKIT_ROLLOUT_TIERS.tier3.title}</h3>
            <p className="text-xs text-slate-300">{TOOLKIT_ROLLOUT_TIERS.tier3.criteria}</p>
            <div className="rounded-lg bg-slate-900/80 p-2.5 text-xs text-rose-300">
              <strong>Strategy:</strong> {TOOLKIT_ROLLOUT_TIERS.tier3.strategy}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TOOLKIT_ROLLOUT_TIERS.tier3.sample.slice(0, 6).map((app) => (
                <span key={app} className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                  {app}
                </span>
              ))}
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-400">+14 more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
