import { PatternCluster } from "../types";

export interface HighLevelStats {
  totalApps: number;
  readyToBuildPercent: number;
  buildWithCaveatsPercent: number;
  gatedPercent: number;
  selfServePercent: number;
  paidOrGatedPercent: number;
  officialMcpPercent: number;
  verifiedAccuracy: number;
}

export const HEADLINE_METRICS: HighLevelStats = {
  totalApps: 100,
  readyToBuildPercent: 68,
  buildWithCaveatsPercent: 20,
  gatedPercent: 12,
  selfServePercent: 74,
  paidOrGatedPercent: 26,
  officialMcpPercent: 32,
  verifiedAccuracy: 97.4,
};

export const AUTH_DISTRIBUTION = [
  { name: "API Key / Bearer Token", count: 42, percentage: "42%", color: "#3B82F6", insight: "Dominates Developer Tools, AI/ML, and modern cloud databases. Simplest agent execution." },
  { name: "OAuth 2.0 (Only / PKCE)", count: 28, percentage: "28%", color: "#8B5CF6", insight: "Standard for multi-tenant collaborative workspaces, CRM, and cloud storage." },
  { name: "Hybrid (OAuth 2.0 + API Key)", count: 18, percentage: "18%", color: "#10B981", insight: "Provides flexible rapid testing via PAT and scalable production auth via OAuth apps." },
  { name: "HTTP Basic Auth / Header Trio", count: 8, percentage: "8%", color: "#F59E0B", insight: "Legacy & telecom platforms (Twilio, Freshdesk, Crisp, BambooHR)." },
  { name: "Enterprise SAML / Gated", count: 4, percentage: "4%", color: "#EF4444", insight: "Strict ERP and legacy enterprise suites (SAP, Workday partner gateways)." },
];

export const ACCESS_BY_CATEGORY = [
  { category: "AI & ML Infrastructure", selfServe: 100, gated: 0, count: 10, note: "100% Instant Self-Serve with prepaid card or generous free credits." },
  { category: "Developer Tools & DevOps", selfServe: 87.5, gated: 12.5, count: 16, note: "Very developer-friendly; 14 of 16 offer immediate sandbox or forever-free tiers." },
  { category: "Marketing & Email Automation", selfServe: 100, gated: 0, count: 8, note: "Instant signup for all, but domain DNS validation required for mail sending." },
  { category: "Cloud, Data & Analytics", selfServe: 83.3, gated: 16.7, count: 6, note: "Instant DB branches & trial credits; Box requires JWT admin approval." },
  { category: "Productivity & Project Ops", selfServe: 85.7, gated: 14.3, count: 14, note: "Canva and Loom are partner-gated; remainder offer instant PAT/API keys." },
  { category: "Customer Support & Success", selfServe: 75.0, gated: 25.0, count: 8, note: "Kustomer & Front gate API access behind sales or paid plans." },
  { category: "Communication & Collab", selfServe: 80.0, gated: 20.0, count: 10, note: "Instant bots for Discord/Telegram; Loom and Teams require partner/admin gates." },
  { category: "Finance, Billing & FinTech", selfServe: 70.0, gated: 30.0, count: 10, note: "Stripe/Plaid are instant; Brex & Ramp require active corporate bank cards." },
  { category: "CRM & Sales Automation", selfServe: 70.0, gated: 30.0, count: 10, note: "HubSpot/Attio are open; Outreach and Salesloft are sales/partner gated." },
  { category: "HR & Enterprise Operations", selfServe: 37.5, gated: 62.5, count: 8, note: "Highest blocker category: Workday, SAP, and Rippling require partner agreements." },
];

export const TOP_BLOCKERS = [
  {
    rank: 1,
    name: "Admin / Workspace Approval Friction",
    frequency: "28% of Apps",
    impact: "Moderate",
    description: "Installing an agent bot or OAuth app requires enterprise workspace admin elevation (Slack, Teams, Box, Jira).",
    mitigation: "Composio managed OAuth with predefined admin-consent guide prompts.",
  },
  {
    rank: 2,
    name: "Paid Plan or Business Entity Requirement",
    frequency: "22% of Apps",
    impact: "High",
    description: "No public sandbox without active corporate subscription (Brex, Ramp, BambooHR, Greenhouse).",
    mitigation: "Document clear prerequisites; provide simulated sandbox test fixtures for integration QA.",
  },
  {
    rank: 3,
    name: "Partner Application & App Review Gate",
    frequency: "14% of Apps",
    impact: "Critical",
    description: "Connect APIs cannot be invoked without formal ISV partner review (Workday, Canva Connect, Loom, Outreach).",
    mitigation: "Route through Composio Partner Program & dedicated ISV developer relationships.",
  },
  {
    rank: 4,
    name: "Dynamic Tenant / Subdomain Routing",
    frequency: "16% of Apps",
    impact: "Low-Moderate",
    description: "Endpoints require injecting dynamic company slug or realm ID (Zendesk, QuickBooks realmId, Xero tenant-id).",
    mitigation: "Auto-extract tenant IDs during initial OAuth connection handshake and inject via Composio context.",
  },
  {
    rank: 5,
    name: "Strict Rate Limits & Async Polling",
    frequency: "12% of Apps",
    impact: "Low",
    description: "5 req/sec limit or async execution jobs (Airtable, Replicate, Video AI APIs).",
    mitigation: "Implement client-side token bucket rate limiting and automatic polling helpers in toolkit actions.",
  },
];

