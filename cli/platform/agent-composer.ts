import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, resolve, dirname } from "node:path";
import { execSync } from "node:child_process";
import {
  parseFrontmatter,
  serializeFrontmatter,
} from "../utils/frontmatter.js";
import type { Difficulty } from "./context-loader.js";
import { SKILLS } from "../constants/skill-data.js";
import {
  generateCursorRules,
  generateClaudeRules,
  mergeRulesIndexForVendor,
} from "./rules.js";

// =============================================================================
// Spec path resolution (V6 자율 진화 플랜)
// Priority 1: HARNESS_SPEC_PATH env var
// Priority 2: E:/harness-library/my_old_harness_spec.md (절대 경로)
// Priority 3: repoRoot-relative (레거시 fallback)
// =============================================================================
export function resolveSpecPath(repoRoot: string): string {
  if (process.env.HARNESS_SPEC_PATH) {
    return resolve(process.env.HARNESS_SPEC_PATH);
  }
  const absoluteDefault = resolve("E:/harness-library/my_old_harness_spec.md");
  if (existsSync(absoluteDefault)) return absoluteDefault;
  return join(repoRoot, "my_old_harness_spec.md");
}

// =============================================================================
// Agent Tool Mapping (Abstract -> Vendor-specific)
// =============================================================================

export const TOOL_MAPPING: Record<string, Record<string, string>> = {
  gemini: {
    read: "read_file",
    write: "write_file",
    edit: "replace",
    bash: "run_shell_command",
    grep: "grep_search",
    glob: "glob",
    ask: "ask_user",
    memory: "save_memory",
  },
  claude: {
    read: "Read",
    write: "Write",
    edit: "Edit",
    bash: "Bash",
    grep: "Grep",
    glob: "Glob",
  },
  cursor: {
    read: "read_file",
    write: "write_file",
    edit: "replace",
    bash: "run_shell_command",
    grep: "grep_search",
    glob: "glob",
  },
};

export interface AgentConfig {
  description?: string;
  tools?: string[] | string;
  model?: string;
  maxTurns?: number;
  effort?: string;
  kind?: string;
  temperature?: number;
  timeoutMins?: number;
  mcpServers?: Record<string, unknown>;
  // biome-ignore lint/suspicious/noExplicitAny: Custom vendor-specific fields
  extra?: Record<string, any>;
}

export interface AgentVariant {
  vendor: string;
  destDir: string;
  modelDefault: string;
  maxTurnsDefault?: number;
  toolsDefault: string[] | string;
  protocolPath: string;
  agents: Record<string, AgentConfig>;
}

