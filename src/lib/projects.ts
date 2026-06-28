export type Accent = "gold" | "cyan" | "purple";

export interface DocBlock {
  heading?: string;
  body?: string;
  list?: string[];
  code?: { language: string; code: string };
  callout?: { type: "info" | "warning" | "tip"; text: string };
  table?: { headers: string[]; rows: string[][] };
}

export interface DocSection {
  id: string;
  label: string;
  icon: string;
  title: string;
  description: string;
  content: DocBlock[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: string;
  highlight: string;
  accent: Accent;
  sections: DocSection[];
}

export const projects: Project[] = [
  {
    slug: "memory-forge",
    name: "Brain-Forge",
    tagline: "Cognitive memory platform with 6-tier system, meta-cognitive framework, and live sync",
    category: "Memory System",
    status: "v5.0.0 — Active Development",
    highlight: "1419 nodes · 7467 relations · 57 MCP tools · 79 REST endpoints",
    accent: "purple",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What Brain-Forge is and the problem it solves.",
        content: [
          {
            body: "Brain-Forge is a cognitive memory platform that models memory after human cognition. It gives AI agents a persistent, live-synced memory graph with 6 tiers of memory — from 15-minute working memory to permanent training data — plus a forgetting curve, contradiction detection, and a meta-cognitive framework for self-improvement.",
          },
          {
            heading: "Why It Exists",
            body: "Standard LLMs are stateless — every conversation starts from scratch. Brain-Forge solves this by maintaining a growing semantic graph that agents can recall from, write to, and reason over. The graph currently holds 1,419 nodes with 7,467 relations, ingested from 7 research repos.",
          },
          {
            callout: { type: "info", text: "Brain-Forge is built for the model that uses it most — the memory engine is designed from the perspective of an AI agent managing its own memory, not a human managing a database." },
          },
        ],
      },
      {
        id: "memory-tiers",
        label: "Memory Tiers",
        icon: "🧠",
        title: "6-Tier Cognitive Memory System",
        description: "How memory is organized and how it decays.",
        content: [
          {
            body: "Memory is organized into 6 tiers that model human cognitive memory. Each tier has a different TTL and decay rate. Memories auto-promote to higher tiers as they're recalled more frequently.",
          },
          {
            table: {
              headers: ["Tier", "TTL", "Decay", "Auto-Promote", "Purpose"],
              rows: [
                ["Working", "15 min", "Fast", "→ STM", "Current task context"],
                ["STM", "24 hours", "Medium", "→ Episodic", "Recent interactions"],
                ["Episodic", "30 days", "Slow", "→ Semantic", "Event sequences"],
                ["Semantic", "180 days", "Slow", "→ LTM", "Facts and knowledge"],
                ["LTM", "90 days + sub-levels", "Very slow", "Sub-level 2 @ 5 recalls, 3 @ 15", "Core long-term memory"],
                ["Training", "No decay", "None", "Permanent", "Fine-tuning datasets"],
              ],
            },
          },
          {
            heading: "LTM Sub-Levels",
            body: "Long-term memory has 3 sub-levels that auto-promote based on recall frequency. Level 2 triggers at 5 recalls, level 3 at 15. This mirrors how human memory strengthens with repetition.",
          },
          {
            heading: "Ebbinghaus Forgetting Curve",
            body: "Memory strength decays following the Ebbinghaus formula: R = e^(-t/halfLife) * (1 + ln(recalls+1)). A decay sweep runs every 5 minutes, and nodes below the dormant threshold (0.01) are marked dormant and excluded from recall.",
            code: { language: "typescript", code: "// Decay calculation\nconst halfLife = TIER_HALF_LIVES[node.tier]; // ms\nconst elapsed = Date.now() - node.lastAccess;\nconst recallBonus = 1 + Math.log(node.recalls + 1);\nconst strength = Math.exp(-elapsed / halfLife) * recallBonus;\nconst isDormant = strength < 0.01;" },
          },
        ],
      },
      {
        id: "metacog",
        label: "Meta-Cognitive",
        icon: "🤔",
        title: "Meta-Cognitive Framework",
        description: "SICOG self-improvement, episodic memory, and adversarial augmentation.",
        content: [
          {
            body: "The meta-cognitive framework gives the memory system the ability to reflect on its own recall quality. It was ported from mwasifanwar/meta-cognitive-learning_system as the architectural foundation.",
          },
          {
            heading: "Three Components",
            list: [
              "**SICOG (Self-Improvement via Cognition)** — Chain-of-Deliberation and Chain-of-Thought with self-consistency voting",
              "**Episodic Memory** — Stores event sequences with temporal markers for replay and learning",
              "**Adversarial Augmentation** — Generates counterarguments to existing memories to test robustness",
            ],
          },
          {
            heading: "PyTorch Sidecar",
            body: "A Python FastAPI sidecar (port 3211) runs three neural networks for meta-cognitive operations. It gracefully falls back to cosine similarity + heuristics when PyTorch is unavailable.",
            table: {
              headers: ["Network", "Architecture", "Purpose"],
              rows: [
                ["RelevanceNet", "MLP 384→128→64→1", "Score relevance of recalled memories to a query"],
                ["ReflectionLSTM", "LSTM-64 + linear head", "Evaluate recall quality over time"],
                ["MetaLearner", "MAML-style few-shot", "Adapt scoring to new domains with minimal examples"],
              ],
            },
          },
          {
            callout: { type: "tip", text: "The MetaCogClient (TypeScript) caches availability for 30s and falls back transparently — if the Python sidecar is down, the system still works with reduced accuracy." },
          },
        ],
      },
      {
        id: "cognitive-features",
        label: "Cognitive Features",
        icon: "⚙️",
        title: "Cognitive Memory Features",
        description: "Contradiction detection, procedural memory, compression, feedback loops.",
        content: [
          {
            heading: "Contradiction Detection",
            body: "When a new memory is stored, the system checks for semantic contradictions with existing memories. Detection uses temporal regex patterns + embedding similarity > 0.7 + Jaccard overlap < 0.4. When a contradiction is found, the older fact is auto-invalidated.",
          },
          {
            heading: "Procedural Memory",
            body: "Stores step-by-step procedures with trigger keywords and success tracking. Agents can recall procedures by describing a task, and mark procedures as successful or failed for future improvement.",
            code: { language: "typescript", code: "// Store a procedure\nforge.rememberProcedure(\n  'Deploy to Vercel',\n  ['Build project', 'Set env vars', 'Run vercel deploy'],\n  ['deploy', 'vercel', 'production']\n);\n\n// Recall by task description\nconst proc = forge.recallProcedure('How do I deploy?');" },
          },
          {
            heading: "Memory Compression",
            body: "Compresses N nodes into 1 summary node while preserving source references. This prevents graph bloat while keeping the original memories accessible via the summary node's source links.",
          },
          {
            heading: "Retrieval Feedback Loop",
            body: "Every recall tracks usefulCount and rejectedCount. The system uses this feedback to self-tune recall quality — memories that are frequently rejected in context get lower priority in future recalls.",
          },
          {
            heading: "Cross-Session Continuity",
            body: "Session markers and checkpoints allow an agent to resume interrupted work. The system can reconstruct context from a previous session by replaying session-scoped memories.",
          },
        ],
      },
      {
        id: "api",
        label: "API Reference",
        icon: "🔌",
        title: "API & Tools",
        description: "MCP tools, REST endpoints, and the Action Ledger.",
        content: [
          {
            heading: "MCP Tools (57)",
            body: "The MCP server exposes 57 tools via stdio for direct LLM integration. Categories include memory CRUD, tier management, training injection, cognitive extras, and meta-cognitive operations.",
          },
          {
            heading: "REST API (79 endpoints)",
            body: "An Express server on port 8199 provides 79 REST endpoints covering memory operations, health audits, knowledge hub, confidence scoring, timeline, and dataset catalog.",
            code: { language: "bash", code: "# Recall memories\nGET http://localhost:8199/api/memory/recall?q=deployment&limit=5\n\n# Store a memory\nPOST http://localhost:8199/api/memory/remember\n{ \"content\": \"...\", \"type\": \"fact\", \"tier\": \"stm\" }\n\n# Health audit\nGET http://localhost:8199/api/memory/health\n\n# Find patterns\nGET http://localhost:8199/api/memory/patterns" },
          },
          {
            heading: "Action Ledger",
            body: "Every mutation is logged to an immutable JSONL append-only ledger at data/graph/action-ledger.jsonl. Writes are buffered with a 500ms flush to balance durability and performance. The ledger can be queried and stats can be retrieved via API.",
          },
          {
            heading: "Self-Rewriting Memory (Upsert)",
            body: "When storing a memory, the system first searches for existing nodes by content similarity (threshold 0.55). If found, it merges — re-embedding, re-extracting entities, and bumping the version — instead of creating a duplicate.",
          },
        ],
      },
      {
        id: "storage",
        label: "Storage Backends",
        icon: "💾",
        title: "Storage Backends",
        description: "R2, Fast.io, Supabase, and local JSON graph.",
        content: [
          {
            body: "Brain-Forge supports multiple storage backends. The default is a local JSON graph file, with optional cloud backends for durability and distribution.",
          },
          {
            table: {
              headers: ["Backend", "Type", "Use Case", "Free Tier"],
              rows: [
                ["Local JSON", "File", "Default — fast, no setup", "Unlimited"],
                ["Cloudflare R2", "S3-compatible", "Durable backups, large objects", "10GB / 1M Class A ops / zero egress"],
                ["Fast.io", "MCP", "Dataset distribution to Android-Forge", "Free tier"],
                ["Supabase", "Postgres", "Structured queries, RLS", "500MB DB"],
              ],
            },
          },
          {
            heading: "R2 Usage Tracking",
            body: "R2 storage includes per-key object size tracking with durable monthly persistence to r2-usage.json. Warnings trigger at 80% of free tier limits. The listObjects call serves as source-of-truth for actual usage.",
          },
          {
            heading: "FastIODatasetManager",
            body: "Unified dataset creation from memory graph, local files, or URLs. Supports 5 formats (instruction-tuning, conversations, context-completion, qa-pairs, raw-training) and ingests to Fast.io workspaces with manifest tracking.",
          },
        ],
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        icon: "🛠️",
        title: "Technology Stack",
        description: "Languages, frameworks, and infrastructure.",
        content: [
          {
            table: {
              headers: ["Layer", "Technology", "Details"],
              rows: [
                ["Core Engine", "TypeScript / Node.js", "~2095 lines LiveMemorySync"],
                ["Meta-Cognitive", "Python / FastAPI", "Port 3211 sidecar"],
                ["Neural Networks", "PyTorch", "RelevanceNet, ReflectionLSTM, MetaLearner"],
                ["Inference", "OpenVINO + NNCF", "Intel iGPU quantized inference"],
                ["Protocol", "MCP (stdio)", "57 tools"],
                ["REST API", "Express", "Port 8199, 79 endpoints"],
                ["Storage", "Cloudflare R2 / Fast.io / Supabase", "Multi-backend"],
                ["Testing", "Custom stress suite", "165 assertions"],
              ],
            },
          },
          {
            callout: { type: "info", text: "Hardware target: Intel i3-1215U (6c/8t), Intel UHD Graphics iGPU (~2GB shared), Python 3.12.10. Training on CPU, inference on iGPU via OpenVINO." },
          },
        ],
      },
      {
        id: "status",
        label: "Status",
        icon: "📊",
        title: "Current Status",
        description: "Live metrics and roadmap.",
        content: [
          {
            table: {
              headers: ["Metric", "Value"],
              rows: [
                ["Graph nodes", "1,419"],
                ["Graph relations", "7,467"],
                ["MCP tools", "57"],
                ["REST endpoints", "79"],
                ["Stress test assertions", "165 (all passing)"],
                ["Datasets ingested", "7 research repos"],
                ["Training examples", "3,274"],
                ["Version", "5.0.0"],
              ],
            },
          },
          {
            heading: "Roadmap",
            list: [
              "Evaluate khoj-ai/khoj for self-hosted search patterns",
              "Evaluate ItsWambarYT/ai-brain for auto-build-from-git-repos pattern",
              "Cognee and Mapify integration for expanded knowledge graph",
              "Supabase Realtime for live graph sync across instances",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ai-business",
    name: "Business-Forge",
    tagline: "Multi-agent orchestration with automation, dashboards, and department management",
    category: "AI Infrastructure",
    status: "Active Development",
    highlight: "15+ agents · 6 departments · live monitoring",
    accent: "gold",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What Business-Forge is and the problem it solves.",
        content: [
          {
            body: "Business-Forge is the operational platform for the Forge ecosystem. It orchestrates multiple specialized AI agents across departments, with a real-time dashboard, automation pipelines, memory-backed knowledge graph, and plugin architecture.",
          },
          {
            heading: "Core Problem",
            body: "Running AI operations at scale requires coordination — dispatching tasks to the right agent, monitoring execution, handling failures, and maintaining context. Business-Forge provides this orchestration layer.",
          },
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        icon: "🏗️",
        title: "System Architecture",
        description: "How the platform is structured.",
        content: [
          {
            body: "The platform runs as a Node.js server with Express for the API layer. Agents are dispatched as background processes with WebSocket-based log streaming to a real-time dashboard.",
          },
          {
            heading: "Components",
            list: [
              "**Agent Dispatcher** — Routes tasks to specialized agents based on department and capability",
              "**WebSocket Log Stream** — Real-time execution logs piped to the dashboard",
              "**Plugin System** — Extensible architecture for custom agent capabilities",
              "**Cron Scheduler** — Time-based automation pipelines",
              "**Memory Integration** — Brain-Forge knowledge graph for agent context",
            ],
          },
        ],
      },
      {
        id: "agents",
        label: "Agents",
        icon: "🤖",
        title: "Agent System",
        description: "How agents are organized and dispatched.",
        content: [
          {
            body: "Agents are organized into 6 departments, each with specialized capabilities. The dispatcher routes tasks based on agent availability and capability matching.",
          },
          {
            table: {
              headers: ["Department", "Agent Count", "Key Capabilities"],
              rows: [
                ["Research", "3", "Web scraping, data analysis, summarization"],
                ["Content", "2", "Blog generation, social media, copywriting"],
                ["Development", "4", "Code generation, testing, deployment"],
                ["Operations", "3", "Monitoring, alerting, maintenance"],
                ["Analytics", "2", "Metrics, reporting, forecasting"],
                ["Support", "1+", "Customer response, FAQ automation"],
              ],
            },
          },
          {
            callout: { type: "info", text: "Agents run as background processes with full stdout/stderr capture. The WebSocket stream pipes logs to the dashboard in real-time for live monitoring." },
          },
        ],
      },
      {
        id: "automation",
        label: "Automation",
        icon: "⚡",
        title: "Automation Pipelines",
        description: "Cron scheduling and the Paperclip processing pipeline.",
        content: [
          {
            heading: "Cron Scheduling",
            body: "Time-based automation pipelines run on configurable cron schedules. Each pipeline chains multiple agents together — output from one feeds into the next.",
          },
          {
            heading: "Paperclip Pipeline",
            body: "A data processing pipeline that handles document ingestion, OCR, entity extraction, and knowledge graph insertion. Named for its clip-and-process workflow.",
          },
          {
            code: { language: "typescript", code: "// Example automation pipeline\nconst pipeline = {\n  name: 'daily-content',\n  schedule: '0 9 * * *',\n  steps: [\n    { agent: 'research-agent', task: 'find-trending-topics' },\n    { agent: 'content-agent', task: 'write-blog-post' },\n    { agent: 'ops-agent', task: 'publish-and-deploy' },\n  ],\n};" },
          },
        ],
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        icon: "🛠️",
        title: "Technology Stack",
        description: "Infrastructure and frameworks.",
        content: [
          {
            table: {
              headers: ["Layer", "Technology"],
              rows: [
                ["Runtime", "Node.js"],
                ["API", "Express"],
                ["Automation", "Playwright"],
                ["Database", "SQLite"],
                ["Real-time", "WebSocket"],
                ["Scheduling", "Cron"],
              ],
            },
          },
        ],
      },
      {
        id: "status",
        label: "Status",
        icon: "📊",
        title: "Current Status",
        description: "Live metrics.",
        content: [
          {
            table: {
              headers: ["Metric", "Value"],
              rows: [
                ["Active agents", "15+"],
                ["Departments", "6"],
                ["Automation pipelines", "Daily + event-triggered"],
                ["Status", "Active Development"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "dotnet-app",
    name: "Chat-Forge",
    tagline: "WPF desktop AI assistant with local LLM, cloud providers, MCP, and swarm coordination",
    category: "Desktop Application",
    status: "v2.0.0 — Active Development",
    highlight: "Local LLM + 4 cloud providers + MCP tool use + swarm",
    accent: "cyan",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What Chat-Forge is and the problem it solves.",
        content: [
          {
            body: "Chat-Forge is a Windows desktop application built with .NET 8 and WPF. It serves as a local-first AI assistant that can run local LLMs via llama.cpp, connect to 4 cloud providers, use MCP for tool extensibility, and coordinate across multiple machines via swarm.",
          },
          {
            heading: "Design Philosophy",
            body: "Local-first — the app defaults to local inference for privacy and zero API cost. Cloud providers are fallbacks, not the primary path. All data stays on the machine unless explicitly synced.",
          },
        ],
      },
      {
        id: "providers",
        label: "LLM Providers",
        icon: "🧩",
        title: "LLM Provider Integration",
        description: "Local and cloud model backends.",
        content: [
          {
            body: "Chat-Forge supports 5 LLM backends, with automatic fallback from local to cloud when the local model is unavailable or the task requires more capability.",
          },
          {
            table: {
              headers: ["Provider", "Type", "Models", "Use Case"],
              rows: [
                ["llama.cpp", "Local", "GGUF (any)", "Privacy, zero cost, offline"],
                ["OpenAI", "Cloud", "GPT-4o, GPT-5", "High-quality reasoning"],
                ["Anthropic", "Cloud", "Claude 4", "Long context, coding"],
                ["Google", "Cloud", "Gemini", "Multimodal"],
                ["OpenRouter", "Cloud", "100+ models", "Model routing"],
              ],
            },
          },
        ],
      },
      {
        id: "mcp",
        label: "MCP Protocol",
        icon: "🔌",
        title: "MCP Tool Integration",
        description: "Model Context Protocol for extensibility.",
        content: [
          {
            body: "Chat-Forge implements the Model Context Protocol (MCP) for tool use. This allows the assistant to call external tools — memory operations, web search, file operations, code execution — through a standardized protocol.",
          },
          {
            heading: "How MCP Works",
            body: "MCP servers expose tools via a JSON-RPC protocol. Chat-Forge connects to MCP servers (like Brain-Forge) and makes their tools available to the LLM as callable functions.",
            code: { language: "csharp", code: "// MCP tool call flow\nvar mcpClient = new McpClient(\"brain-forge\");\nvar tools = await mcpClient.ListTools();\n// tools: [\"memory_recall\", \"memory_remember\", \"memory_stats\", ...]\n\nvar result = await mcpClient.CallTool(\n  \"memory_recall\",\n  new { query = \"deployment procedure\", limit = 5 }\n);" },
          },
        ],
      },
      {
        id: "swarm",
        label: "Swarm",
        icon: "🐝",
        title: "Swarm Coordination",
        description: "Multi-machine agent coordination.",
        content: [
          {
            body: "Swarm mode allows multiple Chat-Forge instances across different machines to coordinate. Tasks can be distributed, results aggregated, and context shared via Brain-Forge's memory graph.",
          },
          {
            heading: "Swarm Architecture",
            list: [
              "**Coordinator** — One instance dispatches tasks to workers",
              "**Workers** — Other instances pick up tasks and report results",
              "**Shared Memory** — Brain-Forge graph provides cross-machine context",
              "**Health Checks** — Heartbeat monitoring detects offline workers",
            ],
          },
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        icon: "🏗️",
        title: "Application Architecture",
        description: "MVVM pattern and service layer.",
        content: [
          {
            body: "Built on .NET 8 with WPF. Uses CommunityToolkit.Mvvm for the MVVM pattern, Markdig for markdown rendering, and Newtonsoft.Json for serialization.",
          },
          {
            table: {
              headers: ["Layer", "Technology"],
              rows: [
                ["UI", "WPF (.NET 8)"],
                ["Pattern", "MVVM (CommunityToolkit.Mvvm)"],
                ["Markdown", "Markdig"],
                ["Serialization", "Newtonsoft.Json"],
                ["Local LLM", "llama.cpp (native interop)"],
                ["Cloud", "REST API clients"],
                ["Protocol", "MCP (JSON-RPC)"],
              ],
            },
          },
        ],
      },
      {
        id: "status",
        label: "Status",
        icon: "📊",
        title: "Current Status",
        description: "Version info.",
        content: [
          {
            table: {
              headers: ["Metric", "Value"],
              rows: [
                ["Version", "2.0.0"],
                ["Services", "28"],
                ["LLM providers", "5 (1 local + 4 cloud)"],
                ["MCP tools", "Full Brain-Forge integration"],
                ["Status", "Active Development"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "webchat-forge",
    name: "WebChat-Forge",
    tagline: "Web chat with dual LLM backends, knowledge hub, and confidence scoring",
    category: "Web Chat",
    status: "Active Development",
    highlight: "Dual backend + knowledge hub + confidence + 5-panel sidebar",
    accent: "cyan",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What WebChat-Forge is.",
        content: [
          {
            body: "WebChat-Forge is a web-based chat interface for the Forge ecosystem. It provides SSE streaming, dual LLM backends (Kilo via OpenRouter + Termux via llama.cpp), Brain-Forge context injection, and a 5-panel sidebar with memory, knowledge, datasets, timeline, and system info.",
          },
          {
            body: "When deployed to Vercel, WebChat-Forge operates as a serverless function that tunnels through Brain-Forge's REST API for memory and system access. When running locally, it references Headless-Forge — the unified headless CLI that provides direct memory access, model launching (OpenVINO + llama.cpp), Termux device management, and direct filesystem/terminal operations.",
          },
        ],
      },
      {
        id: "backends",
        label: "Dual Backends",
        icon: "🔀",
        title: "Dual LLM Backend System",
        description: "How two LLM backends are switched.",
        content: [
          {
            body: "The chat supports two backends that can be switched per-message. Each backend streams tokens via SSE for real-time output.",
          },
          {
            table: {
              headers: ["Backend", "Provider", "Model", "Use Case"],
              rows: [
                ["Kilo", "OpenRouter", "gpt-4o-mini", "High quality, cloud"],
                ["Termux", "llama.cpp", "Local GGUF", "Private, offline, mobile"],
              ],
            },
          },
          {
            heading: "SSE Streaming",
            body: "Both backends use Server-Sent Events for token-by-token streaming. The server proxies the upstream stream and emits SSE events: start, token, done, error.",
            code: { language: "typescript", code: "// SSE event format\nevent: start\ndata: {\"backend\":\"kilo\",\"memoryContextInjected\":true}\n\nevent: token\ndata: {\"token\":\"Hello\"}\n\nevent: done\ndata: {\"confidence\":0.85,\"confidenceLabel\":\"high\"}" },
          },
        ],
      },
      {
        id: "context",
        label: "Context Injection",
        icon: "🧠",
        title: "Memory Context Injection",
        description: "How Brain-Forge context is injected into chat.",
        content: [
          {
            body: "Before sending a message to the LLM, the server queries Brain-Forge via recallReadOnly() (no graph mutation) and the knowledge hub for relevant context. This context is prepended to the system prompt.",
          },
          {
            heading: "Context Sources",
            list: [
              "**Brain-Forge Memory** — recallReadOnly() fetches up to 8 relevant memories",
              "**Knowledge Hub** — autoSelect() searches 8 hubs for relevant entries",
              "**Conversation History** — Previous messages in the session",
            ],
          },
          {
            callout: { type: "info", text: "Conversations are persisted to Brain-Forge's STM tier after completion, so context carries across sessions." },
          },
        ],
      },
      {
        id: "panels",
        label: "Sidebar Panels",
        icon: "📋",
        title: "5-Panel Sidebar",
        description: "The sidebar tabs and what they show.",
        content: [
          {
            table: {
              headers: ["Tab", "Content", "Source"],
              rows: [
                ["Memory", "Recalled memories, stats, health", "Brain-Forge API"],
                ["Knowledge", "Knowledge hub search results", "KnowledgeHub (8 hubs, 40+ entries)"],
                ["Datasets", "Dataset catalog with categories", "DatasetCatalog (27 datasets)"],
                ["Timeline", "Event history with levels", "Timeline service"],
                ["System", "Platform info, backend status", "System info endpoint"],
              ],
            },
          },
          {
            heading: "Confidence Badge",
            body: "Each response includes a confidence score displayed as a badge. The score is calculated from query-response similarity, knowledge hub match count, and response length.",
          },
        ],
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        icon: "🛠️",
        title: "Technology Stack",
        description: "Stack overview.",
        content: [
          {
            table: {
              headers: ["Layer", "Technology"],
              rows: [
                ["Server", "Express / TypeScript"],
                ["Streaming", "SSE (Server-Sent Events)"],
                ["Kilo Backend", "OpenRouter API"],
                ["Termux Backend", "llama.cpp OpenAI-compatible API"],
                ["Memory", "Brain-Forge REST API proxy"],
                ["UI", "Vanilla JS + Neon Noir glassmorphism"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "android-forge",
    name: "Android-Forge",
    tagline: "Termux thin client + Vulkan ARM LoRA trainer for on-device fine-tuning",
    category: "Mobile",
    status: "Active Development",
    highlight: "Vulkan LoRA on Snapdragon 8 Gen 2/3 + REST thin client",
    accent: "gold",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What Android-Forge is.",
        content: [
          {
            body: "Android-Forge provides two Python scripts for Android devices: a Termux thin client that connects to Brain-Forge via REST API, and a Vulkan LoRA trainer that fine-tunes models on Snapdragon GPUs.",
          },
          {
            heading: "Design Principle",
            body: "Thin client only — the memory engine stays on the main machine. Termux accesses it via REST API to minimize device memory usage and keep the graph authoritative.",
          },
        ],
      },
      {
        id: "thin-client",
        label: "Thin Client",
        icon: "📱",
        title: "Termux Thin Client",
        description: "REST client for Brain-Forge.",
        content: [
          {
            body: "memforge_client.py provides a REPL and command interface for Brain-Forge operations from an Android device via Termux. Devices register with Headless-Forge, which acts as the connection manager and routes chat requests to the device's local LLM.",
          },
          {
            heading: "Available Commands",
            list: [
              "**recall** — Query memory graph for relevant memories",
              "**remember** — Store a new memory",
              "**stats** — Get graph statistics (node count, tier breakdown)",
              "**health** — Run health audit on the memory graph",
              "**patterns** — Find recurring patterns in memories",
              "**upsert** — Store or update memory with dedup",
              "**chat** — Send a message to the web chat server",
              "**repl** — Interactive REPL mode",
            ],
          },
          {
            code: { language: "python", code: "# Termux usage\npython memforge_client.py recall \"deployment procedure\"\npython memforge_client.py remember \"New finding\" --type fact --tier stm\npython memforge_client.py stats\npython memforge_client.py repl" },
          },
        ],
      },
      {
        id: "vulkan",
        label: "Vulkan Trainer",
        icon: "🎮",
        title: "Vulkan LoRA Trainer",
        description: "On-device LoRA fine-tuning with GPU acceleration.",
        content: [
          {
            body: "vulkan_trainer.py enables LoRA fine-tuning of GGUF models on Android devices with Vulkan-compatible GPUs. It builds llama.cpp with Vulkan support and runs training directly on the device GPU.",
          },
          {
            heading: "Supported GPUs",
            table: {
              headers: ["GPU", "Chipset", "Device", "Vulkan Support"],
              rows: [
                ["Adreno 740", "Snapdragon 8 Gen 2", "Galaxy S23, OnePlus 11", "Full"],
                ["Adreno 750", "Snapdragon 8 Gen 3", "Galaxy S24, OnePlus 12", "Full"],
              ],
            },
          },
          {
            heading: "Build Configuration",
            body: "llama.cpp is built with LLAMA_VULKAN=ON, ARMv8.2-A architecture with dotprod extension. LoRA adapters are trained with --n-gpu-layers 99 to offload all layers to the GPU.",
            code: { language: "bash", code: "# Vulkan build flags\ncmake .. \\\n  -DGGML_VULKAN=ON \\\n  -DCMAKE_TARGET_ARCHITECTURE=armv8.2-a+dotprod \\\n  -DLLAMA_VULKAN=ON\n\n# Train with GPU offload\n./llama-finetune \\\n  --model base.gguf \\\n  --lora-out adapter.bin \\\n  --n-gpu-layers 99" },
          },
          {
            heading: "Pipeline",
            body: "Full pipeline: build → export → train → merge → serve. Datasets are downloaded from Fast.io workspaces. Root access enables performance optimization scripts.",
          },
        ],
      },
      {
        id: "root",
        label: "Root Detection",
        icon: "🔐",
        title: "Root Detection",
        description: "How root is detected and used for performance.",
        content: [
          {
            body: "setup.sh detects root access via su, Magisk, or KernelSU. When root is available, performance optimization scripts are applied — CPU governor, GPU frequency, thermal limits.",
          },
          {
            table: {
              headers: ["Method", "Detection", "Performance Script"],
              rows: [
                ["su binary", "which su", "CPU governor + GPU freq"],
                ["Magisk", "/data/adb/magisk", "Magisk module overlay"],
                ["KernelSU", "/data/adb/ksu", "Kernel-level tuning"],
              ],
            },
          },
          {
            callout: { type: "warning", text: "Root is optional — the trainer works without root but with reduced performance due to thermal throttling and CPU frequency limits." },
          },
        ],
      },
    ],
  },
  {
    slug: "training-forge",
    name: "Training-Forge",
    tagline: "Memory-driven LLM fine-tuning with OpenVINO inference on Intel hardware",
    category: "Training",
    status: "Active Development",
    highlight: "3,274 training examples + OpenVINO iGPU inference",
    accent: "purple",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What Training-Forge is.",
        content: [
          {
            body: "Training-Forge is the fine-tuning platform for the Forge ecosystem. It uses Brain-Forge memory data as training sources and runs on Intel hardware — training on CPU with PyTorch, inferencing on iGPU via OpenVINO.",
          },
          {
            heading: "Data Source",
            body: "Training data is exported from Brain-Forge's 1,419-node memory graph. 5 dataset formats are generated from the graph, producing 3,274 total training examples.",
          },
        ],
      },
      {
        id: "pipeline",
        label: "Pipeline",
        icon: "🔄",
        title: "Training Pipeline",
        description: "The 5-step fine-tuning pipeline.",
        content: [
          {
            body: "The pipeline takes memories from Brain-Forge and produces a deployed, quantized model ready for inference on Intel iGPU.",
          },
          {
            table: {
              headers: ["Step", "Action", "Tool"],
              rows: [
                ["1. Export", "Brain-Forge memories → 5 JSONL formats", "FastIODatasetManager"],
                ["2. Upload", "Push datasets to Fast.io workspace", "Fast.io MCP"],
                ["3. Train", "LoRA fine-tuning on CPU", "PyTorch"],
                ["4. Quantize", "Compress for iGPU inference", "NNCF"],
                ["5. Deploy", "Load in OpenVINO inference engine", "OpenVINO"],
              ],
            },
          },
          {
            heading: "Dataset Formats",
            table: {
              headers: ["Format", "Records", "Use Case"],
              rows: [
                ["Instruction-tuning", "1,393", "SFT — instruction → response"],
                ["Context-completion", "1,346", "Prefix completion training"],
                ["Q&A pairs", "551", "Question answering"],
                ["Raw training", "584", "Unstructured text chunks"],
                ["Conversations", "0", "Multi-turn dialogue (empty)"],
              ],
            },
          },
        ],
      },
      {
        id: "hardware",
        label: "Hardware",
        icon: "💻",
        title: "Hardware Profile",
        description: "Intel hardware constraints and optimization.",
        content: [
          {
            table: {
              headers: ["Component", "Specification"],
              rows: [
                ["CPU", "Intel i3-1215U (6 cores / 8 threads)"],
                ["GPU", "Intel UHD Graphics (~2GB shared)"],
                ["Python", "3.12.10"],
                ["Training", "CPU (PyTorch)"],
                ["Inference", "iGPU (OpenVINO + NNCF)"],
              ],
            },
          },
          {
            callout: { type: "warning", text: "IPEX is being retired (March 2026 EOL) — OpenVINO is the replacement. PyTorch native XPU requires Intel Arc/Iris Xe, which UHD Graphics is not compatible with." },
          },
        ],
      },
    ],
  },
  {
    slug: "blog-forge",
    name: "Blog-Forge",
    tagline: "AI-powered personal blog with 3D neural memory graph visualization",
    category: "Blog",
    status: "Live — kc.kevcspot.com",
    highlight: "3D neural graph + AI daily posts + Supabase CMS",
    accent: "cyan",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🔭",
        title: "Overview",
        description: "What Blog-Forge is.",
        content: [
          {
            body: "Blog-Forge is a personal blog at kc.kevcspot.com built with Next.js 16, Tailwind v4, and MDX. It features a blog-style feed with post tiering, AI-generated daily posts, a CMS admin panel, and a 3D neural memory graph visualization.",
          },
        ],
      },
      {
        id: "neural-graph",
        label: "Neural Graph",
        icon: "🌐",
        title: "3D Neural Memory Graph",
        description: "Three.js brain visualization in the CMS.",
        content: [
          {
            body: "The CMS dashboard includes a 3D neural memory graph built with Three.js and React Three Fiber. It models an actual brain with 6 regions corresponding to memory tiers, neurons positioned by type, and synapse pulse animations.",
          },
          {
            heading: "Visualization Features",
            list: [
              "**6 brain regions** — One per memory tier (working, STM, episodic, semantic, LTM, training)",
              "**LTM sub-levels** — Wireframe rings for sub-levels 1/2/3",
              "**Synapse animations** — Pulse effects along relation edges",
              "**Dormant nodes** — Dimmed neurons below decay threshold",
              "**Star field** — Background spatial context",
              "**OrbitControls** — Full 3D camera navigation",
              "**Recall query** — Triggers pathway activation animation",
              "**Detail + Stats panels** — Click neurons for node info",
            ],
          },
          {
            callout: { type: "info", text: "Graph data is served from /api/memory-graph endpoint, snapshot from Brain-Forge's 1,419-node graph." },
          },
        ],
      },
      {
        id: "cms",
        label: "CMS",
        icon: "📝",
        title: "CMS & AI Generation",
        description: "Admin panel, AI content, and Supabase integration.",
        content: [
          {
            heading: "Admin Panel",
            body: "Login-protected dashboard with post list, AI generation trigger, and manual editor. Two tabs: Content and Neural Graph.",
          },
          {
            heading: "AI Content Generation",
            body: "Daily AI-generated blog posts via OpenRouter (gpt-4o-mini). A cron endpoint triggers generation at 9 AM daily, which generates a post, saves to Supabase, commits to GitHub, and triggers a Vercel redeploy.",
          },
          {
            heading: "Supabase Integration",
            body: "Blog posts and project updates are stored in Supabase (blog_posts + project_updates tables with RLS). The data layer reads from Supabase first, falling back to JSON files. ISR (5-min revalidation) with on-demand revalidatePath ensures content freshness.",
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        icon: "🎨",
        title: "Neon Noir Design System",
        description: "Visual design language.",
        content: [
          {
            table: {
              headers: ["Element", "Value"],
              rows: [
                ["Background", "#08080c (near-black)"],
                ["Gold accent", "#e0a82e"],
                ["Cyan accent", "#19e4d4"],
                ["Display font", "Unbounded"],
                ["Body font", "Outfit"],
                ["Mono font", "Space Mono"],
                ["Cards", "Glassmorphism"],
                ["Navbar", "Foldertab with underglow"],
              ],
            },
          },
        ],
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        icon: "🛠️",
        title: "Technology Stack",
        description: "Framework and infrastructure.",
        content: [
          {
            table: {
              headers: ["Layer", "Technology"],
              rows: [
                ["Framework", "Next.js 16.2.9 (Turbopack)"],
                ["UI", "React 19 + Tailwind v4"],
                ["3D", "Three.js + R3F + Drei"],
                ["CMS", "Supabase (Postgres + RLS)"],
                ["AI", "OpenRouter (gpt-4o-mini)"],
                ["Deploy", "Vercel"],
                ["Domain", "kc.kevcspot.com"],
              ],
            },
          },
        ],
      },
    ],
  },
  {
    slug: "headless-forge",
    name: "Headless-Forge",
    tagline: "Unified headless CLI controlling OpenVINO, llama.cpp, Termux, memory engine, and system bridge",
    category: "Infrastructure",
    status: "Active Development",
    highlight: "Single control point · OpenVINO + llama.cpp + Termux · Direct memory + filesystem",
    accent: "gold",
    sections: [
      {
        id: "overview",
        label: "Overview",
        icon: "🖥️",
        title: "Overview",
        description: "What Headless-Forge is.",
        content: [
          {
            body: "Headless-Forge is a single local server that acts as the control point for the entire AI stack. What you type in WebChat enters the headless CLI, and the output is rendered back on the WebChat interface. No cloud round-trips, no tunneling — direct access to filesystem, terminal, memory engine, and inference engines.",
          },
          {
            body: "The local machine is responsible for managing Android/Termux device connections. Devices register themselves with the headless CLI, which tracks them and routes chat requests to their local LLMs.",
          },
        ],
      },
      {
        id: "architecture",
        label: "Architecture",
        icon: "🏗️",
        title: "Architecture",
        description: "How everything connects through one process.",
        content: [
          {
            heading: "Single Process, Multiple Capabilities",
            body: "Headless-Forge combines memory engine (direct import), system bridge (direct fs/terminal), model launcher (OpenVINO + llama.cpp + Termux), knowledge hub, MCP server, and the WebChat frontend — all in one process on port 8198.",
          },
          {
            table: {
              headers: ["Component", "Access Mode", "Description"],
              rows: [
                ["Memory Engine", "Direct import", "Brain-Forge live memory sync — no HTTP proxy"],
                ["System Bridge", "Direct fs/exec", "Terminal, filesystem, symlinks — no token needed"],
                ["Model Launcher", "Subprocess", "OpenVINO GenAI + llama.cpp lifecycle management"],
                ["Termux Registry", "REST API", "Android devices register, heartbeat, chat routing"],
                ["MCP Server", "stdio / HTTP", "20+ tools exposed for MCP clients"],
                ["WebChat Frontend", "Static serve", "Neon Noir UI served from /public"],
              ],
            },
          },
        ],
      },
      {
        id: "engines",
        label: "Model Launcher",
        icon: "🚀",
        title: "Inference Engine Management",
        description: "Launch and control OpenVINO, llama.cpp, and Termux models.",
        content: [
          {
            heading: "OpenVINO GenAI",
            body: "Launches openvino_chat.py as a subprocess communicating via JSON-lines on stdin/stdout. Auto-detects available devices (GPU > NPU > CPU). Supports OpenVINO IR, ONNX, and GGUF formats.",
          },
          {
            heading: "llama.cpp",
            body: "Launches llama-server as an OpenAI-compatible HTTP endpoint. Supports GPU layer offloading, custom context sizes, and thread configuration.",
          },
          {
            table: {
              headers: ["Engine", "Backend", "Protocol", "Device"],
              rows: [
                ["OpenVINO GenAI", "openvino_chat.py", "stdin/stdout JSON-lines", "Intel iGPU / CPU"],
                ["llama.cpp", "llama-server", "OpenAI HTTP", "CPU"],
                ["Termux", "Device registry", "REST API", "Snapdragon Adreno 740/750"],
              ],
            },
          },
          {
            heading: "Slash Commands",
            code: { language: "bash", code: "/openvino D:\\models\\phi3      # launch OpenVINO\n/llama model.gguf 8080      # launch llama.cpp\n/engines                    # list running engines\n/engines stop openvino-1     # stop an engine\n/termux                     # list Termux devices\n/termux register pixel 192.168.1.5 8080" },
          },
        ],
      },
      {
        id: "termux",
        label: "Termux Registry",
        icon: "📱",
        title: "Termux Device Management",
        description: "How Android devices connect and are managed.",
        content: [
          {
            body: "Termux devices are thin clients — all memory and inference orchestration stays on the main machine. Devices register themselves with the headless CLI via REST API, and the headless CLI tracks them with heartbeat-based liveness (120s timeout).",
          },
          {
            heading: "Device Lifecycle",
            table: {
              headers: ["State", "Trigger", "Description"],
              rows: [
                ["Register", "POST /api/termux/register", "Device announces name, IP, port, GPU arch, root status"],
                ["Heartbeat", "POST /api/termux/:id/heartbeat", "Updates lastSeen, status, health"],
                ["Stale", "No heartbeat for 120s", "Auto-pruned, marked disconnected"],
                ["Disconnect", "DELETE /api/termux/:id", "Manual removal"],
              ],
            },
          },
          {
            heading: "Vulkan LoRA Training",
            body: "Android devices with Adreno 740/750 GPUs can build llama.cpp with Vulkan support and run LoRA fine-tuning with GPU offloading. Rooted devices get additional performance optimizations: thermal throttling disabled, CPU/GPU governor set to performance, caches dropped.",
          },
        ],
      },
      {
        id: "system-bridge",
        label: "System Bridge",
        icon: "⚡",
        title: "Direct System Access",
        description: "Terminal and filesystem operations with no proxy.",
        content: [
          {
            body: "When running locally, the system bridge provides direct access to the host filesystem and terminal — no token needed, no proxy layer. WebChat slash commands execute directly via Node.js fs module and child_process.exec.",
          },
          {
            table: {
              headers: ["Command", "Operation", "Mode"],
              rows: [
                ["/exec <cmd>", "Terminal execution", "Direct (child_process)"],
                ["/ls <path>", "List directory", "Direct (fs.readdirSync)"],
                ["/read <path>", "Read file", "Direct (fs.readFileSync)"],
                ["/write <path> <content>", "Write file", "Direct (fs.writeFileSync)"],
                ["/mkdir <path>", "Create directory", "Direct (fs.mkdirSync)"],
                ["/symlink <target> <link>", "Create symlink", "Direct (fs.symlinkSync)"],
                ["/rm <path>", "Remove file/dir", "Direct (fs.rmSync)"],
                ["/tree <path> [depth]", "Directory tree", "Direct (fs.readdirSync)"],
              ],
            },
          },
        ],
      },
      {
        id: "mcp",
        label: "MCP Server",
        icon: "🔌",
        title: "MCP Interface",
        description: "Expose all tools via Model Context Protocol.",
        content: [
          {
            body: "Headless-Forge can run as an MCP server using the --mcp flag for stdio communication, or expose tools via HTTP at /api/mcp/tools. This allows any MCP-compatible client (Kilo, Claude Code, etc.) to use the memory engine, system bridge, model launcher, and knowledge hub.",
          },
          {
            heading: "Available MCP Tools",
            table: {
              headers: ["Category", "Tools"],
              rows: [
                ["Memory", "memory_recall, memory_remember, memory_stats, memory_health"],
                ["System", "terminal_exec, file_read, file_write, file_ls, file_mkdir, file_symlink, file_rm"],
                ["Engines", "openvino_launch, llama_launch, engines_list, engine_stop, models_find"],
                ["Termux", "termux_list"],
                ["Knowledge", "knowledge_search"],
                ["Steering", "model_steer"],
              ],
            },
          },
        ],
      },
      {
        id: "tech-stack",
        label: "Tech Stack",
        icon: "📦",
        title: "Technology Stack",
        description: "Framework and infrastructure.",
        content: [
          {
            table: {
              headers: ["Layer", "Technology"],
              rows: [
                ["Runtime", "Node.js 24 + tsx"],
                ["Framework", "Express 4"],
                ["Language", "TypeScript (NodeNext modules)"],
                ["Memory", "Brain-Forge (direct import)"],
                ["Inference", "OpenVINO GenAI + llama.cpp"],
                ["Mobile", "Termux (Python thin client)"],
                ["Protocol", "SSE + REST + MCP stdio"],
                ["Frontend", "Vanilla JS + Neon Noir CSS"],
              ],
            },
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectNames(): Record<string, string> {
  const names: Record<string, string> = {};
  for (const p of projects) names[p.slug] = p.name;
  return names;
}
