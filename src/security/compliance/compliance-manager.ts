import { AuditManager } from "../audit/audit-manager.js";

export interface ComplianceRule {
  id: string;
  description: string;
  category: string;
  enforced: boolean;
}

export interface ComplianceStatus extends ComplianceRule {
  status: "compliant" | "non-compliant";
}

export class ComplianceManager {
  private rules: ComplianceRule[] = [];

  constructor(private audit: AuditManager) {}

  register(rule: ComplianceRule) {
    this.rules.push(rule);
    this.audit.record("system", "compliance.register", rule.category, "success", rule.description);
  }

  list() {
    return [...this.rules];
  }

  check(): ComplianceStatus[] {
    return this.rules.map((rule) => ({
      ...rule,
      status: rule.enforced ? "compliant" : "non-compliant"
    }));
  }
}