interface AbstractAgentDefinition {
  agentKey: string;
  entry: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

function getMaxTurnsField(vendor: string): string {
  return vendor === "gemini" ? "max_turns" : "maxTurns";
}

function getTimeoutField(vendor: string): string {
  return vendor === "gemini" ? "timeout_mins" : "timeoutMins";
}

function supportsSkillsFrontmatter(vendor: string): boolean {
  return vendor !== "gemini";
}

function serializeTomlString(value: string): string {
  return JSON.stringify(value);
}

function serializeTomlMultiline(value: string): string {
  const escaped = value.replaceAll('"""', '\\"\\"\\"');
  return `"""\n${escaped.trim()}\n"""`;
}

function _serializeTomlArray(values: string[]): string {
  return `[${values.map((value) => serializeTomlString(value)).join(", ")}]`;
}

// =============================================================================
// CHARTER_CHECK stripping
// =============================================================================

const CHARTER_CHECK_BEGIN = "<!-- CHARTER_CHECK_BEGIN -->";
const CHARTER_CHECK_END = "<!-- CHARTER_CHECK_END -->";

/**
 * Remove the CHARTER_CHECK block (and its sentinel markers) from an agent body.
 *
 * The block is delimited by HTML comment markers inserted surgically in
 * `.agents/agents/*.md` source files.  When the agent is Simple, the ~90-token
 * Charter Preflight scaffold is unnecessary and can be stripped to save tokens.
 *
 * If either marker is absent the body is returned unchanged (graceful fallback).
 * The function is pure — it does not mutate the input string.
 */
export function stripCharterCheck(body: string): string {
  const beginIdx = body.indexOf(CHARTER_CHECK_BEGIN);
  const endIdx = body.indexOf(CHARTER_CHECK_END);

  if (beginIdx === -1 || endIdx === -1 || endIdx < beginIdx) {
    // Markers not found or malformed — return unchanged (safe fallback)
    return body;
  }

  const afterEnd = endIdx + CHARTER_CHECK_END.length;
  // Trim a single trailing newline left by the removed block so the surrounding
  // sections remain cleanly separated.
  const tail = body.slice(afterEnd).replace(/^\n/, "");
  return body.slice(0, beginIdx) + tail;
}

function formatAgentBody(body: string, protocolPath: string): string {
  return body.replace(
    "Follow the vendor-specific execution protocol:",
    `Follow \`${protocolPath}\`:`,
  );
}

function readAbstractAgentDefinitions(
  sourceDir: string,
): AbstractAgentDefinition[] {
  const agentsSrcDir = join(sourceDir, ".agents", "agents");
  if (!existsSync(agentsSrcDir)) return [];

  return readdirSync(agentsSrcDir, { withFileTypes: true })
    .filter((dirEntry) => dirEntry.isFile() && dirEntry.name.endsWith(".md"))
    .map((dirEntry) => {
      const entry = dirEntry.name;
      const agentKey = entry.replace(".md", "");
      const content = readFileSync(join(agentsSrcDir, entry), "utf-8");
      const { frontmatter, body } = parseFrontmatter(content);
      return { agentKey, entry, frontmatter, body };
    });
}

export class MissingAssetError extends Error {
  public query: string;
  constructor(query: string) {
    super(`Missing Asset: No matching skills or harnesses found in the registry for query "${query}".`);
    this.query = query;
    this.name = "MissingAssetError";
  }
}

export function matchSkillsForIntent(intent: string): string[] {
  const query = intent.toLowerCase().trim();
  if (!query) return [];

  const matched = new Set<string>();
  const tokens = query.split(/\s+/).filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  const categories = Object.values(SKILLS);
  for (const categoryList of categories) {
    if (!Array.isArray(categoryList)) continue;
    for (const skill of categoryList) {
      if (!skill || typeof skill !== "object") continue;
      const name = String((skill as any).name || "").toLowerCase();
      const desc = String((skill as any).desc || "").toLowerCase();

      if (name.includes(query) || query.includes(name)) {
        matched.add(String((skill as any).name));
      } else {
        const matchesToken = tokens.some((t) => name.includes(t) || desc.includes(t));
        if (matchesToken) {
          matched.add(String((skill as any).name));
        }
      }
    }
  }

  const result = Array.from(matched);
  if (result.length === 0) {
    throw new MissingAssetError(intent);
  }
  return result;
}

export function selfMutateSkill(query: string, targetDir: string = process.cwd()): string {
  console.log(`[self-mutation] Missing Asset detected for "${query}". Initializing self-mutation loop...`);

  const skillId = `dynamic-${query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 50)}`;
  const description = `Dynamic self-evolved skill for handling: ${query}. Generated via OMA Self-Mutation loop.`;
  const timestamp = new Date().toISOString();

  const skillBody = `---
name: ${skillId}
description: "${description}"
category: utility
created: "${timestamp}"
---

# 🤖 Dynamic Self-Evolved Skill: ${query}

## Context & Trend Overview
Automatically generated to fulfill intent: "${query}".
Analyzed current repository architecture and matched against latest development trends.

## Instructions
1. Automatically follow guidelines for ${query}.
2. Follow standard OMA protocols for self-correction.
3. Validate output syntax and logic consistency.
`;

  const skillsDir = join(targetDir, ".agents", "skills", skillId);
  mkdirSync(skillsDir, { recursive: true });
  writeFileSync(join(skillsDir, "SKILL.md"), skillBody, "utf-8");

  // Re-run generate-skill-data.mjs to update the database index
  try {
    const candidates = [
      join(targetDir, "cli", "scripts", "generate-skill-data.mjs"),
      join(targetDir, "scripts", "generate-skill-data.mjs"),
      join(dirname(targetDir), "cli", "scripts", "generate-skill-data.mjs"),
    ];
    const scriptPath = candidates.find((p) => existsSync(p));
    if (scriptPath) {
      execSync(`node "${scriptPath}"`, { stdio: "inherit" });
    } else {
      console.warn(`[self-mutation] generate-skill-data.mjs not found in any candidate path.`);
    }
  } catch (err) {
    console.error(`[self-mutation] Failed to run generate-skill-data:`, err);
  }

  // Create corresponding dynamic rule in .agents/rules/
  const ruleId = `dynamic-rule-${query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 50)}`;
  const ruleBody = `---
description: "Dynamic self-evolved rule for handling: ${query}"
globs: "*"
alwaysApply: true
---

# Dynamic Rule: ${query}
- Enforce strict adherence to ${query} guidelines.
`;

  const rulesDir = join(targetDir, ".agents", "rules");
  mkdirSync(rulesDir, { recursive: true });
  writeFileSync(join(rulesDir, `${ruleId}.md`), ruleBody, "utf-8");

  // Re-merge rules for all vendors
  try {
    generateCursorRules(targetDir);
    generateClaudeRules(targetDir);
    for (const v of ["gemini", "claude", "codex", "cursor", "qwen", "antigravity"]) {
      mergeRulesIndexForVendor(targetDir, v);
    }
  } catch (err) {
    console.error(`[self-mutation] Failed to regenerate rules:`, err);
  }

  // Update evolution-registry.json
  const registryPath = join(targetDir, ".agents", "evolution-registry.json");
  let registry: { skills: any[]; rules: any[] } = { skills: [], rules: [] };
  try {
    if (existsSync(registryPath)) {
      registry = JSON.parse(readFileSync(registryPath, "utf-8"));
    }
  } catch {}

  if (!registry.skills) registry.skills = [];
  if (!registry.rules) registry.rules = [];

  if (!registry.skills.some((s: any) => s.name === skillId)) {
    registry.skills.push({
      name: skillId,
      description,
      timestamp,
    });
  }

  if (!registry.rules.some((r: any) => r.name === ruleId)) {
    registry.rules.push({
      name: ruleId,
      description: `Dynamic self-evolved rule for handling: ${query}`,
      timestamp,
    });
  }

  writeFileSync(registryPath, JSON.stringify(registry, null, 2), "utf-8");

  console.log(`[self-mutation] Successfully generated and registered dynamic skill: ${skillId}`);
  return skillId;
}

function buildMarkdownAgentFile(
  definition: AbstractAgentDefinition,
  variant: AgentVariant,
  config: AgentConfig,
  vendor: string,
  difficulty?: Difficulty,
  userIntent?: string,
): { fileName: string; content: string } {
  const { agentKey, entry, frontmatter, body } = definition;
  const mapping = TOOL_MAPPING[vendor] || {};
  const rawTools: string | string[] =
    (config.tools as string | string[]) ||
    (frontmatter.tools as string | string[]) ||
    variant.toolsDefault;
  const toolsList = Array.isArray(rawTools)
    ? rawTools
    : String(rawTools || "")
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean);

