import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let configuredVendorsForTest: string[] = [];
let agyInstalledResult: { installed: boolean; reason?: string } = {
  installed: true,
};

vi.mock("../../../platform/rules.js", () => ({
  generateCursorRules: vi.fn(() => []),
  mergeRulesIndexForVendor: vi.fn(() => true),
}));

vi.mock("../../../platform/skills-installer.js", () => ({
  createCliSymlinks: vi.fn(() => ({ created: [], skipped: [] })),
  detectExistingCliSymlinkDirs: vi.fn(() => []),
  ensureCursorMcpConfig: vi.fn(),
  getInstalledSkillNames: vi.fn(() => []),
  installCodexWorkflowSkills: vi.fn(),
  installCopilotWorkflowPrompts: vi.fn(),
  installVendorAdaptations: vi.fn(),
  isHookVendor: vi.fn((v: string) =>
    ["claude", "codex", "cursor", "gemini", "qwen"].includes(v),
  ),
  readVendorsFromConfig: vi.fn(() => configuredVendorsForTest),
  vendorRequiresHomeConsent: vi.fn((cli: string) => cli === "hermes"),
}));

vi.mock("../../../utils/config.js", () => ({
  isTelemetryEnabled: vi.fn(() => false),
  loadSerenaConfig: vi.fn(() => ({ mode: "stdio" })),
}));

vi.mock("../../../vendors/antigravity/hud.js", () => ({
  installAntigravityHud: vi.fn(() => agyInstalledResult),
}));

vi.mock("../../../vendors/claude/mcp.js", () => ({
  applyRecommendedClaudeMcp: vi.fn((mcp: unknown) => mcp),
  needsClaudeMcpUpdate: vi.fn(() => false),
}));

vi.mock("../../../vendors/claude/settings.js", () => ({
  applyRecommendedSettings: vi.fn(),
  needsSettingsUpdate: vi.fn(() => false),
}));

vi.mock("../../../vendors/codex/settings.js", () => ({
  applyRecommendedCodexSettings: vi.fn((s: unknown) => s),
  needsCodexSettingsUpdate: vi.fn(() => false),
  parseCodexConfig: vi.fn(() => ({})),
  serializeCodexConfig: vi.fn(() => ""),
}));

vi.mock("../../../vendors/gemini/settings.js", () => ({
  applyRecommendedGeminiSettings: vi.fn(),
  needsGeminiSettingsUpdate: vi.fn(() => false),
}));

vi.mock("../../../vendors/qwen/settings.js", () => ({
  applyRecommendedQwenSettings: vi.fn((s: unknown) => s),
  needsQwenSettingsUpdate: vi.fn(() => false),
}));

import * as skills from "../../../platform/skills-installer.js";
import * as antigravity from "../../../vendors/antigravity/hud.js";
import * as gemini from "../../../vendors/gemini/settings.js";
import { link } from "../link.js";

