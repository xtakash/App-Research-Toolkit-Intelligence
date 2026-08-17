export type AuthType = 
  | "OAuth 2.0"
  | "API Key"
  | "Bearer Token"
  | "Personal Access Token"
  | "OAuth 2.0 & API Key"
  | "OAuth 2.0 / API Key"
  | "JWT / Bearer Token"
  | "Basic Auth"
  | "Session / SAML Gated"
  | string;

export type AccessTier = 
  | "Free Self-Serve"
  | "Paid Plan Required"
  | "Partner / Contact Sales Gated"
  | "Admin Approval Required";

export type BuildabilityVerdict = 
  | "Ready to Build"
  | "Build with Caveats"
  | "Gated / Heavy Blockers";

export type MCPStatus = 
  | "Official MCP Available"
  | "Community MCP Available"
  | "No MCP (Composio Custom Needed)";

export type AppCategory = 
  | "Developer Tools & DevOps"
  | "AI & ML Infrastructure"
  | "Communication & Collab"
  | "Productivity & Project Ops"
  | "CRM & Sales Automation"
  | "Finance, Billing & FinTech"
  | "Customer Support & Success"
  | "Marketing & Email Automation"
  | "HR & Enterprise Operations"
  | "Cloud, Data & Analytics";

export interface AppItem {
  id: string;
  name: string;
  category: AppCategory;
  oneLiner: string;
  authType: AuthType;
  authDetails: string;
  accessTier: AccessTier;
  selfServeDetails: string;
  apiSurface: string;
  apiBreadth: "Broad (100+ endpoints)" | "Moderate (25-100 endpoints)" | "Niche (<25 endpoints)";
  mcpStatus: MCPStatus;
  verdict: BuildabilityVerdict;
  primaryBlocker: string;
  evidenceUrl: string;
  suggestedTools: string[];
  sampleCurl?: string;
  verificationNotes?: string;
  pass1Verdict?: BuildabilityVerdict;
  pass1ErrorReason?: string;
  isAuditedSample?: boolean;
  priorityTier: "Tier 1: Instant Win" | "Tier 2: High Value / Config Friction" | "Tier 3: Partner Outreach";
}

export interface PatternCluster {
  id: string;
  title: string;
  stat: string;
  subStat: string;
  type: "auth" | "access" | "blocker" | "opportunity";
  description: string;
  keyTakeaway: string;
  appsCount: number;
  highlightedApps: string[];
}

export interface VerificationHitMiss {
  id: string;
  appName: string;
  category: AppCategory;
  pass1Claim: string;
  actualReality: string;
  missType: "Auth Mechanism" | "Pricing Paywall" | "Enterprise Gating" | "Scrape-only/No API" | "Rate Limit Misjudgment";
  howCaught: "Browser-use DOM Parser" | "Deep AST Docs Scan" | "Human-in-the-Loop Audit";
  preventionRule: string;
  verdictBefore: BuildabilityVerdict;
  verdictAfter: BuildabilityVerdict;
}

export interface AgentStep {
  stepNumber: number;
  title: string;
  toolUsed: string;
  description: string;
  inputExample: string;
  outputExample: string;
  humanInterventionPoint?: string;
}

export interface ResearchAgentState {
  appName: string;
  appUrl?: string;
  categoryHint?: string;
  status: "idle" | "running" | "completed" | "error";
  currentStepIndex: number;
  logs: string[];
  result?: Partial<AppItem>;
  source?: string;
}