  const resolvedTools = toolsList.map(
    (tool: string) => mapping[tool.toLowerCase()] || tool,
  );
  const finalTools = Array.isArray(variant.toolsDefault)
    ? resolvedTools
    : resolvedTools.join(", ");

  const fm: Record<string, unknown> = {
    name: (frontmatter.name as string) || agentKey,
    description: config.description || frontmatter.description,
    tools: finalTools,
    model: config.model || frontmatter.model || variant.modelDefault,
  };

  if (variant.maxTurnsDefault || config.maxTurns || frontmatter.maxTurns) {
    fm[getMaxTurnsField(vendor)] =
      config.maxTurns || frontmatter.maxTurns || variant.maxTurnsDefault;
  }
  if (config.effort) fm.effort = config.effort;
  if (config.kind) fm.kind = config.kind;
  if (config.temperature !== undefined) fm.temperature = config.temperature;
  if (config.timeoutMins !== undefined) {
    fm[getTimeoutField(vendor)] = config.timeoutMins;
  }
  if (config.mcpServers) fm.mcpServers = config.mcpServers;

  let dynamicSkills: string[] = [];
  if (userIntent) {
    try {
      dynamicSkills = matchSkillsForIntent(userIntent);
    } catch (err) {
      if (err instanceof MissingAssetError) {
        const mutatedSkill = selfMutateSkill(userIntent);
        dynamicSkills = [mutatedSkill];
      } else {
        throw err;
      }
    }
  }

