import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { VendorType } from "../types/index.js";
import { installVendorAgents } from "./agent-composer.js";
import { type HookVariant, installHooksFromVariant } from "./hooks-composer.js";
import { assertContainedRelPath } from "./path-containment.js";
import { generateClaudeRules } from "./rules.js";

/**
 * Parse and validate a hook variant config read from the (untrusted) working
 * project. Returns `null` — without throwing — when the file is malformed or
 * declares a path-bearing field that escapes `installRoot`, so a single bad
 * `.agents/hooks/variants/<vendor>.json` neither crashes the install mid-loop
 * (reliability) nor lets the installer write outside the workspace (security).
 */
function safeLoadHookVariant(
  variantPath: string,
  installRoot: string,
): HookVariant | null {
  let variant: HookVariant;
  try {
    variant = JSON.parse(readFileSync(variantPath, "utf-8")) as HookVariant;
  } catch (err) {
    console.warn(
      `[oma] Skipping malformed hook variant ${variantPath}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return null;
  }
  try {
    assertContainedRelPath(installRoot, variant.hookDir, "hook dir");
    assertContainedRelPath(installRoot, variant.settingsFile, "settings file");
    if (variant.featureFlags?.file) {
      assertContainedRelPath(
        installRoot,
        variant.featureFlags.file,
        "feature-flags file",
      );
    }
  } catch (err) {
    console.warn(
      `[oma] Skipping unsafe hook variant ${variantPath}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return null;
  }
  return variant;
}

/**
 * Install vendor-specific agent and workflow adaptations.
 * Hooks are installed from variant configs in .agents/hooks/variants/.
 *
 * Workflow exposure is NOT handled here: workflows are symlinked directly at
 * `.agents/workflows/<name>.md` by `createVendorWorkflowSymlinks` during symlink
 * reconciliation, so no per-vendor wrapper is generated.
 */
export function installVendorAdaptations(
  sourceDir: string,
  installRoot: string,
  vendors: VendorType[],
): void {
  const hookVariantsDir = join(sourceDir, ".agents", "hooks", "variants");

  for (const vendor of vendors) {
    // 1. Install agents from variant (composer design)
    installVendorAgents(sourceDir, installRoot, vendor);

    // 2. Install hooks from variant config (parsed + path-validated; a bad
    //    variant is skipped with a warning rather than aborting the install).
    const variantPath = join(hookVariantsDir, `${vendor}.json`);
    if (existsSync(variantPath)) {
      const variant = safeLoadHookVariant(variantPath, installRoot);
      if (variant) {
        installHooksFromVariant(sourceDir, installRoot, variant);
      }
    }

    // 3. Claude-specific non-hook adaptations (rules)
    if (vendor === "claude") {
      generateClaudeRules(installRoot);
    }
  }
}
