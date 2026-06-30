import { AuditManager } from "../audit/audit-manager.js";
import { PolicyEngine, PolicyDecision } from "../policies/policy-engine.js";
import { RBACManager } from "../rbac/rbac-manager.js";

export interface AuthorizationResult {
  granted: boolean;
  decision: PolicyDecision;
  reason: string;
}

export class AuthorizationManager {
  constructor(
    private rbac: RBACManager,
    private policy: PolicyEngine,
    private audit: AuditManager
  ) {}

  authorize(subject: string, action: string, resource: string, scope?: string) {
    const roles = this.rbac.getRoles(subject);
    const rule = this.policy.evaluate(action, resource, roles, scope);
    const permitted = rule.effect === PolicyDecision.Allow && this.rbac.hasPermission(subject, action, scope);
    const reason = permitted
      ? `granted by ${rule.effect}`
      : `denied by ${rule.effect}`;

    this.audit.record(subject, "auth.authorize", resource, permitted ? "success" : "failure", reason);
    return {
      granted: permitted,
      decision: rule.effect,
      reason
    } as AuthorizationResult;
  }
}
