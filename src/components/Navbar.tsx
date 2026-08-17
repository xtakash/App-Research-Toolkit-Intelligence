import React from "react";
import { 
  Sparkles, 
  TableProperties, 
  BarChart3, 
  Bot, 
  ShieldCheck, 
  FileCode2, 
  Download, 
  Layers
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onExportCSV,
  onExportJSON,
}) => {
  const navItems = [
    { id: "summary", label: "Executive Summary", icon: Sparkles },
    { id: "patterns", label: "Macro Patterns", icon: BarChart3 },
    { id: "matrix", label: "100-App Matrix", icon: TableProperties },
    { id: "agent", label: "Agent & Live Runner", icon: Bot },
    { id: "verification", label: "Accuracy & Verification", icon: ShieldCheck },
    { id: "source", label: "Source & README", icon: FileCode2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-md shadow-indigo-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white sm:text-lg">
                Composio
              </span>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400">
                AI Product Ops
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 sm:block">
              100-App API Research, Auth Patterns & Agent Verification
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button
              id="export-csv-btn"
              onClick={onExportCSV}
              title="Download 100 Apps Dataset as CSV"
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-700 active:scale-95"
            >
              <Download className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export</span> CSV
            </button>
            <button
              id="export-json-btn"
              onClick={onExportJSON}
              title="Download full structured JSON"
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-700 active:scale-95"
            >
              <FileCode2 className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Export</span> JSON
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Scrollbar */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-800/80 px-2 py-1.5 scrollbar-none">
        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
