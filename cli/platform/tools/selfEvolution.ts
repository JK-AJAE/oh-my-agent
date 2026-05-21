import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import axios from "axios";

/**
 * 지정된 URL의 웹 페이지를 크롤링하여 HTML 태그를 제거한 순수 텍스트를 반환하는 도구
 */
export async function webScraper(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OMA-SelfEvolution/6.0" }
    });
    // Remove script tags and then all other HTML tags
    return String(response.data)
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ");
  } catch (error: any) {
    throw new Error(`웹 스크래핑 실패: ${error.message}`);
  }
}

export interface NewSkillPayload {
  skillName: string;
  markdownContent: string;
}

/**
 * 긁어온 마크다운 데이터를 기반으로 .agents/skills/[새스킬명]/SKILL.md 경로에 파일을 쓰고
 * 실시간으로 코어 타입에 동적 링킹 컴파일을 수행하는 도구
 */
export function skillWriter(payload: NewSkillPayload, repoRoot: string): string {
  const targetDir = join(repoRoot, ".agents", "skills", payload.skillName);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  writeFileSync(join(targetDir, "SKILL.md"), payload.markdownContent, "utf-8");

  try {
    // Run generate-skill-data.mjs from the repo root
    execSync("node cli/scripts/generate-skill-data.mjs", { cwd: repoRoot });
    return `[진화 완료] 신규 스킬 [${payload.skillName}]이 성공적으로 시스템 코어에 실시간 동적 링킹되었습니다.`;
  } catch (compileError: any) {
    return `[경고] 파일은 생성되었으나 링킹 컴파일 실패: ${compileError.message}`;
  }
}
