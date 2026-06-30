export type Permission =
  | "filesystem.read"
  | "filesystem.write"
  | "workflow.execute"
  | "plugin.install"
  | "plugin.remove"
  | "network.access"
  | "memory.read"
  | "memory.write"
  | "terminal.execute";

export type RoleName =
  | "Owner"
  | "CEO"
  | "CTO"
  | "Manager"
  | "Engineer"
  | "Research"
  | "Automation"
  | "Security"
  | "Guest"
  | "Plugin"
  | "Agent";

export interface RoleDefinition {
  name: RoleName;
  permissions: Permission[];
  description: string;
}

const DEFAULT_ROLES: RoleDefinition[] = [
  { name: "Owner", description: "Full enterprise control", permissions: ["filesystem.read", "filesystem.write", "workflow.execute", "plugin.install", "plugin.remove", "network.access", "memory.read", "memory.write", "terminal.execute"] },
  { name: "CEO", description: "Executive governance and review", permissions: ["filesystem.read", "workflow.execute", "plugin.install", "network.access", "memory.read"] },
  { name: "CTO", description: "Technical leadership and platform control", permissions: ["filesystem.read", "filesystem.write", "workflow.execute", "plugin.install", "network.access", "memory.read", "memory.write"] },
  { name: "Manager", description: "Team management and oversight", permissions: ["filesystem.read", "workflow.execute", "network.access", "memory.read"] },
  { name: "Engineer", description: "Engineering execution", permissions: ["filesystem.read", "filesystem.write", "workflow.execute", "memory.read", "memory.write"] },
  { name: "Research", description: "Research and discovery access", permissions: ["filesystem.read", "workflow.execute", "network.access", "memory.read"] },
  { name: "Automation", description: "Automation orchestration only", permissions: ["workflow.execute", "network.access"] },
  { name: "Security", description: "Security operations and audit review", permissions: ["filesystem.read", "workflow.execute", "memory.read", "terminal.execute"] },
  { name: "Guest", description: "Restricted access for temporary users", permissions: ["filesystem.read"] },
  { name: "Plugin", description: "Plugin installation and removal", permissions: ["plugin.install", "plugin.remove"] },
  { name: "Agent", description: "Agent runtime access only", permissions: ["workflow.execute", "memory.read" ] }
];

export class RBACManager {
  private roles = new Map<RoleName, RoleDefinition>();
  private assignments = new Map<string, Set<RoleName>>();

  registerRole(role: RoleDefinition) {
    this.roles.set(role.name, role);
  }

  registerDefaultRoles() {
    for (const role of DEFAULT_ROLES) {
      this.registerRole(role);
    }
  }

  assignRole(subject: string, role: RoleName) {
    const set = this.assignments.get(subject) ?? new Set<RoleName>();
    set.add(role);
    this.assignments.set(subject, set);
  }

  revokeRole(subject: string, role: RoleName) {
    const set = this.assignments.get(subject);
    set?.delete(role);
  }

  getRoles(subject: string) {
    return Array.from(this.assignments.get(subject) ?? []);
  }

  hasPermission(subject: string, permission: string, scope?: string) {
    const roles = this.getRoles(subject);
    for (const roleName of roles) {
      const role = this.roles.get(roleName);
      if (role?.permissions.includes(permission as Permission)) {
        return true;
      }
    }
    return false;
  }

  listRoles() {
    return Array.from(this.roles.values());
  }
}
