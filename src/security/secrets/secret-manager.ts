import { AuditManager } from "../audit/audit-manager.js";
import { EncryptionManager } from "../encryption/encryption-manager.js";

export type SecretType = "apiKey" | "password" | "certificate" | "token" | "encryptionKey";

export interface SecretEntry {
  id: string;
  type: SecretType;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export class SecretManager {
  private secrets = new Map<string, SecretEntry>();

  constructor(private audit: AuditManager, private encryption: EncryptionManager) {}

  store(id: string, type: SecretType, value: string) {
    const encrypted = this.encryption.encrypt(value);
    const entry: SecretEntry = {
      id,
      type,
      value: encrypted,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.secrets.set(id, entry);
    this.audit.record("system", "secret.store", id, "success", `stored ${type}`);
    return entry;
  }

  retrieve(id: string) {
    const entry = this.secrets.get(id);
    if (!entry) return null;
    this.audit.record("system", "secret.retrieve", id, "success", `retrieved ${entry.type}`);
    return {
      ...entry,
      value: this.encryption.decrypt(entry.value)
    };
  }

  count() {
    return this.secrets.size;
  }
}