describe("link kernel", () => {
  const tempRoots: string[] = [];
  const originalCwd = process.cwd();

  beforeEach(() => {
    configuredVendorsForTest = [];
    agyInstalledResult = { installed: true };
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.chdir(originalCwd);
    for (const root of tempRoots) {
      rmSync(root, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 100,
      });
    }
    tempRoots.length = 0;
  });

  function makeProject(vendors: string[]): string {
    const root = mkdtempSync(join(tmpdir(), "oma-link-test-"));
    tempRoots.push(root);
    mkdirSync(join(root, ".agents"), { recursive: true });
    writeFileSync(
      join(root, ".agents", "oma-config.yaml"),
      `vendors:\n${vendors.map((v) => `  - ${v}`).join("\n")}\n`,
      "utf-8",
    );
    configuredVendorsForTest = vendors;
    return root;
  }

  describe("contract", () => {
    it("returns a LinkResult struct", () => {
      const projectDir = makeProject(["claude"]);
      process.chdir(projectDir);

      const result = link({ quiet: true });

      expect(result).toMatchObject({
        vendors: expect.any(Array),
        agyInstalled: expect.any(Boolean),
        mergedDocs: expect.any(Array),
        symlinksCreated: expect.any(Array),
      });
    });

    it("returns empty result when no vendors are configured", () => {
      const projectDir = makeProject([]);
      process.chdir(projectDir);

      const result = link({ quiet: true });

      expect(result.vendors).toEqual([]);
      expect(result.agyInstalled).toBe(false);
    });

    it("exits with error when .agents/ is missing", () => {
      const root = mkdtempSync(join(tmpdir(), "oma-link-no-agents-"));
      tempRoots.push(root);
      process.chdir(root);

      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const result = link({ quiet: true });

      expect(result.vendors).toEqual([]);
      expect(process.exitCode).toBe(1);
      expect(consoleError).toHaveBeenCalled();

      consoleError.mockRestore();
      process.exitCode = 0;
    });
  });

  describe("vendor filter", () => {
    it("vendorFilter overrides config", () => {
      const projectDir = makeProject(["claude", "codex"]);
      process.chdir(projectDir);

      const result = link({ quiet: true, vendorFilter: ["claude"] });

      expect(result.vendors).toEqual(["claude"]);
      expect(skills.installVendorAdaptations).toHaveBeenCalledWith(
        expect.stringContaining(projectDir),
        expect.stringContaining(projectDir),
        ["claude"],
      );
    });

    it("falls back to config when vendorFilter is omitted", () => {
      const projectDir = makeProject(["codex", "cursor"]);
      process.chdir(projectDir);

      const result = link({ quiet: true });

      expect(result.vendors).toEqual(["codex", "cursor"]);
    });
  });

  describe("antigravity HOME wiring", () => {
    it("invokes installAntigravityHud when antigravity is in the vendor list", () => {
      const projectDir = makeProject(["claude", "antigravity"]);
      process.chdir(projectDir);

      const result = link({ quiet: true });

      expect(antigravity.installAntigravityHud).toHaveBeenCalledWith(
        expect.stringContaining(projectDir),
      );
      expect(result.agyInstalled).toBe(true);
    });

    it("does not invoke installAntigravityHud when antigravity is absent", () => {
      const projectDir = makeProject(["claude"]);
      process.chdir(projectDir);

      link({ quiet: true });

      expect(antigravity.installAntigravityHud).not.toHaveBeenCalled();
    });

    it("surfaces agySkipReason when HUD install skips", () => {
      agyInstalledResult = {
        installed: false,
        reason: "agy config dir not found",
      };
      const projectDir = makeProject(["claude", "antigravity"]);
      process.chdir(projectDir);

      const result = link({ quiet: true });

      expect(result.agyInstalled).toBe(false);
      expect(result.agySkipReason).toBe("agy config dir not found");
    });
  });

  describe("telemetry propagation", () => {
    it("threads explicit telemetry: true to vendor settings checkers", () => {
      const projectDir = makeProject(["gemini"]);
      process.chdir(projectDir);

      link({ quiet: true, telemetry: true });

      expect(gemini.needsGeminiSettingsUpdate).toHaveBeenCalledWith(
        expect.anything(),
        { telemetry: true },
      );
    });

    it("threads explicit telemetry: false to vendor settings checkers", () => {
      const projectDir = makeProject(["gemini"]);
      process.chdir(projectDir);

      link({ quiet: true, telemetry: false });

      expect(gemini.needsGeminiSettingsUpdate).toHaveBeenCalledWith(
        expect.anything(),
        { telemetry: false },
      );
    });
  });

  describe("quiet mode", () => {
    it("suppresses the standalone CLI summary in quiet mode", () => {
      const projectDir = makeProject(["claude"]);
      process.chdir(projectDir);

      const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
      link({ quiet: true });
      expect(consoleLog).not.toHaveBeenCalled();

      consoleLog.mockRestore();
    });

    it("prints the standalone CLI summary when quiet is false", () => {
      const projectDir = makeProject(["claude"]);
      process.chdir(projectDir);

      const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
      link({ quiet: false });
      expect(consoleLog).toHaveBeenCalled();

      consoleLog.mockRestore();
    });
  });

  describe("refreshSymlinks toggle", () => {
    it("does not call createCliSymlinks when refreshSymlinks is false", () => {
      const projectDir = makeProject(["claude"]);
      process.chdir(projectDir);

      link({ quiet: true, refreshSymlinks: false });

      expect(skills.createCliSymlinks).not.toHaveBeenCalled();
    });

    it("calls createCliSymlinks by default when symlink dirs and skills exist", () => {
      (
        skills.detectExistingCliSymlinkDirs as unknown as ReturnType<
          typeof vi.fn
        >
      ).mockReturnValueOnce(["claude"]);
      (
        skills.getInstalledSkillNames as unknown as ReturnType<typeof vi.fn>
      ).mockReturnValueOnce(["oma-frontend"]);
      const projectDir = makeProject(["claude"]);
      process.chdir(projectDir);

      link({ quiet: true });

      expect(skills.createCliSymlinks).toHaveBeenCalled();
    });
  });

  describe("doc merging", () => {
    it("returns mergedDocs for vendors that merged successfully", () => {
      const projectDir = makeProject(["claude", "codex"]);
      process.chdir(projectDir);

      const result = link({ quiet: true });

      // mergeRulesIndexForVendor is mocked to return true for all vendors,
      // and link dedupes by target file (CLAUDE.md / AGENTS.md / GEMINI.md).
      expect(result.mergedDocs).toContain("CLAUDE.md");
      expect(result.mergedDocs).toContain("AGENTS.md");
    });
  });
});
