import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Utility: resolve __dirname in ESM
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Custom quotes stripping logic.
 */
function stripQuotes(value) {
  const v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

/**
 * Standard parseFrontmatter logic (compatible with generate-skill-data.mjs).
 */
export function parseFrontmatter(content) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  if (!match) return { frontmatter: {}, body: content };
  const block = match[1];
  const body = content.slice(match[0].length);
  const fields = {};
  let currentKey = null;
  let mode = "inline";
  let buffer = [];

  const flush = () => {
    if (currentKey === null) return;
    const joiner = mode === "literal" ? "\n" : " ";
    fields[currentKey] = buffer.join(joiner).trim();
    currentKey = null;
    mode = "inline";
    buffer = [];
  };

  for (const rawLine of block.split(/\r?\n/)) {
    const trimmedRight = rawLine.replace(/\s+$/, "");
    const kv = trimmedRight.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);

    if (kv && !/^\s/.test(rawLine)) {
      flush();
      currentKey = kv[1];
      const value = kv[2];
      if (value === ">" || value === ">-") {
        mode = "folded";
        buffer = [];
      } else if (value === "|" || value === "|-") {
        mode = "literal";
        buffer = [];
      } else {
        mode = "inline";
        buffer = value ? [stripQuotes(value)] : [];
      }
    } else if (currentKey && /^\s+/.test(rawLine)) {
      buffer.push(trimmedRight.trim());
    }
  }
  flush();
  return { frontmatter: fields, body };
}

/**
 * Map legacy skill categories to standard OMA categories.
 */
export function mapCategory(name, existingCategory) {
  const n = name.toLowerCase();
  if (
    existingCategory &&
    ["domain", "design", "coordination", "utility", "infrastructure"].includes(
      existingCategory,
    )
  ) {
    return existingCategory;
  }
  if (
    n.includes("architect") ||
    n.includes("backend") ||
    n.includes("frontend") ||
    n.includes("mobile") ||
    n.includes("db") ||
    n.includes("database")
  ) {
    return "domain";
  }
  if (
    n.includes("design") ||
    n.includes("ux") ||
    n.includes("style") ||
    n.includes("css") ||
    n.includes("theme")
  ) {
    return "design";
  }
  if (
    n.includes("orchestrator") ||
    n.includes("coordination") ||
    n.includes("pm") ||
    n.includes("qa") ||
    n.includes("workflow") ||
    n.includes("scrum") ||
    n.includes("reviewer")
  ) {
    return "coordination";
  }
  if (
    n.includes("infra") ||
    n.includes("devops") ||
    n.includes("ci") ||
    n.includes("git") ||
    n.includes("observability") ||
    n.includes("telemetry") ||
    n.includes("monitor")
  ) {
    return "infrastructure";
  }
  return "utility";
}

/**
 * Parse the legacy spec file and extract skills/rules.
 */
