import { AuditManager } from "../audit/audit-manager.js";

export interface BackupEntry {
  id: string;
  resource: string;
  createdAt: string;
  status: "completed" | "failed";
}

export class BackupManager {
  private backups: BackupEntry[] = [];

  constructor(private audit: AuditManager) {}

  create(resource: string) {
    const entry: BackupEntry = {
      id: `backup-${Math.random().toString(36).slice(2)}`,
      resource,
      createdAt: new Date().toISOString(),
      status: "completed"
    };
    this.backups.push(entry);
    this.audit.record("system", "backup.create", resource, "success", `backup created for ${resource}`);
    return entry;
  }

  list() {
    return [...this.backups];
  }
}
