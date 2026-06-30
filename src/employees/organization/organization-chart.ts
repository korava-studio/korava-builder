export type ExperienceLevel = "Junior" | "Mid" | "Senior" | "Lead" | "Principal" | "Architect" | "Director" | "Executive";

export type EmployeeRole =
  | "Engineer"
  | "Researcher"
  | "Security"
  | "Automation"
  | "Product"
  | "Marketing"
  | "Finance"
  | "Operations"
  | "HR"
  | "Executive";

export type EmployeeDepartment =
  | "Engineering"
  | "Research"
  | "Security"
  | "Automation"
  | "Product"
  | "Marketing"
  | "Finance"
  | "Operations"
  | "People"
  | "Executive";

export interface OrganizationNode {
  id: string;
  name: string;
  role: EmployeeRole;
  department: EmployeeDepartment;
  reportsTo?: string;
  reports?: string[];
}

export class OrganizationChart {
  private nodes = new Map<string, OrganizationNode>();

  addNode(node: OrganizationNode) {
    this.nodes.set(node.id, node);
  }

  getNode(id: string) {
    return this.nodes.get(id) ?? null;
  }

  listNodes() {
    return Array.from(this.nodes.values());
  }
}
