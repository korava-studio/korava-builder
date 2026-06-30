import { AuditManager } from "../audit/audit-manager.js";

export interface ScanFinding {
  area: string;
  issue: string;
  severity: "low" | "medium" | "high";
}

export interface ScanResult {
  target: string;
  findings: ScanFinding[];
  scannedAt: string;
}

export class SecurityScanner {
  private history: ScanResult[] = [];

  constructor(private audit: AuditManager) {}

  run(target: string) {
    const result: ScanResult = {
      target,
      findings: [
        { area: "plugins", issue: "unused plugin permissions", severity: "medium" },
        { area: "configuration", issue: "missing secure defaults", severity: "low" }
      ],
      scannedAt: new Date().toISOString()
    };
    this.history.push(result);
    this.audit.record("system", "scan.run", target, "success", `scanned ${target}`);
    return result;
  }

  historyCount() {
    return this.history.length;
  }
}
