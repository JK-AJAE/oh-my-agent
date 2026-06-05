import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Regression contract for the shipped viewport-base.css asset.
 *
 * The deck's print stylesheet used to win every cascade fight with `!important`.
 * Two of those were removed by fixing the SOURCE of the conflict instead:
 *   - the inline scale transform is cleared on `beforeprint` (export/pdf.ts),
 *     so `.deck-stage { transform }` no longer needs `!important`;
 *   - per-slide pagination is re-established by an id-scoped reset the bundler
 *     emits after the author styles (buildPrintPaginationReset), so the generic
 *     `.slide` print rule no longer needs `!important`.
 *
 * The ONLY remaining `!important` is the prefers-reduced-motion reset, which is
 * the canonical a11y override and must defeat arbitrary author animation
 * specificity — that one is intentional and must stay.
 *
 * These assertions lock the intent in: the asset is copied-verbatim CSS (not
 * importable) and CI has no browser to exercise the print cascade.
 */
describe("viewport-base.css asset — !important is reserved for a11y", () => {
  const assetPath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "..",
    ".agents",
    "skills",
    "oma-slide",
    "resources",
    "assets",
    "viewport-base.css",
  );
  const css = readFileSync(assetPath, "utf8");

  it("does not use !important for print pagination or stage transform", () => {
    expect(css).not.toContain("position: relative !important");
    expect(css).not.toContain("inset: auto !important");
    expect(css).not.toContain("visibility: visible !important");
    expect(css).not.toContain("opacity: 1 !important");
    expect(css).not.toContain("transition: none !important");
    expect(css).not.toContain("transform: none !important");
    expect(css).not.toContain("display: none !important");
  });

  it("keeps !important ONLY for the reduced-motion a11y reset", () => {
    // The reduced-motion kill-switch must outrank any author animation.
    expect(css).toContain("animation-duration: 0.01ms !important");
    expect(css).toContain("transition-duration: 0.01ms !important");

    // Exactly the three reduced-motion declarations — nothing else.
    const declarations = css.match(/!important;/g) ?? [];
    expect(declarations).toHaveLength(3);
  });

  it("carries no biome suppression directives (the conflict is fixed, not hidden)", () => {
    expect(css).not.toContain("biome-ignore");
  });
});
