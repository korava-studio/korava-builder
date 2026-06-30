import { Agent } from "../core/agent.js";
import { AgentDepartment } from "../core/agent.js";

export class AgentRegistry {
  private agents = new Map<string, Agent>();

  register(agent: Agent) {
    this.agents.set(agent.id, agent);
  }

  get(id: string) {
    return this.agents.get(id);
  }

  list() {
    return Array.from(this.agents.values());
  }

  findByDepartment(department: AgentDepartment) {
    return this.list().filter((agent) => agent.department === department);
  }
}
