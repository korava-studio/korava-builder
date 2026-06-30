import { EventBus } from "../../kernel/events/event-bus.js";
import { AuthenticationManager } from "../auth/authentication-manager.js";
import { AuthorizationManager } from "../auth/authorization-manager.js";
import { RBACManager } from "../rbac/rbac-manager.js";
import { AuditManager } from "../audit/audit-manager.js";
import { PolicyEngine, PolicyDecision } from "../policies/policy-engine.js";
import { SecretManager } from "../secrets/secret-manager.js";
import { EncryptionManager } from "../encryption/encryption-manager.js";
import { SecurityScanner } from "../scanner/security-scanner.js";
import { ComplianceManager } from "../compliance/compliance-manager.js";
import { BackupManager } from "../backup/backup-manager.js";

export class SecurityEngine {
  public auth: AuthenticationManager;
  public authorization: AuthorizationManager;
  public rbac: RBACManager;
  public audit: AuditManager;
  public policy: PolicyEngine;
  public secrets: SecretManager;
  public encryption: EncryptionManager;
  public scanner: SecurityScanner;
  public compliance: ComplianceManager;
  public backup: BackupManager;

  constructor(private bus: EventBus) {
    this.encryption = new EncryptionManager();
    this.audit = new AuditManager(this.bus);
    this.policy = new PolicyEngine();
    this.rbac = new RBACManager();
    this.authorization = new AuthorizationManager(this.rbac, this.policy, this.audit);
    this.auth = new AuthenticationManager(this.audit);
    this.secrets = new SecretManager(this.audit, this.encryption);
    this.scanner = new SecurityScanner(this.audit);
    this.compliance = new ComplianceManager(this.audit);
    this.backup = new BackupManager(this.audit);
    this.initializeDefaults();
  }

  initializeDefaults() {
    this.rbac.registerDefaultRoles();
    this.policy.registerRule({
      id: "default-deny",
      description: "Zero trust default deny for unlisted actions",
      action: "*",
      effect: PolicyDecision.Deny,
      priority: 0
    });
  }

  health() {
    return {
      roles: this.rbac.listRoles().length,
      policies: this.policy.listRules().length,
      secrets: this.secrets.count(),
      scans: this.scanner.historyCount()
    };
  }
}
