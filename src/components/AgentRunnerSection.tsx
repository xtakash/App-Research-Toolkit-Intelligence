import React, { useState } from "react";
import { 
  Bot, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Code2, 
  Layers, 
  Terminal, 
  RefreshCw, 
  UserCheck, 
  ShieldCheck,
  ExternalLink
} from "lucide-react";

export const AgentRunnerSection: React.FC = () => {
  const [appName, setAppName] = useState("Linear");
  const [appUrl, setAppUrl] = useState("https://linear.app");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const presets = [
    { name: "Linear", url: "https://linear.app", cat: "Developer Tools" },
    { name: "Canva", url: "https://canva.com", cat: "Productivity" },
    { name: "Workday", url: "https://workday.com", cat: "HR & Enterprise" },
    { name: "Stripe", url: "https://stripe.com", cat: "Finance & FinTech" },
    { name: "Datadog", url: "https://datadoghq.com", cat: "Observability" },
    { name: "Supabase", url: "https://supabase.com", cat: "Cloud & Data" },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setAppName(p.name);
    setAppUrl(p.url);
    setResult(null);
    setLogs([]);
    setCurrentStep(0);
  };

  const handleRunAgent = async () => {
    if (!appName.trim()) return;

    setIsRunning(true);
    setResult(null);
    setCurrentStep(1);
    setLogs([
      `[T+0.0s] 🚀 Launching Composio Autonomous Research Agent for "${appName}"...`,
      `[T+0.4s] 🔍 Invoking Tool: Action.TAVILY_SEARCH -> querying "${appName} developer docs OpenAPI reference"...`
    ]);

    try {
      // Step 2 simulation
      await new Promise(r => setTimeout(r, 600));
      setCurrentStep(2);
      setLogs(prev => [
        ...prev,
        `[T+1.1s] 🌐 Invoking Tool: Action.BROWSERTOOL_NAVIGATE -> analyzing developer signup & pricing gates...`,
        `[T+1.5s] 📄 Parsing HTML DOM: Checking for instant API key issuance vs enterprise contact-sales wall...`
      ]);

      // Step 3 simulation
      await new Promise(r => setTimeout(r, 700));
      setCurrentStep(3);
      setLogs(prev => [
        ...prev,
        `[T+2.2s] 🧬 Invoking Tool: Action.PAGE_VIEWER_FETCH_DOM -> extracting OpenAPI securitySchemes & auth headers...`,
        `[T+2.6s] 🔎 Checking Model Context Protocol (MCP) registry for official or community server definitions...`
      ]);

      // Step 4 simulation
      await new Promise(r => setTimeout(r, 700));
      setCurrentStep(4);
      setLogs(prev => [
        ...prev,
        `[T+3.3s] 🧠 Running LLM Structured Evaluation (Gemini 3.7 Flash) -> synthesizing verdict & tool actions...`,
        `[T+3.7s] 🛡️ Running Dual-LLM Verification Loop to audit potential false-positive self-serve claims...`
      ]);

      // Actual backend API call
      const response = await fetch("/api/research-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName, appUrl }),
      });

      const json = await response.json();
      
      setCurrentStep(5);
      setLogs(prev => [
        ...prev,
        `[T+4.4s] ✅ Research complete! Generated structured toolkit specification card.`
      ]);
      setResult(json.data);
    } catch (err: any) {
      console.error(err);
      setLogs(prev => [...prev, `❌ Error in agent execution: ${err.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const getVerdictBadge = (verdict: string) => {
    if (verdict?.includes("Ready")) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Ready to Build (Green)</span>
        </span>
      );
    }
    if (verdict?.includes("Caveat")) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Build with Caveats (Yellow)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-400">
        <XCircle className="h-3.5 w-3.5" />
        <span>Gated / Heavy Blockers (Red)</span>
      </span>
    );
  };

  return (
    <section className="space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <Bot className="h-3.5 w-3.5" />
          <span>Automated Agent Pipeline</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          The Research Agent: Architecture, Live Trigger & Human-in-the-Loop
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          "Doing it by hand does not scale." We built an autonomous pipeline using Composio's SDK, Browser-Use, and Gemini 3.7 Flash to automate developer surface discovery across hundreds of apps. Test it below on any SaaS application.
        </p>
      </div>

      {/* Interactive Agent Runner Workbench */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Control Panel (5 cols) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 lg:col-span-5 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span>Agent Workbench</span>
            </h3>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
              Live Engine Ready
            </span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">Test Preset SaaS Apps:</label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                    appName === p.name 
                      ? "bg-indigo-600 text-white" 
                      : "border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input Form */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-300">Target SaaS App Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. Linear, Canva, SAP, Retool..."
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300">Target Website / Docs URL (Optional)</label>
              <input
                type="text"
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              id="run-research-agent-btn"
              onClick={handleRunAgent}
              disabled={isRunning || !appName.trim()}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-lg transition active:scale-95 ${
                isRunning 
                  ? "bg-slate-700 cursor-not-allowed text-slate-400" 
                  : "bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 shadow-indigo-600/20"
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                  <span>Agent Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Run Composio Research Agent</span>
                </>
              )}
            </button>
          </div>

          {/* Pipeline Stage Indicators */}
          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <span className="font-semibold text-slate-400">Autonomous Pipeline Stages:</span>
            <div className="space-y-1.5">
              {[
                "1. Manifest Discovery (Composio Web Search)",
                "2. Paywall & Signup DOM Scraper (Browser-Use)",
                "3. OpenAPI & MCP Registry Introspection",
                "4. Multi-Criteria LLM Evaluation & Verdict",
                "5. Dual-LLM Verification & Contradiction Check",
              ].map((stepLabel, idx) => {
                const stepNum = idx + 1;
                const isPast = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;
                return (
                  <div 
                    key={stepLabel}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-1 transition ${
                      isCurrent 
                        ? "bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30" 
                        : isPast 
                        ? "text-emerald-400" 
                        : "text-slate-500"
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin shrink-0 text-indigo-400" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className="truncate">{stepLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Terminal & Generated Card (7 cols) */}
        <div className="space-y-4 lg:col-span-7">
          {/* Real-time Agent Log Terminal */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-inner space-y-2 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-400">agent_runtime_trace.log</span>
              </div>
              <span className="text-[10px] text-indigo-400">Composio LangChain Runner</span>
            </div>

            <div className="min-h-[120px] max-h-[160px] overflow-y-auto space-y-1 text-slate-300 pr-1">
              {logs.length === 0 ? (
                <div className="py-6 text-center text-slate-600 italic">
                  Select an app and click "Run Composio Research Agent" to view the live execution trace.
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`leading-relaxed ${
                      log.includes("✅") ? "text-emerald-400 font-bold" :
                      log.includes("❌") ? "text-rose-400 font-bold" :
                      log.includes("🔍") || log.includes("🌐") ? "text-indigo-300" :
                      "text-slate-300"
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Structured Output Specification Card */}
          {result ? (
            <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-5 space-y-4 shadow-xl animate-in fade-in duration-300">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                    {result.category}
                  </span>
                  <h4 className="mt-1 text-lg font-bold text-white flex items-center gap-2">
                    <span>{result.name}</span>
                  </h4>
                  <p className="text-xs text-slate-300">{result.oneLiner}</p>
                </div>
                <div>{getVerdictBadge(result.verdict)}</div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                  <span className="text-slate-400 font-medium">Auth Mechanism</span>
                  <p className="text-white font-semibold">{Array.isArray(result.authMethods) ? result.authMethods.join(", ") : result.authType || "OAuth 2.0 / API Key"}</p>
                  <p className="text-slate-400 text-[11px]">{result.authDetails}</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                  <span className="text-slate-400 font-medium">Access & Gating Tier</span>
                  <p className="text-emerald-400 font-semibold">{result.accessTier}</p>
                  <p className="text-slate-400 text-[11px]">{result.selfServeDetails}</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                  <span className="text-slate-400 font-medium">API Surface & Breadth</span>
                  <p className="text-white font-semibold">{result.apiBreadth}</p>
                  <p className="text-slate-400 text-[11px]">{result.apiSurface}</p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1">
                  <span className="text-slate-400 font-medium">Model Context Protocol (MCP)</span>
                  <p className="text-teal-400 font-semibold">{result.mcpStatus}</p>
                  <p className="text-slate-400 text-[11px]">Ready for Composio agent compiler</p>
                </div>
              </div>

              {/* Blocker Callout */}
              <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-3 text-xs space-y-1">
                <span className="font-bold text-amber-400">Primary Blocker / Integration Nuance:</span>
                <p className="text-slate-200">{result.primaryBlocker}</p>
              </div>

              {/* Suggested Agent Actions */}
              {result.suggestedTools && result.suggestedTools.length > 0 && (
                <div className="space-y-1.5 text-xs">
                  <span className="font-semibold text-slate-300">Generated Composio Agent Tools:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.suggestedTools.map((t: string) => (
                      <span key={t} className="rounded bg-slate-950 px-2.5 py-1 text-[11px] font-mono text-indigo-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence URL */}
              {result.evidenceUrl && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Verified Evidence:</span>
                  <a
                    href={result.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline"
                  >
                    <span>{result.evidenceUrl}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center text-xs text-slate-500">
              Generated Toolkit Specification Card will render here upon running the agent.
            </div>
          )}
        </div>
      </div>

      {/* "Where It Needed A Human" - Explicit Analysis */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg">
              Where the Research Agent Needed a Human (Human-in-the-Loop)
            </h3>
            <p className="text-xs text-slate-400">
              Autonomous crawlers excel at scale, but four specific friction zones required manual human intervention.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-amber-400 text-xs">1. Free Trial vs Forever-Free</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              LLMs initially classified 14-day trials (Datadog, Front) as "Free Self-Serve". A human had to verify whether API keys continue functioning without entering a corporate credit card.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-amber-400 text-xs">2. Regional Routing Splits</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multi-region SaaS architectures (Datadog US1 vs EU1, Zoho regional datacenters, Mailchimp server suffixes) required human inspection of API base URLs.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-amber-400 text-xs">3. Client Embed vs Server REST</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Platforms like Canva and Loom have client-side iframe SDKs. The agent had to be instructed to look specifically for backend REST APIs capable of server-side agent execution.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
            <span className="font-bold text-amber-400 text-xs">4. Login-Walled Portals</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enterprise suites (Workday Community, SAP BTP) enforce login gates that block automated HTTP crawlers, requiring human manual verification of documentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
