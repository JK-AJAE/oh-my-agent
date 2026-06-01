import type { SelfHealingGateResult } from "../../state/self-healing.js";
import type { CLICheck, SkillCheck } from "../../types/index.js";
import type {
  MemoryDaemonResult,
  MemoryProviderStatus,
  MemoryServicePresence,
} from "../../types/memory.js";
import type { SkillAuditReport } from "../skills/audit.js";
import type { DualInstallReport } from "./dual-install.js";

export interface DoctorOptions {
  healCheckAgent?: string;
}

export interface McpCheck extends CLICheck {
  mcp: { configured: boolean; path?: string };
}

export interface VendorDocCheck {
  fileName: string;
  required: boolean;
  hasOmaBlock: boolean;
}

export interface AgentMemoryRetryQueueCheck {
  path: string;
  total: number;
  invalid: number;
}

export interface AgentMemoryDaemonCheck
  extends Pick<
    MemoryDaemonResult,
    "pidPath" | "ownedPid" | "ownedProcessRunning" | "endpoint"
  > {}

export interface AgentMemoryBinaryCheck {
  command: string;
  available: boolean;
  path?: string;
}

export interface AgentMemoryDoctorCheck {
  status: MemoryProviderStatus;
  binary: AgentMemoryBinaryCheck;
  retryQueue: AgentMemoryRetryQueueCheck;
  service: MemoryServicePresence;
  daemon: AgentMemoryDaemonCheck;
  issues: string[];
}

export interface DoctorReport {
  cwd: string;
  clis: CLICheck[];
  mcpChecks: McpCheck[];
  skillChecks: SkillCheck[];
  missingCLIs: CLICheck[];
  missingSkills: SkillCheck[];
  vendorDocs: VendorDocCheck[];
  hasSerena: boolean;
  serenaFileCount: number;
  agentMemory: AgentMemoryDoctorCheck;
  totalIssues: number;
  skillAudit: SkillAuditReport;
  dualInstall: DualInstallReport;
  selfHealing?: SelfHealingGateResult;
}