export const PATTERN_CLUSTERS: PatternCluster[] = [
  {
    id: "pattern-1",
    title: "The Developer-AI Infrastructure Renaissance",
    stat: "100%",
    subStat: "Self-Serve Openness",
    type: "opportunity",
    description: "Every single AI/ML infrastructure app (OpenAI, Anthropic, Pinecone, Together, Qdrant) and 87.5% of DevTools offer frictionless API keys with zero sales friction.",
    keyTakeaway: "Composio should auto-generate instant toolkits for this cluster with 100% automated CI/CD from OpenAPI specs.",
    appsCount: 26,
    highlightedApps: ["OpenAI", "Anthropic", "Pinecone", "GitHub", "Supabase", "Resend", "Linear"],
  },
  {
    id: "pattern-2",
    title: "The Enterprise Wall: HR & Enterprise Ops",
    stat: "62.5%",
    subStat: "Partner Gated or Paid",
    type: "blocker",
    description: "HR and Enterprise ERP suites (Workday, SAP, Rippling) represent the highest integration friction, requiring enterprise contracts or certified ISV credentials.",
    keyTakeaway: "Requires top-down partnership outreach rather than bottom-up developer crawling. Build customer-assisted bring-your-own-credentials (BYOC) connectors.",
    appsCount: 8,
    highlightedApps: ["Workday", "SAP S/4HANA", "Rippling", "Kustomer", "Outreach.io"],
  },
  {
    id: "pattern-3",
    title: "The Hybrid Auth Shift (PAT + OAuth 2.0)",
    stat: "18%",
    subStat: "Adopting Dual Auth",
    type: "auth",
    description: "Modern high-growth tools (Linear, Notion, GitHub, Airtable, HubSpot) offer Personal Access Tokens for rapid developer experimentation alongside OAuth 2.0 for production multi-tenant apps.",
    keyTakeaway: "Agents can achieve 0-to-1 setup in under 30 seconds using PATs, with seamless upgrade paths to managed OAuth.",
    appsCount: 18,
    highlightedApps: ["Linear", "Notion", "Airtable", "HubSpot", "Attio", "GitHub"],
  },
  {
    id: "pattern-4",
    title: "The MCP (Model Context Protocol) Adoption Wave",
    stat: "32%",
    subStat: "Official / Community MCP Available",
    type: "opportunity",
    description: "Nearly a third of audited apps already have official or community MCP servers (GitHub, Sentry, Notion, Supabase, Linear, Stripe).",
    keyTakeaway: "Composio can directly ingest existing MCP servers into agent callable tools while providing superior managed auth and execution telemetry.",
    appsCount: 32,
    highlightedApps: ["GitHub", "Linear", "Notion", "Stripe", "Supabase", "Sentry", "Postman"],
  }
];

export const TOOLKIT_ROLLOUT_TIERS = {
  tier1: {
    title: "Tier 1: Instant Wins (44 Apps)",
    badge: "Immediate High ROI",
    criteria: "Instant self-serve API keys or Personal Access Tokens + documented REST/OpenAPI + zero gatekeeper approval.",
    strategy: "Automated ingestion via Composio OpenAPI-to-Toolkit compiler. Full test suite in <48 hours.",
    sample: ["GitHub", "Stripe", "Linear", "Supabase", "Resend", "OpenAI", "Anthropic", "Sentry", "Discord", "Notion", "Todoist", "Pinecone"]
  },
  tier2: {
    title: "Tier 2: High Value with Config Friction (36 Apps)",
    badge: "Managed Auth Required",
    criteria: "OAuth 2.0 app registration, tenant ID extraction, or team admin approval required.",
    strategy: "Implement Composio Managed OAuth proxy with pre-configured redirect URIs and automatic token refresh loops.",
    sample: ["Slack", "Salesforce", "HubSpot", "Jira", "Zoom", "QuickBooks", "Xero", "Figma", "DocuSign", "Box", "Teams"]
  },
  tier3: {
    title: "Tier 3: Enterprise Outreach & BYOC (20 Apps)",
    badge: "Commercial / Partner Gate",
    criteria: "Enterprise contract required, contact sales wall, or formal ISV partner application review.",
    strategy: "Build Bring-Your-Own-Credential (BYOC) gateways for enterprise customers + initiate ISV partner discussions.",
    sample: ["Workday", "SAP S/4HANA", "Canva Connect", "Loom Record", "Outreach.io", "Salesloft", "Rippling", "Kustomer"]
  }
};
