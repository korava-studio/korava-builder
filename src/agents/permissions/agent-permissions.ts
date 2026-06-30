export type PermissionType =
  | "filesystem"
  | "network"
  | "workflow"
  | "plugins"
  | "memory"
  | "terminal";

export class AgentPermissions {
  private allowed = new Set<PermissionType>();

  constructor(types: PermissionType[] = []) {
    types.forEach((type) => this.allowed.add(type));
  }

  grant(type: PermissionType) {
    this.allowed.add(type);
  }

  revoke(type: PermissionType) {
    this.allowed.delete(type);
  }

  can(type: PermissionType) {
    return this.allowed.has(type);
  }

  list() {
    return Array.from(this.allowed.values());
  }
}
