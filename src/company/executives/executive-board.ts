export type ExecutiveRole =
  | "CEO"
  | "CTO"
  | "COO"
  | "CFO"
  | "CMO"
  | "CPO"
  | "CHRO"
  | "Chief Security Officer"
  | "Chief Research Officer";

export interface ExecutiveAgent {
  id: string;
  name: string;
  role: ExecutiveRole;
  department: string;
}

export class ExecutiveBoard {
  private executives = new Map<ExecutiveRole, ExecutiveAgent>();

  registerExecutive(agent: ExecutiveAgent) {
    this.executives.set(agent.role, agent);
  }

  registerExecutives() {
    const defaults: ExecutiveAgent[] = [
      { id: "ceo", name: "Chief Executive Officer", role: "CEO", department: "Executive" },
      { id: "cto", name: "Chief Technology Officer", role: "CTO", department: "Technology" },
      { id: "coo", name: "Chief Operating Officer", role: "COO", department: "Operations" },
      { id: "cfo", name: "Chief Financial Officer", role: "CFO", department: "Finance" },
      { id: "cmo", name: "Chief Marketing Officer", role: "CMO", department: "Marketing" },
      { id: "cpo", name: "Chief Product Officer", role: "CPO", department: "Product" },
      { id: "chro", name: "Chief Human Resources Officer", role: "CHRO", department: "People" },
      { id: "cso", name: "Chief Security Officer", role: "Chief Security Officer", department: "Security" },
      { id: "cro", name: "Chief Research Officer", role: "Chief Research Officer", department: "Research" }
    ];

    for (const executive of defaults) {
      this.registerExecutive(executive);
    }
  }

  getExecutive(role: ExecutiveRole) {
    return this.executives.get(role) ?? null;
  }

  listExecutives() {
    return Array.from(this.executives.values());
  }
}
