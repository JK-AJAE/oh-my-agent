import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("npm package readme", () => {
  it("should provide a generated README in the published cli package root", () => {
    const readme = readFileSync(
      new URL("../README.md", import.meta.url),
      "utf-8",
    );

    expect(readme).toContain("# oh-my-agent: Portable Multi-Agent Harness");
    expect(readme).not.toMatch(/\]\(\.\//);
    expect(readme).toContain(
      "https://github.com/JK-AJAE/oh-my-agent-custom/blob/main/docs/README.ko.md",
    );
  });
});
