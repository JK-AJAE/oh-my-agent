import type { AgentId } from "./types.js";

export const AGENT_IDS: ReadonlySet<AgentId> = new Set([
  "orchestrator",
  "architecture",
  "qa",
  "pm",
  "backend",
  "frontend",
  "mobile",
  "db",
  "debug",
  "docs",
  "tf-infra",
  "explore",
]);

/**
 * Normalize a free-form agent identifier (e.g. "backend-engineer", "qa-agent",
 * "architecture") to its canonical AgentId. Returns undefined when no mapping
 * is found.
 */
export function normalizeAgentId(input: string): AgentId | undefined {
  if (AGENT_IDS.has(input as AgentId)) return input as AgentId;
  const stripped = input.replace(/-agent$/i, "");
  if (AGENT_IDS.has(stripped as AgentId)) return stripped as AgentId;
  const alias = AGENT_CONFIG_ALIASES[input] ?? AGENT_CONFIG_ALIASES[stripped];
  if (alias) {
    const match = alias.find((a) => AGENT_IDS.has(a as AgentId));
    if (match) return match as AgentId;
  }
  return undefined;
}

/**
 * Alias-aware lookup into a per-agent record (preset `agent_defaults` or the
 * user's `agents:` override map). Tries the canonical id as a direct key
 * first, then any key that normalizes to it — so configs written against a
 * former canonical name (e.g. `retrieval:` for `explore`) keep resolving.
 */
export function lookupAgentEntry<T>(
  map: Record<string, T> | undefined,
  agentId: AgentId,
): T | undefined {
  if (!map) return undefined;
  if (map[agentId] !== undefined) return map[agentId];
  for (const [key, value] of Object.entries(map)) {
    if (key !== agentId && normalizeAgentId(key) === agentId) return value;
  }
  return undefined;
}

export const AGENT_CONFIG_ALIASES: Record<string, string[]> = {
  "backend-engineer": ["backend"],
  "frontend-engineer": ["frontend"],
  "db-engineer": ["db"],
  "mobile-engineer": ["mobile"],
  "pm-planner": ["pm"],
  "qa-reviewer": ["qa"],
  "debug-investigator": ["debug"],
  "architecture-reviewer": ["architecture", "architect"],
  "tf-infra-engineer": ["tf-infra", "infra", "terraform"],
  "docs-curator": ["docs", "documentation"],
  "research-explorer": ["explore"],
  explorer: ["explore"],
  retrieval: ["explore"],
};
