import { isAbsolute, join, resolve, sep } from "node:path";

/**
 * Assert that a variant-supplied relative path stays inside `root` after
 * resolution. Throws on absolute paths or any `..` traversal that escapes
 * `root`.
 *
 * Vendor variant JSON (`.agents/{agents,hooks}/variants/<vendor>.json`) is
 * read from the working project and is therefore attacker-controlled when a
 * developer clones a hostile repo and runs `oma link` / `install` / `update`.
 * Its path-bearing fields (`destDir`, `hookDir`, `settingsFile`,
 * `featureFlags.file`) are written verbatim through `join()`, which collapses
 * `..` — so a value like `../../../../tmp/evil` escapes the workspace and lets
 * the installer write arbitrary files. Callers MUST validate those fields with
 * this guard before any filesystem write.
 *
 * @returns the validated `relPath` (for convenient inline use).
 */
export function assertContainedRelPath(
  root: string,
  relPath: string,
  label: string,
): string {
  if (typeof relPath !== "string" || relPath.length === 0) {
    throw new Error(`Refusing ${label}: path is empty or not a string.`);
  }
  if (isAbsolute(relPath)) {
    throw new Error(
      `Refusing ${label} with absolute path "${relPath}" — variant paths must be relative and stay inside the project.`,
    );
  }
  const resolvedRoot = resolve(root);
  const resolved = resolve(join(resolvedRoot, relPath));
  if (resolved !== resolvedRoot && !resolved.startsWith(resolvedRoot + sep)) {
    throw new Error(
      `Refusing ${label} "${relPath}" — resolves outside the project root.`,
    );
  }
  return relPath;
}
