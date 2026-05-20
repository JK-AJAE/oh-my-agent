import { existsSync, globSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { parse as parseYaml } from "yaml";

export interface DeclaredOutput {
  name: string;
  description?: string;
  artifact: string;
  required: boolean;
}

export interface ClosureCheckResult {
  hasStructuredOutputs: boolean;
  declared: DeclaredOutput[];
  missingRequired: DeclaredOutput[];
}

function findExpectedOutputsBlock(body: string): string | null {
  const lines = body.split("\n");
  let inSection = false;
  let inFence = false;
  let fenceLang = "";
  const captured: string[] = [];

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading && !inFence) {
      if (inSection) break;
      if (heading[1]?.toLowerCase() === "expected outputs") {
        inSection = true;
        continue;
      }
    }
    if (!inSection) continue;

    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceLang = fence[1] ?? "";
      } else {
        if (fenceLang === "yaml" || fenceLang === "yml") {
          return captured.join("\n");
        }
        inFence = false;
        fenceLang = "";
        captured.length = 0;
      }
      continue;
    }
    if (inFence && (fenceLang === "yaml" || fenceLang === "yml")) {
      captured.push(line);
    }
  }
  return null;
}

export function parseExpectedOutputs(skillBody: string): DeclaredOutput[] {
  const block = findExpectedOutputsBlock(skillBody);
  if (!block) return [];

  let parsed: unknown;
  try {
    parsed = parseYaml(block);
  } catch {
    return [];
  }
  if (!parsed || typeof parsed !== "object") return [];
  const outputs = (parsed as Record<string, unknown>).outputs;
  if (!Array.isArray(outputs)) return [];

  const declared: DeclaredOutput[] = [];
  for (const entry of outputs) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const name = typeof record.name === "string" ? record.name : null;
    const artifact =
      typeof record.artifact === "string" ? record.artifact : null;
    if (!name || !artifact) continue;
    declared.push({
      name,
      description:
        typeof record.description === "string" ? record.description : undefined,
      artifact,
      required: record.required === true,
    });
  }
  return declared;
}

function loadSkillBody(workspace: string, agentType: string): string | null {
  const skillMdPath = join(
    workspace,
    ".agents",
    "skills",
    `oma-${agentType}`,
    "SKILL.md",
  );
  if (!existsSync(skillMdPath)) return null;
  try {
    return readFileSync(skillMdPath, "utf-8");
  } catch {
    return null;
  }
}

function artifactExists(workspace: string, pattern: string): boolean {
  // Node's globSync silently skips dot-prefixed path segments (e.g. `.agents/`)
  // when matching, even with `cwd`. Resolve to absolute first.
  const absolutePattern = isAbsolute(pattern)
    ? pattern
    : join(workspace, pattern);
  try {
    const matches = globSync(absolutePattern);
    return matches.length > 0;
  } catch {
    return false;
  }
}

export function checkClosure(
  workspace: string,
  agentType: string,
): ClosureCheckResult {
  const body = loadSkillBody(workspace, agentType);
  if (!body) {
    return { hasStructuredOutputs: false, declared: [], missingRequired: [] };
  }
  const declared = parseExpectedOutputs(body);
  if (declared.length === 0) {
    return { hasStructuredOutputs: false, declared: [], missingRequired: [] };
  }
  const missingRequired = declared
    .filter((d) => d.required)
    .filter((d) => !artifactExists(workspace, d.artifact));
  return {
    hasStructuredOutputs: true,
    declared,
    missingRequired,
  };
}
