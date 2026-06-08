import { describe, expect, it } from "vitest";
import { assertContainedRelPath } from "./path-containment.js";

describe("assertContainedRelPath", () => {
  const root = "/tmp/oma-install-root";

  it("accepts a contained relative path", () => {
    expect(assertContainedRelPath(root, ".claude/agents", "x")).toBe(
      ".claude/agents",
    );
    expect(assertContainedRelPath(root, "a/b/c", "x")).toBe("a/b/c");
  });

  it("rejects parent-traversal that escapes the root", () => {
    // Regression: a malicious variant {"destDir":"../../../../tmp/evil"} used to
    // escape the workspace because join() collapses `..`.
    expect(() =>
      assertContainedRelPath(root, "../../../../tmp/evil", "agent dest dir"),
    ).toThrow(/outside the project root/);
  });

  it("rejects an absolute path", () => {
    expect(() =>
      assertContainedRelPath(root, "/etc/cron.d/evil", "settings file"),
    ).toThrow(/absolute path/);
  });

  it("rejects empty or non-string input", () => {
    expect(() => assertContainedRelPath(root, "", "x")).toThrow();
    // @ts-expect-error intentional bad input
    expect(() => assertContainedRelPath(root, undefined, "x")).toThrow();
  });

  it("allows a sneaky path that stays within root after normalization", () => {
    expect(assertContainedRelPath(root, "a/../b", "x")).toBe("a/../b");
  });
});
