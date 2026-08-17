import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ExecutiveSummary } from "./components/ExecutiveSummary";
import { PatternsSection } from "./components/PatternsSection";
import { AppsMatrix } from "./components/AppsMatrix";
import { AgentRunnerSection } from "./components/AgentRunnerSection";
import { VerificationAudit } from "./components/VerificationAudit";
import { SourceCodeReadme } from "./components/SourceCodeReadme";
import { AppDetailModal } from "./components/AppDetailModal";
import { ALL_100_APPS } from "./data/appsData";
import { AppItem } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [matrixCategoryFilter, setMatrixCategoryFilter] = useState<string>("ALL");

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = [
      "App Name",
      "Category",
      "One Liner",
      "Auth Type",
      "Auth Details",
      "Access Tier",
      "Self Serve Details",
      "API Surface",
      "API Breadth",
      "MCP Status",
      "Verdict",
      "Primary Blocker",
      "Priority Tier",
      "Evidence URL",
    ];

    const rows = ALL_100_APPS.map((app) => [
      `"${app.name.replace(/"/g, '""')}"`,
      `"${app.category.replace(/"/g, '""')}"`,
      `"${app.oneLiner.replace(/"/g, '""')}"`,
      `"${app.authType.replace(/"/g, '""')}"`,
      `"${app.authDetails.replace(/"/g, '""')}"`,
      `"${app.accessTier.replace(/"/g, '""')}"`,
      `"${app.selfServeDetails.replace(/"/g, '""')}"`,
      `"${app.apiSurface.replace(/"/g, '""')}"`,
      `"${app.apiBreadth.replace(/"/g, '""')}"`,
      `"${app.mcpStatus.replace(/"/g, '""')}"`,
      `"${app.verdict.replace(/"/g, '""')}"`,
      `"${app.primaryBlocker.replace(/"/g, '""')}"`,
      `"${app.priorityTier.replace(/"/g, '""')}"`,
      `"${app.evidenceUrl.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "composio_100_apps_research_dataset.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON Handler
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ALL_100_APPS, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", "composio_100_apps_research_dataset.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectCategoryFromSummary = (category: string) => {
    setMatrixCategoryFilter(category);
    setActiveTab("matrix");
  };

  const handleSelectAppByName = (appName: string) => {
    const found = ALL_100_APPS.find((a) => a.name.toLowerCase() === appName.toLowerCase());
    if (found) {
      setSelectedApp(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        {activeTab === "summary" && (
          <ExecutiveSummary
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectCategoryFilter={handleSelectCategoryFromSummary}
          />
        )}

        {activeTab === "patterns" && (
          <PatternsSection
            onSelectCategory={handleSelectCategoryFromSummary}
            onSelectApp={handleSelectAppByName}
          />
        )}

        {activeTab === "matrix" && (
          <AppsMatrix
            onSelectApp={(app) => setSelectedApp(app)}
            initialCategory={matrixCategoryFilter}
          />
        )}

        {activeTab === "agent" && <AgentRunnerSection />}

        {activeTab === "verification" && <VerificationAudit />}

        {activeTab === "source" && <SourceCodeReadme />}
      </main>

      {/* App Detail Slide-over / Modal */}
      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-white">Composio AI Product Ops Take-Home</span>
            <span>•</span>
            <span>100-App Research & Verification Pipeline</span>
          </div>
          <p className="text-xs text-slate-500">
            Built with Composio Core SDK, LangChain, Browser-Use, and Gemini 3.7 Flash.
          </p>
        </div>
      </footer>
    </div>
  );
}
