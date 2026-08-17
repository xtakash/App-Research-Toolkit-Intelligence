import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Layers, 
  KeyRound, 
  Lock, 
  Cpu, 
  ArrowUpDown,
  Download,
  Info,
  LayoutGrid,
  List
} from "lucide-react";
import { AppItem, AppCategory, BuildabilityVerdict, AccessTier, AuthType, MCPStatus } from "../types";
import { ALL_100_APPS } from "../data/appsData";

interface AppsMatrixProps {
  onSelectApp: (app: AppItem) => void;
  initialCategory?: string;
}

export const AppsMatrix: React.FC<AppsMatrixProps> = ({ 
  onSelectApp, 
  initialCategory = "ALL" 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedVerdict, setSelectedVerdict] = useState<string>("ALL");
  const [selectedAccessTier, setSelectedAccessTier] = useState<string>("ALL");
  const [selectedAuth, setSelectedAuth] = useState<string>("ALL");
  const [selectedMcp, setSelectedMcp] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortField, setSortField] = useState<keyof AppItem>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const categories: AppCategory[] = [
    "Developer Tools & DevOps",
    "AI & ML Infrastructure",
    "Communication & Collab",
    "Productivity & Project Ops",
    "CRM & Sales Automation",
    "Finance, Billing & FinTech",
    "Customer Support & Success",
    "Marketing & Email Automation",
    "HR & Enterprise Operations",
    "Cloud, Data & Analytics",
  ];

  // Filtering & Sorting logic
  const filteredApps = useMemo(() => {
    return ALL_100_APPS.filter((app) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesCat = app.category.toLowerCase().includes(q);
        const matchesDesc = app.oneLiner.toLowerCase().includes(q);
        const matchesBlocker = app.primaryBlocker.toLowerCase().includes(q);
        const matchesAuth = app.authType.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc && !matchesBlocker && !matchesAuth) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "ALL" && app.category !== selectedCategory) {
        return false;
      }

      // Verdict filter
      if (selectedVerdict !== "ALL" && app.verdict !== selectedVerdict) {
        return false;
      }

      // Access Tier filter
      if (selectedAccessTier !== "ALL" && app.accessTier !== selectedAccessTier) {
        return false;
      }

      // Auth filter
      if (selectedAuth !== "ALL" && !app.authType.includes(selectedAuth)) {
        return false;
      }

      // MCP filter
      if (selectedMcp !== "ALL") {
        if (selectedMcp === "Official" && !app.mcpStatus.includes("Official")) return false;
        if (selectedMcp === "Community" && !app.mcpStatus.includes("Community")) return false;
        if (selectedMcp === "None" && !app.mcpStatus.includes("No MCP")) return false;
      }

      return true;
    }).sort((a, b) => {
      const valA = a[sortField] ?? "";
      const valB = b[sortField] ?? "";
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedVerdict,
    selectedAccessTier,
    selectedAuth,
    selectedMcp,
    sortField,
    sortAsc,
  ]);

  const handleSort = (field: keyof AppItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getVerdictBadge = (verdict: BuildabilityVerdict) => {
    switch (verdict) {
      case "Ready to Build":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            <CheckCircle2 className="h-3 w-3" />
            <span>Ready</span>
          </span>
        );
      case "Build with Caveats":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20 whitespace-nowrap">
            <AlertTriangle className="h-3 w-3" />
            <span>Caveats</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20 whitespace-nowrap">
            <XCircle className="h-3 w-3" />
            <span>Gated</span>
          </span>
        );
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedVerdict("ALL");
    setSelectedAccessTier("ALL");
    setSelectedAuth("ALL");
    setSelectedMcp("ALL");
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl flex items-center gap-2">
            <span>100-App Research Matrix</span>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-slate-700">
              {filteredApps.length} / {ALL_100_APPS.length} Apps
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Full structured dataset for every application: auth mechanism, access gating, API breadth, MCP status, verdict, and evidence URL.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-1">
            <button
              onClick={() => setViewMode("table")}
              title="Table View"
              className={`rounded p-1.5 transition ${viewMode === "table" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Card Grid View"
              className={`rounded p-1.5 transition ${viewMode === "grid" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        {/* Top Search & Dropdowns */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by app, category, auth, blocker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Verdict Filter */}
          <div>
            <select
              value={selectedVerdict}
              onChange={(e) => setSelectedVerdict(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Verdicts</option>
              <option value="Ready to Build">Ready to Build (Green)</option>
              <option value="Build with Caveats">Build with Caveats (Yellow)</option>
              <option value="Gated / Heavy Blockers">Gated / Blocked (Red)</option>
            </select>
          </div>

          {/* Access Tier Filter */}
          <div>
            <select
              value={selectedAccessTier}
              onChange={(e) => setSelectedAccessTier(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Access Tiers</option>
              <option value="Free Self-Serve">Free Self-Serve</option>
              <option value="Paid Plan Required">Paid Plan Required</option>
              <option value="Partner / Contact Sales Gated">Partner / Sales Gated</option>
            </select>
          </div>

          {/* Auth Method Filter */}
          <div>
            <select
              value={selectedAuth}
              onChange={(e) => setSelectedAuth(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs sm:text-sm text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="ALL">All Auth Methods</option>
              <option value="API Key">API Key / Bearer</option>
              <option value="OAuth 2.0">OAuth 2.0</option>
              <option value="Personal Access Token">Personal Access Token</option>
              <option value="Basic Auth">Basic Auth</option>
            </select>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`shrink-0 rounded-lg px-2.5 py-1 font-medium transition ${
              selectedCategory === "ALL"
                ? "bg-indigo-600 text-white"
                : "border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            All Categories ({ALL_100_APPS.length})
          </button>
          {categories.map((cat) => {
            const count = ALL_100_APPS.filter((a) => a.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-lg px-2.5 py-1 font-medium transition ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips */}
        {(selectedCategory !== "ALL" || selectedVerdict !== "ALL" || selectedAccessTier !== "ALL" || selectedAuth !== "ALL" || searchQuery) && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs text-slate-400">
            <span>
              Filtered: <strong>{filteredApps.length}</strong> matching apps
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-md">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-800 bg-slate-950 text-slate-400">
              <tr>
                <th 
                  onClick={() => handleSort("name")}
                  className="cursor-pointer px-4 py-3 font-semibold text-slate-300 hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>App & Purpose</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort("category")}
                  className="cursor-pointer px-3 py-3 font-semibold text-slate-300 hover:text-white hidden md:table-cell"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-3 py-3 font-semibold text-slate-300">Auth Method</th>
                <th className="px-3 py-3 font-semibold text-slate-300 hidden sm:table-cell">Access Tier</th>
                <th className="px-3 py-3 font-semibold text-slate-300 hidden lg:table-cell">API Surface & MCP</th>
                <th 
                  onClick={() => handleSort("verdict")}
                  className="cursor-pointer px-3 py-3 font-semibold text-slate-300 hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Verdict</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-3 py-3 font-semibold text-slate-300 hidden xl:table-cell">Primary Blocker</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-300">Action / Docs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredApps.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => onSelectApp(app)}
                  className="cursor-pointer transition hover:bg-slate-800/50 group"
                >
                  {/* App Name & One-Liner */}
                  <td className="px-4 py-3">
                    <div className="font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-2">
                      <span>{app.name}</span>
                      {app.isAuditedSample && (
                        <span className="rounded bg-indigo-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20" title="Audited in Hand Verification Sample">
                          Audited
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 max-w-xs sm:max-w-sm mt-0.5">
                      {app.oneLiner}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-3 hidden md:table-cell text-xs text-slate-300">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700/60">
                      {app.category}
                    </span>
                  </td>

                  {/* Auth Method */}
                  <td className="px-3 py-3 text-xs text-slate-300">
                    <div className="font-medium text-slate-200">{app.authType}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-[140px]">
                      {app.authDetails}
                    </div>
                  </td>

                  {/* Access Tier */}
                  <td className="px-3 py-3 hidden sm:table-cell text-xs">
                    <span className={`inline-flex items-center gap-1 font-medium ${
                      app.accessTier === "Free Self-Serve" 
                        ? "text-emerald-400" 
                        : app.accessTier === "Paid Plan Required"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}>
                      {app.accessTier}
                    </span>
                  </td>

                  {/* API Surface & MCP */}
                  <td className="px-3 py-3 hidden lg:table-cell text-xs text-slate-300">
                    <div className="font-mono text-[11px] text-slate-300">{app.apiBreadth}</div>
                    <div className="text-[11px] text-teal-400">{app.mcpStatus}</div>
                  </td>

                  {/* Verdict */}
                  <td className="px-3 py-3 text-xs">
                    {getVerdictBadge(app.verdict)}
                  </td>

                  {/* Primary Blocker */}
                  <td className="px-3 py-3 hidden xl:table-cell text-xs text-slate-400 max-w-xs">
                    <p className="line-clamp-2">{app.primaryBlocker}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectApp(app)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:border-indigo-500 hover:text-white transition"
                      >
                        Inspect
                      </button>
                      <a
                        href={app.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Official Documentation"
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-sm transition hover:border-indigo-500/50 hover:bg-slate-900 hover:shadow-lg space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-slate-700">
                    {app.category}
                  </span>
                  <h3 className="mt-1 font-bold text-white text-base group-hover:text-indigo-400 transition">
                    {app.name}
                  </h3>
                </div>
                <div>{getVerdictBadge(app.verdict)}</div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {app.oneLiner}
              </p>

              <div className="space-y-1.5 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Auth:</span>
                  <span className="font-semibold text-slate-200">{app.authType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Access:</span>
                  <span className={`font-semibold ${
                    app.accessTier === "Free Self-Serve" ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {app.accessTier}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">MCP:</span>
                  <span className="text-teal-400 text-[11px] truncate max-w-[160px]">{app.mcpStatus}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">Blocker:</strong>{" "}
                <span className="line-clamp-1">{app.primaryBlocker}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="font-medium text-indigo-400 group-hover:underline">
                  View Full Toolkit Spec &rarr;
                </span>
                <a
                  href={app.evidenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <span>Docs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