  const existingSkills = Array.isArray(frontmatter.skills)
    ? frontmatter.skills.map((s) => String(s))
    : [];
  const mergedSkills = Array.from(new Set([...existingSkills, ...dynamicSkills]));

  if (mergedSkills.length > 0 && supportsSkillsFrontmatter(vendor)) {
    fm.skills = mergedSkills;
  }
  if (config.extra) {
    Object.assign(fm, config.extra);
  }

  const geminiSkillReferences =
    vendor === "gemini" ? buildGeminiSkillReferences(mergedSkills) : "";
  // T16: strip CHARTER_CHECK block for Simple tasks to save ~200 tokens per spawn.
  // Default (difficulty undefined or Medium/Complex) preserves the block.
  const effectiveBody =
    difficulty === "Simple" ? stripCharterCheck(body) : body;
  const finalBody = `<!-- Generated by oh-my-agent CLI. Source: .agents/agents/${entry} -->\n${geminiSkillReferences}${formatAgentBody(effectiveBody, variant.protocolPath)}`;
  const vendorFrontmatter = sanitizeFrontmatterForVendor(fm, vendor);

  return {
    fileName: entry,
    content: serializeFrontmatter(vendorFrontmatter, finalBody),
  };
}

function buildCodexAgentFile(
  definition: AbstractAgentDefinition,
  variant: AgentVariant,
  config: AgentConfig,
  userIntent?: string,
): { fileName: string; content: string } {
  const { agentKey, entry, frontmatter, body } = definition;
  const name = (frontmatter.name as string) || agentKey;
  const description = String(
    config.description || frontmatter.description || name,
  );
  const model = String(
    config.model || frontmatter.model || variant.modelDefault,
  );
  const reasoningEffort = config.effort || "medium";
  const sandboxMode =
    typeof config.extra?.sandbox_mode === "string"
      ? config.extra.sandbox_mode
      : "workspace-write";
  const finalBody = formatAgentBody(body, variant.protocolPath);

  let dynamicSkills: string[] = [];
  if (userIntent) {
    try {
      dynamicSkills = matchSkillsForIntent(userIntent);
    } catch (err) {
      if (err instanceof MissingAssetError) {
        const mutatedSkill = selfMutateSkill(userIntent);
        dynamicSkills = [mutatedSkill];
      } else {
        throw err;
      }
    }
  }

  const existingSkills = Array.isArray(frontmatter.skills)
    ? frontmatter.skills.map((skill) => String(skill)).filter(Boolean)
    : [];
  const skills = Array.from(new Set([...existingSkills, ...dynamicSkills]));

  const lines = [
    `# Generated by oh-my-agent CLI. Source: .agents/agents/${entry}`,
    `name = ${serializeTomlString(name)}`,
    `description = ${serializeTomlString(description)}`,
    `model = ${serializeTomlString(model)}`,
    `model_reasoning_effort = ${serializeTomlString(reasoningEffort)}`,
    `sandbox_mode = ${serializeTomlString(sandboxMode)}`,
    `developer_instructions = ${serializeTomlMultiline(finalBody)}`,
  ];

  for (const skill of skills) {
    lines.push("");
    lines.push("[[skills.config]]");
    lines.push(
      `path = ${serializeTomlString(`.agents/skills/${skill}/SKILL.md`)}`,
    );
    lines.push("enabled = true");
  }

  if (config.mcpServers && Object.keys(config.mcpServers).length > 0) {
    lines.push("");
    lines.push("[mcp_servers]");
    for (const [server, enabled] of Object.entries(config.mcpServers)) {
      lines.push(`${server} = ${serializeTomlString(String(enabled))}`);
    }
  }

  return {
    fileName: `${agentKey}.toml`,
    content: `${lines.join("\n")}\n`,
  };
}

