import React, { useState } from "react";
import { 
  FileCode2, 
  Terminal, 
  Copy, 
  Check, 
  BookOpen, 
  Download,
  ExternalLink,
  Layers,
  Code
} from "lucide-react";
import { PYTHON_AGENT_CODE, TYPESCRIPT_MCP_SERVER_CODE, README_MARKDOWN } from "../data/agentCodeData";

export const SourceCodeReadme: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"python" | "mcp" | "readme">("python");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActiveCode = () => {
    switch (activeTab) {
      case "python":
        return PYTHON_AGENT_CODE;
      case "mcp":
        return TYPESCRIPT_MCP_SERVER_CODE;
      case "readme":
        return README_MARKDOWN;
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
          <FileCode2 className="h-3.5 w-3.5" />
          <span>Source Code & CLI Reproducibility</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Research Agent Source Code & Setup Guide
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          Production-grade research agent implementation built using the official Composio Core SDK, LangChain, Browser-Use, and Model Context Protocol (MCP) server architecture.
        </p>
      </div>

      {/* Code Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Code Header & Tab Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 gap-2">
          {/* File Selection Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("python")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeTab === "python"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Code className="h-3.5 w-3.5 text-emerald-400" />
              <span>research_agent.py (Composio SDK)</span>
            </button>

            <button
              onClick={() => setActiveTab("mcp")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeTab === "mcp"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-teal-400" />
              <span>mcp_server.ts (MCP Standard)</span>
            </button>

            <button
              onClick={() => setActiveTab("readme")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeTab === "readme"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-400" />
              <span>README.md (Execution Guide)</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => handleCopy(getActiveCode())}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-700 transition active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[580px] overflow-y-auto">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed">
            <code>{getActiveCode()}</code>
          </pre>
        </div>
      </div>

      {/* CLI Quickstart Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <span>Quick Terminal Execution</span>
        </h3>

        <div className="space-y-2">
          <p className="text-xs text-slate-300">
            Run the autonomous pipeline across any batch of applications via CLI:
          </p>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-400 space-y-1">
            <p className="text-slate-500"># 1. Install Composio & AI dependencies</p>
            <p>pip install composio-core composio-langchain langchain-google-genai pydantic</p>
            <p className="text-slate-500 pt-1"># 2. Run agent across target list with verification enabled</p>
            <p>python research_agent.py --target-list apps_100.json --output results.json --verify</p>
          </div>
        </div>
      </div>
    </section>
  );
};