export function parseHarnessSpec(specPath, outputSkillsDir, outputRulesDir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(specPath)) {
      return reject(new Error(`Spec file not found: ${specPath}`));
    }

    const fileStream = fs.createReadStream(specPath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let currentFilePath = null;
    let inCodeBlock = false;
    let codeBlockLines = [];
    let extractedCount = 0;

    rl.on("line", (line) => {
      const fileHeaderMatch = line.match(/^### 📍 File: `([^`]+)`/);
      if (fileHeaderMatch) {
        currentFilePath = fileHeaderMatch[1];
        inCodeBlock = false;
        codeBlockLines = [];
        return;
      }

      if (currentFilePath) {
        if (line.startsWith("```")) {
          if (!inCodeBlock) {
            inCodeBlock = true;
          } else {
            const content = codeBlockLines.join("\n");
            processExtractedFile(
              currentFilePath,
              content,
              outputSkillsDir,
              outputRulesDir,
            );
            extractedCount++;
            currentFilePath = null;
            inCodeBlock = false;
            codeBlockLines = [];
          }
        } else if (inCodeBlock) {
          codeBlockLines.push(line);
        }
      }
    });

    rl.on("close", () => {
      console.log(
        `[extract-legacy-skills] Completed extraction. Processed ${extractedCount} files.`,
      );
      resolve(extractedCount);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * Process a single extracted file.
 */
function processExtractedFile(filePath, content, outputSkillsDir, outputRulesDir) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const fileName = path.basename(normalizedPath);

  // 1. Process SKILL.md / skill.md
  if (fileName.toLowerCase() === "skill.md") {
    const pathParts = normalizedPath.split("/");
    const skillId = pathParts[pathParts.length - 2];
    if (!skillId) return;

    const { frontmatter, body } = parseFrontmatter(content);
    const name = frontmatter.name || skillId;
    const description = frontmatter.description || "";
    const category = mapCategory(name, frontmatter.category);

    const newFrontmatter = { name, description, category, ...frontmatter };

    const serializedFm = Object.entries(newFrontmatter)
      .map(
        ([k, v]) =>
          `${k}: ${
            typeof v === "string" && v.includes("\n")
              ? `|-\n${v
                  .split("\n")
                  .map((l) => "  " + l)
                  .join("\n")}`
              : `"${String(v).replace(/"/g, '\\"')}"`
          }`,
      )
      .join("\n");

    const standardizedContent = `---\n${serializedFm}\n---\n\n${body.trim()}\n`;
    const destDir = path.join(outputSkillsDir, skillId);
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(path.join(destDir, "SKILL.md"), standardizedContent, "utf-8");
  }

  // 2. Process rules/anti-gravity-protocol.md
  if (normalizedPath === "rules/anti-gravity-protocol.md") {
    fs.mkdirSync(outputRulesDir, { recursive: true });
    const { frontmatter, body } = parseFrontmatter(content);

    const newFrontmatter = {
      description:
        frontmatter.description ||
        "Unified Core Protocol (V3 - Universal Global Standard)",
      globs: "*",
      alwaysApply: true,
      ...frontmatter,
    };

    const serializedFm = Object.entries(newFrontmatter)
      .map(([k, v]) => `${k}: "${String(v).replace(/"/g, '\\"')}"`)
      .join("\n");

    const standardizedContent = `---\n${serializedFm}\n---\n\n${body.trim()}\n`;
    fs.writeFileSync(
      path.join(outputRulesDir, "anti-gravity-protocol.md"),
      standardizedContent,
      "utf-8",
    );
  }
}

// ---------------------------------------------------------------------------
// Spec path resolution (V6 자율 진화 플랜 확정 전략)
//
// Priority 1 — HARNESS_SPEC_PATH env var (CI / 다른 머신 호환)
// Priority 2 — 절대 경로 기본값: E:/harness-library/my_old_harness_spec.md
// Priority 3 — 레거시: 프로젝트 루트 상대 경로 (이전 동작 보존)
// ---------------------------------------------------------------------------
function resolveSpecPath(repoRoot) {
  if (process.env.HARNESS_SPEC_PATH) {
    return path.resolve(process.env.HARNESS_SPEC_PATH);
  }

  const absoluteDefault = path.resolve("E:/harness-library/my_old_harness_spec.md");
  if (fs.existsSync(absoluteDefault)) {
    return absoluteDefault;
  }

  // Fallback: repo-relative (원래 동작)
  return path.join(repoRoot, "my_old_harness_spec.md");
}

// Running script directly
const scriptName = path.basename(__filename);
if (
  process.argv[1] &&
  path.basename(process.argv[1]) === scriptName
) {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const specPath = resolveSpecPath(repoRoot);
  const outputSkillsDir = path.join(repoRoot, ".agents", "skills");
  const outputRulesDir = path.join(repoRoot, ".agents", "rules");

  console.log(`[extract-legacy-skills] Spec path  : ${specPath}`);
  console.log(`[extract-legacy-skills] Skills dir : ${outputSkillsDir}`);
  console.log(`[extract-legacy-skills] Rules dir  : ${outputRulesDir}`);

  parseHarnessSpec(specPath, outputSkillsDir, outputRulesDir)
    .then((count) => {
      console.log(
        `[extract-legacy-skills] Done! Extracted and standardized ${count} assets.`,
      );
    })
    .catch((err) => {
      console.error(`[extract-legacy-skills] Error:`, err);
      process.exit(1);
    });
}