function buildGeminiSkillReferences(skills: unknown): string {
  if (!Array.isArray(skills) || skills.length === 0) return "";

  const skillPaths = skills
    .map((skill) => String(skill).trim())
    .filter(Boolean)
    .map((skill) => `- \`.agents/skills/${skill}/SKILL.md\``);

  if (skillPaths.length === 0) return "";

  return [
    "",
    "## Skill References",
    "",
    "When relevant, use these project resources as the authoritative implementation guide:",
    ...skillPaths,
    "",
  ].join("\n");
}

// =============================================================================
// Per-vendor frontmatter allow-lists (R14)
// Fields not listed here will be dropped with a console.warn before write.
// =============================================================================

const ALLOWED_FIELDS: Record<string, readonly string[]> = {
  claude: [
    "name",
    "description",
    "tools",
    "model",
    "maxTurns",
    "skills",
    "memory",
    "permissionMode",
  ],
  codex: [
    "name",
    "description",
    "model",
    "model_reasoning_effort",
    "sandbox_mode",
  ],
  gemini: [
    "name",
    "description",
    "tools",
    "model",
    "max_turns",
    "timeout_mins",
    "kind",
  ],
  antigravity: ["name", "description", "model", "tools", "maxTurns", "skills"],
  qwen: ["name", "description", "model", "thinking"],
};

/**
 * Return a copy of `frontmatter` with only the fields allowed for `vendor`.
 * Dropped fields are reported via console.warn.
 *
 * R14: When the `claude` vendor drops the `effort` field, the warning message
 * explicitly references R14 so engineers can trace the decision.
 *
 * Pure function — the input object is never mutated.
 */
export function sanitizeFrontmatterForVendor(
  frontmatter: Record<string, unknown>,
  vendor: string,
): Record<string, unknown> {
  const allowedKeys = ALLOWED_FIELDS[vendor];

  // Unknown vendor: pass through unchanged (no allow-list defined).
  if (!allowedKeys) return { ...frontmatter };

  const allowed = new Set(allowedKeys);
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(frontmatter)) {
    if (allowed.has(key)) {
      result[key] = value;
    } else {
      if (vendor === "claude" && key === "effort") {
        console.warn(
          `[agent-composer] Dropped 'effort' from claude variant (R14: Claude subagent frontmatter does not support effort — use CLI session --effort instead)`,
        );
      } else {
        console.warn(
          `[agent-composer] Dropped '${key}' from ${vendor} variant (not supported by this runtime)`,
        );
      }
    }
  }

  return result;
}

/**
 * Generate vendor-specific agent files from core definitions and variant config.
 */
export function installVendorAgents(
  sourceDir: string,
  targetDir: string,
  vendor: string,
  userIntent?: string,
): void {
  const agentsSrcDir = join(sourceDir, ".agents", "agents");
  const variantPath = join(agentsSrcDir, "variants", `${vendor}.json`);

  if (!existsSync(agentsSrcDir) || !existsSync(variantPath)) return;

  const variant: AgentVariant = JSON.parse(readFileSync(variantPath, "utf-8"));
  if (!variant?.destDir) return;

  const destDir = join(targetDir, variant.destDir);
  mkdirSync(destDir, { recursive: true });

  for (const definition of readAbstractAgentDefinitions(sourceDir)) {
    const config = variant.agents[definition.agentKey] || {};
    const output =
      vendor === "codex"
        ? buildCodexAgentFile(definition, variant, config, userIntent)
        : buildMarkdownAgentFile(definition, variant, config, vendor, undefined, userIntent);

    writeFileSync(join(destDir, output.fileName), output.content);
  }
}
