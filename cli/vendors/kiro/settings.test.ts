import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  applyKiroProjectMcp,
  KIRO_PROJECT_SETTINGS_PATH,
  needsKiroMcpUpdate,
  RECOMMENDED_KIRO_MCP,
} from "./settings.js";

describe("kiro settings", () => {
  const roots: string[] = [];

  afterEach(() => {
    for (const root of roots.splice(0)) {
      rmSync(root, { recursive: true, force: true });
    }
  });

  function tempRoot(): string {
    const root = mkdtempSync(join(tmpdir(), "oma-kiro-settings-"));
    roots.push(root);
    return root;
  }

  it("adds chrome-devtools and serena MCP servers to project cli settings", () => {
    const root = tempRoot();

    applyKiroProjectMcp(root);

    const parsed = JSON.parse(
      readFileSync(join(root, KIRO_PROJECT_SETTINGS_PATH), "utf-8"),
    );
    expect(parsed.mcpServers["chrome-devtools"]).toEqual(
      RECOMMENDED_KIRO_MCP["chrome-devtools"],
    );
    expect(parsed.mcpServers.serena.command).toBe("serena");
    expect(parsed.mcpServers.serena.args).toContain("--open-web-dashboard");
    expect(needsKiroMcpUpdate(root)).toBe(false);
  });

  it("preserves existing chrome-devtools config", () => {
    const root = tempRoot();
    const path = join(root, KIRO_PROJECT_SETTINGS_PATH);
    mkdirSync(join(root, ".kiro", "settings"), { recursive: true });
    writeFileSync(
      path,
      `${JSON.stringify({
        mcpServers: {
          "chrome-devtools": { command: "custom-chrome-mcp" },
        },
      })}\n`,
    );

    applyKiroProjectMcp(root);

    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    expect(parsed.mcpServers["chrome-devtools"]).toEqual({
      command: "custom-chrome-mcp",
    });
    expect(parsed.mcpServers.serena.command).toBe("serena");
  });
});
