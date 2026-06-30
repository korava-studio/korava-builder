import { AuditManager } from "../audit/audit-manager.js";

export interface Identity {
  id: string;
  username: string;
  roles: string[];
  scopes: string[];
}

export interface SessionToken {
  token: string;
  refreshToken: string;
  identity: Identity;
  createdAt: string;
  expiresAt: string;
}

const DEFAULT_TOKEN_LIFETIME_MS = 60 * 60 * 1000;

function generateToken(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export class AuthenticationManager {
  private sessions = new Map<string, SessionToken>();
  private refreshIndex = new Map<string, string>();

  constructor(private audit: AuditManager) {}

  authenticate(identity: Identity, lifetimeMs = DEFAULT_TOKEN_LIFETIME_MS) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + lifetimeMs);
    const token = generateToken("session");
    const refreshToken = generateToken("refresh");
    const session: SessionToken = {
      token,
      refreshToken,
      identity,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    this.sessions.set(token, session);
    this.refreshIndex.set(refreshToken, token);
    this.audit.record(identity.username, "auth.login", "authentication", "success", "issued session token");
    return session;
  }

  validate(token: string) {
    const session = this.sessions.get(token);
    const valid = session ? new Date(session.expiresAt) > new Date() : false;
    this.audit.record(session?.identity.username ?? "anonymous", "auth.validate", "authentication", valid ? "success" : "failure", `token ${valid ? "valid" : "invalid"}`);
    return valid;
  }

  refresh(refreshToken: string) {
    const existing = this.refreshIndex.get(refreshToken);
    if (!existing) return null;

    const session = this.sessions.get(existing);
    if (!session) return null;

    const refreshed = this.authenticate(session.identity);
    this.audit.record(session.identity.username, "auth.refresh", "authentication", "success", "refreshed session token");
    return refreshed;
  }

  revoke(token: string) {
    const session = this.sessions.get(token);
    if (!session) return false;
    this.sessions.delete(token);
    this.refreshIndex.delete(session.refreshToken);
    this.audit.record(session.identity.username, "auth.revoke", "authentication", "success", "revoked session");
    return true;
  }

  getSession(token: string) {
    return this.sessions.get(token) ?? null;
  }
}
